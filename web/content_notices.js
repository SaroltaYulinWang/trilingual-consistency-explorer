import {escapeHtml as esc} from './core.js';
/** Non-interactive, visible publication notices; no filtering or semantic inference. */
export function contentNoticesHTML(record, language='en', prefix=language==='zh'?'內容提示':'Content notice') {
 const labels=[...new Set((record?.contentNotice||[]).map(n=>n.label?.[language]).filter(Boolean))];
 if(!labels.length)return '';
 return `<span class="record-content-notices" role="note"><span class="sr-only">${esc(prefix)}: </span>${labels.map(label=>`<span class="content-notice">${esc(label)}</span>`).join(' ')}</span>`;
}
