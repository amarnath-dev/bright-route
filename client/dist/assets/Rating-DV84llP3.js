import{g as be,a as xe,s as D,b as ne,_ as l,d as Fe,u as Re,e as te,f as Ve,h as Ce,i as Ae}from"./generateUtilityClasses-oiLjEtcH.js";import{p as i,r as H,q as U}from"./index-53V0LXDS.js";import{u as Me}from"./index-X6AV2xZD.js";import{c as ie,u as Se,a as He}from"./createSvgIcon-DJj2mKgs.js";import{u as se}from"./ownerWindow-DwpiXt6R.js";const Le={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},we=Le,Ee=ie(i.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),je=ie(i.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");function ze(o){return xe("MuiRating",o)}const Ie=be("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]),$=Ie,$e=["value"],Oe=["className","defaultValue","disabled","emptyIcon","emptyLabelText","getLabelText","highlightSelectedOnly","icon","IconContainerComponent","max","name","onChange","onChangeActive","onMouseLeave","onMouseMove","precision","readOnly","size","value"];function Ne(o){const e=o.toString().split(".")[1];return e?e.length:0}function J(o,e){if(o==null)return o;const t=Math.round(o/e)*e;return Number(t.toFixed(Ne(e)))}const Pe=o=>{const{classes:e,size:t,readOnly:m,disabled:L,emptyValueFocused:y,focusVisible:v}=o,b={root:["root",`size${ne(t)}`,L&&"disabled",v&&"focusVisible",m&&"readOnly"],label:["label","pristine"],labelEmptyValue:[y&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return Ce(b,ze,e)},Te=D("span",{name:"MuiRating",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[{[`& .${$.visuallyHidden}`]:e.visuallyHidden},e.root,e[`size${ne(t.size)}`],t.readOnly&&e.readOnly]}})(({theme:o,ownerState:e})=>l({display:"inline-flex",position:"relative",fontSize:o.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",width:"min-content",WebkitTapHighlightColor:"transparent",[`&.${$.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${$.focusVisible} .${$.iconActive}`]:{outline:"1px solid #999"},[`& .${$.visuallyHidden}`]:we},e.size==="small"&&{fontSize:o.typography.pxToRem(18)},e.size==="large"&&{fontSize:o.typography.pxToRem(30)},e.readOnly&&{pointerEvents:"none"})),ae=D("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:o},e)=>[e.label,o.emptyValueFocused&&e.labelEmptyValueActive]})(({ownerState:o})=>l({cursor:"inherit"},o.emptyValueFocused&&{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"})),Be=D("span",{name:"MuiRating",slot:"Icon",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.icon,t.iconEmpty&&e.iconEmpty,t.iconFilled&&e.iconFilled,t.iconHover&&e.iconHover,t.iconFocus&&e.iconFocus,t.iconActive&&e.iconActive]}})(({theme:o,ownerState:e})=>l({display:"flex",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),pointerEvents:"none"},e.iconActive&&{transform:"scale(1.2)"},e.iconEmpty&&{color:(o.vars||o).palette.action.disabled})),ke=D("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:o=>Fe(o)&&o!=="iconActive",overridesResolver:(o,e)=>{const{iconActive:t}=o;return[e.decimal,t&&e.iconActive]}})(({iconActive:o})=>l({position:"relative"},o&&{transform:"scale(1.2)"}));function _e(o){const e=te(o,$e);return i.jsx("span",l({},e))}function oe(o){const{classes:e,disabled:t,emptyIcon:m,focus:L,getLabelText:y,highlightSelectedOnly:v,hover:b,icon:O,IconContainerComponent:w,isActive:N,itemValue:c,labelProps:E,name:x,onBlur:W,onChange:F,onClick:R,onFocus:P,readOnly:T,ownerState:a,ratingValue:u,ratingValueRounded:X}=o,V=v?c===u:c<=u,B=c<=b,C=c<=L,q=c===X,j=se(),h=i.jsx(Be,{as:w,value:c,className:U(e.icon,V?e.iconFilled:e.iconEmpty,B&&e.iconHover,C&&e.iconFocus,N&&e.iconActive),ownerState:l({},a,{iconEmpty:!V,iconFilled:V,iconHover:B,iconFocus:C,iconActive:N}),children:m&&!V?m:O});return T?i.jsx("span",l({},E,{children:h})):i.jsxs(H.Fragment,{children:[i.jsxs(ae,l({ownerState:l({},a,{emptyValueFocused:void 0}),htmlFor:j},E,{children:[h,i.jsx("span",{className:e.visuallyHidden,children:y(c)})]})),i.jsx("input",{className:e.visuallyHidden,onFocus:P,onBlur:W,onChange:F,onClick:R,disabled:t,value:c,id:j,type:"radio",name:x,checked:q})]})}const Ue=i.jsx(Ee,{fontSize:"inherit"}),De=i.jsx(je,{fontSize:"inherit"});function We(o){return`${o} Star${o!==1?"s":""}`}const Xe=H.forwardRef(function(e,t){const m=Re({name:"MuiRating",props:e}),{className:L,defaultValue:y=null,disabled:v=!1,emptyIcon:b=De,emptyLabelText:O="Empty",getLabelText:w=We,highlightSelectedOnly:N=!1,icon:c=Ue,IconContainerComponent:E=_e,max:x=5,name:W,onChange:F,onChangeActive:R,onMouseLeave:P,onMouseMove:T,precision:a=1,readOnly:u=!1,size:X="medium",value:V}=m,B=te(m,Oe),C=se(W),[q,j]=Se({controlled:V,default:y,name:"Rating"}),h=J(q,a),le=Me(),[{hover:d,focus:k},z]=H.useState({hover:-1,focus:-1});let A=h;d!==-1&&(A=d),k!==-1&&(A=k);const{isFocusVisibleRef:K,onBlur:ce,onFocus:re,ref:ue}=He(),[de,Y]=H.useState(!1),Q=H.useRef(),pe=Ve(ue,Q,t),me=n=>{T&&T(n);const s=Q.current,{right:r,left:_,width:M}=s.getBoundingClientRect();let S;le?S=(r-n.clientX)/M:S=(n.clientX-_)/M;let p=J(x*S+a/2,a);p=Ae(p,a,x),z(g=>g.hover===p&&g.focus===p?g:{hover:p,focus:p}),Y(!1),R&&d!==p&&R(n,p)},fe=n=>{P&&P(n);const s=-1;z({hover:s,focus:s}),R&&d!==s&&R(n,s)},Z=n=>{let s=n.target.value===""?null:parseFloat(n.target.value);d!==-1&&(s=d),j(s),F&&F(n,s)},ve=n=>{n.clientX===0&&n.clientY===0||(z({hover:-1,focus:-1}),j(null),F&&parseFloat(n.target.value)===h&&F(n,null))},he=n=>{re(n),K.current===!0&&Y(!0);const s=parseFloat(n.target.value);z(r=>({hover:r.hover,focus:s}))},ge=n=>{if(d!==-1)return;ce(n),K.current===!1&&Y(!1);const s=-1;z(r=>({hover:r.hover,focus:s}))},[ye,ee]=H.useState(!1),I=l({},m,{defaultValue:y,disabled:v,emptyIcon:b,emptyLabelText:O,emptyValueFocused:ye,focusVisible:de,getLabelText:w,icon:c,IconContainerComponent:E,max:x,precision:a,readOnly:u,size:X}),f=Pe(I);return i.jsxs(Te,l({ref:pe,onMouseMove:me,onMouseLeave:fe,className:U(f.root,L,u&&"MuiRating-readOnly"),ownerState:I,role:u?"img":null,"aria-label":u?w(A):null},B,{children:[Array.from(new Array(x)).map((n,s)=>{const r=s+1,_={classes:f,disabled:v,emptyIcon:b,focus:k,getLabelText:w,highlightSelectedOnly:N,hover:d,icon:c,IconContainerComponent:E,name:C,onBlur:ge,onChange:Z,onClick:ve,onFocus:he,ratingValue:A,ratingValueRounded:h,readOnly:u,ownerState:I},M=r===Math.ceil(A)&&(d!==-1||k!==-1);if(a<1){const S=Array.from(new Array(1/a));return i.jsx(ke,{className:U(f.decimal,M&&f.iconActive),ownerState:I,iconActive:M,children:S.map((p,g)=>{const G=J(r-1+(g+1)*a,a);return i.jsx(oe,l({},_,{isActive:!1,itemValue:G,labelProps:{style:S.length-1===g?{}:{width:G===A?`${(g+1)*a*100}%`:"0%",overflow:"hidden",position:"absolute"}}}),G)})},r)}return i.jsx(oe,l({},_,{isActive:M,itemValue:r}),r)}),!u&&!v&&i.jsxs(ae,{className:U(f.label,f.labelEmptyValue),ownerState:I,children:[i.jsx("input",{className:f.visuallyHidden,value:"",id:`${C}-empty`,type:"radio",name:C,checked:h==null,onFocus:()=>ee(!0),onBlur:()=>ee(!1),onChange:Z}),i.jsx("span",{className:f.visuallyHidden,children:O})]})]}))}),Qe=Xe;export{Qe as R};