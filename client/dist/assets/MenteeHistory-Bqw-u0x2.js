import{d as u,r as l,u as g,e as i,j as t,F as f,L as N,f as y,s as w,g as v}from"./index-BYgA0YyO.js";import{N as p}from"./index-A5dr_u1x.js";import{d as _,a as b}from"./Payments-tW0Eug3n.js";import{N as D}from"./no-profile-image-7REqqSE_.js";import"./Toast-DsRsFCBU.js";import"./index-BhP2Ci-3.js";import"./index-m6tT0OeP.js";/* empty css                     */import"./generateUtilityClasses-DWLJeV-E.js";import"./emotion-react.browser.esm-DGzQ8Yl6.js";import"./createSvgIcon-DfSOjRaF.js";import"./createSvgIcon-DL-wqdZd.js";import"./useTimeout-R4jo1D6V.js";import"./ownerWindow-DnHtye5d.js";const S=()=>{const m=u(),[s,d]=l.useState(),h=g();return l.useEffect(()=>{(async()=>{try{const e=await m.get("/mentee/expired",{withCredentials:!0});console.log(e.data.expired),e.data.status==="success"&&d(e.data.expired)}catch(e){console.log(e)}})()},[m]),l.useEffect(()=>{s&&s.length>0&&(async()=>{try{const a=await Promise.all(s.map(async r=>{var c;const o=(c=r==null?void 0:r.mentorDetails)==null?void 0:c.profile_img;if(o){const n=y(w,o),x=await v(n);return{...r,profile_img:x}}else return r}));d(a)}catch(a){console.log(a)}})()},[s==null?void 0:s.length]),i(f,{children:[t(p,{}),t("div",{className:"w-full h-full md:h-screen bg-background-two",children:s&&(s==null?void 0:s.length)===0?t("div",{className:"w-full h-screen flex justify-center items-center flex-col",children:t("h1",{className:"text-3xl font-bold text-gray-400",children:"Your Mentor History is Empty"})}):t(f,{children:i("div",{className:"px-2 md:px-10 md:py-10 w-full",children:[t("div",{className:"py-5 font-bold text-2xl",children:t("h1",{className:"text-white",children:"My History"})}),t("hr",{}),t("div",{className:"flex flex-col md:flex-row w-full h-full flex-wrap py-3",children:s==null?void 0:s.map((e,a)=>{var r,o,c;return t("div",{className:"px-1",children:i("figure",{className:"md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg bg-gray-800 mt-2",children:[i("div",{className:"flex",children:[t("img",{className:"w-24 h-24 rounded-full object-cover",alt:"profile_img",src:e!=null&&e.profile_img?e==null?void 0:e.profile_img:D}),i("div",{className:"px-2 py-2 font-bold",children:[i("h1",{className:"text-xl text-white",children:[(r=e==null?void 0:e.mentorDetails)==null?void 0:r.first_name,(o=e==null?void 0:e.mentorDetails)==null?void 0:o.last_name]}),t("h1",{className:"mt-2 uppercase text-sm text-white",children:(c=e==null?void 0:e.mentorDetails)==null?void 0:c.job_title})]})]}),t("div",{className:"pt-6 space-y-4",children:i("figcaption",{children:[i("div",{className:"flex justify-around",children:[t("button",{className:"border px-2 py-2 rounded-md text-black",onClick:()=>{h(`/my-mentors/paymentDetails/${e==null?void 0:e._id}`)},children:t(_,{className:"text-gray-300"})}),t(N,{to:`/mentor/chat/${e==null?void 0:e.mentee_id}`,className:"border px-2 py-2 rounded-md text-black",children:t(b,{className:"text-gray-300"})})]}),t("div",{className:"px-3",children:t("h1",{className:"py-2 text-md font-bold text-red-400",children:"Plan Expired"})})]})})]})},a)})})]})})})]})};export{S as default};
