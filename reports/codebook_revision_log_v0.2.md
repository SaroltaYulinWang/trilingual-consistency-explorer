# Codebook v0.2 — Approval Revision Log

**Date:** 22 November 2026 (Asia/Shanghai)  
**Status: PENDING — final candidate, not finalized or researcher-approved.**

## 1. Preserved history

The v0.1 codebook, original revision log, v0.2 draft, draft revision log, pilot audit, annotation protocol, archived drafts, and latest human-reviewed workbook remain unchanged. The latest fixed review is `Pilot30_Manual_Review_v0.1_Aligned-2.xlsx`, Pilot Review rows 4–33. The researcher reports human review is completed and AI Linguistic Review was intentionally removed. No deleted sheet is reconstructed. Existing yes/yes flags are source values; they do not approve the present candidate or new AI recommendations.

The new final candidate consolidates, rather than erases, these stages. The five advisor recommendations below are submitted for approval exactly as requested. The instruction to prepare them is not an adoption of their labels.

The latest workbook SHA-256 is recorded below. Compared with the preceding saved pilot snapshot, `Pilot Review!E31` (TCE-0263 EN–ZH) changed from potential divergence to aligned. The final candidate reproduces that current value, while the original snapshot and draft remain unchanged. The new exact 30-record snapshot is `reviews/final_candidate_pilot_snapshot_2026-11-22.json`. No researcher decision has been inferred from that pair-status change.

## 2. Advisor recommendations and traceability

| Record / source | Original reviewed judgment | Previous v0.2 audit advice | Latest advisor proposal | Reason / unresolved evidence | Researcher status |
| --- | --- | --- | --- | --- | --- |
| TCE-0469, Pilot Review G13/K13 | Acceptable Variation | Core Meaning Preserved | Core Meaning Preserved | Routine reflexive realization is insufficient for substantive variation without a separate meaning/communication contrast. | PENDING |
| TCE-0481, G21/K21 | Acceptable Variation | Indeterminate | Indeterminate | Establish the conventional imperative use of the Hungarian infinitive and whether the proposed register difference is substantive. | PENDING |
| TCE-0399, G27/K27 | Acceptable Variation | Indeterminate | Indeterminate | Distinguish conventional self-reliance/remaining-alone compatibility from a hypothetical shared scene. | PENDING |
| TCE-0111, G29/K29 | Acceptable Variation | Indeterminate | Acceptable Variation | Latest advice favors conventional busyness-to-availability pragmatic/perspective reformulation; no actual appointment context is claimed. This updates advice, not the original human judgment. | PENDING |
| TCE-0263, G31/H31/K31 | Potential Accuracy Issue, typo / form issue | Indeterminate | Indeterminate + suspected_typo | Orthographic observation is separate; current note argues recoverability without an independent content consequence. | PENDING |

TCE-0263 has an explicit alternative: **Core Meaning Preserved + suspected_typo** if the researcher formally accepts a justified typo-recovery rule and approves the application to this record. Both the policy and record decision must be recorded; neither is preselected. The observed text “請滿點說。” remains unchanged. The original judgment and note are retained even if a later overlay is approved.

## 3. Rule consolidation

| Previous rule / gap | Final-candidate proposal | Pilot basis / location | Expected benefit | Approval |
| --- | --- | --- | --- | --- |
| v0.1 treated an idiom as a possible variation illustration; v0.2 sought a substantive threshold. | Keep ordinary idioms, expected grammar, generic number and routine reflexivity within Core unless a concrete non-routine contrast is evidenced. | TCE-0241, TCE-0217, TCE-0265, TCE-0195; v0.2 draft §§2–3 and pilot K10/K25/K28/K33. | Avoids formal-difference inflation. | PENDING |
| Ambiguity could be confused with unequal explicitness. | Require two English-supported readings actually selected differently by the targets. | TCE-0147 versus TCE-0484, K4/K24. | Separates demonstrated divergence from uncertainty. | PENDING |
| A difference or preferred wording could be called an accuracy issue. | Require an exact trigger and a possible unsupported content consequence after considering benign alternatives. | TCE-0030 versus TCE-0241, K26/K10. | Distinguishes suspicion from preference and confirmed error. | PENDING |
| Possible context could be treated as attested discourse. | Conventional pragmatic evidence may justify a shift without inventing a scene; unresolved material questions remain explicit. | TCE-0111 versus TCE-0399, K29/K27; latest advice distinguishes their treatment. | Avoids both fictional context and automatic overuse of Indeterminate. | PENDING |
| Recovery policy was unresolved. | Separate spelling and meaning; explicitly decide human recovery policy, record application, and keep AI-only recovery-dependent cases unresolved pending human assessment. | TCE-0263, G31/H31/K31. | Prevents silent correction and false human verification. | PENDING |
| Pair fields and main category needed executable consistency checks. | Freeze D1–D5, exact bilingual evidence fields, immutable pilot carry-forward, approved overlays and fail-closed pipeline gates. | Candidate §6; final-candidate protocol; scripts/annotation_pipeline.py. | Makes decisions and provenance mechanically auditable without claiming semantic validation. | PENDING |

These are expected methodological benefits, not measured improvements in inter-annotator reliability.

## 4. Researcher decisions and execution boundary

Use `researcher_approval_checklist.md` for human decisions and `config/researcher_approval.json` for the executable approval record. All statuses begin PENDING; dates, reviewer identity, chosen categories and rationales are intentionally blank. Approve or revise the codebook, decide all five record outcomes, accept/reject the recovery policy, select the model/run settings and separately authorize inference. A reviewer may decline advice and retain a source label; no recommendation is forced. All approved outcomes are overlays, never rewrites of the workbook.

Only offline quality checks and gate-failure tests are performed in this stage. The original 500-row CSV is immutable; the pipeline will carry 30 pilot records and request new AI judgments only for the remaining 470 after approval. It does not create human_checked=yes. No website, classification, agreement statistic or new manual-review claim is produced.

## 5. Input fingerprints

- `reports/codebook_v0.2_draft.md`: `d63cb61b3c88b61a24675c6b698a8b75c66d7e98230a43587914db1b4c192008`
- `reports/pilot30_quality_audit.md`: `07bc254ec5386f5ecff843b7f3c12658fe9cf270c073cb770ce4212f2d3fd164`
- `reports/annotation_protocol.md`: `8e69304dce9988226700dfdedeb811e91d9ce42cc274ee867b40db11619f3708`
- `reports/codebook_revision_log.md`: `867e5635b7c82d2c68875dc8273e54235a54ab3a44956985a7d7070bd3463dcd`
- `reports/codebook_revision_log_v0.2_draft.md`: `a68815b38e01212cfff580e6234e3b0bcafce5f20f9bb1dfdea1351eba165f04`
- `Pilot30_Manual_Review_v0.1_Aligned-2.xlsx`: `31c545c9835a1f321c2711f07ce822bec5cafa96e671e697d1b065194503ca19`
- `data/processed/pilot_30.csv`: `729bdd183dc677edc1f4e2ff9bc8ea9c0966ae17447318d113eec87abc07a083`
- `data/processed/trilingual_500_candidates.csv`: `9bf80181b92dc8685edab27f9fa227a560495084768e0a63d87fcf6260990d3d`

Candidate/protocol/prompt/schema/pipeline hashes are recorded together in the pending approval configuration and checked before any inference preparation, runner invocation or assembly. Changing an approved input invalidates the gate. The full QC report is `codebook_v0.2_quality_control.json`; it concerns document completeness, original-text identity, tree/schema consistency and input preservation, not semantic truth.

## 6. Later decision entry format

Append actual reviewer identity/date, prior value, chosen value, exact record/rule evidence, rationale, policy applicability, affected annotation version and approval evidence. Keep original human judgments, successive AI proposals and adjudication separate. Do not pre-fill an approval date or imply a discussion occurred before it has.

## 7. Offline checks completed for this candidate

The document QC passed: exactly five category sections with all six required components; 14 full authentic pilot triples verified character for character; D1–D5 routes matched; current workbook judgments preserved in a new exact source snapshot. The input preflight passed with 500 corpus rows, 30 preserved pilot rows and 470 remaining IDs. All 11 offline validator/gate tests passed, including rejection of paraphrased evidence, attempted AI human-verification flags, inconsistent categories, and unapproved typo-recovery use. Preparation, runner invocation and assembly all stopped under the actual PENDING approval configuration. No external inference runner was invoked and no classification requests were generated. These checks do not constitute semantic validation or researcher approval.

## 8. Researcher record decisions — 22 November 2026

The researcher supplied the five outcomes and reasons in the project chat. TCE-0469=Core, TCE-0481=Indeterminate, TCE-0399=Indeterminate and TCE-0111=Acceptable Variation are recorded as APPROVED record-level decisions. These do not approve the codebook as a whole or authorize inference.

For TCE-0263, the researcher writes 如你确认这是可可靠恢复的错字 and 倾向于采用 Core Meaning Preserved + suspected_typo. This is recorded as a CONDITIONAL choice, not a general typo-recovery approval. The AI assessment supports the case-specific recovery as a defensible hypothesis; it does not prove authorial intent. The original human judgment and every earlier advisor proposal remain preserved. See TCE-0263_typo_recovery_assessment.md and reviews/researcher_decisions_v0.2_2026-11-22.json.

The updated checklist and configuration carry the four adopted decisions and one conditional preference. Earlier all-PENDING versions are preserved in reports/history/before_researcher_decisions_2026-11-22/. The original workbook, pilot CSV and 500-row CSV are not modified; no new human_checked value is created. General policy, codebook approval and classification authorization remain PENDING/not given. Recorded timestamps describe when the assistant logged the message, not an invented time of researcher signature.

## 9. Explicit researcher approval and correction to the review population

The researcher explicitly approved the framework, D1–D5, protocol, all five final record decisions and the justified recovery policy. The four previously adopted outcomes remain; TCE-0263 is now APPROVED as Core Meaning Preserved + suspected_typo, original 請滿點說。 unchanged, proposed recovery 請慢點說 stored separately. This supersedes its prior conditional status without deleting that history. Codebook and classification authorization are now recorded as approved, including dry-run-first execution.

The supplied supplemental workbook contains 20 completed human reviews from the exact documented seed-2040 draw, disjoint from Pilot 30. The researcher confirms no separate sample CSV exists. supplemental_20_random_sample.csv is therefore regenerated from the original corpus using the workbook's documented algorithm, with a manifest explicitly identifying reconstruction of the sample file, not reconstruction of sentence text. The integration population is 50 preserved human reviews and 450 AI-only records, not 30/470. Original human category/notes/URLs/yes flags remain intact; only approved pilot overlays affect effective categories. Blank reviewer/date/version cells in the supplemental workbook remain blank, not invented. Numeric Excel IDs are normalized only in derived ID comparison using exact decimal integers, preserving raw .0/scientific-notation cell values in the snapshot.

## Execution checkpoint: provider quota blocked the last 10 records

The real Codex CLI run completed and validated 440 AI-only records after a successful 20-record dry run. One batch required a genuine schema-field retry. The last batch (TCE-0491 through TCE-0500) returned a native usage-limit error and no annotation output. All 50 original human reviews and five approved overlays remain preserved. No complete final 500-row annotation file is claimed. See annotation_run_blocker.json, annotation_checkpoint_validation.json and annotation_run_status_zh.md. A resume helper is prepared to retry only the 10 missing records after the provider is available; it has not been executed under the active limit.

## Quota resolved; annotation completed and independently validated

After the researcher reported quota reset, the resume helper made a real gpt-6.1-sol CLI call for only the 10 previously missing IDs (TCE-0491–TCE-0500). All 450 actual AI outputs are now present. Assembly and independent validation passed for 500 unique records: 50 preserved human reviews and 450 AI-only records. All original sentence texts/IDs/source fields and source URLs were preserved; raw official sentence exports and both 500-edge English link sets were rechecked. Five approved pilot decisions are separate overlays, including original 請滿點說。 and proposed recovery 請慢點說. No new AI human_checked=yes flag was created. Final files: data/processed/trilingual_500_annotated.csv; reports/final_annotation_validation.json; reports/final_dataset_summary_zh.md. Initial quota failure and checkpoint are preserved as history, not erased. No website or annotation-agreement statistic was produced.

## Researcher source-verification confirmation — recorded 23 November 2026

The sole researcher explicitly states that manual verification of the 50 randomly sampled records identified **0 source-data extraction or linkage errors**. No corrections to the original corpus data were required or applied. Linguistic issues and classification inconsistencies were identified and documented separately and are excluded from the source-data error count. No count of linguistic issues or classification inconsistencies was supplied, so none is inferred.

This resolves earlier uncertainty about the manual source-data correction count. Earlier pending statements remain historical records; the report's current bilingual Method and AI declaration now reflect this explicit confirmation. It is a result reported by the researcher for the 50-record sample, not an independently repeated audit or proof that the remaining 450 are source-error-free. No texts, IDs, links, categories, overlays or human flags are changed. Evidence: `reviews/source_data_verification_confirmation_2026-11-23.json`. The recording date is not represented as the date on which manual verification took place.

## Researcher-authored definitions — 24 November 2026

Following review of the earlier AI-drafted definitions and associated review feedback, the sole researcher personally reformulated all five category definitions in her own words and explicitly approved the attached English wording. The authoritative source is `Codebook_Researcher_Authored_Definitions_Approved_EN.md` (SHA-256: 70f3b084c0fc1da3261388a2de4d3f153d550d014b81ca82d509dcc23158f898). This records the present researcher statement and integration date; it is not a backdated claim of earlier authorship, nor a claim that AI assistance or review feedback was absent.

Only the five English definitions and corresponding Traditional Chinese definitions were synchronized in the current website, publication edition and public summary. D1–D5, theoretical references, operational thresholds, positive/negative/boundary examples, the five approved Pilot decisions, all 500 classifications, the 50/450 review split and research statistics are unchanged. The Traditional Chinese synchronization was AI-assisted; the English wording is preserved exactly as supplied. No new annotation, semantic revalidation or independent human review is claimed.

The original AI-drafted and approval-bound historical documents, original approval configuration and original public approval hashes remain unchanged. A separate versioned definition-revision record binds this authorized wording update to its predecessor hashes; earlier judgments and approvals remain traceable. The original AI Use Declaration is unchanged in this task.
