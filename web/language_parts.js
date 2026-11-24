/** Language metadata for reviewed full-sentence quotations; never changes visible text. */
export const quotationRecordIds=Object.freeze(['TCE-0241','TCE-0111','TCE-0147','TCE-0484','TCE-0263','TCE-0030','TCE-0373']);
export function renderLanguageParts(text,records,renderText){
 const original=String(text),phrases=[];
 for(const r of records.filter(r=>quotationRecordIds.includes(r.id)))for(const lang of ['en','zh','hu'])phrases.push({text:r[lang],lang});
 const recovery=records.find(r=>r.id==='TCE-0263')?.proposedRecovery;if(recovery)phrases.push({text:recovery,lang:'zh'});
 const spans=[];
 for(const phrase of phrases){let start=0;while(phrase.text&&(start=original.indexOf(phrase.text,start))!==-1){spans.push({start,end:start+phrase.text.length,...phrase});start+=phrase.text.length;}}
 spans.sort((a,b)=>a.start-b.start||b.end-a.end);
 let cursor=0,html='';for(const s of spans){if(s.start<cursor)continue;html+=renderText(original.slice(cursor,s.start))+`<span lang="${s.lang}">${renderText(original.slice(s.start,s.end))}</span>`;cursor=s.end;}
 return html+renderText(original.slice(cursor));
}
