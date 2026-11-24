import {CATEGORY_IDS, CATEGORY_COLORS, categoryLabel, escapeHtml as esc, categoryCounts, sankeyCounts, heatmapCounts} from './core.js';

const pct = (value, total) => total ? `${(value / total * 100).toFixed(1)}%` : '0.0%';
const locale = lang => lang === 'zh' ? 'zh' : 'en';

/** A two-column Sankey with link widths and node heights proportional to record count. */
export function sankeyHTML(records, lang = 'en') {
  lang = locale(lang);
  const zh = lang === 'zh', total = records.length;
  if (!total) return `<p class="chart-empty">${zh ? '目前條件沒有符合的記錄。請清除部分篩選。' : 'No records match this view. Clear a filter to explore the flows.'}</p>`;
  const reviewGroups=['human','ai_only'];
  const label=origin=>origin==='human'?(zh?'人工複核':'Human-reviewed'):(zh?'僅 AI 標註':'AI-only');
  const review=origin=>origin==='human'?'yes':'no';
  const flows = sankeyCounts(records,true), categories = categoryCounts(records);
  const origins = Object.fromEntries(reviewGroups.map(origin => [origin, flows.filter(flow => flow.origin === origin).reduce((sum, flow) => sum + flow.count, 0)]));
  const activeOrigins = reviewGroups.filter(origin => origins[origin]);
  const activeCategories = CATEGORY_IDS.filter(category => categories[category]);
  const height = 370, padding = 30, gap = 17;
  const available = height - padding * 2 - (Math.max(activeOrigins.length, activeCategories.length) - 1) * gap;
  const scale = available / total;
  const layout = (ids, counts) => {
    const used = total * scale + (ids.length - 1) * gap;
    let y = (height - used) / 2;
    return Object.fromEntries(ids.map(id => {
      const node = {y, height: counts[id] * scale, offset: 0};
      y += node.height + gap;
      return [id, node];
    }));
  };
  const left = layout(activeOrigins, origins), right = layout(activeCategories, categories);
  const flowDescription = flow => zh
      ? `${label(flow.origin)}至${categoryLabel(flow.category, lang)}：${flow.count} 條；佔該複核組別 ${pct(flow.count, origins[flow.origin])}；佔目前結果 ${pct(flow.count, total)}`
      : `${label(flow.origin)} to ${categoryLabel(flow.category, lang)}: ${flow.count} records; ${pct(flow.count, origins[flow.origin])} of that review group; ${pct(flow.count, total)} of current results`;
  const paths = flows.map(flow => {
    const a = left[flow.origin], b = right[flow.category], width = flow.count * scale;
    const y1 = a.y + a.offset + width / 2, y2 = b.y + b.offset + width / 2;
    a.offset += width; b.offset += width;
    const description = flowDescription(flow);
    return `<path class="sankey-link" pointer-events="none" d="M234 ${y1.toFixed(3)} C430 ${y1.toFixed(3)}, 510 ${y2.toFixed(3)}, 705 ${y2.toFixed(3)}" stroke="${CATEGORY_COLORS[flow.category]}" stroke-width="${width.toFixed(3)}" fill="none" role="button" tabindex="0" aria-label="${esc(description)}" data-action="review-flow" data-review="${review(flow.origin)}" data-category="${esc(flow.category)}"><title>${esc(description)}</title></path>`;
  }).join('');
  const sourceNodes = activeOrigins.map(origin => {
    const node = left[origin], description = `${label(origin)}: ${origins[origin]} (${pct(origins[origin], total)})`;
    const shortOrigin = label(origin);
    return `<g class="sankey-node" role="button" tabindex="0" aria-label="${esc(description)}" data-action="review" data-review="${review(origin)}"><title>${esc(description)}</title><rect x="220" y="${node.y}" width="14" height="${node.height}" rx="3" fill="#526975"/><text x="205" y="${node.y + node.height / 2 + 5}" text-anchor="end" font-size="16" fill="#172B3A">${esc(shortOrigin)} · ${origins[origin]}</text></g>`;
  }).join('');
  const categoryNodes = activeCategories.map(category => {
    const node = right[category], description = `${categoryLabel(category, lang)}: ${categories[category]} (${pct(categories[category], total)})`;
    return `<g class="sankey-node" role="button" tabindex="0" aria-label="${esc(description)}" data-action="category" data-category="${esc(category)}"><title>${esc(description)}</title><rect x="705" y="${node.y}" width="14" height="${node.height}" rx="3" fill="${CATEGORY_COLORS[category]}"/><text x="735" y="${node.y + node.height / 2 + 5}" font-size="16" fill="#172B3A">${esc(categoryLabel(category, lang))}</text><text x="1015" y="${node.y + node.height / 2 + 5}" text-anchor="end" font-size="16" fill="#526570">${categories[category]}</text></g>`;
  }).join('');
  const desktopSelector = `<div class="sankey-flow-controls"><h3>${zh?'選擇流向':'Select a flow'}</h3><p class="chart-note">${zh?'交叉流帶可能重疊；請使用下列按鈕準確選取複核狀態與類別。流帶保留鍵盤操作。':'Crossing ribbons can overlap. Use these buttons to select an exact review status and category. Ribbons remain keyboard-operable.'}</p><div class="flow-groups">${activeOrigins.map(origin=>`<fieldset class="flow-group"><legend>${esc(label(origin))} · ${origins[origin]}</legend><div class="flow-choices">${flows.filter(flow=>flow.origin===origin).map(flow=>`<button type="button" class="flow-select-button" data-action="review-flow" data-review="${review(origin)}" data-category="${esc(flow.category)}" aria-label="${esc(flowDescription(flow))}" title="${esc(flowDescription(flow))}"><span class="legend-swatch" style="background:${CATEGORY_COLORS[flow.category]}" aria-hidden="true"></span><span>${esc(categoryLabel(flow.category,lang,true))}</span><strong>${flow.count}</strong></button>`).join('')}</div></fieldset>`).join('')}</div></div>`;
  const mobileRows = flows.map(flow => {
    const description = `${label(flow.origin)} · ${categoryLabel(flow.category, lang)}: ${flow.count}`;
    return `<tr><td>${esc(label(flow.origin))}</td><td><button type="button" class="flow-button" data-action="review-flow" data-review="${review(flow.origin)}" data-category="${esc(flow.category)}" aria-label="${esc(description)}"><span class="legend-swatch" style="background:${CATEGORY_COLORS[flow.category]}"></span>${esc(categoryLabel(flow.category, lang, true))}</button></td><td>${flow.count}</td><td>${pct(flow.count, total)}</td></tr>`;
  }).join('');
  return `<div class="sankey-chart"><svg class="sankey-svg" viewBox="0 0 1040 ${height}" role="group" aria-label="${zh ? '依複核狀態與主類別分組的記錄流量圖；可使用節點或流向按鈕篩選，流帶支援鍵盤操作' : 'Record flows by review status and primary category; use nodes or flow buttons to filter, or activate ribbons by keyboard'}"><g>${paths}</g>${sourceNodes}${categoryNodes}</svg>${desktopSelector}<div class="sankey-mobile"><table class="flow-table"><caption>${zh ? '流量表：與桑基圖相同的記錄計數，適用於小螢幕。' : 'Flow table: the same Sankey counts in a small-screen format.'}</caption><thead><tr><th scope="col">${zh ? '複核狀態' : 'Review status'}</th><th scope="col">${zh ? '主類別' : 'Category'}</th><th scope="col">${zh ? '條數' : 'Count'}</th><th scope="col">${zh ? '佔目前結果' : 'Of results'}</th></tr></thead><tbody>${mobileRows}</tbody></table></div><ul class="category-legend" aria-label="${zh ? '類別圖例' : 'Category legend'}">${CATEGORY_IDS.map(category => `<li><button type="button" data-action="category" data-category="${esc(category)}"><span class="legend-swatch" style="background:${CATEGORY_COLORS[category]}"></span>${esc(categoryLabel(category, lang, true))} <span class="legend-count">${categories[category]}</span></button></li>`).join('')}</ul></div>`;
}

export function heatmapHTML(records, tagDefinitions, options = {}) {
  const lang = locale(options.lang), zh = lang === 'zh';
  const metric = options.metric === 'percent' ? 'percent' : 'count';
  const min = Math.max(1, Number(options.min) || 1), group = options.group ?? 'all', view=options.view??'legacy';
  const data = heatmapCounts(records, tagDefinitions,view);
  const visible = tagDefinitions.filter(tag => (group === 'all' || (view==='overview' ? tag.id === group : tag.group === group)) && data.rowTotals[tag.id] >= min)
    .sort((a, b) => Number(a.id === 'not_documented'||view==='overview'&&a.id==='documentation') - Number(b.id === 'not_documented'||view==='overview'&&b.id==='documentation') || data.rowTotals[b.id] - data.rowTotals[a.id] || String(a.id).localeCompare(b.id));
  if (!records.length || !visible.length) return `<p class="chart-empty">${zh ? '目前條件或最低頻次下沒有可顯示的現象。試降低門檻或清除篩選。' : 'No phenomena meet the current filters and minimum frequency. Lower the threshold or clear a filter.'}</p>`;
  const maximum = Math.max(1, ...visible.filter(tag=>tag.id!=='not_documented' && !(view==='overview'&&tag.id==='documentation')).flatMap(tag => CATEGORY_IDS.map(category => metric === 'count' ? data.matrix[tag.id][category] : data.categoryTotals[category] ? data.matrix[tag.id][category] / data.categoryTotals[category] : 0)));
  const hasScaledCells = visible.some(tag=>tag.id!=='not_documented'&&!(view==='overview'&&tag.id==='documentation')&&CATEGORY_IDS.some(category=>data.matrix[tag.id][category]>0));
  const neutralNote = view==='overview'
    ? (zh?'記錄狀態大類置於表末，以中性底色顯示，不參與色階。':'The Documentation group appears last with neutral fill and is excluded from the color scale.')
    : (zh?'只有「未記錄現象標籤」置於表末，以中性底色顯示並排除於色階外；其他記錄狀態及未詳述標籤仍按頻次排序和着色。':'Only “No issue tag documented” appears last with neutral fill and is excluded from the color scale. Other documentation and unspecified labels remain frequency-sorted and colored.');
  const range = hasScaledCells ? (metric==='count'?`0–${maximum} ${zh?'條記錄':'records'}`:'0–100%') : (zh?'目前沒有參與色階的儲存格':'No scaled cells in this selection');
  const scaleNote = metric==='count'
    ? (zh?'計數色階上限會隨目前篩選、視圖及可見行重算；不同選取範圍的色深不可當作固定數量比較。':'The count scale is recalculated for the current filters, view and visible rows; shades are not fixed quantities across selections.')
    : (zh?'百分比色階固定為 0–100%；分母仍為目前選取範圍內各主要類別的不同記錄數。':'The percentage scale is fixed at 0–100%; denominators remain the distinct selected records in each primary category.');
  const body = visible.map(tag => `<tr data-phenomenon="${esc(tag.id)}" class="${tag.id==='not_documented'?'documentation-row':''}"><th scope="row">${esc(tag.label?.[lang] ?? tag.id)} <span class="heatmap-row-total">(${data.rowTotals[tag.id]})</span></th>${CATEGORY_IDS.map(category => {
    const count = data.matrix[tag.id][category], denominator = data.categoryTotals[category];
    const value = metric === 'count' ? count : denominator ? count / denominator : 0;
    const intensity = Math.min(1, value / maximum);
    const alpha = (tag.id === 'not_documented'||view==='overview'&&tag.id==='documentation') ? 0.05 : count ? 0.10 + 0.60 * intensity : 0;
    const description = zh
      ? `${tag.label?.zh ?? tag.id}；${categoryLabel(category, lang)}：${count} 個不同記錄，佔該類別 ${pct(count, denominator)}（分母 ${denominator}）`
      : `${tag.label?.en ?? tag.id}; ${categoryLabel(category, lang)}: ${count} distinct records, ${pct(count, denominator)} of this category (denominator ${denominator})`;
    return `<td><button type="button" ${count?'':'disabled'} class="heatmap-cell${count ? '' : ' is-zero'}" data-action="${view==='legacy'?'cell':view==='overview'?'group-cell':'phenomenon-cell'}" data-category="${esc(category)}" ${view==='legacy'?'data-issue':view==='overview'?'data-phenomenon-group':'data-phenomenon'}="${esc(tag.id)}" style="--heat-alpha:${alpha.toFixed(3)};background:rgba(35,127,128,${alpha.toFixed(3)});color:#172B3A" aria-label="${esc(description)}" title="${esc(description)}">${metric === 'count' ? count : pct(count, denominator)}</button></td>`;
  }).join('')}</tr>`).join('');
  return `<div class="heatmap-scroll" tabindex="0" role="region" aria-label="${zh ? '現象與類別熱圖表格，可水平捲動' : 'Phenomenon by category heatmap table; scroll horizontally if needed'}"><table class="heatmap-table"><thead><tr><th scope="col">${view==='overview'?(zh?'現象大類':'Phenomenon group'):(zh?'顯示標籤':'Display label')}</th>${CATEGORY_IDS.map(category => `<th scope="col"><button type="button" data-action="category" data-category="${esc(category)}"><span class="legend-swatch" style="background:${CATEGORY_COLORS[category]}" aria-hidden="true"></span>${esc(categoryLabel(category, lang, true))}<span class="heatmap-col-total">n = ${data.categoryTotals[category]}</span></button></th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div><p class="heatmap-mobile-hint chart-note">${zh?'可水平捲動，查看全部五個類別。':'Scroll horizontally to see all five categories.'}</p><div class="heatmap-legend" data-scale-mode="${metric}" data-scale-maximum="${hasScaledCells?(metric==='count'?maximum:100):''}"><span class="heatmap-scale" aria-hidden="true"></span><div><strong class="heatmap-scale-range">${range}</strong><p>${neutralNote} ${zh?'每格均保留數值。':'Every cell retains its value.'}</p><p class="heatmap-scale-note">${scaleNote}</p></div></div><p class="chart-counting-note">${zh ? '同一筆記錄在每個顯示標籤或大類下只計一次，但可能同時出現在多行，因此不能將各行的記錄數直接相加，當作不重複記錄的總數。百分比以各類別目前的不同記錄數為分母。記錄狀態及未詳述觀察並非翻譯錯誤類別。' : 'A record counts once per display label or group and may occur in several rows, so rows are not additive. Percentages use distinct current records in each category as the denominator. Documentation states and unspecified observations are not translation-error categories.'}</p>`;
}
