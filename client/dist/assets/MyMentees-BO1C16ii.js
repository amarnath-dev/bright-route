import{r as m,d as w,u as v,a as p,e as r,j as t,F as u,L as x,f as _,s as b,g as A}from"./index-BYgA0YyO.js";import{d as k,a as D}from"./X-xrpTm-mH.js";import{d as I}from"./VideoChat-D0wkDQWQ.js";import{d as $,a as C}from"./Payments-tW0Eug3n.js";import{f as M}from"./index-m6tT0OeP.js";import{N as P}from"./index-A5dr_u1x.js";import"./generateUtilityClasses-DWLJeV-E.js";import"./emotion-react.browser.esm-DGzQ8Yl6.js";import"./createSvgIcon-DfSOjRaF.js";import"./createSvgIcon-DL-wqdZd.js";import"./useTimeout-R4jo1D6V.js";import"./ownerWindow-DnHtye5d.js";import"./Toast-DsRsFCBU.js";import"./index-BhP2Ci-3.js";/* empty css                     */import"./no-profile-image-7REqqSE_.js";const T=()=>{const[s,h]=m.useState([]),[g,N]=m.useState(!1),l=w(),y=v(),{user:a}=p(e=>e.userAuth);return m.useEffect(()=>{(async()=>{try{const e=await l.get("/mentor/menteeApplications",{withCredentials:!0});e.data.mentorApplication.length>0?h(e.data.mentorApplication):N(!0)}catch(e){console.log(e)}})()},[l]),m.useEffect(()=>{s&&(async()=>{try{const c=await Promise.all(s.map(async i=>{var d;const o=(d=i==null?void 0:i.menteeDetails)==null?void 0:d.profile_img;if(o){const f=_(b,o),n=await A(f);return{...i,profile_img:n}}else return i}));h(c)}catch(c){console.log(c)}})()},[s.length]),m.useEffect(()=>{s&&(s==null||s.map(e=>{(async()=>{await l.post("chat/conversation",{receiverId:e.mentee_id,senderId:a==null?void 0:a._id},{withCredentials:!0})})()}))},[l,s,a==null?void 0:a._id]),r(u,{children:[t(P,{}),t("div",{className:"w-full h-full md:h-screen bg-background-two",children:g===!0?t("div",{className:"w-full h-screen flex justify-center items-center flex-col",children:t("h1",{className:"text-3xl font-bold text-gray-400",children:"No Mentees have Applied Yet"})}):t(u,{children:r("div",{className:"px-2 md:px-10 md:py-10 w-full",children:[t("div",{className:"py-5 font-bold text-2xl",children:t("h1",{className:"text-white",children:"My Mentees"})}),t("hr",{}),t("div",{className:"flex flex-col md:flex-row w-full h-full flex-wrap py-3",children:s==null?void 0:s.map((e,c)=>{var i,o,d,f,n;return t("div",{className:"px-1",children:r("figure",{className:"md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg bg-gray-800 mt-2",children:[r("div",{className:"flex",children:[t("img",{className:"w-24 h-24 rounded-full object-cover",alt:"profile_img",src:e!=null&&e.profile_img?e==null?void 0:e.profile_img:"https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"}),r("div",{className:"px-2 py-2 font-bold",children:[r("h1",{className:"text-xl text-white",children:[(i=e==null?void 0:e.menteeDetails)==null?void 0:i.first_name,(o=e==null?void 0:e.menteeDetails)==null?void 0:o.last_name]}),t("h1",{className:"mt-2 uppercase text-sm text-white",children:(d=e==null?void 0:e.menteeDetails)==null?void 0:d.job_title})]})]}),r("div",{className:"flex justify-center",children:[t("a",{href:(f=e==null?void 0:e.menteeDetails)==null?void 0:f.linkedIn,children:t(k,{className:"text-blue-600"})}),t("a",{href:(n=e==null?void 0:e.menteeDetails)==null?void 0:n.twitter,className:"ml-10",children:t(D,{className:"text-gray-400"})})]}),t("div",{className:"pt-6 space-y-4",children:r("figcaption",{children:[r("div",{className:"flex justify-around",children:[t("button",{className:"border px-2 py-2 rounded-md text-black",onClick:()=>{y(`/mentor/mentees/paymentdetails/${e==null?void 0:e._id}`)},children:t($,{className:"text-gray-300"})}),t(x,{to:`/mentor/chat/${e==null?void 0:e.mentee_id}`,className:"border px-2 py-2 rounded-md text-black",children:t(C,{className:"text-gray-300"})}),t(x,{to:`/video/${e==null?void 0:e.mentee_id}`,className:"border px-2 py-2 rounded-md text-white",target:"_blank",children:t(I,{className:"text-gray-300"})})]}),t("div",{className:"px-3",children:r("h1",{className:"py-2 text-md font-bold text-blue-400",children:[30-parseInt(M(e==null?void 0:e.createdAt))," Days Left"]})})]})})]})},c)})})]})})})]})};export{T as default};
