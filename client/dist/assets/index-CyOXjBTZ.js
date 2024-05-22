import{p as g,r as n,q as E,d as Pt,j as t,e as i,F as He,B as A,u as Rt,f as Ct,s as _t,g as Mt}from"./index-DtWHIpjr.js";import{j as qe,g as kt,a as jt,s as oe,_ as l,b as Ge,k as Ye,u as $t,e as Lt,f as Ot,h as Ft}from"./generateUtilityClasses-DhbyLaEU.js";import{r as Ke}from"./createSvgIcon-DLY8qKTy.js";import{u as St}from"./index-DJv0ynHC.js";import{u as It,a as B}from"./useTheme-zyO2alrt.js";import{P as Xe}from"./Popper-DUJ-onYv.js";import{u as W,a as We,T as Dt}from"./useTimeout-DbyD90bz.js";import{u as Et,a as At}from"./createSvgIcon-Crw48D2s.js";import{u as Bt}from"./ownerWindow-DoR9szSX.js";import{G as ze}from"./Grow-DtBLPCjI.js";import{a as Wt,d as zt}from"./X-CG44BvSK.js";import{N as Ut}from"./no-profile-image-7REqqSE_.js";var re={},Vt=qe;Object.defineProperty(re,"__esModule",{value:!0});var Je=re.default=void 0,Ht=Vt(Ke()),Ue=g;Je=re.default=(0,Ht.default)([(0,Ue.jsx)("path",{d:"M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z"},"0"),(0,Ue.jsx)("path",{d:"M11 7h2v6h-2zm0 8h2v2h-2z"},"1")],"ReportGmailerrorred");function qt(e){return jt("MuiTooltip",e)}const Gt=kt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),b=Gt,Yt=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function Kt(e){return Math.round(e*1e5)/1e5}const Xt=e=>{const{classes:o,disableInteractive:a,arrow:s,touch:p,placement:d}=e,m={popper:["popper",!a&&"popperInteractive",s&&"popperArrow"],tooltip:["tooltip",s&&"tooltipArrow",p&&"touch",`tooltipPlacement${Ge(d.split("-")[0])}`],arrow:["arrow"]};return Ft(m,qt,o)},Jt=oe(Xe,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,o)=>{const{ownerState:a}=e;return[o.popper,!a.disableInteractive&&o.popperInteractive,a.arrow&&o.popperArrow,!a.open&&o.popperClose]}})(({theme:e,ownerState:o,open:a})=>l({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!o.disableInteractive&&{pointerEvents:"auto"},!a&&{pointerEvents:"none"},o.arrow&&{[`&[data-popper-placement*="bottom"] .${b.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${b.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${b.arrow}`]:l({},o.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${b.arrow}`]:l({},o.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Qt=oe("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,o)=>{const{ownerState:a}=e;return[o.tooltip,a.touch&&o.touch,a.arrow&&o.tooltipArrow,o[`tooltipPlacement${Ge(a.placement.split("-")[0])}`]]}})(({theme:e,ownerState:o})=>l({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:Ye(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},o.arrow&&{position:"relative",margin:0},o.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${Kt(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${b.popper}[data-popper-placement*="left"] &`]:l({transformOrigin:"right center"},o.isRtl?l({marginLeft:"14px"},o.touch&&{marginLeft:"24px"}):l({marginRight:"14px"},o.touch&&{marginRight:"24px"})),[`.${b.popper}[data-popper-placement*="right"] &`]:l({transformOrigin:"left center"},o.isRtl?l({marginRight:"14px"},o.touch&&{marginRight:"24px"}):l({marginLeft:"14px"},o.touch&&{marginLeft:"24px"})),[`.${b.popper}[data-popper-placement*="top"] &`]:l({transformOrigin:"center bottom",marginBottom:"14px"},o.touch&&{marginBottom:"24px"}),[`.${b.popper}[data-popper-placement*="bottom"] &`]:l({transformOrigin:"center top",marginTop:"14px"},o.touch&&{marginTop:"24px"})})),Zt=oe("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,o)=>o.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:Ye(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let z=!1;const Ve=new Dt;let j={x:0,y:0};function U(e,o){return(a,...s)=>{o&&o(a,...s),e(a,...s)}}const eo=n.forwardRef(function(o,a){var s,p,d,m,v,x,P,ae,le,ie,ne,ce,pe,de,ue,me,he,fe,ge;const V=$t({props:o,name:"MuiTooltip"}),{arrow:be=!1,children:H,components:$={},componentsProps:w={},describeChild:Ze=!1,disableFocusListener:et=!1,disableHoverListener:ve=!1,disableInteractive:tt=!1,disableTouchListener:ot=!1,enterDelay:xe=100,enterNextDelay:we=0,enterTouchDelay:rt=700,followCursor:q=!1,id:st,leaveDelay:ye=0,leaveTouchDelay:at=1500,onClose:Ne,onOpen:Te,open:lt,placement:Pe="bottom",PopperComponent:G,PopperProps:y={},slotProps:N={},slots:L={},title:T,TransitionComponent:it=ze,TransitionProps:nt}=V,Re=Lt(V,Yt),f=n.isValidElement(H)?H:g.jsx("span",{children:H}),Ce=It(),ct=St(),[R,_e]=n.useState(),[Y,pt]=n.useState(null),O=n.useRef(!1),K=tt||q,Me=W(),X=W(),F=W(),ke=W(),[dt,je]=Et({controlled:lt,default:!1,name:"Tooltip",state:"open"});let h=dt;const J=Bt(st),C=n.useRef(),S=We(()=>{C.current!==void 0&&(document.body.style.WebkitUserSelect=C.current,C.current=void 0),ke.clear()});n.useEffect(()=>S,[S]);const $e=r=>{Ve.clear(),z=!0,je(!0),Te&&!h&&Te(r)},I=We(r=>{Ve.start(800+ye,()=>{z=!1}),je(!1),Ne&&h&&Ne(r),Me.start(Ce.transitions.duration.shortest,()=>{O.current=!1})}),D=r=>{O.current&&r.type!=="touchstart"||(R&&R.removeAttribute("title"),X.clear(),F.clear(),xe||z&&we?X.start(z?we:xe,()=>{$e(r)}):$e(r))},Q=r=>{X.clear(),F.start(ye,()=>{I(r)})},{isFocusVisibleRef:Le,onBlur:ut,onFocus:mt,ref:ht}=At(),[,Oe]=n.useState(!1),Fe=r=>{ut(r),Le.current===!1&&(Oe(!1),Q(r))},Se=r=>{R||_e(r.currentTarget),mt(r),Le.current===!0&&(Oe(!0),D(r))},Ie=r=>{O.current=!0;const c=f.props;c.onTouchStart&&c.onTouchStart(r)},ft=r=>{Ie(r),F.clear(),Me.clear(),S(),C.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",ke.start(rt,()=>{document.body.style.WebkitUserSelect=C.current,D(r)})},gt=r=>{f.props.onTouchEnd&&f.props.onTouchEnd(r),S(),F.start(at,()=>{I(r)})};n.useEffect(()=>{if(!h)return;function r(c){(c.key==="Escape"||c.key==="Esc")&&I(c)}return document.addEventListener("keydown",r),()=>{document.removeEventListener("keydown",r)}},[I,h]);const bt=Ot(f.ref,ht,_e,a);!T&&T!==0&&(h=!1);const Z=n.useRef(),vt=r=>{const c=f.props;c.onMouseMove&&c.onMouseMove(r),j={x:r.clientX,y:r.clientY},Z.current&&Z.current.update()},_={},ee=typeof T=="string";Ze?(_.title=!h&&ee&&!ve?T:null,_["aria-describedby"]=h?J:null):(_["aria-label"]=ee?T:null,_["aria-labelledby"]=h&&!ee?J:null);const u=l({},_,Re,f.props,{className:E(Re.className,f.props.className),onTouchStart:Ie,ref:bt},q?{onMouseMove:vt}:{}),M={};ot||(u.onTouchStart=ft,u.onTouchEnd=gt),ve||(u.onMouseOver=U(D,u.onMouseOver),u.onMouseLeave=U(Q,u.onMouseLeave),K||(M.onMouseOver=D,M.onMouseLeave=Q)),et||(u.onFocus=U(Se,u.onFocus),u.onBlur=U(Fe,u.onBlur),K||(M.onFocus=Se,M.onBlur=Fe));const xt=n.useMemo(()=>{var r;let c=[{name:"arrow",enabled:!!Y,options:{element:Y,padding:4}}];return(r=y.popperOptions)!=null&&r.modifiers&&(c=c.concat(y.popperOptions.modifiers)),l({},y.popperOptions,{modifiers:c})},[Y,y]),k=l({},V,{isRtl:ct,arrow:be,disableInteractive:K,placement:Pe,PopperComponentProp:G,touch:O.current}),te=Xt(k),De=(s=(p=L.popper)!=null?p:$.Popper)!=null?s:Jt,Ee=(d=(m=(v=L.transition)!=null?v:$.Transition)!=null?m:it)!=null?d:ze,Ae=(x=(P=L.tooltip)!=null?P:$.Tooltip)!=null?x:Qt,Be=(ae=(le=L.arrow)!=null?le:$.Arrow)!=null?ae:Zt,wt=B(De,l({},y,(ie=N.popper)!=null?ie:w.popper,{className:E(te.popper,y==null?void 0:y.className,(ne=(ce=N.popper)!=null?ce:w.popper)==null?void 0:ne.className)}),k),yt=B(Ee,l({},nt,(pe=N.transition)!=null?pe:w.transition),k),Nt=B(Ae,l({},(de=N.tooltip)!=null?de:w.tooltip,{className:E(te.tooltip,(ue=(me=N.tooltip)!=null?me:w.tooltip)==null?void 0:ue.className)}),k),Tt=B(Be,l({},(he=N.arrow)!=null?he:w.arrow,{className:E(te.arrow,(fe=(ge=N.arrow)!=null?ge:w.arrow)==null?void 0:fe.className)}),k);return g.jsxs(n.Fragment,{children:[n.cloneElement(f,u),g.jsx(De,l({as:G??Xe,placement:Pe,anchorEl:q?{getBoundingClientRect:()=>({top:j.y,left:j.x,right:j.x,bottom:j.y,width:0,height:0})}:R,popperRef:Z,open:R?h:!1,id:J,transition:!0},M,wt,{popperOptions:xt,children:({TransitionProps:r})=>g.jsx(Ee,l({timeout:Ce.transitions.duration.shorter},r,yt,{children:g.jsxs(Ae,l({},Nt,{children:[T,be?g.jsx(Be,l({},Tt,{ref:pt})):null]}))}))}))]})}),to=eo;function oo(e){const o=new Date;return new Date(e)>o}const ro=({open:e,setOpen:o,mentor:a})=>{const[s,p]=n.useState({issueFaced:"",issueDescription:"",date:""}),d=Pt(),m=x=>{p({...s,[x.target.name]:x.target.value})};return t(He,{children:e?t("div",{id:"crud-modal",tabIndex:-1,"aria-hidden":"true",className:"overflow-y-auto md:fixed overflow-x-hidden flex z-50 justify-center items-center w-full h-full md:inset-0 max-h-full",children:t("div",{className:"relative p-4 w-full max-w-md max-h-full rounded-lg bg-gray-800",children:i("div",{className:"relative rounded-lg shadow bg-gray-800",children:[i("div",{className:"flex items-center justify-between p-4 md:p-5 border-b rounded-t",children:[t("h3",{className:"text-lg font-semibold text-white",children:"Report Mentor"}),i("button",{onClick:()=>o(!1),type:"button",className:"text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-900","data-modal-toggle":"crud-modal",children:[t("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:t("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})}),t("span",{className:"sr-only",children:"Close Modal"})]})]}),i("form",{className:"p-4 md:p-5 bg-gray-800",onSubmit:async x=>{if(x.preventDefault(),!s.issueFaced||!s.issueDescription||!s.date){A.error("All fields are required");return}if(oo(s.date)){A.error("Selected date is in the future");return}const P=await d.post(`/report/mentor/${a==null?void 0:a.mentor_id}`,s,{withCredentials:!0});P.status===200?(A.success(P.data.message),p({issueFaced:"",issueDescription:"",date:""}),o(!1)):A.error("Report send Failed")},children:[i("div",{className:"grid gap-4 mb-4 grid-cols-2",children:[i("div",{className:"w-full flex flex-col",children:[t("label",{htmlFor:"countries",className:"block mb-2 text-sm font-medium text-white",children:"What issue do you faced ?"}),i("select",{id:"countries",name:"issueFaced",value:s==null?void 0:s.issueFaced,onChange:m,className:"bg-gray-800 border border-gray-300 text-md rounded-lg w-72 md:w-96 p-2.5 dark:placeholder-gray-400 text-white",children:[t("option",{children:"Choose the Type"}),t("option",{value:"Harrasment",children:"Harrasment"}),t("option",{value:"Rude Behaviour",children:"Rude Behaviour"}),t("option",{value:"Not Responding",children:"Not Responding"}),t("option",{value:"Other",children:"Other"})]})]}),i("div",{className:"col-span-2",children:[t("label",{htmlFor:"description",className:"block mb-2 text-sm font-medium text-white",children:"Describe the issue you Faced"}),t("textarea",{id:"description",name:"issueDescription",value:s==null?void 0:s.issueDescription,onChange:m,rows:4,className:"block p-2.5 w-full text-sm text-white rounded-lg bg-gray-800 border-2 border-gray-400 placeholder:text-gray-300",placeholder:"Write here..."})]})]}),t("div",{children:t("input",{type:"date",name:"date",value:s==null?void 0:s.date,onChange:m,className:"w-full rounded h-10 mb-6 indent-2 bg-gray-800 text-white"})}),t("div",{children:t("button",{type:"submit",className:"text-white flex items-center justify-center w-full bg-color-five font-medium rounded-lg text-md px-5 py-2.5",children:"Submit"})})]})]})})}):""})},wo=({mentor:e,user:o})=>{const[a,s]=n.useState(!1);return i(He,{children:[t("div",{className:"flex justify-center items-center",children:t(ro,{open:a,setOpen:s,mentor:e})}),i("div",{className:"md:h-full py-5 md:px-8 md:py-8 rounded-md",children:[i("div",{className:"px-2 md:px-0 relative",children:[t("div",{className:"absolute top-0 right-3",children:o==="mentee"?t("span",{className:"cursor-pointer",onClick:()=>s(!0),children:t(to,{title:"Report",children:t(Je,{className:"text-blue-500"})})}):""}),t("label",{htmlFor:"bio",className:"block mb-2 text-sm font-medium text-white",children:"ABOUT ME"}),t("textarea",{id:"bio",rows:12,disabled:!0,defaultValue:e==null?void 0:e.bio,className:"block p-2.5 w-full text-lg rounded-lg border border-gray-400 focus:border-gray text-white bg-background-two"})]}),i("div",{className:"mt-5 rounded-md px-2 py-2",children:[t("h1",{className:"block mb-2 text-lg font-medium text-white",children:"Skills"}),t("div",{className:"mt-3 h-full flex flex-wrap",children:e==null?void 0:e.skills.map((p,d)=>t("span",{className:"rounded-full bg-blue-200 px-6 py-1 ml-2 mb-2",style:{whiteSpace:"nowrap"},children:p},d))})]})]})]})};var se={},so=qe;Object.defineProperty(se,"__esModule",{value:!0});var Qe=se.default=void 0,ao=so(Ke()),lo=g;Qe=se.default=(0,ao.default)((0,lo.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39"}),"Public");const yo=({mentor:e,user:o})=>{const a=Rt(),[s,p]=n.useState("");return n.useEffect(()=>{const d=e==null?void 0:e.profile_img;if(d){const m=Ct(_t,d);Mt(m).then(v=>{p(v)}).catch(v=>{console.log(v)})}},[e]),i("div",{className:"rounded-md shadow-lg border border-gray-500 bg-background-two",children:[t("div",{className:"flex justify-center py-5",children:t("img",{alt:"mentor_image",id:"profile_img",src:s||Ut,className:"w-28 md:w-36 h-36 rounded-full px-2 py-2 border border-gray-400 object-cover"})}),t("div",{className:"flex justify-center",children:i("h1",{className:"font-bold text-xl py-1 text-white",children:[e==null?void 0:e.first_name," ",e==null?void 0:e.last_name]})}),t("div",{className:"flex justify-center",children:t("h1",{className:"text-md font-bold text-white",children:e==null?void 0:e.job_title})}),t("div",{className:"flex justify-center",children:t("h1",{className:"text-md py-2 text-white",children:e==null?void 0:e.mentorEmail})}),t("div",{className:"text-center",children:t("h1",{className:"underline text-white",children:e==null?void 0:e.company})}),t("div",{className:"text-center",children:i("h1",{className:"mt-3 text-sm text-white",children:[t(Qe,{className:"font-sm"}),e==null?void 0:e.state]})}),i("div",{className:"text-center mt-4 md:mt-8 mb-5 md:mb-0",children:[t("a",{href:e==null?void 0:e.twitter,target:"_blank",children:t(Wt,{className:"cursor-pointer text-gray-300"})}),t("a",{className:"ml-10",href:e==null?void 0:e.linkedIn,children:t(zt,{className:"cursor-pointer text-gray-300"})})]}),o==="mentor"?t("div",{className:"text-center mt-5 mb-5 md:mb-0 md:mt-9 py-5 px-5",children:t("button",{className:"text-gray-200 w-full bg-color-five py-2 rounded-full",onClick:()=>a("/mentor/profile/update"),children:"Update"})}):i("div",{className:"mb-4",children:[t("div",{className:"px-5",children:t("button",{className:"w-full px-1 py-2 rounded-full md:mt-5 mb-5 text-white bg-color-five",onClick:()=>a(`/chat/${e==null?void 0:e.mentor_id}`),children:"Message Mentor"})}),t("div",{className:"px-5 text-start",children:i("small",{className:"w-full font-bold text-white",children:["You can message ",e==null?void 0:e.first_name," to ask questions before booking their services."]})})]})]})};export{yo as M,wo as a};