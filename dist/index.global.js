"use strict";var PixelIOLib=(()=>{var _=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames,W=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var q=(r,e,t)=>e in r?_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,m=(r,e)=>{for(var t in e||(e={}))N.call(e,t)&&q(r,t,e[t]);if(W)for(var t of W(e))K.call(e,t)&&q(r,t,e[t]);return r};var V=(r,e)=>{for(var t in e)_(r,t,{get:e[t],enumerable:!0})},H=(r,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of X(e))!N.call(r,a)&&a!==t&&_(r,a,{get:()=>e[a],enumerable:!(o=F(e,a))||o.enumerable});return r};var $=r=>H(_({},"__esModule",{value:!0}),r);var ne={};V(ne,{Events:()=>I,PixelIO:()=>O});function i(r){return r!=null&&typeof r=="object"&&r["@@functional/placeholder"]===!0}function f(r){return function e(t){return arguments.length===0||i(t)?e:r.apply(this,arguments)}}function L(r){return function e(t,o){switch(arguments.length){case 0:return e;case 1:return i(t)?e:f(function(a){return r(t,a)});default:return i(t)&&i(o)?e:i(t)?f(function(a){return r(a,o)}):i(o)?f(function(a){return r(t,a)}):r(t,o)}}}var z=Array.isArray||function(e){return e!=null&&e.length>=0&&Object.prototype.toString.call(e)==="[object Array]"};function g(r){for(var e=[],t;!(t=r.next()).done;)e.push(t.value);return e}function h(r,e,t){for(var o=0,a=t.length;o<a;){if(r(e,t[o]))return!0;o+=1}return!1}function M(r){var e=String(r).match(/^function (\w*)/);return e==null?"":e[1]}function p(r,e){return Object.prototype.hasOwnProperty.call(e,r)}function J(r,e){return r===e?r!==0||1/r===1/e:r!==r&&e!==e}var y=typeof Object.is=="function"?Object.is:J;var R=Object.prototype.toString,Q=function(){return R.call(arguments)==="[object Arguments]"?function(e){return R.call(e)==="[object Arguments]"}:function(e){return p("callee",e)}}(),v=Q;var Y=!{toString:null}.propertyIsEnumerable("toString"),T=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],B=function(){"use strict";return arguments.propertyIsEnumerable("length")}(),Z=function(e,t){for(var o=0;o<e.length;){if(e[o]===t)return!0;o+=1}return!1},ee=typeof Object.keys=="function"&&!B?f(function(e){return Object(e)!==e?[]:Object.keys(e)}):f(function(e){if(Object(e)!==e)return[];var t,o,a=[],s=B&&v(e);for(t in e)p(t,e)&&(!s||t!=="length")&&(a[a.length]=t);if(Y)for(o=T.length-1;o>=0;)t=T[o],p(t,e)&&!Z(a,t)&&(a[a.length]=t),o-=1;return a}),b=ee;var te=f(function(e){return e===null?"Null":e===void 0?"Undefined":Object.prototype.toString.call(e).slice(8,-1)}),S=te;function D(r,e,t,o){var a=g(r),s=g(e);function l(u,c){return x(u,c,t.slice(),o.slice())}return!h(function(u,c){return!h(l,c,u)},s,a)}function x(r,e,t,o){if(y(r,e))return!0;var a=S(r);if(a!==S(e))return!1;if(typeof r["fantasy-land/equals"]=="function"||typeof e["fantasy-land/equals"]=="function")return typeof r["fantasy-land/equals"]=="function"&&r["fantasy-land/equals"](e)&&typeof e["fantasy-land/equals"]=="function"&&e["fantasy-land/equals"](r);if(typeof r.equals=="function"||typeof e.equals=="function")return typeof r.equals=="function"&&r.equals(e)&&typeof e.equals=="function"&&e.equals(r);switch(a){case"Arguments":case"Array":case"Object":if(typeof r.constructor=="function"&&M(r.constructor)==="Promise")return r===e;break;case"Boolean":case"Number":case"String":if(!(typeof r==typeof e&&y(r.valueOf(),e.valueOf())))return!1;break;case"Date":if(!y(r.valueOf(),e.valueOf()))return!1;break;case"Error":return r.name===e.name&&r.message===e.message;case"RegExp":if(!(r.source===e.source&&r.global===e.global&&r.ignoreCase===e.ignoreCase&&r.multiline===e.multiline&&r.sticky===e.sticky&&r.unicode===e.unicode))return!1;break}for(var s=t.length-1;s>=0;){if(t[s]===r)return o[s]===e;s-=1}switch(a){case"Map":return r.size!==e.size?!1:D(r.entries(),e.entries(),t.concat([r]),o.concat([e]));case"Set":return r.size!==e.size?!1:D(r.values(),e.values(),t.concat([r]),o.concat([e]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var l=b(r);if(l.length!==b(e).length)return!1;var u=t.concat([r]),c=o.concat([e]);for(s=l.length-1;s>=0;){var A=l[s];if(!(p(A,e)&&x(e[A],r[A],u,c)))return!1;s-=1}return!0}var re=L(function(e,t){return x(e,t,[],[])}),U=re;function w(r){return Object.prototype.toString.call(r)==="[object Object]"}function P(r){return Object.prototype.toString.call(r)==="[object String]"}var oe=f(function(e){return e==null}),d=oe;function j(r){var e=Object.prototype.toString.call(r);return e==="[object Uint8ClampedArray]"||e==="[object Int8Array]"||e==="[object Uint8Array]"||e==="[object Int16Array]"||e==="[object Uint16Array]"||e==="[object Int32Array]"||e==="[object Uint32Array]"||e==="[object Float32Array]"||e==="[object Float64Array]"||e==="[object BigInt64Array]"||e==="[object BigUint64Array]"}var ae=f(function(e){return e!=null&&typeof e["fantasy-land/empty"]=="function"?e["fantasy-land/empty"]():e!=null&&e.constructor!=null&&typeof e.constructor["fantasy-land/empty"]=="function"?e.constructor["fantasy-land/empty"]():e!=null&&typeof e.empty=="function"?e.empty():e!=null&&e.constructor!=null&&typeof e.constructor.empty=="function"?e.constructor.empty():z(e)?[]:P(e)?"":w(e)?{}:v(e)?function(){return arguments}():j(e)?e.constructor.from(""):void 0}),G=ae;var se=f(function(e){return e!=null&&U(e,G(e))}),k=se;var fe=f(function(e){return!d(e)}),E=fe;var C=class{constructor(){this.__listeners={}}on(e,t){this.__listeners[e]||(this.__listeners[e]=[]),this.__listeners[e].push(t)}only(e,t){this.__listeners[e]||(this.__listeners[e]=[t])}emit(e,...t){let o=this.__listeners[e];if(o)for(let a of o)a(...t)}off(e,t){let o=this.__listeners[e];o&&(this.__listeners[e]=o.filter(a=>a!==t))}once(e,t){let o=(...a)=>{this.off(e,o),t(...a)};this.on(e,o)}removeAllListeners(){this.__listeners={}}};var I=(a=>(a.EXPORT="export",a.UPGRADE="upgrade",a.CLOSE_PIXEL="close",a.CLICK_LOGO="clickLogo",a))(I||{});var n=class n extends C{constructor(t,o){super();this.__pixelContainer=null;this.__temporaryImage="";this.__pixelClass=[];let a={token:"",size:{width:800,height:600,restrict:!1},css:"",upgradeEvent:!1,canSaveLocal:!1,domain:"",closeButton:!1,saveMenuList:[],container:{type:"iframe",parameters:[]},debug:!1};this.__config=m(m(m({},a),typeof t=="string"?{token:t}:t),o||{}),this.css=this.__config.css,this.__listenner=this.__onReceivedMessage.bind(this)}open(t){var o;t!=null&&t.image&&(this.__temporaryImage=t.image),t!=null&&t.size&&(this.__config.size=t.size),this.__pixelContainer===null?(t!=null&&t.container&&(this.__config.container=t.container),this.__createContainer(this.__config.container),this.__createListeners()):((o=this.__config.container)==null?void 0:o.type)==="window"&&this.__pixelContainer.closed&&(this.__pixelContainer=null,this.open(t))}close(){var t;this.__pixelContainer&&(this.__config.container.type==="iframe"?(t=this.__pixelContainer.parentNode)==null||t.removeChild(this.__pixelContainer):this.__pixelContainer.close(),this.__pixelContainer=null)}set config(t){this.__config=m(m({},this.__config),t)}set token(t){this.__config.token=t}set size(t){this.__config.size=t}get size(){return this.__config.size}set domain(t){this.__config&&(this.__config.domain=t)}set css(t){this.__pixelClass=t?t.replace(/\s+/gm,",").split(","):[]}get css(){return this.__pixelClass||[]}get token(){return this.__config.token}set canSaveLocal(t){this.__config.canSaveLocal=t}get canSaveLocal(){return this.__config.canSaveLocal}get config(){return this.__config}addMenuItems(t){var o;d((o=this.__config)==null?void 0:o.saveMenuList)&&(this.__config.saveMenuList=[]),Array.isArray(t)?this.__config.saveMenuList=[...this.__config.saveMenuList,...t]:this.__config.saveMenuList=[...this.__config.saveMenuList,t]}removeMenuItems(t){if(k(this.__config.saveMenuList))throw new Error("La liste des menu est vide");let o=Array.isArray(t)?t.map(s=>typeof s=="string"?s:s.label):[typeof t=="string"?t:t.label],a=this.__config.saveMenuList.filter(s=>!o.includes(s.label));if(a.length===this.__config.saveMenuList.length)throw new Error("Menu non trouv\xE9, v\xE9rifier le label du menu");this.__config.saveMenuList=a}get menuItems(){return this.__config.saveMenuList}__createContainer(t){let o=n.PIXEL_URI;if(d(this.__config.domain))o=`${o}?t=${this.__config.token}`;else{if(this.__config.domain.trim()==="*")throw new Error("domaine * non autoris\xE9");o=`${o}?d=${this.__config.domain}&v=${n.PIO_VERSION}`}if(t.type==="iframe"){let a=t.parameters&&t.parameters.length>0?document.querySelector(t.parameters[0]):document.body;this.__pixelContainer=document.createElement("iframe"),this.__pixelContainer.src=o,this.__pixelClass.forEach(s=>this.__pixelContainer.classList.add(s)),a==null||a.appendChild(this.__pixelContainer);return}t.type==="window"&&(this.__pixelContainer=window.open.apply(null,t.parameters.length?[o,...t.parameters]:[o]))}__createListeners(){window.removeEventListener("message",this.__listenner),window.addEventListener("message",this.__listenner)}__onReceivedMessage(t){var s,l;if(this.__config.debug&&console.log("[PIO DEBUG]-[MESSAGE EVENT]",t),!this.__validMessage(t))return;let{data:o,event:a}=t.data;switch(a){case"state":if(console.log(this.__temporaryImage),o==="ready"){let u={event:"init",openedMode:(s=this.__config.container)==null?void 0:s.type,canSaveLocal:this.__config.canSaveLocal,token:this.__config.token,emitter:n.EMITTER_ID,image:this.__temporaryImage,size:this.__config.size,upgradeEvent:this.__config.upgradeEvent,closeButton:this.__config.closeButton,saveMenuList:this.__config.saveMenuList};this.__config.container.type==="iframe"?(l=this.__pixelContainer.contentWindow)==null||l.postMessage(u,n.DOMAIN):this.__pixelContainer.postMessage(u,n.DOMAIN)}break;case"image":this.emit("export",o);break;case"upgrade":this.emit("upgrade",o);break;case"closePixel":this.emit("close",o);break;case"clickLogo":this.emit("clickLogo",o);break;case"onSave":this.emit(o.eventName,o);break}}__validMessage(t){return["state","image","upgrade","closePixel","clickLogo","onSave"].includes(t.data.event)&&E(t.data.event)&&E(t.data.data)&&t.origin===n.DOMAIN}};n.DOMAIN="https://mb.pixel.swello.com",n.PIXEL_URI="https://mb.pixel.swello.com",n.EMITTER_ID="pixelio",n.PIO_VERSION="pio_version";var O=n;return $(ne);})();
