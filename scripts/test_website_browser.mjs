/** Optional real-browser acceptance checks. Run against a built, locally served site. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {filterRecords,parseState,sortRecords,concordanceHits,sortConcordance} from '../web/core.js';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.WEBSITE_URL||'http://127.0.0.1:4173/trilingual-consistency-explorer/';
const out=path.resolve('reports/website_qa');await fs.mkdir(out,{recursive:true});
const data=JSON.parse(await fs.readFile('web/data/corpus.json','utf8'));
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
const page=await context.newPage();page.setDefaultTimeout(10000);
const errors=[],failedRequests=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failedRequests.push({url:r.url(),status:r.status()});});
async function test(name,fn){try{await fn();checks.push({name,status:'PASS'});console.log('PASS',name);}catch(e){checks.push({name,status:'FAIL',error:e.message});throw e;}}
async function go(hash){await page.goto(base+hash);await page.waitForSelector('#main h1');}
async function panelShot(selector,name){const style=await page.addStyleTag({content:'#site-header,.analysis-jump,.skip-link{visibility:hidden!important}'});await page.locator(selector).screenshot({path:path.join(out,name)});await style.evaluate(e=>e.remove());}
async function count(){return Number(await page.locator('#results-count strong').textContent());}
async function linked(){
 const s=parseState(new URL(page.url()).hash),rows=filterRecords(data.records,s);
 assert.equal(await count(),rows.length);assert.equal(Number(await page.locator('#records-section .count-label').textContent()),rows.length);
 const ids=await page.locator('[data-record-row]').evaluateAll(e=>e.map(x=>x.dataset.recordRow));const start=(Math.min(s.page,Math.max(1,Math.ceil(rows.length/10)))-1)*10;
 assert.deepEqual(ids,sortRecords(rows,s.sort,s.dir).slice(start,start+10).map(r=>r.id));
 if(await page.locator('#kwic-section').count()){
  const hits=sortConcordance(concordanceHits(rows,s.q,s.kwicLang),s.lexSort,s.lexDir,s.kwicLang),pageNo=Math.min(s.lexPage,Math.max(1,Math.ceil(hits.length/20)));
  assert.deepEqual(await page.locator('.concordance-hit').evaluateAll(es=>es.map(e=>e.dataset.hitKey)),hits.slice((pageNo-1)*20,pageNo*20).map(h=>h.key));
  if(s.q.trim())assert.equal(Number(await page.locator('.concordance-count strong').textContent()),hits.length);
 }
 if(s.route==='visualizations')for(const cell of await page.locator('.heatmap-cell').evaluateAll(es=>es.map(e=>({tag:e.dataset.issue||e.dataset.phenomenon||e.dataset.phenomenonGroup,cat:e.dataset.category,text:e.textContent})))){
  const n=rows.filter(r=>r.category===cell.cat&&(s.heatView==='overview'?r.phenomenonGroups:s.heatView==='legacy'?r.issues:r.phenomena).includes(cell.tag)).length,den=rows.filter(r=>r.category===cell.cat).length;
  assert.equal(cell.text,s.metric==='percent'?`${(den?n/den*100:0).toFixed(1)}%`:String(n));
 }
}
try{
 await test('English default; production assets load under repository subpath',async()=>{await go('');assert.equal(await page.locator('html').getAttribute('lang'),'en');assert.equal(await page.locator('.stat-band strong').allTextContents().then(a=>a.join(',')),'500,3,5,50,450');await page.screenshot({path:path.join(out,'home-1440.png'),fullPage:true});});
 await test('Search English, Chinese, Hungarian Unicode and record IDs',async()=>{await go('#explore');for(const q of ['get','我','ő','TCE-0263']){await page.locator('#corpus-search').fill(q);await page.waitForFunction(q=>new URLSearchParams(location.hash.split('?')[1]).get('q')===q,q);await linked();assert.ok(await count()>0);}await page.locator('[data-action="clear-search"]').click();assert.equal(await count(),500);});
 await test('Category, human-review and annotation-origin filters',async()=>{await page.selectOption('#category-filter','Core Meaning Preserved');assert.equal(await count(),380);await page.locator('[data-action="reset"]').click();await page.selectOption('#review-filter','yes');assert.equal(await count(),50);await go('#visualizations?origin=supplemental20');assert.equal(await count(),20);await linked();await page.locator('[data-action="reset"]').click();assert.equal(await count(),500);});
 await test('Sortable grid and pagination reflect underlying records',async()=>{await page.locator('[data-page="2"]').click();await linked();await page.selectOption('#sort-select','hu');await linked();await page.locator('[data-action="direction"]').click();await linked();});
 await test('Sankey flow keyboard interaction updates all four views',async()=>{await go('#visualizations');assert.ok((await page.locator('.sankey-svg').textContent()).includes('Human-reviewed · 50'));assert.ok((await page.locator('.sankey-svg').textContent()).includes('AI-only · 450'));const flow=page.locator('path[data-action="review-flow"][data-review="yes"][data-category="Core Meaning Preserved"]');await flow.focus();await page.keyboard.press('Enter');assert.equal(await count(),33);await linked();const s=parseState(new URL(page.url()).hash);assert.equal(s.review,'yes');assert.equal(s.origin,'');assert.equal(s.category,'Core Meaning Preserved');});
 await test('Sankey category and merged review-group node interactions',async()=>{await page.locator('[data-action="reset"]').click();await page.locator('g[data-action="category"][data-category="Acceptable Variation"]').focus();await page.keyboard.press('Enter');assert.equal(await count(),65);await linked();await page.locator('[data-action="reset"]').click();await page.locator('g[data-action="review"][data-review="no"]').focus();await page.keyboard.press('Enter');assert.equal(await count(),450);await linked();await page.locator('[data-action="reset"]').click();await go('#visualizations?origin=supplemental20');await page.locator('g[data-action="review"][data-review="yes"]').focus();await page.keyboard.press('Enter');assert.equal(await count(),20);assert.equal(parseState(new URL(page.url()).hash).origin,'supplemental20');await linked();});
 await test('Heatmap cell sets BOTH issue and category; counts agree',async()=>{await page.locator('[data-action="reset"]').click();await page.selectOption('#heat-view','detail');await linked();const cell=page.locator('.heatmap-cell:not([disabled])').first();const c=await cell.getAttribute('data-category'),i=await cell.getAttribute('data-phenomenon');await cell.click();const s=parseState(new URL(page.url()).hash);assert.equal(s.category,c);assert.equal(s.phenomenon,i);await linked();});
 await test('Heatmap count/percentage, group and frequency controls change output',async()=>{await page.locator('[data-action="reset"]').click();await page.selectOption('#heat-metric','percent');await linked();assert.match(await page.locator('.heatmap-cell').first().textContent(),/%/);const before=await page.locator('.heatmap-table tbody tr').count();await page.selectOption('#heat-group','form');assert.ok(await page.locator('.heatmap-table tbody tr').count()<before);await page.selectOption('#heat-group','all');await page.locator('#heat-min').fill('50');await page.locator('#heat-min').dispatchEvent('change');assert.ok(await page.locator('.heatmap-table tbody tr').count()<before);await linked();});
 await test('KWIC term, highlights and language scope share URL and filters',async()=>{await page.locator('[data-action="reset"]').click();await page.locator('.term-chips [data-term="我"]').click();assert.equal(parseState(new URL(page.url()).hash).q,'我');assert.equal(parseState(new URL(page.url()).hash).route,'explore');await linked();assert.ok(await page.locator('.concordance-hit mark').count()>0);await page.selectOption('#search-scope','zh');await linked();await page.locator('.concordance-hit mark').first().click();await linked();await panelShot('#kwic-section','kwic-1440.png');});
 await test('URL state survives reload, browser back/forward and language switch',async()=>{const initial=page.url();await page.reload();await page.waitForSelector('#results-count');assert.equal(page.url(),initial);await linked();await page.selectOption('#review-filter','yes');const changed=page.url();await page.goBack();assert.equal(page.url(),initial);await linked();await page.goForward();assert.equal(page.url(),changed);await linked();await page.locator('[data-language="zh"]').first().click();assert.equal(await page.locator('html').getAttribute('lang'),'zh-Hant');assert.equal(parseState(new URL(page.url()).hash).q,'我');assert.equal(parseState(new URL(page.url()).hash).route,'explore');await linked();});
 await test('Filtered CSV download contains exact selected IDs and original text',async()=>{await go('#explore?q=TCE-0263');const dl=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const download=await dl;const file=path.join(out,'filtered-export.csv');await download.saveAs(file);const csv=await fs.readFile(file,'utf8');assert.ok(csv.includes('TCE-0263'));assert.ok(csv.includes('請滿點說。'));assert.ok(!csv.includes('TCE-0264'));assert.equal(download.suggestedFilename(),'trilingual_filtered_1.csv');});
 await test('Detail preserves original typo, recovery, legacy label, human history and source URLs; Escape closes',async()=>{await page.locator('.detail-button').click();const d=page.locator('#record-dialog');assert.ok(await d.isVisible());const text=await d.textContent();for(const s of ['請滿點說。','請慢點說','Legacy Pilot vocabulary','Potential Accuracy Issue','aligned'])assert.ok(text.includes(s),s);const record=data.records.find(r=>r.id==='TCE-0263');for(const url of Object.values(record.urls))assert.ok(await d.locator(`a[href="${url}"]`).count()>0);await page.keyboard.press('Escape');assert.ok(!await d.isVisible());assert.ok(!new URL(page.url()).hash.includes('record='));});
 await test('Helpful empty state and reset',async()=>{await go('#explore?q=zzzzNONEXISTENT');assert.equal(await count(),0);assert.ok(await page.locator('.empty-state').isVisible());await page.locator('.empty-state [data-action="reset"]').click();assert.equal(await count(),500);});
 await test('Bilingual report has exactly eight major sections; codebook has all five categories',async()=>{for(const lang of ['en','zh']){await go(`#report?lang=${lang}`);assert.equal(await page.locator('main h1').textContent(),lang==='en'?'Learning Report':'學習報告');assert.equal(await page.locator('#primary-nav [aria-current="page"]').textContent(),lang==='en'?'Learning Report':'學習報告');assert.ok((await page.title()).startsWith(lang==='en'?'Learning Report':'學習報告'));assert.doesNotMatch(await page.locator('body').innerText(),/Research Report|研究報告|研究报告/i);assert.equal(await page.locator('[data-report-section]').count(),8);assert.equal(await page.locator('.researcher-task').count(),0);assert.equal(await page.locator('[data-report-subsection]').count(),1);assert.equal(await page.locator('#report-conclusion [data-report-subsection] h3').textContent(),lang==='en'?'Research Limitations':'研究限制');assert.equal(await page.locator('#report-conclusion [data-report-subsection] > p').count(),3);assert.doesNotMatch(await page.locator('main').textContent(),/Editorial review:|編輯審閱：|pending researcher review|researcher confirmation required/i);assert.ok((await page.locator('[data-report-section="analysis"]').textContent()).includes('唯聖者能恕'));const {learningSections,references}=await import('../web/content.js');for(const section of learningSections){assert.deepEqual(await page.locator(`[data-report-section="${section.id}"] > p`).allTextContents(),section.paragraphs[lang]);for(const sub of section.subsections||[])assert.deepEqual(await page.locator(`[data-report-subsection="${sub.id}"] > p`).allTextContents(),sub.paragraphs[lang]);}assert.equal(await page.locator('.report-citation').count(),4);for(const link of await page.locator('.report-citation').all()){const id=await link.getAttribute('data-reference-id');const reference=references.find(r=>r.id===id);assert.equal(await link.getAttribute('href'),reference.accessUrl||reference.url);}await panelShot('[data-report-section="analysis"]',`analysis-report-${lang}.png`);await go(`#codebook?lang=${lang}`);assert.equal(await page.locator('.codebook-category').count(),5);await go(`#about?lang=${lang}`);assert.ok((await page.locator('main').textContent()).includes('gpt-6.1-sol'));assert.doesNotMatch(await page.locator('main').textContent(),/They approved|their original judgments|I approved/);}});
 await test('Public approved Codebook: bilingual D1–D5 sequence, complete categories and authentic examples',async()=>{
  for(const lang of ['en','zh']){
   await go(`#codebook?lang=${lang}`);
   assert.equal(await page.locator('.decision-sequence').count(),1);
   assert.deepEqual(await page.locator('[data-decision-step]').evaluateAll(es=>es.map(e=>e.dataset.decisionStep)),['D1','D2','D3','D4','D5']);
   const {categories}=await import('../web/content.js');
   for(let i=0;i<categories.length;i++){
    const c=categories[i],section=page.locator(`#book-${i}`);await section.locator('summary').click();
    const text=await section.innerText();for(const key of ['definition','theory','rule'])assert.ok(text.includes(c[key][lang]));
    for(const kind of ['positive','negative','boundary']){
     const r=data.records.find(r=>r.id===c[kind].id);assert.ok(text.includes(r.id));
     for(const field of ['en','zh','hu'])assert.ok(text.includes(r[field]));assert.ok(text.includes(c[kind].explanation[lang]));
    }
   }
   assert.ok((await page.locator('#book-3').innerText()).includes('suspected_typo'));
   for(const link of await page.locator('.document-links a').all())assert.equal((await page.request.get(new URL(await link.getAttribute('href'),base).href)).status(),200);
  }
 });
 await test('Approved Learning Report: bilingual new case comparison, nested limits and desktop/mobile rendering',async()=>{
  const {learningSections}=await import('../web/content.js');
  for(const width of [1440,375])for(const lang of ['en','zh']){
   await page.setViewportSize({width,height:1000});await go(`#report?lang=${lang}`);
   assert.deepEqual(await page.locator('[data-report-section]').evaluateAll(es=>es.map(e=>e.dataset.reportSection)),['origin','background','gap','questions','method','analysis','conclusion','reflection']);
   for(const section of learningSections)assert.deepEqual(await page.locator(`[data-report-section="${section.id}"] > p`).allTextContents(),section.paragraphs[lang]);
   assert.equal(await page.locator('[data-report-subsection]').count(),1);assert.equal(await page.locator('#report-conclusion #report-research-limitations').count(),1);
   const text=await page.locator('main').innerText();assert.ok(!text.includes('Researcher-approved English Learning Report (23 November 2026)'));assert.ok(!text.includes('not yet been verified as integrated'));
   for(const id of ['TCE-0241','TCE-0111']){const record=data.records.find(r=>r.id===id);for(const field of ['en','zh','hu'])assert.ok(text.includes(record[field]));}
   await page.locator('[data-report-section="analysis"] > p').nth(2).scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(out,`report-final-${lang}-${width}.png`)});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
 });
 await test('APA bibliography and stable citation targets in both languages at desktop/mobile widths',async()=>{
  const {references}=await import('../web/content.js');
  for(const width of [1440,375])for(const lang of ['en','zh'])for(const route of ['report','codebook','about']){
   await page.setViewportSize({width,height:1000});await go(`#${route}?lang=${lang}`);
   const entries=await page.locator('.references li').evaluateAll(es=>es.map(e=>({id:e.dataset.referenceId,anchor:e.id,label:e.querySelector('a').textContent,href:e.querySelector('a').href,italic:e.querySelectorAll('em').length})));
   assert.deepEqual(entries.map(e=>e.id),references.map(r=>r.id));assert.equal(new Set(entries.map(e=>e.id)).size,6);
   assert.ok(await page.locator('.references li > a').evaluateAll(es=>es.every(e=>{const range=document.createRange();range.selectNodeContents(e);const box=e.closest('.references').getBoundingClientRect();return [...range.getClientRects()].every(r=>r.left>=box.left-1&&r.right<=box.right+1);})), 'Bibliography text and long URLs stay within the reference panel');
   for(const e of entries){const ref=references.find(r=>r.id===e.id);assert.equal(e.href,ref.url);assert.equal(e.label,ref.title);assert.equal(e.anchor,`reference-${e.id}`);assert.ok(e.italic>0);}
   for(const citation of await page.locator('.report-citation').all()){const id=await citation.getAttribute('data-reference-id');const reference=references.find(r=>r.id===id);assert.equal(await citation.getAttribute('href'),reference.accessUrl||reference.url);assert.equal(await page.locator(`#reference-${id}`).count(),1);}
   if(route==='codebook'){assert.ok(await page.locator('.theory-note a').count()>0);assert.doesNotMatch(await page.locator('main').innerText(),/\[\d+\]/);}
   assert.equal(await page.locator('[data-reference-access="freitag-2021"]').getAttribute('href'),'https://aclanthology.org/2021.tacl-1.87/');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await panelShot('.references',`references-apa-${route}-${lang}-${width}.png`);
  }
  const downloadable=await (await page.request.get(base+'research/codebook_v0.2_final_candidate.md')).text();
  assert.ok(downloadable.includes('Cambridge University Press, n.d.'));assert.ok(downloadable.includes('Transactions of the Association for Computational Linguistics'));
  assert.doesNotMatch(downloadable,/Reference [1-4]|\[[1-4]\]/);
 });
 await test('Approved AI Use Declaration: exact bilingual subsections, prompt and desktop/mobile rendering',async()=>{
  const {aiDeclaration}=await import('../web/content.js');const {aiPlainText}=await import('../web/ai_declaration.js');
  for(const width of [1440,375])for(const lang of ['en','zh']){
   await page.setViewportSize({width,height:1000});await go(`#about?lang=${lang}`);
   assert.deepEqual(await page.locator('[data-ai-section] > h3').allTextContents(),aiDeclaration[lang].map(s=>s.title));
   assert.equal(await page.locator('[data-ai-section]').count(),4);assert.equal(await page.locator('[data-ai-section] > p').count(),9);
   for(const section of aiDeclaration[lang])assert.deepEqual(await page.locator(`[data-ai-section="${section.id}"] > p`).allTextContents(),section.paragraphs.map(aiPlainText));
   assert.equal(await page.locator('#ai-declaration em').count(),1);
   const text=await page.locator('#ai-declaration').innerText();for(const value of ['50','450','gpt-6.1-sol','D1–D5','group','phenomenonGroup'])assert.ok(text.includes(value));
   assert.equal(await page.locator('#ai-declaration .prompt-example').count(),0,'No legacy extra prompt duplicates the approved text');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await panelShot('#ai-declaration',`ai-declaration-final-${lang}-${width}.png`);
  }
 });
 await test('All six routes in both languages at 1440 / 1024 / 768 / 375 have no page overflow',async()=>{for(const width of [1440,1024,768,375]){await page.setViewportSize({width,height:900});for(const lang of ['en','zh'])for(const route of ['home','explore','visualizations','codebook','report','about']){await go(`#${route}?lang=${lang}`);const sizes=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:innerWidth}));assert.ok(sizes.scroll<=sizes.client,`${width}/${lang}/${route}: ${JSON.stringify(sizes)}`);}if(width===375){await go('#home?lang=zh');await page.screenshot({path:path.join(out,'home-375-zh.png'),fullPage:true});await go('#visualizations?lang=zh');await page.screenshot({path:path.join(out,'analysis-375.png'),fullPage:true});await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}if(width===768){await go('#report?lang=zh');await page.screenshot({path:path.join(out,'report-768-zh.png'),fullPage:true});}}});
 await test('Skip link and keyboard chart focus remain usable',async()=>{await page.setViewportSize({width:1440,height:1000});await go('#visualizations');const before=page.url();await page.locator('.skip-link').focus();await page.keyboard.press('Enter');assert.equal(page.url(),before);assert.equal(await page.evaluate(()=>document.activeElement.id),'main');await page.locator('g[data-action="review"][data-review="yes"]').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.dataset.review),'yes');await linked();});
 await test('Occurrence-level KWIC reconstructs all three languages and aligns keyword centers',async()=>{
  for(const [q,lang] of [['get','en'],['我','zh'],['ő','hu']]){
   await go(`#visualizations?q=${encodeURIComponent(q)}&kwicLang=${lang}`);await linked();
   const windows=await page.locator('.concordance-hit').evaluateAll(es=>es.map(e=>({id:e.dataset.hitRecord,lang:e.dataset.hitLanguage,left:e.querySelector('.kwic-left').textContent,key:e.querySelector('mark').textContent,right:e.querySelector('.kwic-right').textContent,center:e.querySelector('.keyword-cell').getBoundingClientRect().x+e.querySelector('.keyword-cell').getBoundingClientRect().width/2})));
   assert.ok(windows.length);for(const w of windows)assert.equal(w.left+w.key+w.right,data.records.find(r=>r.id===w.id)[w.lang]);
   assert.ok(Math.max(...windows.map(w=>w.center))-Math.min(...windows.map(w=>w.center))<1);
   await page.locator('.kwic-keyword').first().click();assert.equal(parseState(new URL(page.url()).hash).route,'explore');await linked();
  }
  await go('#visualizations?q=get&lang=zh');await panelShot('#kwic-section','kwic-refined-1440.png');
  await page.setViewportSize({width:375,height:900});await go('#visualizations?q=%E6%88%91&lang=zh');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.locator('.concordance-scroll').evaluate(e=>e.scrollLeft>0));
  await panelShot('#kwic-section','kwic-refined-375.png');await page.setViewportSize({width:1440,height:1000});
 });
 await test('Context sorting, lexical pagination, evidence selection and shareable hit state',async()=>{
  await go('#visualizations?q=%E6%88%91&kwicLang=zh');await linked();await page.selectOption('#lexical-scope','en');assert.equal(await page.inputValue('#search-scope'),'en');assert.equal(await count(),0);await linked();await page.selectOption('#lexical-scope','zh');await linked();
  const first=await page.locator('.concordance-hit').first().getAttribute('data-hit-key');
  await page.selectOption('#concordance-sort','left');await linked();assert.equal(parseState(new URL(page.url()).hash).lexSort,'left');
  await page.selectOption('#concordance-sort','right');await linked();assert.notEqual(await page.locator('.concordance-hit').first().getAttribute('data-hit-key'),first);
  await page.locator('#lex-direction').click();await linked();await page.locator('[data-lex-page="2"]').click();await linked();
  const selected=page.locator('.concordance-hit').first(),key=await selected.getAttribute('data-hit-key'),id=await selected.getAttribute('data-hit-record');
  await selected.locator('.hit-evidence').focus();await page.keyboard.press('Enter');
  const record=data.records.find(r=>r.id===id),dialog=page.locator('#record-dialog');for(const field of ['en','zh','hu','category'])assert.ok((await dialog.textContent()).includes(record[field]));
  assert.equal(parseState(new URL(page.url()).hash).lexHit,key);await page.reload();await page.waitForSelector('#record-dialog[open]');
  await page.keyboard.press('Escape');assert.equal(await page.locator('.concordance-hit.is-selected').getAttribute('data-hit-key'),key);
  assert.ok((await page.evaluate(()=>document.activeElement.className)).includes('hit-evidence'));await linked();
  await page.goBack();await page.waitForSelector('#record-dialog[open]');await page.keyboard.press('Escape');
  await page.selectOption('#review-filter','yes');await linked();await page.selectOption('#category-filter','Core Meaning Preserved');await linked();
  assert.equal(parseState(new URL(page.url()).hash).lexPage,1);await page.locator('[data-action="reset"]').click();await linked();
 });
 await test('Heatmap ranks documented phenomena before no-tag records; desktop buttons never wrap',async()=>{await go('#visualizations?heatView=detail');const tags=await page.locator('.heatmap-table tbody tr').evaluateAll(es=>es.map(e=>e.dataset.phenomenon));assert.equal(tags.at(-1),'not_documented');assert.notEqual(tags[0],'not_documented');await linked();for(const width of [1440,1024,768]){await page.setViewportSize({width,height:1000});await go('#explore');for(const box of await page.locator('.detail-button').evaluateAll(es=>es.map(e=>({height:e.getBoundingClientRect().height,line:parseFloat(getComputedStyle(e).lineHeight),scroll:e.scrollWidth,width:e.clientWidth,nowrap:getComputedStyle(e).whiteSpace,right:e.getBoundingClientRect().right,cellRight:e.closest('td').getBoundingClientRect().right})))){assert.equal(box.nowrap,'nowrap');assert.ok(box.scroll<=box.width);assert.ok(box.right<=box.cellRight-2,'Details button stays inside its column');}}});
 await test('Two-level taxonomy views preserve report counts, union groups and source traceability',async()=>{
  await page.setViewportSize({width:1440,height:1000});await go('#visualizations');
  assert.equal(await page.locator('#review-filter option').count(),3);assert.equal(await page.locator('#origin-filter').count(),0);
  await page.selectOption('#heat-view','overview');await linked();assert.equal(await page.locator('.heatmap-table tbody tr').count(),4);
  const groupCell=page.locator('.heatmap-cell[data-phenomenon-group="form"]:not([disabled])').first();await groupCell.click();await linked();assert.equal(parseState(new URL(page.url()).hash).phenomenonGroup,'form');
  await page.locator('[data-action="reset"]').click();await page.selectOption('#heat-view','legacy');await linked();
  const counts=await page.locator('.heatmap-table tbody tr[data-phenomenon="temporal_relation"] .heatmap-cell').allTextContents();assert.equal(counts.map(Number).reduce((a,b)=>a+b,0),9);
  await page.selectOption('#heat-view','detail');await linked();const detail=await page.locator('.heatmap-table tbody tr[data-phenomenon="temporal_relation"] .heatmap-cell').allTextContents();assert.equal(detail.map(Number).reduce((a,b)=>a+b,0),8);
  await page.selectOption('#phenomenon-group-filter','pragmatic');assert.ok(await page.locator('#issue-filter option[value="pragmatic_explicitness"]').count());await page.selectOption('#issue-filter','pragmatic_explicitness');await linked();assert.equal(await count(),1);
  await page.locator('.detail-button').click();assert.ok((await page.locator('#record-dialog').textContent()).includes('supplemental20'));assert.ok((await page.locator('#record-dialog').textContent()).includes('pragmatic_explicitness'));await page.keyboard.press('Escape');
  await page.reload();await page.waitForSelector('#results-count');await linked();assert.equal(await count(),1);await page.locator('[data-action="reset"]').click();assert.equal(await count(),500);
 });
 await test('Legacy/current group conflict: bilingual controls, all heatmap views and shared population agree',async()=>{
  for(const lang of ['en','zh']){
   await go(`#visualizations?group=content&phenomenonGroup=pragmatic&heatView=detail&lang=${lang}`);
   assert.equal(await count(),31);await linked();
   assert.equal(await page.locator('#heat-group').inputValue(),'pragmatic');
   assert.equal(await page.locator('#phenomenon-group-filter').inputValue(),'pragmatic');
   assert.equal(await page.locator('[data-remove="group"]').count(),0);
   for(const view of ['detail','overview','legacy']){
    await page.selectOption('#heat-view',view);await linked();
    const ids=await page.locator('.heatmap-table tbody tr').evaluateAll(es=>es.map(e=>e.dataset.phenomenon));
    assert.ok(ids.length>0);const defs=view==='overview'?data.meta.phenomenonGroups:view==='detail'?data.meta.phenomenonDefinitions:data.meta.tagDefinitions;
    for(const id of ids)assert.equal(view==='overview'?id:defs.find(d=>d.id===id).group,'pragmatic');
    assert.equal(await count(),31);assert.equal(await page.locator('#heat-group').inputValue(),'pragmatic');
   }
   await page.reload();await page.waitForSelector('#results-count');await linked();assert.equal(await count(),31);
   await go(`#visualizations?group=content&heatView=detail&lang=${lang}`);await linked();assert.equal(await count(),500);
   assert.equal(await page.locator('#heat-group').inputValue(),'content');assert.equal(await page.locator('[data-remove="group"]').count(),1);
   await page.selectOption('#heat-group','pragmatic');await linked();assert.equal(await count(),31);
   assert.equal(new URLSearchParams(new URL(page.url()).hash.split('?')[1]).get('group'),null);
   await page.selectOption('#heat-group','all');await linked();assert.equal(await count(),500);
   assert.equal(await page.locator('#heat-group').inputValue(),'all');
   const notes=await page.locator('#heatmap-section').innerText();
   for(const term of ['26','none','AI'])assert.ok(notes.includes(term));
   assert.ok(notes.includes(lang==='en'?'not that linguistic variation is absent':'不代表沒有語言變化'));
   await page.selectOption('#heat-view','legacy');const reportNote=await page.locator('.taxonomy-note').innerText();
   assert.ok(reportNote.includes('9')&&reportNote.includes('13'));
  }
 });
 await test('All bilingual pages use institution-neutral research branding',async()=>{for(const lang of ['en','zh'])for(const route of ['home','explore','visualizations','codebook','report','about']){await go(`#${route}?lang=${lang}`);assert.doesNotMatch(await page.locator('body').innerText(),/CUHK|香港中文大學|Final Project|Master’s|官方 Brief|課程|课程|期末|Translation Technologies in the Age of AI/i);}});
 await test('Rendered production evidence screenshots; research downloads return HTTP 200',async()=>{await page.setViewportSize({width:1440,height:1000});await go('#visualizations');await page.screenshot({path:path.join(out,'analysis-1440.png'),fullPage:true});const screenshotStyle=await page.addStyleTag({content:'#site-header,.analysis-jump,.skip-link{visibility:hidden!important}'});await page.locator('#sankey-section').screenshot({path:path.join(out,'sankey-1440.png')});await page.locator('#heatmap-section').screenshot({path:path.join(out,'heatmap-1440.png')});await screenshotStyle.evaluate(e=>e.remove());for(const target of ['data/trilingual_500_annotated.csv','research/codebook_v0.2_final_candidate.md','research/website_display_mapping.md','research/final_annotation_validation.json'])assert.equal((await page.request.get(base+target)).status(),200);});
 await test('No uncaught JavaScript errors or HTTP 4xx/5xx responses',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(failedRequests,[]);});
} catch(e){console.error(e);process.exitCode=1;}finally{await fs.writeFile('reports/website_qa_results.json',JSON.stringify({testedAt:new Date().toISOString(),base,browserVersion:browser.version(),browser:'Installed Google Chrome via Playwright; isolated headless context',checks,errors,failedRequests,limitations:['Automated checks and selected screenshot inspection are not a formal WCAG audit.','Public GitHub Pages deployment was not performed or verified.']},null,2)+'\n');await browser.close();}
