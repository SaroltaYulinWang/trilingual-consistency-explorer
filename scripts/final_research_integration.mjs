/** Reversible final report/disclosure integration; prior approvals are retained. */
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {verifyContentNoticeRevision} from './content_notice_revision.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export async function verifyFinalResearchIntegration(root=process.cwd()) {
 const display=await verifyContentNoticeRevision(root);
 const revision=JSON.parse(await fs.readFile(path.join(root,'config/final_research_integration_2026-11-25.json'),'utf8'));
 const amendment=JSON.parse(await fs.readFile(path.join(root,'config/editorial_amendment_2026-11-25.json'),'utf8'));
 assert.equal(amendment.revision_id,'approved-editorial-amendment-2026-11-25');
 assert.equal(amendment.status,'RESEARCHER_AUTHORIZED_EDITORIAL_AMENDMENT');
 assert.equal(amendment.file,'web/content.js');
 assert.equal(amendment.previous_sha256,revision.files[amendment.file].current_sha256);
 assert.deepEqual(amendment.changes.map(c=>[c.scope,c.language]),[['analysis','en'],['analysis','zh'],['limitations','en'],['limitations','zh'],['reflection','en'],['reflection','zh']]);
 assert.equal(revision.revision_id,'final-research-integration-2026-11-25');
 assert.deepEqual(Object.keys(revision.files),['web/content.js','web/app.js']);
 assert.deepEqual(revision.protected_facts.matrix,[[4,0,0,1,1],[3,0,0,1,2],[0,0,0,1,5],[4,0,0,0,2],[3,0,1,1,1]]);
 const predecessors={},currentHashes={};
 for(const [name,entry]of Object.entries(revision.files)) {
  let text=display.predecessors[name]??await fs.readFile(path.join(root,name),'utf8');const currentHash=display.currentHashes[name]??sha(text);
  if(name===amendment.file) {
   assert.equal(currentHash,amendment.current_sha256,name+' authorized editorial amendment');
   for(const c of [...amendment.changes].reverse()) {
    assert.ok(c.before!==c.after&&!c.before.includes('\n')&&!c.after.includes('\n'));
    assert.equal(text.split(c.after).length-1,1,name+' unique editorial line');text=text.replace(c.after,c.before);
   }
   assert.equal(sha(text),amendment.previous_sha256,name+' exact frozen predecessor');
  }
  assert.equal(sha(text),entry.current_sha256,name+' final integration');
  if(name==='web/content.js')assert.deepEqual(entry.changes.map(c=>c.component),['learningSections','aiDeclaration']);
  for(const c of [...entry.changes].reverse()) {
   assert.equal(text.split(c.after).length-1,1,name+' unique integration block');text=text.replace(c.after,c.before);
  }
  assert.equal(sha(text),entry.previous_sha256,name+' exact preceding approval');
  predecessors[name]=text;currentHashes[name]=currentHash;
 }
 return{revision,predecessors,currentHashes};
}
