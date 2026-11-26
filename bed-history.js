// 项目本地建床记录切换，按患者独立保存当前选择。
const selections=new Map();
const histories=new Map();
export function bedRecords(patient){
 const key=patient.id||patient.name;
 if(!histories.has(key)){
  const number=patient.bed||patient.number;
  histories.set(key,[{count:3,number,date:'2026-11-20',status:'在床'},{count:2,number:`${number}-02`,date:'2025-08-12',status:'已撤床'},{count:1,number:`${number}-01`,date:'2024-03-06',status:'已撤床'}]);
 }
 return histories.get(key);
}
export function activeBed(patient){return bedRecords(patient)[selections.get(patient.id||patient.name)||0];}
export function showBedHistory(patient,onChange){
 let dialog=document.querySelector('#bed-history-dialog');
 if(!dialog){dialog=document.createElement('dialog');dialog.id='bed-history-dialog';document.body.append(dialog);}
 const records=bedRecords(patient),active=activeBed(patient);
 dialog.setAttribute('aria-label','切换建床记录');
 dialog.innerHTML=`<div class="sheet-head"><h2>切换建床记录</h2><button class="icon-button" data-close aria-label="关闭">×</button></div><p class="muted">选择当前患者的建床记录</p><div class="bed-history-options">${records.map((r,i)=>`<button class="bed-history-option" data-bed-index="${i}" aria-pressed="${r===active}"><span><strong>第${r.count}次建床 <small>${r.status}</small></strong><span>家床号 · ${r.number}</span><time>${r.date}</time></span><span class="bed-history-check" aria-hidden="true">${r===active?'✓':''}</span></button>`).join('')}</div>`;
 dialog.onclick=e=>{const option=e.target.closest('[data-bed-index]');if(option){selections.set(patient.id||patient.name,Number(option.dataset.bedIndex));dialog.close();onChange();}};
 dialog.showModal();
}
