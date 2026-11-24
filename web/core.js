/** Pure shared analytical state and data operations. No corpus text is mutated. */
export const CATEGORY_IDS = Object.freeze([
  'Core Meaning Preserved',
  'Acceptable Variation',
  'Divergent Interpretations',
  'Potential Accuracy Issue',
  'Indeterminate',
]);
export const ORIGIN_IDS = Object.freeze(['pilot30', 'supplemental20', 'ai_only']);
export const CATEGORY_COLORS = Object.freeze({
  'Core Meaning Preserved': '#237F80',
  'Acceptable Variation': '#688DB2',
  'Divergent Interpretations': '#876AA6',
  'Potential Accuracy Issue': '#AF654D',
  Indeterminate: '#8B826D',
});
const CATEGORY_LABELS = {
  en: CATEGORY_IDS,
  zh: ['核心意義保留', '可接受變化', '解釋分歧', '準確性疑點', '無法判定'],
};
const CATEGORY_SHORT = {
  en: ['Core meaning', 'Acceptable variation', 'Different readings', 'Accuracy concern', 'Indeterminate'],
  zh: ['核心意義保留', '可接受變化', '解釋分歧', '準確性疑點', '無法判定'],
};
const ORIGIN_LABELS = {
  en: ['Pilot human-reviewed', 'Supplemental human-reviewed', 'AI-only'],
  zh: ['先導人工複核', '補充人工複核', '僅 AI 標註'],
};

export function categoryLabel(category, lang = 'en', short = false) {
  const index = CATEGORY_IDS.indexOf(category);
  return index < 0 ? String(category) : (short ? CATEGORY_SHORT : CATEGORY_LABELS)[lang === 'zh' ? 'zh' : 'en'][index];
}
export function originLabel(origin, lang = 'en') {
  const index = ORIGIN_IDS.indexOf(origin);
  return index < 0 ? String(origin) : ORIGIN_LABELS[lang === 'zh' ? 'zh' : 'en'][index];
}
export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character]));
}
const lower = value => String(value ?? '').toLocaleLowerCase('en');
const idOf = record => String(record.id ?? record.record_id ?? '');
const textOf = (record, language) => String(record[language] ?? record[{en: 'source_text', zh: 'target_text', hu: 'hungarian_text'}[language]] ?? '');
export function issueIds(record) {
  const tags = Array.isArray(record.issues) ? [...new Set(record.issues.filter(Boolean))] : [];
  return tags.length ? tags : ['not_documented'];
}

export function filterRecords(records, state = {}) {
  const query = lower(state.q ?? '').trim();
  return records.filter(record => {
    if (state.category && record.category !== state.category) return false;
    if (state.review && state.review !== 'all' && record.human_checked !== state.review) return false;
    if (state.origin && (record.origin ?? record.annotation_origin) !== state.origin) return false;
    if (state.issue && !issueIds(record).includes(state.issue)) return false;
    if (state.phenomenon && !phenomenonIds(record).includes(state.phenomenon)) return false;
    if (state.phenomenonGroup && !groupIds(record).includes(state.phenomenonGroup)) return false;
    const languages = ['en', 'zh', 'hu'].includes(state.kwicLang) ? [state.kwicLang] : ['en', 'zh', 'hu'];
    return !query || [idOf(record), ...languages.map(language => textOf(record, language))].some(value => lower(value).includes(query));
  });
}

export const DEFAULT_STATE = Object.freeze({
  route: 'home', q: '', category: '', review: 'all', origin: '', issue: '',
  lang: 'en', sort: 'id', dir: 'asc', page: 1, record: '',
  metric: 'count', group: 'all', min: 1, kwicLang: 'all', lexSort: 'record', lexDir: 'asc', lexPage: 1, lexHit: '', phenomenon:'', phenomenonGroup:'', heatView:'overview',
});
const ROUTES = ['home', 'explore', 'visualizations', 'codebook', 'report', 'about'];
const SORTS = ['id', 'en', 'zh', 'hu', 'category', 'review'];
const GROUPS = ['all', 'content', 'pragmatic', 'form', 'documentation'];
function positiveInteger(value, fallback, maximum = 10000) {
  const integer = Number(value);
  return Number.isInteger(integer) && integer >= 1 ? Math.min(maximum, integer) : fallback;
}
function normalizeState(input = {}) {
  const route = input.route ?? input.view ?? DEFAULT_STATE.route;
  const phenomenonGroup = GROUPS.includes(input.phenomenonGroup) && input.phenomenonGroup !== 'all' ? input.phenomenonGroup : '';
  // Current shared selection supersedes the old row-only constraint. Old-only
  // bookmarks retain their original row filtering without changing population.
  const group = phenomenonGroup ? 'all' : GROUPS.includes(input.group) ? input.group : 'all';
  return {
    route: ROUTES.includes(route) ? route : 'home',
    q: String(input.q ?? ''),
    category: CATEGORY_IDS.includes(input.category) ? input.category : '',
    review: ['all', 'yes', 'no'].includes(input.review) ? input.review : 'all',
    origin: ORIGIN_IDS.includes(input.origin) ? input.origin : '',
    issue: String(input.issue ?? ''),
    phenomenon: String(input.phenomenon ?? ''),
    phenomenonGroup,
    heatView: ['detail','overview','legacy'].includes(input.heatView)?input.heatView:'overview',
    lang: input.lang === 'zh' ? 'zh' : 'en',
    sort: SORTS.includes(input.sort) ? input.sort : 'id',
    dir: input.dir === 'desc' ? 'desc' : 'asc',
    page: positiveInteger(input.page, 1),
    record: /^TCE-\d{4}$/.test(input.record ?? '') ? input.record : '',
    metric: input.metric === 'percent' ? 'percent' : 'count',
    group,
    min: positiveInteger(input.min, 1, 500),
    kwicLang: ['all', 'en', 'zh', 'hu'].includes(input.kwicLang) ? input.kwicLang : 'all',
    lexSort: ['record','left','right'].includes(input.lexSort) ? input.lexSort : 'record',
    lexDir: input.lexDir==='desc'?'desc':'asc',
    lexPage: positiveInteger(input.lexPage,1),
    lexHit: /^TCE-\d{4}:(en|zh|hu):\d+$/.test(input.lexHit ?? '') ? input.lexHit : '',
  };
}
export function parseState(hash = '') {
  const input = String(hash).replace(/^#\/?/, '');
  const [route = '', query = ''] = input.split(/\?(.*)/s);
  return normalizeState({route, ...Object.fromEntries(new URLSearchParams(query))});
}
export function stateHash(input = {}) {
  const state = normalizeState(input);
  const params = new URLSearchParams();
  for (const key of Object.keys(DEFAULT_STATE)) {
    if (key !== 'route' && state[key] !== DEFAULT_STATE[key]) params.set(key, String(state[key]));
  }
  return `#${state.route}${params.size ? `?${params}` : ''}`;
}

export function sortRecords(records, sort = 'id', dir = 'asc') {
  const field = SORTS.includes(sort) ? sort : 'id';
  const collator = new Intl.Collator(field === 'hu' ? 'hu' : field === 'zh' ? 'zh-Hant' : 'en', {numeric: true, sensitivity: 'base'});
  const value = record => field === 'id' ? idOf(record) : ['en', 'zh', 'hu'].includes(field) ? textOf(record, field) : field === 'review' ? record.human_checked : record.category;
  return [...records].sort((a, b) => {
    const difference = collator.compare(value(a), value(b));
    return difference ? difference * (dir === 'desc' ? -1 : 1) : idOf(a).localeCompare(idOf(b));
  });
}
export function categoryCounts(records) {
  const counts = Object.fromEntries(CATEGORY_IDS.map(category => [category, 0]));
  for (const record of records) if (Object.hasOwn(counts, record.category)) counts[record.category] += 1;
  return counts;
}
export function sankeyCounts(records, combineHuman = false) {
  const origins = combineHuman ? ['human', 'ai_only'] : ORIGIN_IDS;
  const counts = new Map();
  for (const record of records) {
    const originalOrigin = record.origin ?? record.annotation_origin;
    const origin = combineHuman && ['pilot30','supplemental20'].includes(originalOrigin) ? 'human' : originalOrigin;
    if (!origins.includes(origin) || !CATEGORY_IDS.includes(record.category)) continue;
    const key = `${origin}\u0000${record.category}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return origins.flatMap(origin => CATEGORY_IDS.flatMap(category => {
    const count = counts.get(`${origin}\u0000${category}`) ?? 0;
    return count ? [{origin, category, count}] : [];
  }));
}
export function heatmapCounts(records, tags, view="legacy") {
  const tagIds = tags ? [...new Set(tags.map(tag => typeof tag === 'string' ? tag : tag.id))] : [...new Set(records.flatMap(issueIds))].sort();
  const cells = Object.fromEntries(tagIds.map(tag => [tag, Object.fromEntries(CATEGORY_IDS.map(category => [category, new Set()]))]));
  const rowSets = Object.fromEntries(tagIds.map(tag => [tag, new Set()]));
  const categorySets = Object.fromEntries(CATEGORY_IDS.map(category => [category, new Set()]));
  for (const record of records) {
    if (!Object.hasOwn(categorySets, record.category)) continue;
    const id = idOf(record);
    categorySets[record.category].add(id);
    for (const tag of (view==='overview'?groupIds(record):view==='detail'?phenomenonIds(record):issueIds(record))) {
      if (!Object.hasOwn(cells, tag)) continue;
      cells[tag][record.category].add(id);
      rowSets[tag].add(id);
    }
  }
  return {
    categories: [...CATEGORY_IDS], tags: tagIds,
    matrix: Object.fromEntries(tagIds.map(tag => [tag, Object.fromEntries(CATEGORY_IDS.map(category => [category, cells[tag][category].size]))])),
    rowTotals: Object.fromEntries(tagIds.map(tag => [tag, rowSets[tag].size])),
    categoryTotals: Object.fromEntries(CATEGORY_IDS.map(category => [category, categorySets[category].size])),
    totalRecords: new Set(records.map(idOf)).size,
  };
}

export function highlightText(value, query) {
  const text = String(value ?? '');
  const term = String(query ?? '').trim();
  if (!term) return escapeHtml(text);
  const haystack = lower(text), needle = lower(term);
  let result = '', cursor = 0, index = haystack.indexOf(needle);
  while (index !== -1) {
    const matched = text.slice(index, index + term.length);
    result += escapeHtml(text.slice(cursor, index)) + `<mark data-action="term" data-term="${escapeHtml(matched)}" role="button" tabindex="0">${escapeHtml(matched)}</mark>`;
    cursor = index + term.length;
    index = haystack.indexOf(needle, cursor);
  }
  return result + escapeHtml(text.slice(cursor));
}

export const CSV_FIELDS = Object.freeze([
  'record_id', 'source_text', 'target_text', 'hungarian_text', 'eng_id', 'cmn_id', 'hun_id',
  'source', 'category', 'human_checked', 'unit', 'direct_cmn_hun_link', 'review_notes',
  'eng_source_url', 'cmn_source_url', 'hun_source_url', 'annotation_origin',
  'raw_en_zh_assessment', 'raw_en_hu_assessment', 'display_issue_tags',
  'display_specific_phenomena', 'display_phenomenon_groups', 'analysis_source_group', 'raw_phenomenon_audit',
]);
export function csvForRecords(records) {
  const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return [CSV_FIELDS.map(quote).join(','), ...records.map(record => {
    const values = {
      ...record,
      record_id: idOf(record), source_text: textOf(record, 'en'), target_text: textOf(record, 'zh'), hungarian_text: textOf(record, 'hu'),
      eng_source_url: record.eng_source_url ?? record.urls?.en ?? '',
      cmn_source_url: record.cmn_source_url ?? record.urls?.zh ?? '',
      hun_source_url: record.hun_source_url ?? record.urls?.hu ?? '',
      annotation_origin: record.origin ?? record.annotation_origin ?? '',
      raw_en_zh_assessment: record.pair?.en_zh?.raw ?? record.en_zh_alignment ?? '',
      raw_en_hu_assessment: record.pair?.en_hu?.raw ?? record.en_hu_alignment ?? '',
      display_issue_tags: JSON.stringify(issueIds(record)),
      display_specific_phenomena: JSON.stringify(phenomenonIds(record)),
      display_phenomenon_groups: JSON.stringify(groupIds(record)),
      analysis_source_group: record.annotationGroup ?? (record.human_checked==='yes'?'human_reviewed':'ai_only'),
      raw_phenomenon_audit: JSON.stringify(record.issueAudit??[]),
    };
    return CSV_FIELDS.map(field => quote(values[field])).join(',');
  })].join('\r\n') + '\r\n';
}

/** Literal concordance windows; offsets and slices always refer to unchanged original text. */
export function kwicMatches(value, query) {
  const text=String(value ?? ''), term=String(query ?? '').trim();
  if(!term)return [];
  const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return [...text.matchAll(new RegExp(escaped,'giu'))].map(match=>({
    left:text.slice(0,match.index),keyword:match[0],right:text.slice(match.index+match[0].length),
    start:match.index,end:match.index+match[0].length,
  }));
}

/** Occurrence-level concordance: a record can have several hits, with no translation alignment. */
export function concordanceHits(records, query, scope='all') {
  if(!String(query??'').trim())return [];
  const languages=['en','zh','hu'].includes(scope)?[scope]:['en','zh','hu'];
  return records.flatMap(record=>languages.flatMap(language=>kwicMatches(textOf(record,language),query).map(match=>({
    ...match,id:idOf(record),language,category:record.category,human_checked:record.human_checked,
    key:`${idOf(record)}:${language}:${match.start}`,
  }))));
}
export function sortConcordance(hits, sort='record', dir='asc', scope='all') {
  const collator=new Intl.Collator(scope==='hu'?'hu':scope==='zh'?'zh-Hant':'en',{numeric:true,sensitivity:'base'});
  const tie=(a,b)=>collator.compare(a.id,b.id)||['en','zh','hu'].indexOf(a.language)-['en','zh','hu'].indexOf(b.language)||a.start-b.start;
  const key=h=>sort==='left'?Array.from(h.left.trimEnd().normalize('NFC')).reverse().join(''):h.right.trimStart().normalize('NFC');
  return [...hits].sort((a,b)=>sort==='record'?tie(a,b)*(dir==='desc'?-1:1):(collator.compare(key(a),key(b))*(dir==='desc'?-1:1)||tie(a,b)));
}

export function phenomenonIds(record){return record.phenomena||issueIds(record);}
export function groupIds(record){return record.phenomenonGroups||[];}
export function annotationGroupLabel(record,lang='en'){
 return record.human_checked==='yes'?(lang==='zh'?'人工複核':'Human-reviewed'):(lang==='zh'?'僅 AI 標註':'AI-only');
}
