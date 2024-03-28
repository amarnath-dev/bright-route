import{B as U,e as T,j as W,_ as a,D as L,k as q,E as H,F as M,H as A,I as J,w as K,J as z,m as Q,K as X,f as Y,a as Z,L as B,s as ee,u as te}from"./generateUtilityClasses-lap0UWya.js";import{r as D,j as oe,q as se}from"./index-3TceeTOD.js";const re=["ownerState"],ne=["variants"],ie=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ce(e){return Object.keys(e).length===0}function le(e){return typeof e=="string"&&e.charCodeAt(0)>96}function E(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ae=L(),ue=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function F({defaultTheme:e,theme:s,themeId:t}){return ce(s)?e:s[t]||s}function pe(e){return e?(s,t)=>t[e]:null}function O(e,s){let{ownerState:t}=s,n=T(s,re);const c=typeof e=="function"?e(a({ownerState:t},n)):e;if(Array.isArray(c))return c.flatMap(i=>O(i,a({ownerState:t},n)));if(c&&typeof c=="object"&&Array.isArray(c.variants)){const{variants:i=[]}=c;let p=T(c,ne);return i.forEach(o=>{let r=!0;typeof o.props=="function"?r=o.props(a({ownerState:t},n,t)):Object.keys(o.props).forEach(d=>{(t==null?void 0:t[d])!==o.props[d]&&n[d]!==o.props[d]&&(r=!1)}),r&&(Array.isArray(p)||(p=[p]),p.push(typeof o.style=="function"?o.style(a({ownerState:t},n,t)):o.style))}),p}return c}function de(e={}){const{themeId:s,defaultTheme:t=ae,rootShouldForwardProp:n=E,slotShouldForwardProp:c=E}=e,i=u=>q(a({},u,{theme:F(a({},u,{defaultTheme:t,themeId:s}))}));return i.__mui_systemSx=!0,(u,p={})=>{U(u,l=>l.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:o,slot:r,skipVariantsResolver:d,skipSx:S,overridesResolver:y=pe(ue(r))}=p,V=T(p,ie),w=d!==void 0?d:r&&r!=="Root"&&r!=="root"||!1,_=S||!1;let j,v=E;r==="Root"||r==="root"?v=n:r?v=c:le(u)&&(v=void 0);const k=W(u,a({shouldForwardProp:v,label:j},V)),C=l=>typeof l=="function"&&l.__emotion_real!==l||H(l)?m=>O(l,a({},m,{theme:F({theme:m.theme,defaultTheme:t,themeId:s})})):l,P=(l,...m)=>{let b=C(l);const x=m?m.map(C):[];o&&y&&x.push(h=>{const f=F(a({},h,{defaultTheme:t,themeId:s}));if(!f.components||!f.components[o]||!f.components[o].styleOverrides)return null;const R=f.components[o].styleOverrides,g={};return Object.entries(R).forEach(([G,I])=>{g[G]=O(I,a({},h,{theme:f}))}),y(h,g)}),o&&!w&&x.push(h=>{var f;const R=F(a({},h,{defaultTheme:t,themeId:s})),g=R==null||(f=R.components)==null||(f=f[o])==null?void 0:f.variants;return O({variants:g},a({},h,{theme:R}))}),_||x.push(i);const N=x.length-m.length;if(Array.isArray(l)&&N>0){const h=new Array(N).fill("");b=[...l,...h],b.raw=[...l.raw,...h]}const $=k(b,...x);return u.muiName&&($.muiName=u.muiName),$};return k.withConfig&&(P.withConfig=k.withConfig),P}}const fe=de(),me=["component","direction","spacing","divider","children","className","useFlexGap"],he=L(),ye=fe("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,s)=>s.root});function ve(e){return X({props:e,name:"MuiStack",defaultTheme:he})}function Se(e,s){const t=D.Children.toArray(e).filter(Boolean);return t.reduce((n,c,i)=>(n.push(c),i<t.length-1&&n.push(D.cloneElement(s,{key:`separator-${i}`})),n),[])}const ke=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],xe=({ownerState:e,theme:s})=>{let t=a({display:"flex",flexDirection:"column"},M({theme:s},A({values:e.direction,breakpoints:s.breakpoints.values}),n=>({flexDirection:n})));if(e.spacing){const n=J(s),c=Object.keys(s.breakpoints.values).reduce((o,r)=>((typeof e.spacing=="object"&&e.spacing[r]!=null||typeof e.direction=="object"&&e.direction[r]!=null)&&(o[r]=!0),o),{}),i=A({values:e.direction,base:c}),u=A({values:e.spacing,base:c});typeof i=="object"&&Object.keys(i).forEach((o,r,d)=>{if(!i[o]){const y=r>0?i[d[r-1]]:"column";i[o]=y}}),t=K(t,M({theme:s},u,(o,r)=>e.useFlexGap?{gap:B(n,o)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${ke(r?i[r]:e.direction)}`]:B(n,o)}}))}return t=z(s.breakpoints,t),t};function Re(e={}){const{createStyledComponent:s=ye,useThemeProps:t=ve,componentName:n="MuiStack"}=e,c=()=>Y({root:["root"]},o=>Z(n,o),{}),i=s(xe);return D.forwardRef(function(o,r){const d=t(o),S=Q(d),{component:y="div",direction:V="column",spacing:w=0,divider:_,children:j,className:v,useFlexGap:k=!1}=S,C=T(S,me),P={direction:V,spacing:w,useFlexGap:k},l=c();return oe.jsx(i,a({as:y,ownerState:P,ref:r,className:se(l.root,v)},C,{children:_?Se(j,_):j}))})}const _e=Re({createStyledComponent:ee("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,s)=>s.root}),useThemeProps:e=>te({props:e,name:"MuiStack"})}),Pe=_e;export{Pe as S};
