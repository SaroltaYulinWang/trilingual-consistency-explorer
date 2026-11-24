/** One resize observer keeps existing sticky controls below a text-enlarged header. */
let jump=null;
function update(){const root=document.documentElement,header=document.getElementById('site-header');root.style.setProperty('--site-header-height',`${header?.getBoundingClientRect().height||85}px`);root.style.setProperty('--analysis-jump-height',`${jump?.getBoundingClientRect().height||0}px`);}
const observer=typeof ResizeObserver==='function'?new ResizeObserver(update):null;
export function syncHeaderLayout(){const next=document.querySelector('.analysis-jump');if(jump!==next){if(jump)observer?.unobserve(jump);jump=next;if(jump)observer?.observe(jump);}const header=document.getElementById('site-header');if(header)observer?.observe(header);update();}
