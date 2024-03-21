import{j as e,z as w,h as _,d as P,r as x,u as S,a as E,B as R}from"./index-nEkFjI82.js";import{r as j,i as b}from"./createSvgIcon-ITRgJRHf.js";import k from"./Navbar-sImoaZyY.js";import"./createSvgIcon-CZt11SCJ.js";import"./useThemeProps-D9wRHPMB.js";import"./Toast-x_KjTGdi.js";import"./index-hAF_WlJz.js";import"./index-vODKYXwj.js";import"./index-CUx-uIXr.js";var h={},D=b;Object.defineProperty(h,"__esModule",{value:!0});var C=h.default=void 0,A=D(j()),T=e;C=h.default=(0,A.default)((0,T.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle");var y={},I=b;Object.defineProperty(y,"__esModule",{value:!0});var N=y.default=void 0,M=I(j()),z=e;N=y.default=(0,M.default)((0,z.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"}),"ContentCopy");var $=function(){var s=document.getSelection();if(!s.rangeCount)return function(){};for(var a=document.activeElement,t=[],c=0;c<s.rangeCount;c++)t.push(s.getRangeAt(c));switch(a.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":a.blur();break;default:a=null;break}return s.removeAllRanges(),function(){s.type==="Caret"&&s.removeAllRanges(),s.rangeCount||t.forEach(function(o){s.addRange(o)}),a&&a.focus()}},F=$,v={"text/plain":"Text","text/html":"Url",default:"Text"},U="Copy to clipboard: #{key}, Enter";function q(s){var a=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return s.replace(/#{\s*key\s*}/g,a)}function H(s,a){var t,c,o,m,u,n,f=!1;a||(a={}),t=a.debug||!1;try{o=F(),m=document.createRange(),u=document.getSelection(),n=document.createElement("span"),n.textContent=s,n.ariaHidden="true",n.style.all="unset",n.style.position="fixed",n.style.top=0,n.style.clip="rect(0, 0, 0, 0)",n.style.whiteSpace="pre",n.style.webkitUserSelect="text",n.style.MozUserSelect="text",n.style.msUserSelect="text",n.style.userSelect="text",n.addEventListener("copy",function(l){if(l.stopPropagation(),a.format)if(l.preventDefault(),typeof l.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var r=v[a.format]||v.default;window.clipboardData.setData(r,s)}else l.clipboardData.clearData(),l.clipboardData.setData(a.format,s);a.onCopy&&(l.preventDefault(),a.onCopy(l.clipboardData))}),document.body.appendChild(n),m.selectNodeContents(n),u.addRange(m);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");f=!0}catch(l){t&&console.error("unable to copy using execCommand: ",l),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(a.format||"text",s),a.onCopy&&a.onCopy(window.clipboardData),f=!0}catch(r){t&&console.error("unable to copy using clipboardData: ",r),t&&console.error("falling back to prompt"),c=q("message"in a?a.message:U),window.prompt(c,s)}}finally{u&&(typeof u.removeRange=="function"?u.removeRange(m):u.removeAllRanges()),n&&document.body.removeChild(n),o()}return f}var L=H;const V=w(L),Z=()=>{const{paymentId:s}=_(),a=P(),[t,c]=x.useState(null),[o,m]=x.useState(null),[u,n]=x.useState(),f=S(),{user:d}=E(r=>r.userAuth);x.useEffect(()=>{(async()=>{var i,p;try{const g=await a.get(`/mentor/paymentDetails/${s}`,{withCredentials:!0});n((p=(i=g.data)==null?void 0:i.paymentDetails)==null?void 0:p.mentee_id),c(g.data.paymentDetails)}catch(g){console.log(g)}})()},[a,s]),x.useEffect(()=>{t&&(async()=>{var p;const i=await a.get(`/mentor/plan/${t==null?void 0:t.mentor_plan_id}`);m((p=i.data)==null?void 0:p.plan)})()},[a,t]);const l=r=>{V(r)&&R.success("Copied to Clipboard")};return e.jsxs(e.Fragment,{children:[e.jsx(k,{}),e.jsx("div",{className:"w-full h-full bg-background-two text-gray-400",children:e.jsx("div",{className:"w-full h-full flex justify-center px-3 py-2",children:e.jsxs("figure",{className:"w-full h-full bg-gray-800 rounded-xl p-8 md:w-1/2 mt-10",children:[(d==null?void 0:d.role)==="mentor"?e.jsx("div",{className:"pt-6 space-y-4",children:e.jsxs("blockquote",{children:[e.jsx("p",{className:"text-lg font-medium",children:t==null?void 0:t.goal_of_mentorship}),e.jsxs("p",{className:"text-lg font-medium mt-2",children:[t==null?void 0:t.time_to_reach_goal,e.jsxs("div",{children:[e.jsx("small",{className:"text-gray-100 uppercase underline",children:"Message:"})," ",e.jsx("br",{}),e.jsx("p",{className:"",children:t==null?void 0:t.message_to_mentor})]})]})]})}):"",e.jsx("div",{className:"flex justify-center h-96 py-5 mt-2",children:e.jsxs("div",{className:"w-full rounded-md px-2 py-2 bg-gray-800",children:[e.jsx("h1",{className:"uppercase text-gray-400 font-bold",children:"Payment Details"}),e.jsx("hr",{}),e.jsxs("div",{children:[e.jsxs("h1",{className:"py-2 text-gray-400",children:["Status:",e.jsxs("span",{className:"text-green-700 font-bold px-2 bg-gray-800",children:["Completed ",e.jsx(C,{})]})]}),e.jsxs("h1",{className:"text-gray-400",children:["Amount:",e.jsx("span",{className:"font-bold text-green-700 px-2",children:o==null?void 0:o.planAmount})]}),e.jsxs("h1",{className:"mt-2 text-gray-400",children:["Plan Type:",e.jsx("span",{className:"font-bold px-2",children:o==null?void 0:o.planType})]}),e.jsxs("div",{className:"mt-3",children:[e.jsx("h1",{className:"text-gray-400",children:"Services:"}),o==null?void 0:o.planServices.map((r,i)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"py-1 text-gray-400",children:e.jsxs("h1",{className:"font-bold",children:[e.jsxs("span",{className:"px-1",children:[i+1,"."]}),r==null?void 0:r.serviceName,e.jsxs("span",{className:"px-2",children:[r!=null&&r.serviceCount?"Count - ":"",r!=null&&r.serviceCount?r.serviceCount:""]})]})},i)}))]}),e.jsx("h1",{className:"mt-2 text-gray-400",children:"Razor Pay ID"}),e.jsx("div",{className:"mt-1",children:e.jsx("span",{className:"cursor-pointer hover:bg-gray-300 rounded-full",children:e.jsxs("div",{children:[e.jsx("input",{className:"rounded px-2 py-2 bg-gray-800",value:t==null?void 0:t.razorPay_id,disabled:!0,type:"text"}),e.jsx("span",{className:"px-2",onClick:()=>l(t==null?void 0:t.razorPay_id),children:e.jsx(N,{className:"text-gray-300"})})]})})})]})]})}),e.jsx("div",{className:"text-center",children:(d==null?void 0:d.role)==="mentor"?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:e.jsx("button",{className:"bg-color-five w-full text-white px-5 py-2 rounded",onClick:()=>{f(`/my-mentors/mentor-profile/${t==null?void 0:t.mentor_id}`)},children:"Mentor Profile"})})})]})})})]})};export{Z as default};