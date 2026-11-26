// 项目封装：按用户提供的 winPAD 日期滚轮视觉实现；不冒充官方组件 API。
export function openDatetimePicker(input){
 const initial=new Date(input.value||input.dataset.value);const chosen=Number.isNaN(initial.getTime())?new Date():initial;
 const state={year:chosen.getFullYear(),month:chosen.getMonth()+1,day:chosen.getDate(),hour:chosen.getHours(),minute:chosen.getMinutes()};
 const rowHeight=44,pad=n=>String(n).padStart(2,'0');
 const dialog=document.createElement('dialog');dialog.className='wm-datetime-picker winpad-date-picker';dialog.dataset.component='WmDatetimePicker';dialog.setAttribute('aria-label','选择日期');
 dialog.innerHTML='<div class="datetime-toolbar"><button type="button" data-date-cancel>取消</button><h2>选择日期</h2><button type="button" data-date-confirm>完成</button></div><div class="winpad-wheels"><div class="winpad-selection" aria-hidden="true"></div></div>';
 const wheels=dialog.querySelector('.winpad-wheels'),columns=new Map(),timers=new Map();
 function values(key){if(key==='year')return Array.from({length:101},(_,i)=>2000+i);if(key==='month')return Array.from({length:12},(_,i)=>i+1);if(key==='day')return Array.from({length:new Date(state.year,state.month,0).getDate()},(_,i)=>i+1);return Array.from({length:key==='hour'?24:60},(_,i)=>i);}
 const labels={year:'年',month:'月',day:'日',hour:'时',minute:'分'};
 function paint(key){const column=columns.get(key);column.querySelectorAll('button').forEach(button=>{const distance=Math.abs(Number(button.dataset.value)-state[key]);button.setAttribute('aria-selected',String(distance===0));button.dataset.distance=String(Math.min(distance,3));});column.setAttribute('aria-label',`${labels[key]}，当前${state[key]}${labels[key]}`);}
 function rebuild(key){const column=columns.get(key),list=values(key);state[key]=Math.min(state[key],list.at(-1));column.innerHTML=list.map(n=>`<button type="button" role="option" tabindex="-1" data-value="${n}">${n}${labels[key]}</button>`).join('');column.scrollTop=list.indexOf(state[key])*rowHeight;paint(key);}
 function commit(key){const column=columns.get(key),list=values(key),index=Math.max(0,Math.min(list.length-1,Math.round(column.scrollTop/rowHeight)));const next=list[index],changed=next!==state[key];state[key]=next;paint(key);if(changed&&['year','month'].includes(key))rebuild('day');}
 for(const key of Object.keys(state)){
  const column=document.createElement('div');column.className='winpad-wheel';column.dataset.datePart=key;column.setAttribute('role','listbox');column.tabIndex=0;columns.set(key,column);wheels.append(column);
  column.addEventListener('scroll',()=>{clearTimeout(timers.get(key));timers.set(key,setTimeout(()=>commit(key),90));});
  column.addEventListener('click',e=>{const option=e.target.closest('[data-value]');if(!option)return;column.scrollTo({top:values(key).indexOf(Number(option.dataset.value))*rowHeight,behavior:'smooth'});});
  column.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();const list=values(key),i=list.indexOf(state[key]),index=e.key==='Home'?0:e.key==='End'?list.length-1:Math.max(0,Math.min(list.length-1,i+(e.key==='ArrowDown'?1:-1)));state[key]=list[index];column.scrollTop=index*rowHeight;paint(key);if(['year','month'].includes(key))rebuild('day');});
 }
 document.body.append(dialog);dialog.showModal();Object.keys(state).forEach(rebuild);
 dialog.addEventListener('click',e=>{
  if(e.target.closest('[data-date-cancel]'))dialog.close();
  if(e.target.closest('[data-date-confirm]')){
   Object.keys(state).forEach(commit);
   input.value=`${state.year}-${pad(state.month)}-${pad(state.day)}T${pad(state.hour)}:${pad(state.minute)}`;
   const display=input.parentElement.querySelector('[data-date-display]');if(display)display.textContent=`${state.year}/${pad(state.month)}/${pad(state.day)} ${pad(state.hour)}:${pad(state.minute)}`;
   input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));dialog.close();
  }
 });
 dialog.addEventListener('close',()=>{timers.forEach(clearTimeout);dialog.remove();});
}
