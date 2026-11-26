import { activeBed } from './bed-history.js';
// 所有患者上下文页面共用的患者Banner。
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function WmPatientBanner({patient,avatar,icon,showSwitch=true}){
 const bed=activeBed(patient);
 return `<section class="patient-banner patient-card" data-component="WmPatientBanner" aria-label="当前患者">${avatar('',patient.sex,patient.age)}<div class="patient-info"><div class="patient-name">${escape(patient.name)}<span class="tag">${escape(patient.sex?`${patient.sex}·${patient.age}岁`:(patient.relation||'本人'))}</span></div><div class="patient-bed-line"><p>家床号 · ${escape(bed.number)}</p><button class="bed-history-trigger" data-bed-switch aria-label="切换建床记录">第${bed.count}次建床${icon('arrow')}</button></div></div>${showSwitch?`<button class="switch-button" data-switch aria-label="切换患者">切换${icon('arrow')}</button>`:''}</section>`;
}
