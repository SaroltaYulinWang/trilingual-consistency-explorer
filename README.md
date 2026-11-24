# When Translations Disagree

A bilingual English / Traditional Chinese research explorer for 500 authentic English–Chinese–Hungarian triples. The original annotated corpus remains read-only: **50 human-reviewed records, 450 AI-only annotations**. English is a reference pivot, not necessarily the historical original; a Tatoeba community link does not guarantee equivalence.

## Start Here / Assessment Essentials

1. [Live Website](https://saroltayulinwang.github.io/trilingual-consistency-explorer/)
2. [Learning Report](https://saroltayulinwang.github.io/trilingual-consistency-explorer/#report)
3. [Codebook](https://saroltayulinwang.github.io/trilingual-consistency-explorer/#codebook)
4. [Dataset — 500 annotated records (CSV)](https://github.com/SaroltaYulinWang/trilingual-consistency-explorer/blob/main/data/processed/trilingual_500_annotated.csv)
5. [AI Use Declaration](https://saroltayulinwang.github.io/trilingual-consistency-explorer/#about)

## Build and run

Node22+ and Python3.9+; no production packages, API keys or annotation provider required.

```sh
npm run check:public
npm run test:public
npm run build
npm run preview
```

Equivalent `node --run ...` commands work without npm. Preview defaults to http://127.0.0.1:4173/ . For a repository subpath:

```sh
node scripts/serve_website.mjs --dir dist --port 4173 --base /trilingual-consistency-explorer/
```

Open http://127.0.0.1:4173/trilingual-consistency-explorer/ . Do not open index.html as a file. Routes and shared analysis use the URL hash. English is default; Traditional Chinese switching preserves analytical state. Rebuild after edits; preview is not a file watcher.

## Integrity and public source

This is an allowlisted public-source export, not the private research workspace. It excludes workbooks, internal approval evidence, personal notes, model-run artifacts and private audit archives. `config/public_release.json` projects only the saved approved framework status, record counts and public research-file hashes. It is not independent linguistic validation, a signature or authorization to publish new annotations.

The source lock detects extra/missing/changed source files. The included .gitattributes disables automatic line-ending conversion so approved CSV/source bytes retain their hashes across checkouts. The public integrity suite has four tests covering approved hashes, 500 unique records, 50/450 flags, category counts, original source IDs/URLs, taxonomy/schema, five preserved overlays and text-preserving language markup. Source CSV, derived corpus and approved public research documents are hash-bound. Build scripts never run annotation. Original private/history research gates are run separately in the local research workspace before this export; they are not falsely claimed to run here.

```sh
node scripts/verify_public_release.mjs --source-lock
```

Deliberate source changes require a reviewed lock update; changes to approved research bytes require an approved release, not removal of the gates. `npm test` and `npm run check` are aliases for the public suites in this export. The complete local research workspace has additional private-history tests that are intentionally not distributed.

## Optional browser regressions

Serve the repository subpath first. Install Playwright/browser tooling separately (not a production dependency), then run `npm run test:browser`. Set `PLAYWRIGHT_MODULE`, `CHROME_PATH`, and `WEBSITE_URL` for the local test environment where supported. Some test scripts default to the original macOS Chrome path; adapt it or provide CHROME_PATH. Browser tests write evidence under reports and should be run in a review copy so the sealed source inventory is retained. Their underlying source record and UI expectations remain public and inspectable.

## GitHub Pages preparation

The workflow verifies the source lock, public checks/tests and build, then uploads **dist/**. Configure the eventual repository for GitHub Actions only after publication is authorized. The retained main-branch push trigger can deploy when a future approved push is made. No GitHub account/settings/public deployment has been verified by preparing this source.

Do not publish a complete private research directory or use ignore rules as a substitute for history review. Ignore rules do not remove previously tracked files or past commits. Review the exact public inventory before the initial push; no private approval JSON is needed for this build.

Deployment performance checks: verify real `Content-Encoding`, caching/cold reuse, initial JSON transfer/download time and mobile search/filter/KWIC/dialog responsiveness. Local uncompressed throttle measurements are synthetic, not field Core Web Vitals. No data-loading architecture change has been introduced.

## Data and attribution

Sentence texts are by Tatoeba contributors, from official exports retrieved 22 November 2026 UTC, under [CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/). Original EN/ZH/HU text, scripts, accents, sentence IDs and saved source links are retained. See the published Codebook, revision history, display mapping, final validation and source/sampling manifests in the build's research/ directory. These resources distinguish exploratory AI-only annotations from preserved human reviews; Potential Accuracy Issue is not a confirmed error count.
