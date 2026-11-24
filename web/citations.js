import {references} from './content.js';
import {escapeHtml as esc} from './core.js';

export const referenceById = new Map(references.map(r=>[r.id,r]));
if(referenceById.size!==6)throw new Error('Expected six unique citation identifiers.');
const forms = new Map(references.flatMap(r=>r.citationForms.map(label=>[label,r.id])));
const pattern = new RegExp([...forms.keys()].sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'gu');

export function renderCitations(text) {
 let cursor=0,html='';
 for(const match of String(text).matchAll(pattern)){
  const reference=referenceById.get(forms.get(match[0]));
  html+=esc(text.slice(cursor,match.index))+`<a class="report-citation" data-reference-id="${reference.id}" href="${esc(reference.accessUrl||reference.url)}" target="_blank" rel="noopener">${esc(match[0])}</a>`;
  cursor=match.index+match[0].length;
 }
 return html+esc(text.slice(cursor));
}
export function referenceTitleHTML(reference) {
 return reference.segments.map(part=>part.italic?`<em>${esc(part.text)}</em>`:esc(part.text)).join('');
}
