import{r as o,d as j,u as N,a as y,i as v,k as _,j as t,L as n,l as p}from"./index-nEkFjI82.js";import{d as w,a as b}from"./X-BrFi4Akf.js";import{d as A,a as k,b as D}from"./Payments-hq3vb-v9.js";import{f as $}from"./index-vODKYXwj.js";import"./createSvgIcon-ITRgJRHf.js";import"./createSvgIcon-CZt11SCJ.js";import"./useThemeProps-D9wRHPMB.js";const M=()=>{const[s,f]=o.useState([]),[h,u]=o.useState(!1),d=j(),g=N(),{user:a}=y(e=>e.userAuth);return o.useEffect(()=>{(async()=>{try{const i=await d.get("/mentor/menteeApplications",{withCredentials:!0});i.data.mentorApplication.length>0?(console.log(i.data.mentorApplication),f(i.data.mentorApplication)):u(!0)}catch(i){console.log(i)}})()},[d]),o.useEffect(()=>{s&&(s==null||s.map(e=>{var c;const i=(c=e==null?void 0:e.menteeDetails[0])==null?void 0:c.profile_img;if(i){const l=v(p,i);_(l).then(r=>{const m=document.getElementById("profile_img");m.src=r}).catch(r=>{console.log(r)})}}))},[s]),o.useEffect(()=>{s&&(s==null||s.map(e=>{(async()=>{await d.post("chat/conversation",{receiverId:e.mentee_id,senderId:a==null?void 0:a._id},{withCredentials:!0})})()}))},[d,s,a==null?void 0:a._id]),t.jsx(t.Fragment,{children:t.jsx("div",{className:"w-full h-screen bg-background-two",children:h===!0?t.jsx("div",{className:"w-full h-screen flex justify-center items-center flex-col",children:t.jsx("h1",{className:"text-3xl font-bold text-gray-400",children:"No Mentees have Applied Yet"})}):t.jsx(t.Fragment,{children:t.jsxs("div",{className:"px-2 md:px-10 md:py-10 w-full",children:[t.jsx("div",{className:"py-5 font-bold text-2xl",children:t.jsx("h1",{className:"text-gray-400",children:"My Mentees"})}),t.jsx("hr",{}),t.jsx("div",{className:"flex w-full h-full flex-wrap py-3",children:s==null?void 0:s.map((e,i)=>{var c,l,r,m,x;return t.jsx("div",{children:t.jsxs("figure",{className:"md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg mt-2 ml-2 bg-gray-800",children:[t.jsxs("div",{className:"flex",children:[t.jsx("img",{className:"w-24 h-24 rounded-full object-cover",id:"profile_img",alt:"profile_img"}),t.jsxs("div",{className:"px-2 py-2 font-bold",children:[t.jsxs("h1",{className:"text-xl text-gray-400",children:[(c=e==null?void 0:e.menteeDetails[0])==null?void 0:c.first_name,(l=e==null?void 0:e.menteeDetails[0])==null?void 0:l.last_name]}),t.jsx("h1",{className:"mt-2 uppercase text-sm text-gray-400",children:(r=e==null?void 0:e.menteeDetails[0])==null?void 0:r.job_title})]})]}),t.jsxs("div",{className:"flex justify-center",children:[t.jsx("a",{href:(m=e==null?void 0:e.menteeDetails[0])==null?void 0:m.linkedIn,children:t.jsx(w,{className:"text-blue-600"})}),t.jsx("a",{href:(x=e==null?void 0:e.menteeDetails[0])==null?void 0:x.twitter,className:"ml-10",children:t.jsx(b,{className:"text-gray-400"})})]}),t.jsx("div",{className:"pt-6 space-y-4",children:t.jsxs("figcaption",{children:[t.jsxs("div",{className:"flex justify-around",children:[t.jsx("button",{className:"border px-2 py-2 rounded-md text-black",onClick:()=>{g(`/mentor/mentees/paymentdetails/${e==null?void 0:e._id}`)},children:t.jsx(A,{className:"text-gray-400"})}),t.jsx(n,{to:`/mentor/chat/${e==null?void 0:e.mentee_id}`,className:"border px-2 py-2 rounded-md text-black",children:t.jsx(k,{className:"text-gray-400"})}),t.jsx(n,{to:`/video/${e==null?void 0:e.mentee_id}`,className:"border px-2 py-2 rounded-md text-white",target:"_blank",children:t.jsx(D,{className:"text-gray-400"})})]}),t.jsx("div",{className:"px-3",children:t.jsx("h1",{className:"py-2 text-gray-400",children:$(e==null?void 0:e.createdAt)})})]})})]})},i)})})]})})})})};export{M as default};
