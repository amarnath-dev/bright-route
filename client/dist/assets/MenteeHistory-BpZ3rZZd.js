import{d as u,r as l,u as g,e as i,j as t,F as f,L as y,f as N,s as w,g as v}from"./index-Cm1l80VI.js";import{a as p,N as _}from"./index-ivhPbSbW.js";import{d as b,a as D}from"./Payments-DukPKo4z.js";import"./Toast-CMvAk3ly.js";import"./index-q96PD-7x.js";import"./index-ByZ0f9l0.js";/* empty css                     */import"./generateUtilityClasses-CbuUGrSe.js";import"./emotion-react.browser.esm-EPQkPldl.js";import"./createSvgIcon-ZfMzdwQK.js";import"./createSvgIcon-CUMYJe6H.js";import"./useTimeout-BfMRyHkY.js";import"./ownerWindow-B806um-j.js";const B=()=>{const d=u(),[s,m]=l.useState(),h=g();return l.useEffect(()=>{(async()=>{try{const e=await d.get("/mentee/expired",{withCredentials:!0});console.log(e.data.expired),e.data.status==="success"&&m(e.data.expired)}catch(e){console.log(e)}})()},[d]),l.useEffect(()=>{s&&s.length>0&&(async()=>{try{const a=await Promise.all(s.map(async r=>{var c;const o=(c=r==null?void 0:r.mentorDetails)==null?void 0:c.profile_img;if(o){const n=N(w,o),x=await v(n);return{...r,profile_img:x}}else return r}));m(a)}catch(a){console.log(a)}})()},[s==null?void 0:s.length]),i(f,{children:[t(_,{}),t("div",{className:"w-full h-full md:h-screen bg-background-two",children:s&&(s==null?void 0:s.length)===0?t("div",{className:"w-full h-screen flex justify-center items-center flex-col",children:t("h1",{className:"text-3xl font-bold text-gray-400",children:"Your Mentor History is Empty"})}):t(f,{children:i("div",{className:"px-2 md:px-10 md:py-10 w-full",children:[t("div",{className:"py-5 font-bold text-2xl",children:t("h1",{className:"text-white",children:"My History"})}),t("hr",{}),t("div",{className:"flex flex-col md:flex-row w-full h-full flex-wrap py-3",children:s==null?void 0:s.map((e,a)=>{var r,o,c;return t("div",{className:"px-1",children:i("figure",{className:"md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg bg-gray-800 mt-2",children:[i("div",{className:"flex",children:[t("img",{className:"w-24 h-24 rounded-full object-cover",alt:"profile_img",src:e!=null&&e.profile_img?e==null?void 0:e.profile_img:p}),i("div",{className:"px-2 py-2 font-bold",children:[i("h1",{className:"text-xl text-white",children:[(r=e==null?void 0:e.mentorDetails)==null?void 0:r.first_name,(o=e==null?void 0:e.mentorDetails)==null?void 0:o.last_name]}),t("h1",{className:"mt-2 uppercase text-sm text-white",children:(c=e==null?void 0:e.mentorDetails)==null?void 0:c.job_title})]})]}),t("div",{className:"pt-6 space-y-4",children:i("figcaption",{children:[i("div",{className:"flex justify-around",children:[t("button",{className:"border px-2 py-2 rounded-md text-black",onClick:()=>{h(`/my-mentors/paymentDetails/${e==null?void 0:e._id}`)},children:t(b,{className:"text-gray-300"})}),t(y,{to:`/mentor/chat/${e==null?void 0:e.mentee_id}`,className:"border px-2 py-2 rounded-md text-black",children:t(D,{className:"text-gray-300"})})]}),t("div",{className:"px-3",children:t("h1",{className:"py-2 text-md font-bold text-red-400",children:"Plan Expired"})})]})})]})},a)})})]})})})]})};export{B as default};