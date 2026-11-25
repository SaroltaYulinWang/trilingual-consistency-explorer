/** Reversible final report/disclosure integration; prior approvals are retained. */
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export async function verifyFinalResearchIntegration(root=process.cwd()) {
 const revision=JSON.parse(await fs.readFile(path.join(root,'config/final_research_integration_2026-11-25.json'),'utf8'));
 assert.equal(revision.revision_id,'final-research-integration-2026-11-25');
 assert.deepEqual(Object.keys(revision.files),['web/content.js','web/app.js']);
 assert.deepEqual(revision.protected_facts.matrix,[[4,0,0,1,1],[3,0,0,1,2],[0,0,0,1,5],[4,0,0,0,2],[3,0,1,1,1]]);
 const predecessors={},currentHashes={};
 for(const [name,entry]of Object.entries(revision.files)) {
  let text=await fs.readFile(path.join(root,name),'utf8');assert.equal(sha(text),entry.current_sha256,name+' final integration');
  if(name==='web/content.js')assert.deepEqual(entry.changes.map(c=>c.component),['learningSections','aiDeclaration']);
  for(const c of [...entry.changes].reverse()) {
   assert.equal(text.split(c.after).length-1,1,name+' unique integration block');text=text.replace(c.after,c.before);
  }
  assert.equal(sha(text),entry.previous_sha256,name+' exact preceding approval');
  predecessors[name]=text;currentHashes[name]=entry.current_sha256;
 }
 return{revision,predecessors,currentHashes};
}
