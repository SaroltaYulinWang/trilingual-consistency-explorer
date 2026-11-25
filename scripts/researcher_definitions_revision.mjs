/** Additive, reversible researcher-authorized definition revision. Original approval hashes stay intact. */
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {verifyAcademicZhRevision} from './academic_zh_revision.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export async function verifyDefinitionsRevision(root=process.cwd()){
 const academicZh=await verifyAcademicZhRevision(root);
 const m=JSON.parse(await fs.readFile(path.join(root,'config/researcher_definitions_revision.json'),'utf8'));
 assert.equal(m.revision_id,'researcher-authored-definitions-2026-11-24');assert.equal(m.recorded_date,'2026-11-24');
 const source=await fs.readFile(path.join(root,m.source));assert.equal(sha(source),m.source_sha256);
 const parts=[...source.toString().matchAll(/^## \d+\. (.+)\n\n([\s\S]*?)(?=\n## |$)/gm)].map(x=>({id:x[1],en:x[2].trim()}));
 assert.deepEqual(parts,m.definitions.map(({id,en})=>({id,en})));assert.equal(parts.length,5);
 assert.deepEqual(Object.keys(m.files).sort(),['web/content.js','reports/codebook_v0.2_publication.md','reports/codebook_v0.2_public_summary.md','reports/codebook_revision_log_v0.2.md'].sort());
 const aiRevision=await verifyAiDeclarationRevision(root);
 const prior=JSON.parse(await fs.readFile(path.join(root,'config/public_release.json'),'utf8'));
 for(const [name,item] of Object.entries(m.files)){
  assert.equal(item.previous_sha256,prior.approved_research_sha256[name],name+' original approval hash');
  const rawText=academicZh.predecessors[name]??await fs.readFile(path.join(root,name),'utf8');const text=name==='web/content.js'?restoreAiV1(rawText,aiRevision):rawText;assert.equal(sha(text),item.current_sha256,name+' authorized current hash');
  let reversed=text;for(const {before,after} of [...item.changes].reverse()){assert.ok(after.length);assert.equal(reversed.split(after).length-1,1,name+' unique exact change');reversed=reversed.replace(after,before);}assert.equal(sha(reversed),item.previous_sha256,name+' exact predecessor reconstruction');
  if(name==='web/content.js'){
   assert.equal(item.changes.length,5);for(const [i,c]of item.changes.entries()){assert.match(c.before,/^    definition: bi\(/);assert.match(c.after,/^    definition: bi\(/);const jsquote=s=>"'"+s.replaceAll('\\','\\\\').replaceAll("'","\\'")+"'";assert.equal(c.after,`    definition: bi(${jsquote(m.definitions[i].en)}, ${jsquote(m.definitions[i].zh)}),`);}
  }else if(name.endsWith('publication.md')){assert.equal(item.changes.length,5);for(const [i,c]of item.changes.entries()){assert.match(c.before,/^\*\*Definition:\*\* /);assert.equal(c.after,'**Definition:** '+parts[i].en);}}
  else if(name.endsWith('public_summary.md')){assert.equal(item.changes.length,5);for(const [i,c]of item.changes.entries()){const d=m.definitions[i];assert.ok(c.before.startsWith('| '+d.id+' | '));assert.equal(c.after,`| ${d.id} | ${d.en} | ${d.zh} |`);}}
  else {assert.equal(item.changes.length,1);assert.equal(item.changes[0].before,'');assert.match(item.changes[0].after,/^\n## Researcher-authored definitions — 24 November 2026/);}
 }
 return {...m,effectiveCurrentHashes:{'web/content.js':academicZh.effectiveCurrentHashes['web/content.js']}};
}
// Earlier stage checks evaluate their original approved state only after the exact later delta passes.
export async function predecessorBytes(name,bytes,root=process.cwd()){
 const m=await verifyDefinitionsRevision(root);const entry=m.files[name];if(!entry)return bytes;
 let s=bytes.toString();if(name==='web/content.js'){const zh=await verifyAcademicZhRevision(root);assert.equal(sha(s),zh.effectiveCurrentHashes[name]);s=restoreAiV1(zh.predecessors[name],await verifyAiDeclarationRevision(root));}assert.equal(sha(s),entry.current_sha256,name);for(const c of [...entry.changes].reverse())s=s.replace(c.after,c.before);assert.equal(sha(s),entry.previous_sha256);return Buffer.from(s);
}
export async function predecessorCategories(categories,root=process.cwd()){
 const m=await verifyDefinitionsRevision(root),copy=structuredClone(categories);
 for(const [i,c]of m.files['web/content.js'].changes.entries()){
  const values=c.before.match(/^    definition: bi\('((?:\\.|[^'])*)', '((?:\\.|[^'])*)'\),$/);assert.ok(values);
  const unescape=s=>s.replace(/\\(['\\])/g,'$1');copy[i].definition={en:unescape(values[1]),zh:unescape(values[2])};
 }
 return copy;
}

function restoreAiV1(text,m){
 assert.equal(sha(text),m.current_content_sha256,'AI v2 authorized content hash');
 for(const c of [...m.changes].reverse()){assert.equal(text.split(c.after).length-1,1);text=text.replace(c.after,c.before);}
 assert.equal(sha(text),m.previous_content_sha256,'Exact AI v1 predecessor hash');return text;
}
export async function verifyAiDeclarationRevision(root=process.cwd()){
 const record=JSON.parse(await fs.readFile(path.join(root,'config/researcher_definitions_revision.json'),'utf8')).disclosure_update;
 assert.equal(record.revision_id,'researcher-authorized-ai-disclosure-v2-2026-11-24');
 const m={...record,previous_content_sha256:record.previous_sha256,current_content_sha256:record.current_sha256};
 assert.equal(m.changes.length,4);
 assert.deepEqual(m.changes.map(c=>c.language),['en','en','zh','zh']);
 for(const [i,c]of m.changes.entries()){const prefix=i%2===0?'ChatGPT ':'Codex ';assert.ok(c.before.startsWith(prefix)&&c.after.startsWith(prefix));assert.ok(!c.before.includes('\n')&&!c.after.includes('\n'));}
 const source=await fs.readFile(path.join(root,m.source));assert.equal(sha(source),m.source_sha256);
 const current=(await verifyAcademicZhRevision(root)).predecessors['web/content.js'];const before=restoreAiV1(current,m);
 const definitions=JSON.parse(await fs.readFile(path.join(root,'config/researcher_definitions_revision.json'),'utf8'));assert.equal(m.previous_content_sha256,definitions.files['web/content.js'].current_sha256);
 const parse=t=>JSON.parse(t.match(/export const aiDeclaration = ([\s\S]*?);\s*\nexport const examplePrompts/)[1]);
 const afterDecl=parse(current),beforeDecl=parse(before);
 const sections=[...source.toString().matchAll(/^\*\*(.+)\*\*\s*\n([\s\S]*?)(?=^\*\*|$(?![\s\S]))/gm)].map((x,i)=>({id:['tools','verification','prompts','learning'][i],title:x[1],paragraphs:x[2].trim().split(/\n\n/)}));
 assert.equal(sections.length,4);assert.deepEqual(afterDecl.en,sections,'Exact authoritative AI v2 source');
 for(const lang of ['en','zh'])for(let i=0;i<4;i++){
  assert.equal(afterDecl[lang][i].title,beforeDecl[lang][i].title);assert.equal(afterDecl[lang][i].paragraphs.length,beforeDecl[lang][i].paragraphs.length);
  for(let j=0;j<afterDecl[lang][i].paragraphs.length;j++)if(i!==0||j!==0)assert.equal(afterDecl[lang][i].paragraphs[j],beforeDecl[lang][i].paragraphs[j]);
 }
 return m;
}
export async function predecessorAiDeclaration(declaration,root=process.cwd()){
 const m=await verifyAiDeclarationRevision(root),copy=structuredClone(declaration);
 for(const c of m.changes)copy[c.language][0].paragraphs[0]=copy[c.language][0].paragraphs[0].replace(c.after,c.before);
 return copy;
}
