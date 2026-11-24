import fs from 'node:fs/promises';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';import {createRequire} from 'node:module';
import {filterRecords,parseState,sortRecords,sankeyCounts,concordanceHits,sortConcordance} from '../web/core.js';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');const root=new URL('../',import.meta.url),out=new URL('../reports/visualization_refinement/',import.meta.url);
const {records,meta}=JSON.parse(await fs.readFile(new URL('web/data/corpus.json',root),'utf8'));
const base=process.env.WEBSITE_URL||'http://127.0.0.1:4173/trilingual-consistency-explorer/';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});const page=await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});const cases=[],pathProbes=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
async function go(hash){await page.goto(base+hash);await page.waitForSelector('#results-count');}
async function check(){
 const state=parseState(new URL(page.url()).hash),rows=filterRecords(records,state);
 assert.equal(Number(await page.locator('#results-count strong').textContent()),rows.length);
 assert.deepEqual(await page.locator('[data-record-row]').evaluateAll(es=>es.map(e=>e.dataset.recordRow)),sortRecords(rows,state.sort,state.dir).slice(0,10).map(r=>r.id));
 const flows=sankeyCounts(rows,true),scale=rows.length?(310-(Math.max(new Set(flows.map(f=>f.origin)).size,new Set(rows.map(r=>r.category)).size)-1)*17)/rows.length:0;
 if(await page.locator('#sankey-section').count()){
  for(const flow of flows){const path=page.locator(`.sankey-link[data-review="${flow.origin==='human'?'yes':'no'}"][data-category="${flow.category}"]`);assert.ok(Math.abs(Number(await path.getAttribute('stroke-width'))-flow.count*scale)<.001);}
  for(const c of await page.locator('.heatmap-cell').evaluateAll(es=>es.map(e=>({tag:e.dataset.phenomenon||e.dataset.issue||e.dataset.phenomenonGroup,cat:e.dataset.category,text:e.textContent})))){
   const field=state.heatView==='overview'?'phenomenonGroups':state.heatView==='detail'?'phenomena':'issues',n=rows.filter(r=>r.category===c.cat&&r[field].includes(c.tag)).length,den=rows.filter(r=>r.category===c.cat).length;assert.equal(c.text,state.metric==='percent'?`${(den?n/den*100:0).toFixed(1)}%`:String(n));
  }
 }
 const hits=sortConcordance(concordanceHits(rows,state.q,state.kwicLang),state.lexSort,state.lexDir,state.kwicLang);
 assert.deepEqual(await page.locator('.concordance-hit').evaluateAll(es=>es.map(e=>e.dataset.hitKey)),hits.slice(0,20).map(h=>h.key));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));return {state,rows,hits};
}
async function shot(selector,name){const style=await page.addStyleTag({content:'#site-header,.analysis-jump,.skip-link{visibility:hidden!important}'});await page.locator(selector).screenshot({path:fileURLToPath(new URL(name,out))});await style.evaluate(e=>e.remove());}
try{
 for(const width of [1440,1024,768,375])for(const lang of ['en','zh']){
  await page.setViewportSize({width,height:1000});
  for(const method of ['mouse','keyboard'])for(const f of sankeyCounts(records,true)){
   await go(`#visualizations?lang=${lang}&heatView=detail`);const review=f.origin==='human'?'yes':'no',selector=width>900?'.flow-select-button':'.sankey-mobile .flow-button',button=page.locator(`${selector}[data-review="${review}"][data-category="${f.category}"]`);
   if(method==='mouse')await button.click();else{await button.focus();await page.keyboard.press('Enter');}
   const current=await check();assert.equal(current.rows.length,f.count);assert.equal(current.state.review,review);assert.equal(current.state.category,f.category);assert.ok(current.rows.every(r=>r.human_checked===review&&r.category===f.category));
   if(width===1440&&lang==='en'&&method==='mouse'){
    const downloadEvent=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const download=await downloadEvent,file=`flow-${f.origin}-${f.category.replaceAll(' ','_')}.csv`;await download.saveAs(fileURLToPath(new URL(file,out)));
    const csv=await fs.readFile(new URL(file,out),'utf8'),ids=[...csv.matchAll(/^"(TCE-\d{4})",/gm)].map(m=>m[1]);assert.deepEqual(ids,sortRecords(current.rows,'id','asc').map(r=>r.id));
   }
   cases.push({type:'exact flow control',width,lang,method,origin:f.origin,category:f.category,count:f.count,status:'PASS'});
  }
  await go(`#visualizations?lang=${lang}`);await check();await shot('#sankey-section',`sankey-default-${lang}-${width}.png`);
  for(const view of ['overview','detail','legacy']){
   await page.selectOption('#heat-view',view);const note=await page.locator('.heatmap-legend').innerText();assert.ok(note.includes(lang==='en'?(view==='overview'?'The Documentation group':'Only “No issue tag documented”'):(view==='overview'?'記錄狀態大類':'只有「未記錄現象標籤」')));
   for(const metric of ['count','percent']){await page.selectOption('#heat-metric',metric);await check();assert.equal(await page.locator('.heatmap-legend').getAttribute('data-scale-maximum'),metric==='percent'?'100':view==='overview'?'34':'18');}
  }
  await shot('#heatmap-section',`heatmap-percent-${lang}-${width}.png`);
  await page.selectOption('#heat-metric','count');await page.locator('#heat-min').fill('50');await page.locator('#heat-min').dispatchEvent('change');assert.equal(await page.locator('.heatmap-legend').getAttribute('data-scale-maximum'),'');await check();
  await page.locator('.filter-panel [data-action="reset"]').click();
  for(const scope of ['en','zh','hu','all']){await page.selectOption('#lexical-scope',scope);const terms=await page.locator('.term-chips [data-term]').evaluateAll(es=>es.map(e=>e.dataset.term));assert.deepEqual(terms,scope==='en'?['get','go','free']:scope==='zh'?['我']:scope==='hu'?['nem']:['get','go','free','我','nem']);}
  await page.selectOption('#lexical-scope','zh');await page.locator('.term-chips [data-term="我"]').click();let current=await check();assert.equal(current.state.route,'explore');assert.equal(current.state.kwicLang,'zh');assert.equal(current.rows.length,212);
  await go(`#visualizations?lang=${lang}&kwicLang=en&q=get&lexSort=right`);current=await check();assert.equal(current.rows.length,9);assert.equal(current.hits.length,9);assert.ok((await page.locator('#kwic-match-mode').innerText()).includes(lang==='en'?'literal substrings':'原文子字串'));assert.equal(await page.locator('.term-chips [data-term="我"]').count(),0);await shot('#kwic-section',`kwic-get-${lang}-${width}.png`);
  const url=page.url();await page.reload();await page.waitForSelector('#results-count');assert.equal((await check()).rows.length,9);assert.equal(page.url(),url);
  cases.push({type:'P2–P4 controls, scope, explanation and reload',width,lang,status:'PASS'});
  console.log('PASS source/category controls and clarity',width,lang);
 }
 // Repeat real mouse-at-curve and keyboard probes. Ribbons no longer pretend to be independently mouse-clickable.
 await page.setViewportSize({width:1440,height:1000});
 for(const f of sankeyCounts(records,true)){
  await go('#visualizations');const review=f.origin==='human'?'yes':'no',flow=page.locator(`path[data-review="${review}"][data-category="${f.category}"]`);await flow.scrollIntoViewIfNeeded();const point=await flow.evaluate(e=>{const p=e.getPointAtLength(e.getTotalLength()/2),s=new DOMPoint(p.x,p.y).matrixTransform(e.getScreenCTM());return {x:s.x,y:s.y,pointerEvents:getComputedStyle(e).pointerEvents};});assert.equal(point.pointerEvents,'none');await page.mouse.click(point.x,point.y);let r=await check();assert.equal(r.rows.length,500);assert.equal(r.state.review,'all');assert.equal(r.state.category,'');
  await flow.focus();await page.keyboard.press('Enter');r=await check();assert.equal(r.rows.length,f.count);assert.equal(r.state.review,review);assert.equal(r.state.category,f.category);
  pathProbes.push({origin:f.origin,category:f.category,mouse:'NO_SELECTION_BY_DESIGN_USE_VISIBLE_CONTROLS',keyboard_count:r.rows.length,status:'PASS'});
 }
 assert.deepEqual(errors,[]);
}finally{await fs.writeFile(new URL('browser_results.json',out),JSON.stringify({cases,pathProbes,errors,counts:{flow_control_cases:cases.filter(c=>c.type==='exact flow control').length,clarity_cases:cases.filter(c=>c.type!=='exact flow control').length,path_probes:pathProbes.length}},null,2)+'\n');await browser.close();}
