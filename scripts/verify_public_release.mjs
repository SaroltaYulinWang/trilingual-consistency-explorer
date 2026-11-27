import {verifyUxCopyRevision} from './verify_ux_copy_revision.mjs';
import {verifyDefinitionsRevision} from './researcher_definitions_revision.mjs';
import {verifyContentNoticeRevision} from './content_notice_revision.mjs';
/** Public checks bind approved research bytes; no private approval evidence is read. */
import {fileURLToPath} from 'node:url';import fs from 'node:fs/promises';import crypto from 'node:crypto';import assert from 'node:assert/strict';import path from 'node:path';
export const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export async function verifyApprovedPublicInputs(root=process.cwd()){
 const m=JSON.parse(await fs.readFile(path.join(root,'config/public_release.json'),'utf8'));
 assert.equal(m.codebook_status,'APPROVED');assert.equal(m.codebook_version,'v0.2-approved');
 assert.deepEqual(m.record_counts,{total:500,human_reviewed:50,ai_only:450});
 await verifyUxCopyRevision(root);
 const revision=await verifyDefinitionsRevision(root);
 const display=await verifyContentNoticeRevision(root);
 for(const [name,h] of Object.entries(m.approved_research_sha256))assert.equal(sha(await fs.readFile(path.join(root,name))),display.currentHashes[name]||revision.effectiveCurrentHashes?.[name]||revision.files[name]?.current_sha256||h,name);
 return m;
}
export async function verifyPublicSourceLock(root=process.cwd()){
 const lock=JSON.parse(await fs.readFile(path.join(root,'public-source.lock.json'),'utf8'));
 for(const [name,h] of Object.entries(lock.files))assert.equal(sha(await fs.readFile(path.join(root,name))),h,name);
 const actual=[];async function walk(dir){for(const e of await fs.readdir(path.join(root,dir),{withFileTypes:true})){const name=path.posix.join(dir,e.name);if(['.git','dist','node_modules'].includes(name.split('/')[0]))continue;if(e.isDirectory())await walk(name);else actual.push(name);}}
 await walk('');assert.deepEqual(actual.filter(n=>n!=='public-source.lock.json').sort(),Object.keys(lock.files).sort(),'Unexpected/missing public source file');return lock;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){await verifyApprovedPublicInputs();if(process.argv.includes('--source-lock'))await verifyPublicSourceLock();console.log('PASS public approved-input integrity'+(process.argv.includes('--source-lock')?' and strict source inventory':''));}
