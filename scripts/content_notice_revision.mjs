/** Reversible display-only authorization; never alters a historical approval record. */
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export async function verifyContentNoticeRevision(root=process.cwd()) {
 const m=JSON.parse(await fs.readFile(path.join(root,'config/content_notice_revision_2026-11-27.json'),'utf8'));
 const policy=JSON.parse(await fs.readFile(path.join(root,'config/content_notice_policy_2026-11-27.json'),'utf8'));
 assert.equal(m.revision_id,'approved-content-notices-2026-11-27');
 assert.deepEqual(policy.records,{'TCE-0206':['sexual_health'],'TCE-0257':['sexual_reference'],'TCE-0106':['blunt_language'],'TCE-0455':['religion_and_war']});
 assert.deepEqual(policy.types,{sexual_health:{en:'Sexual health',zh:'性健康相關內容'},sexual_reference:{en:'Sexual reference',zh:'性相關表達'},blunt_language:{en:'Blunt language',zh:'較粗率的言語'},religion_and_war:{en:'Religion and war',zh:'宗教與戰爭相關內容'}});
 assert.deepEqual(Object.keys(m.files).sort(),['web/app.js','web/styles.css','scripts/build_website_data.py','web/data/corpus.json'].sort());
 for(const [name,h]of Object.entries(m.inputs))assert.equal(sha(await fs.readFile(path.join(root,name))),h,name+' authorized notice input');
 const predecessors={},currentHashes={};
 for(const [name,item]of Object.entries(m.files)) {
  let text=await fs.readFile(path.join(root,name),'utf8');currentHashes[name]=sha(text);assert.equal(currentHashes[name],item.current_sha256,name+' approved notice layer');
  if(name==='web/data/corpus.json') {
   const data=JSON.parse(text);assert.equal(data.records.length,500);
   for(const r of data.records) {
    assert.deepEqual(r.contentNotice,(policy.records[r.id]||[]).map(type=>({type,label:policy.types[type]})),r.id+' publication notice policy');
    r.contentNotice=m.previous_notices[r.id]||[];
   }
   assert.equal(data.meta.contentNoticeConvention,m.current_convention);data.meta.contentNoticeConvention=m.previous_convention;
   text=JSON.stringify(data)+'\n';
  } else {
   for(const c of [...item.changes].reverse()){assert.ok(c.after.length);assert.equal(text.split(c.after).length-1,1,name+' unique authorized replacement');text=text.replace(c.after,c.before);}
  }
  assert.equal(sha(text),item.previous_sha256,name+' exact preceding publication bytes');predecessors[name]=text;
 }
 assert.equal(m.files['web/data/corpus.json'].previous_sha256,JSON.parse(await fs.readFile(path.join(root,'config/public_release.json'),'utf8')).approved_research_sha256['web/data/corpus.json']);
 return {revision:m,policy,predecessors,currentHashes};
}
