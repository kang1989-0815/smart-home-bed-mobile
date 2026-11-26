import { WRadio } from 'win-design-next/es/components/radio/index.mjs';
import 'win-design-next/theme-chalk/w-radio.css';
import { createApp, defineComponent, h, ref } from 'vue';
import { WAvatar } from 'win-design-next/es/components/avatar/index.mjs';
import 'win-design-next/theme-chalk/w-avatar.css';

const mounted = new Map();
export function mountWinAvatars(root = document) {
  for (const [element, app] of mounted) {
    if (!element.isConnected) { app.unmount(); mounted.delete(element); }
  }
  for (const element of root.querySelectorAll('[data-win-card-group]')) {
    if (mounted.has(element)) continue;
    const cards=JSON.parse(element.dataset.winCardGroup);
    const app=createApp(defineComponent({name:'WinCardRadioGroup',setup(){
      const selected=ref(Number(element.dataset.selected));
      return ()=>cards.map((card,index)=>h('div',{class:['card-option',{'is-selected':selected.value===index}],onClick:()=>{selected.value=index;element.dispatchEvent(new CustomEvent('win-card-change',{bubbles:true,detail:index}));}},[
        h(WAvatar,{name:'w-avatar-young-man-lgt',size:40,shape:'circle'}),
        h('span',{class:'win-card-description'},[h('strong',[card.name,h('small',card.relation)]),h('span',{class:'muted'},card.number)]),
        h(WRadio,{modelValue:selected.value,value:index,name:'patient-card',label:card.name,'onUpdate:modelValue':value=>{selected.value=value;element.dispatchEvent(new CustomEvent('win-card-change',{bubbles:true,detail:value}));}})
      ]));
    }}));app.mount(element);mounted.set(element,app);
  }
  for (const element of root.querySelectorAll('[data-win-avatar]')) {
    if (mounted.has(element)) continue;
    const name = element.dataset.winAvatar;
    const size = element.classList.contains('small') ? 40 : 50;
    const app = createApp(defineComponent({
      name: 'MobileWinAvatarAdapter',
      setup: () => () => h(WAvatar, { name, size, shape: 'circle' })
    }));
    app.mount(element);
    mounted.set(element, app);
  }
}
