import {verifyApprovedPublicInputs} from './verify_public_release.mjs';
import { cp, mkdir, rm, writeFile, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const approval=await verifyApprovedPublicInputs(root);
await rm(path.join(root, 'dist'), { recursive: true, force: true });
await mkdir(path.join(root, 'dist'), { recursive: true });
await cp(path.join(root, 'web'), path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/.nojekyll'), '');
await mkdir(path.join(root, 'dist/research'), { recursive: true });
for (const name of ['codebook_v0.2_final_candidate.md', 'codebook_revision_log_v0.2.md', 'codebook_v0.2_public_summary.md', 'final_dataset_summary_zh.md', 'final_annotation_validation.json', 'website_display_mapping.md']) {
  await cp(path.join(root, 'reports', name === 'codebook_v0.2_final_candidate.md' ? 'codebook_v0.2_publication.md' : name), path.join(root, 'dist/research', name));
}
for (const [source, name] of [['data/metadata/source_manifest.json','source_manifest.json'], ['data/metadata/supplemental_20_sampling_manifest.json','supplemental_20_sampling_manifest.json'], ['config/annotation_prompt.md','annotation_prompt.md']]) {
  await cp(path.join(root, source), path.join(root, 'dist/research', name));
}
// The approved public summary links back to the stable public full-Codebook URL.
const summaryPath=path.join(root,'dist/research/codebook_v0.2_public_summary.md');
await writeFile(summaryPath,(await readFile(summaryPath,'utf8')).replaceAll('(codebook_v0.2_publication.md)','(codebook_v0.2_final_candidate.md)'));
// Public document copies use neutral research terminology; archival originals remain intact.
for (const name of ['final_dataset_summary_zh.md', 'website_display_mapping.md', 'final_annotation_validation.json']) {
  const filename = path.join(root, 'dist/research', name);
  const text = (await readFile(filename, 'utf8')).replaceAll('课程要求字段', '研究必需字段').replaceAll('course fields', 'corpus fields').replaceAll('course-brief fields', 'corpus fields').replaceAll('required_course_fields', 'required_fields');
  await writeFile(filename, text);
}
// Keep archival approvals intact, but distinguish historical pending entries in public copies.
// Approval status is provided by the hash-bound, public-safe projection verified before output.
if (approval.codebook_status === 'APPROVED') {
  for (const name of ['codebook_v0.2_final_candidate.md', 'codebook_revision_log_v0.2.md']) {
    const filename = path.join(root, 'dist/research', name);
    const body = await readFile(filename, 'utf8');
    await writeFile(filename, '> Current status: the framework, D1–D5 and protocol were approved by the sole researcher. Earlier PENDING/CONDITIONAL entries below are preserved development history, superseded by the later approval records. No external editorial approval or independent linguistic validation is claimed.\n\n' + body);
  }
}
const size = (await stat(path.join(root, 'dist/data/corpus.json'))).size;
console.log(`Static production site built in dist/; derived corpus ${(size/1024).toFixed(0)} KB. Relative assets support repository subpaths.`);
