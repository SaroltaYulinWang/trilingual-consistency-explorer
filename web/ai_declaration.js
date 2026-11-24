import {escapeHtml as esc} from './core.js';
// Only the approved document's literal code spans and whole-paragraph emphasis
// are rendered. No general Markdown/HTML execution or sentence normalization.
export function aiPlainText(text) {
 return text.replace(/`([^`]+)`/g,'$1').replace(/^\*([\s\S]+)\*$/,'$1');
}
export function aiInlineHTML(text) {
 const emphasized=text.startsWith('*')&&text.endsWith('*');
 const content=emphasized?text.slice(1,-1):text;
 const html=esc(content).replace(/`([^`]+)`/g,'<code>$1</code>');
 return emphasized?`<em>${html}</em>`:html;
}
