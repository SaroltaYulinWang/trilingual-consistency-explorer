#!/usr/bin/env python3
"""Build the read-only, auditable website display layer from the final corpus."""
from collections import Counter
import csv
import hashlib
import json
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'data/processed/trilingual_500_annotated.csv'
DESTINATION = ROOT / 'web/data'
REQUIRED_FIELDS = ('record_id', 'source_text', 'target_text', 'hungarian_text', 'eng_id',
                   'cmn_id', 'hun_id', 'source', 'category', 'human_checked', 'unit',
                   'direct_cmn_hun_link', 'review_notes')
CATEGORY_COUNTS = {'Core Meaning Preserved': 380, 'Acceptable Variation': 65,
                   'Potential Accuracy Issue': 32, 'Indeterminate': 16,
                   'Divergent Interpretations': 7}
MODERN_PAIR_LABELS = {'supported', 'supported_with_shift', 'suspected_content_shift', 'unresolved'}
LEGACY_PAIR_LABELS = {'aligned': 'legacy_aligned',
                      'potential divergence': 'legacy_potential_divergence',
                      'uncertain': 'legacy_uncertain'}

# Display aliases only: these do not change annotations, certainty or source evidence.
TAG_ALIASES = {
    'none': 'not_documented', '': 'not_documented',
    'aspect': 'temporal_relation', 'register': 'register_shift',
    'pragmatic_explicitness': 'pragmatic_shift',
    'ambiguity': 'ambiguity_unspecified', 'other': 'other_unspecified',
    'omission': 'possible_omission', 'addition': 'possible_addition',
    'typo / form issue': 'form_issue_unspecified',
}
TAG_DEFINITIONS = {
    'lexical_specification': ('Lexical specification', '詞義具體化', 'content'),
    'lexical_generalization': ('Lexical generalization', '詞義概括化', 'content'),
    'reading_selection': ('Reading selection', '讀法選擇', 'content'),
    'possible_addition': ('Possible addition', '可能增添', 'content'),
    'possible_omission': ('Possible omission', '可能省略', 'content'),
    'participant_or_role': ('Participant or role', '參與者或角色', 'content'),
    'negation': ('Negation', '否定', 'content'),
    'quantity_or_scope': ('Quantity or scope', '數量或範圍', 'content'),
    'modality': ('Modality', '情態', 'content'),
    'temporal_relation': ('Time or aspect', '時間或體貌', 'content'),
    'source_ambiguity': ('Source ambiguity', '參照句歧義', 'content'),
    'ambiguity_unspecified': ('Ambiguity, scope unspecified', '歧義（範圍未註明）', 'content'),
    'pragmatic_shift': ('Pragmatic shift', '語用變化', 'pragmatic'),
    'register_shift': ('Register shift', '語域變化', 'pragmatic'),
    'perspective_shift': ('Perspective shift', '視角變化', 'pragmatic'),
    'idiomatic_equivalence': ('Idiomatic equivalence', '慣用表達等值', 'pragmatic'),
    'speech_act_question': ('Speech-act question', '言語行為疑問', 'pragmatic'),
    'suspected_typo': ('Suspected typo', '疑似錯字', 'form'),
    'spelling': ('Spelling', '拼寫', 'form'),
    'punctuation': ('Punctuation', '標點', 'form'),
    'grammar_or_form': ('Grammar or form', '語法或形式', 'form'),
    'recoverability_question': ('Recoverability question', '可恢復性疑問', 'form'),
    'form_issue_unspecified': ('Typo/form observation, legacy', '錯字／形式觀察（舊標籤）', 'form'),
    'language_expertise_needed': ('Language expertise needed', '需要語言專業覆核', 'documentation'),
    'missing_context': ('Missing context', '缺少語境', 'documentation'),
    'not_documented': ('No issue tag documented', '未記錄現象標籤', 'documentation'),
    'other_unspecified': ('Other, not specified', '其他（未具體說明）', 'documentation'),
    'unmapped_tag': ('Unmapped original tag', '未對應的原始標籤', 'documentation'),
}

# Precise vocabulary: historical wider bins remain separately reproducible in `issues`.
PRECISE_TAG_ALIASES = {key: value for key, value in TAG_ALIASES.items()
                       if key not in {'aspect', 'pragmatic_explicitness', 'register', 'addition', 'omission'}}
PRECISE_TAG_ALIASES.update({'addition':'addition_observation','omission':'omission_observation'})
TAG_DEFINITIONS.update({
    'register': ('Register observation (legacy)', '語域觀察（原標籤）', 'pragmatic'),
    'addition_observation': ('Addition observation (legacy)', '增添觀察（原標籤）', 'content'),
    'omission_observation': ('Omission observation (legacy)', '省略觀察（原標籤）', 'content'),
    'aspect': ('Aspect observation (legacy)', '體貌觀察（原標籤）', 'content'),
    'pragmatic_explicitness': ('Pragmatic explicitness', '語用明示程度', 'pragmatic'),
})
PHENOMENON_GROUPS = [
    {'id':'content','label':{'en':'Content & interpretation','zh':'內容與判讀'},'definition':{'en':'Documented lexical, semantic, temporal or reading observations; not automatic errors.','zh':'已記錄的詞彙、語義、時間或讀法觀察，不自動視為錯誤。'}},
    {'id':'pragmatic','label':{'en':'Pragmatics & perspective','zh':'語用與視角'},'definition':{'en':'Documented pragmatic, register, perspective or speech-act observations.','zh':'已記錄的語用、語域、視角或言語行為觀察。'}},
    {'id':'form','label':{'en':'Textual form','zh':'文字形式'},'definition':{'en':'Documented orthographic or grammatical form observations; no inferred semantic error.','zh':'已記錄的字形或語法形式觀察，不推斷語義錯誤。'}},
    {'id':'documentation','label':{'en':'Documentation & unspecified notes','zh':'記錄狀態與未詳述事項'},'definition':{'en':'Absent tags, unspecified observations or evidence/expertise limitations; not a linguistic-error category.','zh':'標籤缺漏、未詳述觀察或證據／專業限制，並非語言錯誤類別。'}},
]

# Explicit researcher-approved publication guidance, separate from research annotations.
CONTENT_NOTICE_POLICY = json.loads((ROOT / 'config/content_notice_policy_2026-11-27.json').read_text())
assert set(CONTENT_NOTICE_POLICY['records']) == {'TCE-0206', 'TCE-0257', 'TCE-0106', 'TCE-0455'}


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def canonical_tag(raw):
    """An explicit vocabulary alias, never a content-based inference."""
    value = raw.strip()
    if value in TAG_ALIASES:
        return TAG_ALIASES[value]
    return value if value in TAG_DEFINITIONS else 'unmapped_tag'


def issue_display(row, detail):
    audit = []
    ai = detail.get('ai_annotation')
    if ai:
        original = ai['annotation']['auxiliary_issues']
        for index, issue in enumerate(original):
            audit.append({'raw': issue['tag'], 'canonical': canonical_tag(issue['tag']),
                          'source': f'ai_annotation.auxiliary_issues[{index}]',
                          'language': issue['language'], 'quote': issue['quote'],
                          'explanation': issue['explanation'], 'semanticImpact': issue['semantic_impact']})
        if not original:
            audit.append({'raw': '[]', 'canonical': 'not_documented',
                          'source': 'ai_annotation.auxiliary_issues'})
    else:
        human = detail['original_human_review']
        raw = human['cells'].get('H', '')
        audit.append({'raw': raw, 'canonical': canonical_tag(raw),
                      'source': f"{human['source_file']} / {human['sheet']}!H{human['row']}"})
    overlay = detail.get('researcher_decision_overlay')
    if overlay:
        for index, raw in enumerate(overlay.get('auxiliary_tags', [])):
            audit.append({'raw': raw, 'canonical': canonical_tag(raw),
                          'source': f'researcher_decision_overlay.auxiliary_tags[{index}]'})
    issues = sorted({entry['canonical'] for entry in audit})
    # An explicit overlay tag does not erase an original generic form observation.
    # If new documented tags coexist with a raw "none", do not count a no-tag bin as well.
    if len(issues) > 1 and 'not_documented' in issues:
        issues.remove('not_documented')
    return issues or ['not_documented'], audit


def pair_display(row, detail, name):
    raw = row[f'{name}_alignment']
    ai = detail.get('ai_annotation')
    if ai:
        pair = ai['annotation'][name]
        assert raw == pair['status'] and raw in MODERN_PAIR_LABELS
        return {'raw': raw, 'status': raw, 'vocabulary': 'v0.2',
                'evidence': pair['evidence'], 'selectedReading': pair['selected_reading'],
                'uncertainty': pair['uncertainty']}
    human = detail['original_human_review']
    if human['review_group'] == 'pilot30':
        status = LEGACY_PAIR_LABELS.get(raw, 'legacy_unmapped')
        return {'raw': raw, 'status': status, 'vocabulary': 'legacy-pilot',
                'evidence': [], 'selectedReading': '', 'uncertainty': '',
                'combinedEvidence': human['cells'].get('K', ''),
                'note': 'The original pilot has a combined note, not separate pair evidence. No split is inferred.'}
    assert raw in MODERN_PAIR_LABELS
    cell = 'K' if name == 'en_zh' else 'L'
    return {'raw': raw, 'status': raw, 'vocabulary': 'v0.2',
            'evidence': human['cells'].get(cell, ''), 'selectedReading': '',
            'uncertainty': human['cells'].get('M', ''),
            'note': 'The supplemental triple rationale is retained as shared context, not relabeled as a new pair judgment.'}


def transform(row):
    detail = json.loads(row['annotation_detail'])
    record = {field: row[field] for field in REQUIRED_FIELDS}
    record.update(id=row['record_id'], en=row['source_text'], zh=row['target_text'],
                  hu=row['hungarian_text'], origin=row['annotation_origin'],
                  urls={'en': row['eng_source_url'], 'zh': row['cmn_source_url'], 'hu': row['hun_source_url']},
                  pair={name: pair_display(row, detail, name) for name in ('en_zh', 'en_hu')})
    record['issues'], record['issueAudit'] = issue_display(row, detail)
    precise = set()
    for entry in record['issueAudit']:
        raw = entry['raw'].strip()
        tag = 'not_documented' if raw == '[]' else PRECISE_TAG_ALIASES.get(raw, raw if raw in TAG_DEFINITIONS else 'unmapped_tag')
        entry['displayTag'] = tag
        precise.add(tag)
    if len(precise)>1: precise.discard('not_documented')
    record['phenomena'] = sorted(precise or {'not_documented'})
    record['phenomenonGroups'] = sorted({TAG_DEFINITIONS[tag][2] for tag in record['phenomena']})
    record['annotationGroup'] = 'human_reviewed' if row['human_checked']=='yes' else 'ai_only'
    record['originalHumanCategory'] = row['human_original_category'] or None
    record['researcherDecision'] = detail.get('researcher_decision_overlay')
    record['provenance'] = {'provider': row['model_provider'], 'model': row['model_name'],
                            'responseId': row['model_response_id'], 'codebookVersion': row['ai_codebook_version']}
    ai = detail.get('ai_annotation')
    record['uncertainty'] = ai['annotation']['material_uncertainty'] if ai else row['human_triple_rationale']
    record['proposedRecovery'] = row['proposed_recovery']
    record['originalHumanNotes'] = row['human_original_notes']
    record['contentNotice'] = [{'type': kind, 'label': CONTENT_NOTICE_POLICY['types'][kind]}
                               for kind in CONTENT_NOTICE_POLICY['records'].get(record['id'], [])]
    if ai:
        annotation = ai['annotation']
        record['interpretation'] = {key: annotation[key] for key in
                                   ('decision_rationale', 'content_concern', 'divergence_rationale',
                                    'variation_dimension', 'variation_rationale', 'recovery_used', 'recovery_rationale')}
        record['reviewSource'] = None
    else:
        original = detail['original_human_review']
        record['interpretation'] = None
        record['reviewSource'] = {key: original[key] for key in ('source_file', 'sheet', 'row', 'review_group')}
        record['reviewSource']['recordedSourceVerified'] = original['cells'].get('I', '')
        record['reviewSource']['recordedHumanChecked'] = original['cells'].get('J', '')
    return record


def build():
    before = sha256(SOURCE)
    validation = json.loads((ROOT / 'reports/final_annotation_validation.json').read_text())
    assert validation['status'] == 'passed' and before == validation['final_csv_sha256']
    with SOURCE.open(encoding='utf-8', newline='') as handle:
        rows = list(csv.DictReader(handle))
    records = [transform(row) for row in rows]
    assert len(records) == len({r['id'] for r in records}) == 500
    counts = dict(Counter(r['category'] for r in records))
    assert counts == CATEGORY_COUNTS == validation['category_counts']
    origins = dict(Counter(r['origin'] for r in records))
    assert origins == {'pilot30': 30, 'supplemental20': 20, 'ai_only': 450}
    assert Counter(r['human_checked'] for r in records) == {'yes': 50, 'no': 450}
    observed = {tag for r in records for tag in r['issues']}
    precise_observed = {tag for r in records for tag in r['phenomena']}
    tag_definitions = [{'id': key, 'label': {'en': value[0], 'zh': value[1]}, 'group': value[2]}
                       for key, value in TAG_DEFINITIONS.items() if key in observed]
    metadata = {'recordCount': 500, 'humanCount': 50, 'aiCount': 450,
                'categoryCounts': counts, 'originCounts': origins,
                'sourceCsvSha256': before, 'sourceCsv': 'data/processed/trilingual_500_annotated.csv',
                'sourceValidation': 'reports/final_annotation_validation.json',
                'displaySchemaVersion': '2.0', 'tagDefinitions': tag_definitions,
                'phenomenonDefinitions': [{'id': key, 'label':{'en':v[0] + (' (v0.2)' if key in {'temporal_relation','pragmatic_shift','register_shift'} else ''),'zh':v[1] + ('（v0.2）' if key in {'temporal_relation','pragmatic_shift','register_shift'} else '')},'group':v[2]} for key,v in TAG_DEFINITIONS.items() if key in precise_observed],
                'phenomenonGroups': PHENOMENON_GROUPS,
                'annotationGroups': {'human_reviewed':50,'ai_only':450},
                'preciseTagAliases': PRECISE_TAG_ALIASES,
                'issueCounting': 'Distinct record IDs per category and canonical display tag; each record counts once per tag, but can occur in several rows. No-tag records remain visible.',
                'pairwiseVocabularies': {'legacy-pilot': LEGACY_PAIR_LABELS,
                                        'v0.2': sorted(MODERN_PAIR_LABELS)},
                'tagAliases': TAG_ALIASES,
                'contentNoticeConvention': 'Researcher-approved record-level publication guidance only; not semantic categories, translation errors, judgments of harmful intent or exhaustive sensitivity screening. Original texts and CSV remain unchanged; no default exclusion.',
                'downloadCsv': 'data/trilingual_500_annotated.csv'}
    DESTINATION.mkdir(parents=True, exist_ok=True)
    (DESTINATION / 'corpus.json').write_text(json.dumps({'records': records, 'meta': metadata},
                                                      ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    shutil.copyfile(SOURCE, DESTINATION / 'trilingual_500_annotated.csv')
    assert sha256(SOURCE) == before == sha256(DESTINATION / 'trilingual_500_annotated.csv')
    print(f'Built {len(records)} records, {len(tag_definitions)} documented display-tag bins; source CSV unchanged.')
    print(f'corpus.json: {(DESTINATION / "corpus.json").stat().st_size:,} bytes')
    return records, metadata


if __name__ == '__main__':
    build()
