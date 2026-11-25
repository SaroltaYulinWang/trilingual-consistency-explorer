/** Exact, reversible Task16A UI-only revision; preserves original approval/freeze hashes. */
import fs from'node:fs/promises';import path from'node:path';import{pathToFileURL}from'node:url';import crypto from'node:crypto';import assert from'node:assert/strict';
import {verifyAcademicZhRevision} from './academic_zh_revision.mjs';
import {verifyFinalResearchIntegration} from './final_research_integration.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export async function verifyUxCopyRevision(root=process.cwd()){
 const m=JSON.parse(await fs.readFile(path.join(root,'config/ux_copy_revision_2026-11-24.json'),'utf8'));
 assert.equal(m.revision_id,'researcher-approved-ux-copy-2026-11-24');assert.equal(m.changes.length,32);
 const lqa=await verifyUiLqaRevision(root);
 let app=lqa.predecessors['web/app.js'];assert.equal(sha(app),m.current_app_sha256);
 const keys=['subtitle','hero','exploreTitle','exploreLead','visualTitle','visualLead','origin','allOrigins','sankeyTitle','heatTitle','kwicTitle','term','kwicPlaceholder','bookTitle','aboutTitle','read'];
 for(const lang of['en','zh'])assert.deepEqual(m.changes.filter(c=>c.language===lang).map(c=>c.key),keys);
 for(const c of[...m.changes].reverse()){
  for(const value of[c.before,c.after])assert.ok(value.startsWith(c.key+":'")&&value.endsWith("'")&&!value.includes('\n'));
  const start=app.indexOf(' '+c.language+': {'),end=c.language==='en'?app.indexOf('\n zh: {',start):app.indexOf('\n};',start),block=app.slice(start,end);
  assert.equal(block.split(c.after).length-1,1,c.language+'/'+c.key);app=app.slice(0,start)+block.replace(c.after,c.before)+app.slice(end);
 }
 assert.equal(sha(app),m.previous_app_sha256,'All bytes outside approved keyed UX strings unchanged');
 const integration=await verifyFinalResearchIntegration(root);
 const c=await import('data:text/javascript;base64,'+Buffer.from(integration.predecessors['web/content.js']).toString('base64'));
 const enCopy=app.split(' en: {')[1].split('\n zh: {')[0],labels=Object.fromEntries([...enCopy.matchAll(/(\w+):'((?:\\.|[^'])*)'/g)].map(x=>[x[1],x[2].replaceAll("\\'","'")]));
 const englishOnly=v=>Array.isArray(v)?v.map(englishOnly):v&&typeof v==='object'?(Object.hasOwn(v,'en')&&Object.hasOwn(v,'zh')?englishOnly(v.en):Object.fromEntries(Object.entries(v).map(([k,x])=>[k,englishOnly(x)]))):v;
 const academic={learning_report:c.learningSections.map(s=>({id:s.id,title:s.title.en,paragraphs:s.paragraphs.en,subsections:(s.subsections||[]).map(x=>({id:x.id,title:x.title.en,paragraphs:x.paragraphs.en}))})),codebook:c.categories.map(x=>({id:x.id,label:x.label.en,definition:x.definition.en,theory:x.theory.en,rule:x.rule.en,positive:{id:x.positive.id,explanation:x.positive.explanation.en},negative:{id:x.negative.id,explanation:x.negative.explanation.en},boundary:{id:x.boundary.id,explanation:x.boundary.explanation.en}})),decision_sequence:[1,2,3,4,5].map(i=>({id:'D'+i,text:labels['d'+i]})),references:englishOnly(c.references),ai_use_declaration_v2:c.aiDeclaration.en,method_notes:c.methodNotes.en};
 const hashes={};for(const [key,value]of Object.entries(academic)){hashes[key]=sha(JSON.stringify(value));assert.equal(hashes[key],m.academic_component_hashes[key].sha256,key+' frozen academic content');}
 return {predecessor:app,academic_hashes:hashes,revision:m,ui_lqa_predecessors:lqa.predecessors};
}

/** Later Task17 layer: exact UI-only text substitutions; no original approval hash changes. */
export async function verifyUiLqaRevision(root=process.cwd()){
 const academicZh=await verifyAcademicZhRevision(root);
 const m=JSON.parse(await fs.readFile(path.join(root,'config/ui_lqa_revision_2026-11-24.json'),'utf8'));
 assert.equal(m.revision_id,'approved-ui-lqa-2026-11-24');assert.deepEqual(Object.keys(m.files),['web/app.js','web/charts.js']);
 const predecessors={};
 for(const [name,entry]of Object.entries(m.files)){
  let text=academicZh.predecessors[name]??await fs.readFile(path.join(root,name),'utf8');assert.equal(sha(text),entry.current_sha256,name);
  for(const c of [...entry.changes].reverse()){
   assert.ok(c.after.length);assert.equal(text.split(c.after).length-1,1,name+' unique authorized UI replacement');
   if(name==='web/app.js'){
    const allowed=c.language==='en'?['issues']:['heatNote','issues','minimum','provider','display','direct','directNote','license','about','scopeBody','sankeyCaption','aiCaution','methodologicalNote'];assert.ok(allowed.includes(c.key));
    assert.ok(c.before.startsWith(c.key+":'")&&c.after.startsWith(c.key+":'")&&!c.after.includes('\n'));
    const start=text.indexOf(' '+c.language+': {'),end=c.language==='en'?text.indexOf('\n zh: {',start):text.indexOf('\n};',start);const block=text.slice(start,end);assert.ok(block.includes(c.after));
   }
   text=text.replace(c.after,c.before);
  }
  assert.equal(sha(text),entry.previous_sha256,name+' exact preceding approved version');predecessors[name]=text;
 }
 assert.equal(m.files['web/app.js'].changes.length,14);assert.equal(m.files['web/charts.js'].changes.length,8);
 return{predecessors,revision:m};
}
