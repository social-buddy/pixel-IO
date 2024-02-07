"use strict";var l=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames,p=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var v=(s,t,e)=>t in s?l(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,_=(s,t)=>{for(var e in t||(t={}))m.call(t,e)&&v(s,e,t[e]);if(p)for(var e of p(t))u.call(t,e)&&v(s,e,t[e]);return s};var L=(s,t)=>{for(var e in t)l(s,e,{get:t[e],enumerable:!0})},M=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of C(t))!m.call(s,n)&&n!==e&&l(s,n,{get:()=>t[n],enumerable:!(i=E(t,n))||i.enumerable});return s};var I=s=>M(l({},"__esModule",{value:!0}),s);var O={};L(O,{Events:()=>g,PixelIO:()=>f});module.exports=I(O);var r=require("ramda");var c=class{constructor(){this.__listeners={}}on(t,e){this.__listeners[t]||(this.__listeners[t]=[]),this.__listeners[t].push(e)}only(t,e){this.__listeners[t]||(this.__listeners[t]=[e])}emit(t,...e){let i=this.__listeners[t];if(i)for(let n of i)n(...e)}off(t,e){let i=this.__listeners[t];i&&(this.__listeners[t]=i.filter(n=>n!==e))}once(t,e){let i=(...n)=>{this.off(t,i),e(...n)};this.on(t,i)}removeAllListeners(){this.__listeners={}}};var g=(n=>(n.EXPORT="export",n.UPGRADE="upgrade",n.CLOSE_PIXEL="close",n.CLICK_LOGO="clickLogo",n))(g||{});var a=class a extends c{constructor(e,i){super();this.__pixelContainer=null;this.__temporaryImage="";this.__pixelClass=[];let n={token:"",size:{width:800,height:600,restrict:!1},css:"",upgradeEvent:!1,canSaveLocal:!1,domain:"",closeButton:!1,saveMenuList:[],container:{type:"iframe",parameters:[]},debug:!1};this.__config=_(_(_({},n),typeof e=="string"?{token:e}:e),i||{}),this.css=this.__config.css,this.__listenner=this.__onReceivedMessage.bind(this)}open(e){var i;e!=null&&e.image&&(this.__temporaryImage=e.image),e!=null&&e.size&&(this.__config.size=e.size),this.__pixelContainer===null?(e!=null&&e.container&&(this.__config.container=e.container),this.__createContainer(this.__config.container),this.__createListeners()):((i=this.__config.container)==null?void 0:i.type)==="window"&&this.__pixelContainer.closed&&(this.__pixelContainer=null,this.open(e))}close(){var e;this.__pixelContainer&&(this.__config.container.type==="iframe"?(e=this.__pixelContainer.parentNode)==null||e.removeChild(this.__pixelContainer):this.__pixelContainer.close(),this.__pixelContainer=null)}set config(e){this.__config=_(_({},this.__config),e)}set token(e){this.__config.token=e}set size(e){this.__config.size=e}get size(){return this.__config.size}set domain(e){this.__config&&(this.__config.domain=e)}set css(e){this.__pixelClass=e?e.replace(/\s+/gm,",").split(","):[]}get css(){return this.__pixelClass||[]}get token(){return this.__config.token}set canSaveLocal(e){this.__config.canSaveLocal=e}get canSaveLocal(){return this.__config.canSaveLocal}get config(){return this.__config}addMenuItems(e){var i;(0,r.isNil)((i=this.__config)==null?void 0:i.saveMenuList)&&(this.__config.saveMenuList=[]),Array.isArray(e)?this.__config.saveMenuList=[...this.__config.saveMenuList,...e]:this.__config.saveMenuList=[...this.__config.saveMenuList,e]}removeMenuItems(e){if((0,r.isEmpty)(this.__config.saveMenuList))throw new Error("La liste des menu est vide");let i=Array.isArray(e)?e.map(o=>typeof o=="string"?o:o.label):[typeof e=="string"?e:e.label],n=this.__config.saveMenuList.filter(o=>!i.includes(o.label));if(n.length===this.__config.saveMenuList.length)throw new Error("Menu non trouv\xE9, v\xE9rifier le label du menu");this.__config.saveMenuList=n}get menuItems(){return this.__config.saveMenuList}__createContainer(e){let i=a.PIXEL_URI;if((0,r.isNil)(this.__config.domain))i=`${i}?t=${this.__config.token}`;else{if(this.__config.domain.trim()==="*")throw new Error("domaine * non autoris\xE9");i=`${i}?d=${this.__config.domain}&v=${a.PIO_VERSION}`}if(e.type==="iframe"){let n=e.parameters&&e.parameters.length>0?document.querySelector(e.parameters[0]):document.body;this.__pixelContainer=document.createElement("iframe"),this.__pixelContainer.src=i,this.__pixelClass.forEach(o=>this.__pixelContainer.classList.add(o)),n==null||n.appendChild(this.__pixelContainer);return}e.type==="window"&&(this.__pixelContainer=window.open.apply(null,e.parameters.length?[i,...e.parameters]:[i]))}__createListeners(){window.removeEventListener("message",this.__listenner),window.addEventListener("message",this.__listenner)}__onReceivedMessage(e){var o,h;if(this.__config.debug&&console.log("[PIO DEBUG]-[MESSAGE EVENT]",e),!this.__validMessage(e))return;let{data:i,event:n}=e.data;switch(n){case"state":if(console.log(this.__temporaryImage),i==="ready"){let d={event:"init",openedMode:(o=this.__config.container)==null?void 0:o.type,canSaveLocal:this.__config.canSaveLocal,token:this.__config.token,emitter:a.EMITTER_ID,image:this.__temporaryImage,size:this.__config.size,upgradeEvent:this.__config.upgradeEvent,closeButton:this.__config.closeButton,saveMenuList:this.__config.saveMenuList};this.__config.container.type==="iframe"?(h=this.__pixelContainer.contentWindow)==null||h.postMessage(d,a.DOMAIN):this.__pixelContainer.postMessage(d,a.DOMAIN)}break;case"image":this.emit("export",i);break;case"upgrade":this.emit("upgrade",i);break;case"closePixel":this.emit("close",i);break;case"clickLogo":this.emit("clickLogo",i);break;case"onSave":this.emit(i.eventName,i);break}}__validMessage(e){return["state","image","upgrade","closePixel","clickLogo","onSave"].includes(e.data.event)&&(0,r.isNotNil)(e.data.event)&&(0,r.isNotNil)(e.data.data)&&e.origin===a.DOMAIN}};a.DOMAIN="https://mb.pixel.swello.com",a.PIXEL_URI="https://mb.pixel.swello.com",a.EMITTER_ID="pixelio",a.PIO_VERSION="pio_version";var f=a;0&&(module.exports={Events,PixelIO});
