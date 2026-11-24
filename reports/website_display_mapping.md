# Website Display Layer: Data Contract and Audit Rules

The website derives its public display data from the read-only file `data/processed/trilingual_500_annotated.csv`. It never reruns annotation, edits a category, translates a sentence, changes human-review status, or infers a source link. Rebuild using `python3 scripts/build_website_data.py`; verify with `python3 -m unittest discover -s tests -p 'test_website_data.py' -v`.

## Fixed population and source integrity

The build checks the source SHA-256 against `reports/final_annotation_validation.json`, 500 distinct IDs, category counts 380/65/32/16/7, review split 50 human / 450 AI-only, and origins pilot30=30, supplemental20=20, ai_only=450. The 13 original course-brief fields remain exact strings in every JSON record. Short aliases `id`, `en`, `zh`, `hu` duplicate their original values only for UI access. `urls` preserves the exact saved Tatoeba URLs.

The downloadable `web/data/trilingual_500_annotated.csv` is a byte-identical copy, including all original detailed annotation columns. The public JSON omits the duplicated opaque annotation_detail blob but exposes its meaningful evidence, provenance, source-review location, original category, and researcher overlay explicitly. The source CSV remains available for full inspection. Original analysis notes may contain Simplified Chinese or English; they are quoted evidence and are not silently translated with the Traditional Chinese UI.

## Pairwise vocabularies: no silent harmonization

Every pair object has `raw`, `status`, `vocabulary`, `evidence`, `selectedReading`, and `uncertainty`. The original Pilot 30 vocabulary is retained separately:

| Original Pilot raw label | Website status | Interpretation |
| --- | --- | --- |
| aligned | legacy_aligned | Original pilot label only; not asserted equivalent to v0.2 supported. |
| potential divergence | legacy_potential_divergence | Original broad concern label; not the triple category Divergent Interpretations. |
| uncertain | legacy_uncertain | Original pilot uncertainty; not automatically rewritten as modern unresolved. |
| Any other legacy value | legacy_unmapped | Raw label retained; requires interpretation rather than guessed equivalence. |

Pilot evidence exists as a combined worksheet note. It is saved in `combinedEvidence` on each pair with an explicit note that no separate pair evidence has been inferred. The UI should show this once as a shared original note. Supplemental human records retain their actual separate K/L evidence and M triple rationale; the latter is shared context, not a newly inferred pair judgment. Modern supplemental and AI values supported, supported_with_shift, suspected_content_shift and unresolved are preserved exactly with vocabulary v0.2. Missing selected-reading fields in human records remain empty rather than being fabricated.

## Linguistic phenomenon display aliases

Issue names are a display vocabulary, not new annotations or error judgments. Each `issueAudit` item preserves the raw tag and exact source location; AI items additionally retain original quoted span, language, explanation and semantic impact. Researcher-approved overlay tags are separate source items. No tags are derived by reading sentence content, a category name or a model's unstructured prose.

| Raw observation | Canonical display bin | Why / limitation |
| --- | --- | --- |
| aspect | temporal_relation | Broad display grouping of documented time/aspect observation. |
| register | register_shift | Naming alias for the explicit register observation. |
| pragmatic_explicitness | pragmatic_shift | Broader pragmatic display group; raw narrower label retained. |
| ambiguity | ambiguity_unspecified | Does not infer whether ambiguity belongs to source or target. |
| omission / addition | possible_omission / possible_addition | Neutral possible-change display names; not confirmed-error findings. |
| typo / form issue | form_issue_unspecified | Retains broad legacy form observation; does not infer a particular correction. |
| other | other_unspecified | Does not invent the unspecified phenomenon. |
| none, blank, or empty AI issue list | not_documented | No issue tag documented; neither an error nor proof of absence of a phenomenon. |
| Existing controlled AI/display tag | Same tag | Preserved without reassignment. |
| Unrecognized raw tag | unmapped_tag | Raw text remains available for inspection. |

TCE-0263 retains its original form observation and the separate approved suspected_typo overlay. Its source Chinese text remains 請滿點說。; the separate `proposedRecovery` remains 請慢點說. Its approved main category is Core Meaning Preserved; its original human category remains visible. Orthography is not promoted to a semantic accuracy error.

## Heatmap counting convention

For each category × canonical tag cell, count **distinct record IDs**. A record with repeated occurrences of one tag contributes once to that cell. A record with multiple different tags may contribute to several rows, so row/cell sums are not a corpus denominator and may exceed the number of records. Distinct no-tag records remain in the explicit not_documented row. The display layer does not turn absence of a tag into a negative semantic judgment.

The UI's percentage mode should divide the distinct cell count by the number of currently filtered records in that category (not by a sum of issue occurrences); an empty category yields 0 rather than an undefined ratio. A minimum-frequency control should use the number of distinct currently filtered records with the row tag. All views must derive from the same filtered record set.

## JSON contract

`web/data/corpus.json` has `{records, meta}`. Every record contains the original course fields and:

- `id`, `en`, `zh`, `hu`, `origin`, `urls`;
- `pair.en_zh` and `pair.en_hu` as specified above;
- `issues` (unique canonical display tags), `issueAudit` (raw tag, canonical bin, provenance and available original issue detail);
- `originalHumanCategory`, `originalHumanNotes`, `researcherDecision`, `proposedRecovery`, `reviewSource`;
- `provenance` (`provider`, `model`, `responseId`, `codebookVersion`), `interpretation` (the actual saved AI rationale fields or null), and `uncertainty`.

`meta` includes record/review/category/origin counts, source CSV hash, tag aliases, observed `tagDefinitions` as an array of `{id,label:{en,zh},group}`, counting convention, vocabulary descriptions and download path. Tag groups are content, pragmatic, form and documentation. Tag labels are bilingual English/Traditional Chinese display text; corpus and evidence strings remain original.

## Separate content notices

`contentNotice` is a display-only array of `{type,language,trigger}`. It records exact matches from a curated, nonexhaustive lexical list: English sex and common fuck/shit/damn forms; Chinese 性交、操你、他妈／他媽; Hungarian szex and basz forms. TCE-0257 actually matches the sexual-reference triggers in all three languages. These notices do not alter primary categories, auxiliary linguistic issues, review status or source texts. They are not a complete sensitive-content classifier and do not infer political sensitivity. No record is excluded or hidden by default. The interface should offer a visible content notice without treating the flagged wording as a semantic error.

## Website refinement — 23 November 2026

KWIC now displays literal matching spans between left and right original-text contexts, including repeated occurrences. Each window reconstructs the full saved sentence without tokenization or translation. The other linked sentences are labeled as sentence-level context, not word alignments. Matches can occur within words, especially in Hungarian; they are not automatically treated as lexical or translation equivalents. Clicking a term opens Explore Corpus with the query and existing shared filters retained. Before a query, examples and a guide replace the former unfiltered sentence list.

Heatmap phenomenon rows are ordered by distinct-record frequency. The not_documented row remains visible subject to the same explicit group/frequency controls, but appears last with a neutral background and is excluded from the phenomenon color maximum. Numeric counts, percentage denominators, multi-tag counting and raw annotations remain unchanged.

## Occurrence-level concordance update — 23 November 2026

This supersedes the earlier always-visible trilingual KWIC row presentation. `concordanceHits` expands the currently filtered records into exact literal occurrences, each keyed by `record_id:language:original_start_offset`. Repeated occurrences are separate lines; an ID-only query may match a record while producing zero lexical hits. Displayed left+keyword+right reconstructs the exact unchanged sentence. Clicking a row or its evidence button opens the original triple, saved category and provenance; it does not create word alignments.

All keywords occupy one fixed column. Left sort compares NFC-normalized Unicode characters backwards from the closest nonspace character; right sort compares forwards, with locale-aware collation and deterministic ID/language/offset tie breaks. Displayed text is never normalized or reversed. No Chinese word segmentation, lemmatization, collocation detection or meaning grouping is claimed. The character-based limitation is explicit in both UI languages.

`lexSort`, `lexDir`, `lexPage`, `lexHit` are URL-serialized view controls;20-hit lexical pagination is independent of10-record grid pagination. All four views still use the same corpus query/category/review/origin/issue population. Lexical counts can exceed distinct-record counts; other charts continue counting distinct records. Selection survives reload and history, and keyboard focus returns to the selected evidence control. Mobile horizontal scroll is scoped to the concordance; keyword centering and record labels improve comparison without clipping page content.

The custom106-item stoplist remains an offline frequency-analysis policy, not a filter on KWIC searches or corpus records. The cloud was omitted after re-running the saved English-only experiment; frequencies are not evidence of semantic inconsistency.

## Display taxonomy v2 —23 November2026 (supersedes the default v1 presentation)

### Analysis sources versus original provenance

All user-facing analysis-source controls and charts use **Human-reviewed50** and **AI-only450**. Human-reviewed is the union of the30 original Pilot and20 Supplemental record IDs; its category counts are33 Core,11 Acceptable Variation,1 Divergent Interpretations,1 Potential Accuracy Issue and4 Indeterminate. The underlying `origin`, `reviewSource.review_group`, `human_checked`, and researcher overlays remain unchanged. Original batch names are shown in individual record details. Existing `origin=pilot30` / `origin=supplemental20` URL constraints still work and are labeled as original-batch chips; they are not silently reinterpreted as source groups.

### Two-level taxonomy and versioned compatibility

The default Heatmap is now a four-group overview: Content & interpretation; Pragmatics & perspective; Textual form; Documentation & unspecified notes. Global broad-group and specific-tag filters operate on the same selected records in Sankey, Heatmap, KWIC and the data grid. Group membership is the union of records with a documented child tag, never a sum of child counts. A record may belong to multiple groups. Documentation is a metadata/evidence status, not a linguistic-error class.

The **Detailed display labels** view has26 observed display bins, including linguistic observations, documentation states and unspecified notes—not26 distinct linguistic phenomena. It reverses five lossy presentation aggregations without changing any raw annotation:

| Saved raw label | Previous report bin | Specific v2 display | Justification |
| --- | --- | --- | --- |
| aspect | temporal_relation | aspect | Narrower saved dimension; not equated with all temporal observations. |
| pragmatic_explicitness | pragmatic_shift | pragmatic_explicitness | Specific dimension retained rather than renamed as generic shift. |
| register | register_shift | register | Legacy label does not itself state shift scope; preserved pending review. |
| addition | possible_addition | addition_observation | Neutral legacy observation; uncertainty/scope not assumed identical to v0.2 possible_addition. |
| omission | possible_omission | omission_observation | Same conservative distinction from possible_omission. |

Naming clarifications ambiguity→ambiguity_unspecified, other→other_unspecified, typo/form→form_issue_unspecified preserve lack of specificity, not new linguistic judgments. Controlled raw tags remain unchanged. Human none / blank and AI empty-list documentation share not_documented only at display level, with their raw states and origins preserved. Unrecognized labels remain unmapped_tag rather than being interpreted from sentence content.

Derived records now additionally include `annotationGroup`, `phenomena`, `phenomenonGroups`, and each `issueAudit` item's `displayTag`. Existing `issues` and `tagDefinitions` retain the21-bin v1 scheme, so historical Learning Report counts remain reproducible. Metadata carries `phenomenonDefinitions`, four `phenomenonGroups` with definitions, `preciseTagAliases` and schemaVersion2.0. Raw labels, original saved paths, quotes and evidence remain present.

Choose **Report mapping (v1)** to reproduce the existing Learning Report: time/aspect9 = temporal_relation8 + aspect1; pragmatic13 = pragmatic_shift12 + pragmatic_explicitness1; register11 = register_shift8 + register3; addition9 = possible_addition8 + legacy observation1; omission9 = possible_omission8 + legacy observation1. Lexical specification21 and not_documented372 remain identical in all detailed versions. These are explicit broader aggregates, not assertions of exact synonymy. No Learning Report text, conclusions or primary classifications were rewritten.

Global URL keys `phenomenonGroup` and `phenomenon` carry v2 selection, while existing `issue` filters retain their v1 semantics. `heatView=overview|detail|legacy` records the displayed taxonomy. The earlier `group` URL key remains a legacy heatmap-row display constraint, explicitly shown as a removable chip; it is not a hidden global filter. Metric, frequency controls and all search/sort/selection URLs remain available.

Filtered CSV export retains `display_issue_tags` as the v1 compatibility column and additionally provides `display_specific_phenomena`, `display_phenomenon_groups`, `analysis_source_group`, and `raw_phenomenon_audit`. The full source CSV download remains byte-identical.

### Verified counts

- Corpus500; original origins30/20/450; analysis sources50/450; primary categories380/65/32/16/7 unchanged.
- Legacy21 and specific26 vocabularies both have513 record/tag memberships. Memberships are not distinct corpus records.
- Broad group unions: Content84, Pragmatics31, Form9, Documentation379. Their total503 includes records in more than one broad group; it is not a second corpus size.
- Content child counts sum93 but the union is84; Form child counts sum10 but the union is9. This explicitly demonstrates why children cannot simply be added.
- Raw-label frequencies, before/after counts, mappings and provenance are in `reports/taxonomy_audit/`; linguistic caveats are in `reports/phenomenon_linguistic_audit.md`. Uncertain semantic recoding remains for researcher review.


## Independent-review refinement —23 November2026

Current `phenomenonGroup` takes precedence over legacy `group`; parsing a URL with a valid current group clears the old row-only constraint. Thus `#visualizations?group=content&phenomenonGroup=pragmatic&heatView=detail` selects31 pragmatic records and pragmatic rows, with both current controls set to pragmatic. Serialization removes the superseded parameter. Older URLs with only `group` retain row-only filtering and their original selected population; the Heatmap control and removable legacy chip show that constraint. Choosing any current group, including All groups, clears it.

The26 detailed bins are display labels, not necessarily26 distinct linguistic phenomena. The four broad groups include documentation/unspecified states, not four translation-error classes. No issue tag documented means no recorded auxiliary tag; it is not evidence that variation is absent. Human none and AI empty lists retain separate raw provenance and are not assumed to represent equivalent annotation processes.

The Heatmap's bilingual notes direct readers to Report mapping(v1), with filters reset, for the Learning Report's time/aspect9 and pragmatic-shift13 counts. Detailed labels retain temporal_relation8/aspect1 and pragmatic_shift12/pragmatic_explicitness1 separately. No report results or prose, counts, mappings, categories or raw observations were changed.
