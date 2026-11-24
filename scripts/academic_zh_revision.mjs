/** Exact reversible Task18 translation layer; earlier approval records stay immutable. */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
/** Later UI-only label approval: reconstruct Task19 v1 without changing its records. */
export async function verifyR19LabelRevision(root=process.cwd()) {
 const revision=JSON.parse(await fs.readFile(path.join(root,'config/r19_01_label_revision_2026-11-24.json'),'utf8'));
 assert.equal(revision.revision_id,'approved-r19-01-language-label-2026-11-24');
 assert.equal(revision.file,'web/app.js');
 assert.deepEqual(revision.changes,[
  {language:'en',key:'fullCodebook',before:"fullCodebook:'Read full research codebook'",after:"fullCodebook:'Read full research codebook (English)'"},
  {language:'zh',key:'fullCodebook',before:"fullCodebook:'閱讀完整研究代碼本'",after:"fullCodebook:'閱讀完整研究代碼本（英文）'"}
 ]);
 let text=await fs.readFile(path.join(root,revision.file),'utf8');
 assert.equal(sha(text),revision.current_sha256,'R19-01 current app');
 for(const c of [...revision.changes].reverse()) {
  const start=text.indexOf(' '+c.language+': {');
  const end=c.language==='en'?text.indexOf('\n zh: {',start):text.indexOf('\n};',start);
  const block=text.slice(start,end);
  assert.equal(block.split(c.after).length-1,1,c.language+' exact label');
  text=text.slice(0,start)+block.replace(c.after,c.before)+text.slice(end);
 }
 assert.equal(sha(text),revision.previous_sha256,'R19-01 exact predecessor app');
 return {revision,predecessor:text};
}
export async function verifyAcademicZhRevision(root=process.cwd()) {
 const labelRevision=await verifyR19LabelRevision(root);
 const revision=JSON.parse(await fs.readFile(path.join(root,'config/academic_zh_lqa_revision_2026-11-24.json'),'utf8'));
 assert.equal(revision.revision_id,'approved-academic-zh-lqa-2026-11-24');
 assert.deepEqual(Object.keys(revision.files),['web/content.js','web/app.js']);
 const predecessors={},currentHashes={},items=[];
 for(const [name,entry] of Object.entries(revision.files)) {
  let text=name==='web/app.js'?labelRevision.predecessor:await fs.readFile(path.join(root,name),'utf8');
  assert.equal(sha(text),entry.current_sha256,name+' authorized Chinese revision');
  assert.equal(entry.changes.length,name==='web/content.js'?7:1);
  for(const change of [...entry.changes].reverse()) {
   assert.equal(change.language,'zh');items.push(change.item);
   assert.ok(change.after.length&&!change.after.includes('\n'));
   assert.equal(text.split(change.after).length-1,1,change.key+' unique current context');
   text=text.replace(change.after,change.before);
  }
  assert.equal(sha(text),entry.previous_sha256,name+' exact approved predecessor');
  predecessors[name]=text;currentHashes[name]=entry.current_sha256;
 }
 assert.deepEqual(items.sort(),['A1','A2','A2','A3','A4','A5','A5','A6']);
 return {revision,predecessors,currentHashes};
}
