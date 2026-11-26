import { renderCardManagement, initCardManagement, loadAddedCards } from './card-management.js';
import { showBedHistory } from './bed-history.js';
import { patients } from './patients.js';
import { WmPatientBanner } from './patient-banner.js?v=20261126-stepper';
import { mountWinAvatars } from './vendor/win-avatar.js';
import { renderIdentity, initIdentity, rememberedIdentity } from './identity.js?v=20261126-role-icons';
import { renderFeature, initFeatures } from './features.js?v=20261126-report-clean';
// 依据 WinDesign Mobile 视觉规范的项目本地组件；并非官方组件库 API。
const paths = {
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 wallet:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18m-5 4h5M6 5V3h12"/>',
 pulse:'<path d="M2 12h5l3-8 4 16 3-8h5"/>',
 chat:'<path d="M21 11a8 8 0 0 1-8 8H7l-5 3 1-7a8 8 0 1 1 18-4Z"/><path d="M7 10h10m-10 4h6"/>',
 video:'<rect x="2" y="5" width="13" height="14" rx="2"/><path d="m15 10 7-4v12l-7-4"/>',
 care:'<path d="m3 10 9-7 9 7v11H3Z"/><path d="M12 10v8m-4-4h8"/>',
 report:'<path d="M5 3h10l4 4v14H5Z"/><path d="M14 3v5h5M8 12h8m-8 4h6"/>',
 star:'<path d="m12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3L12 17.4 6.4 20.4l1.1-6.3L3 9.6l6.2-.9Z"/>',
 card:'<rect x="2" y="5" width="20" height="15" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M5 17c0-3 6-3 6 0m3-6h5m-5 4h4"/>',
 arrow:'<path d="m9 5 7 7-7 7"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 shield:'<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z"/><path d="m8 11 3 3 5-6"/>'
};
export function WmIcon(name, extra='') {return `<svg class="wm-icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.card}</svg>`;}
export function WmAvatar(size='', sex='男', age=36) {
  const female=sex==='女';
  const category=age>=65?(female?'old-woman':'old-man'):age>=40?(female?'middle-aged-female':'middle-aged-male'):(female?'young-woman':'young-man');
  const name=`w-avatar-${category}-lgt`;
  return `<span class="avatar wm-avatar ${size}" aria-hidden="true" data-component="WmAvatar" data-win-avatar="${name}"></span>`;
}
export function WmCell(title,icon,description='') {return `<button class="wm-cell" data-feature="${title}" data-icon="${icon}"><span class="cell-icon">${WmIcon(icon)}</span><span class="cell-copy"><span>${title}</span>${description?`<small>${description}</small>`:''}</span>${WmIcon('arrow','chevron')}</button>`;}
export function WmGrid(items) {return `<div class="wm-grid">${items.map(([label,icon])=>`<button class="grid-item" data-feature="${label}" data-icon="${icon}"><span class="grid-icon ${icon}">${WmIcon(icon)}</span><span>${label}</span></button>`).join('')}</div>`;}
const cards=[{name:'吴测试',sex:'男',age:36,bed:'20200003',number:'20200003',relation:'本人'},...patients.slice(0,2).map(p=>({...p,number:p.bed,relation:'家属'})),...loadAddedCards()];
let current=0, pending=0, toastTimer;
const app=document.querySelector('#app');
const cardDialog=document.querySelector('#card-dialog');
const featureDialog=document.querySelector('#feature-dialog');
function patientCard(){return WmPatientBanner({patient:cards[current],avatar:WmAvatar,icon:WmIcon});}
function healthArt(){return `<svg viewBox="0 0 160 150" class="health-art" aria-hidden="true"><circle cx="90" cy="72" r="59" fill="#d8eee9"/><circle cx="142" cy="27" r="7" fill="#b4d9cc"/><rect x="65" y="38" width="68" height="90" rx="8" fill="#fff" transform="rotate(10 100 80)"/><rect x="75" y="48" width="30" height="5" rx="2" fill="#c5e1d8"/><path d="M80 72h8l6-12 7 24 7-13h12" fill="none" stroke="#61a894" stroke-width="3" stroke-linecap="round"/><rect x="76" y="98" width="43" height="4" rx="2" fill="#d8e9e4"/><rect x="76" y="108" width="30" height="4" rx="2" fill="#d8e9e4"/><circle cx="48" cy="104" r="23" fill="#4081f7"/><path d="M48 93v22m-11-11h22" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`;}
function home(){return `<div class="page-content">${patientCard()}<section class="surface services"><h2 class="section-title">常用服务<span>便捷就医 · 安心在家</span></h2>${WmGrid([['费用查询','wallet'],['体征记录','pulse'],['就诊咨询','chat'],['远程访视','video'],['上门服务','care'],['患者详情','user']])}</section><p class="care-footer">${WmIcon('shield')} 专业照护 · 温暖到家</p></div><section class="home-fixed-services" aria-label="报告与服务评价"><button data-feature="报告查询" data-icon="report"><span class="fixed-service-icon">${WmIcon('report')}</span><span><strong>报告查询</strong><small>检查与检验报告，随时查看</small></span>${WmIcon('arrow','chevron')}</button><button data-feature="服务评估" data-icon="star"><span class="fixed-service-icon">${WmIcon('star')}</span><span><strong>服务评估</strong><small>记录照护体验，让服务更好</small></span>${WmIcon('arrow','chevron')}</button></section>`;}
function my(){return `<div class="page-content">${patientCard()}<section class="surface my-services">${WmCell('管理就诊卡','card')}${WmCell('费用查询','wallet')}${WmCell('报告查询','report')}</section><section class="surface logout-section identity-switch-section"><button class="wm-cell" data-go="identity"><span class="cell-copy">切换登录身份</span></button></section><section class="surface logout-section"><button class="wm-cell" data-logout><span class="cell-copy">退出登录</span></button></section><p class="care-footer">${WmIcon('shield')} 专业照护 · 温暖到家</p></div>`;}
function render(){const route=location.hash.replace(/^#\//,'')||'home';const context={icon:WmIcon,avatar:WmAvatar,notify:toast,rerender:render,patient:cards[current],cards,current,selectCard:index=>{current=index;render();}};const feature=renderCardManagement(route,context)??renderIdentity(route,context)??renderFeature(route,context);app.innerHTML=feature??(route==='my'?my():home());document.querySelector('.nav-bar').hidden=feature!==null;document.querySelector('.tabbar').hidden=feature!==null;document.querySelector('.app-shell').classList.toggle('feature-shell',feature!==null);document.querySelector('.app-shell').classList.toggle('identity-shell',route==='identity');document.querySelector('.app-shell').classList.toggle('home-page',route==='home');document.querySelector('.app-shell').classList.toggle('my-page',route==='my');document.querySelectorAll('[data-route]').forEach(button=>{const active=button.dataset.route===route;button.innerHTML=WmIcon(button.dataset.route==='home'?'home':'user')+`<span>${button.dataset.route==='home'?'首页':'我的'}</span>`;button.setAttribute('aria-current',active?'page':'false');});}
function showCards(){pending=current;const container=document.querySelector('#card-options');container.innerHTML='<div id="win-card-group"></div>';const group=container.firstElementChild;group.dataset.winCardGroup=JSON.stringify(cards);group.dataset.selected=String(current);mountWinAvatars();cardDialog.showModal();}
function showFeature(title,icon){const routes={'费用查询':'expenses','体征记录':'vitals','就诊咨询':'consult','远程访视':'remote','报告查询':'reports','服务评估':'reviews','上门服务':'visits','患者详情':'patient'};if(routes[title]){location.hash='/'+routes[title];window.scrollTo(0,0);return;}if(title==='管理就诊卡'){location.hash='/cards';return;}document.querySelector('#feature-title').textContent=title;document.querySelector('#feature-icon').innerHTML=WmIcon(icon);featureDialog.showModal();}
function toast(message){const el=document.querySelector('#toast');clearTimeout(toastTimer);el.textContent=message;el.hidden=false;toastTimer=setTimeout(()=>el.hidden=true,2200);}
document.addEventListener('click',e=>{const close=e.target.closest('[data-close]');if(close){close.closest('dialog').close();return;}const route=e.target.closest('[data-route]');if(route){location.hash=`/${route.dataset.route}`;window.scrollTo(0,0);return;}if(e.target.closest('[data-bed-switch]')){const id=location.hash.split('/')[2];const patient=patients.find(p=>p.id===id)||cards[current];showBedHistory(patient,()=>{render();toast('已切换建床记录');});return;}if(e.target.closest('[data-add-card-from-switch]')){cardDialog.close();location.hash='/cards/new';return;}if(e.target.closest('[data-switch]')){showCards();return;}const feature=e.target.closest('[data-feature]');if(feature)showFeature(feature.dataset.feature,feature.dataset.icon);});
cardDialog.addEventListener('win-card-change',e=>{pending=Number(e.detail);});
cardDialog.addEventListener('change',e=>{if(e.target.name==='patient-card')pending=Number(e.target.value);});
document.querySelector('#confirm-card').addEventListener('click',()=>{current=pending;if(location.hash.startsWith('#/patient/'))location.hash='/patient';render();cardDialog.close();toast('已切换患者');});
for(const dialog of [cardDialog,featureDialog])dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
initFeatures();initIdentity();initCardManagement();
if(!location.hash||location.hash==='#/'){const role=rememberedIdentity();location.hash=role==='patient'?'/home':role==='staff'?'/staff-login':'/identity';}
const avatarObserver=new MutationObserver(()=>mountWinAvatars());
avatarObserver.observe(document.querySelector('.app-shell'),{childList:true,subtree:true});
avatarObserver.observe(cardDialog,{childList:true,subtree:true});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);});render();
