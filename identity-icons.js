// 用户：Win Mobile Sketch symbol 940A2A60-49A9-4037-9FAB-EC8ECFC9AE29。
// 就诊：项目补充图形，按移动端图标线宽与40×40画布封装。
export function WmIdentityIcon(name){
 const path=name==='user'?'<circle cx="20" cy="10" r="6.5"/><path d="M5.5 34.5v-2C5.5 25.87 10.87 20.5 17.5 20.5h5c6.63 0 12 5.37 12 12v2Z"/>':'<path d="M9 6v9a9 9 0 0 0 18 0V6M7 6h4m14 0h4M18 24v3a8 8 0 0 0 16 0v-3"/><circle cx="34" cy="20" r="4"/><path d="M18 9v8m-4-4h8"/>';
 return `<svg class="wm-icon identity-role-icon" data-component="WmIcon" data-icon="${name}" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}
