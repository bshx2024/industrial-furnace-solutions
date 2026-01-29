import{v as w,w as C,x as f,y as h,a as s}from"./chunk-IR6S3I6Y-DHUCMTBL.js";function v(t){return function(){const r={params:h(),loaderData:f(),actionData:C(),matches:w()};return s.createElement(t,r)}}/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,a)=>a?a.toUpperCase():r.toLowerCase()),i=t=>{const e=A(t);return e.charAt(0).toUpperCase()+e.slice(1)},u=(...t)=>t.filter((e,r,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===r).join(" ").trim(),x=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var L={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:a,className:n="",children:o,iconNode:l,...c},p)=>s.createElement("svg",{ref:p,...L,width:e,height:e,stroke:t,strokeWidth:a?Number(r)*24/Number(e):r,className:u("lucide",n),...!o&&!x(c)&&{"aria-hidden":"true"},...c},[...l.map(([m,d])=>s.createElement(m,d)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(t,e)=>{const r=s.forwardRef(({className:a,...n},o)=>s.createElement(b,{ref:o,iconNode:e,className:u(`lucide-${g(i(t))}`,`lucide-${t}`,a),...n}));return r.displayName=i(t),r};export{y as c,v as w};
