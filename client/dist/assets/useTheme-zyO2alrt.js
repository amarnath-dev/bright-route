import{_ as l,e as h,f as g,v as x,x as N,T as E}from"./generateUtilityClasses-DhbyLaEU.js";import{q as S}from"./index-DtWHIpjr.js";function k(e){return typeof e=="string"}function H(e,s,n){return e===void 0||k(e)?s:l({},s,{ownerState:l({},s.ownerState,n)})}function w(e,s=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(t=>t.match(/^on[A-Z]/)&&typeof e[t]=="function"&&!s.includes(t)).forEach(t=>{n[t]=e[t]}),n}function R(e,s,n){return typeof e=="function"?e(s,n):e}function P(e){if(e===void 0)return{};const s={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{s[n]=e[n]}),s}function T(e){const{getSlotProps:s,additionalProps:n,externalSlotProps:t,externalForwardedProps:o,className:a}=e;if(!s){const v=S(n==null?void 0:n.className,a,o==null?void 0:o.className,t==null?void 0:t.className),y=l({},n==null?void 0:n.style,o==null?void 0:o.style,t==null?void 0:t.style),m=l({},n,o,t);return v.length>0&&(m.className=v),Object.keys(y).length>0&&(m.style=y),{props:m,internalRef:void 0}}const d=w(l({},o,t)),i=P(t),c=P(o),r=s(d),u=S(r==null?void 0:r.className,n==null?void 0:n.className,a,o==null?void 0:o.className,t==null?void 0:t.className),f=l({},r==null?void 0:r.style,n==null?void 0:n.style,o==null?void 0:o.style,t==null?void 0:t.style),p=l({},r,n,c,i);return u.length>0&&(p.className=u),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:r.ref}}const _=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function W(e){var s;const{elementType:n,externalSlotProps:t,ownerState:o,skipResolvingSlotProps:a=!1}=e,d=h(e,_),i=a?{}:R(t,o),{props:c,internalRef:r}=T(l({},d,{externalSlotProps:i})),u=g(r,i==null?void 0:i.ref,(s=e.additionalProps)==null?void 0:s.ref);return H(n,l({},c,{ref:u}),o)}function A(){const e=x(N);return e[E]||e}export{H as a,W as b,w as e,k as i,A as u};