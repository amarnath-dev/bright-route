import{d as u,r as o,u as g,j as e,L as x,e as N,s as y,g as b}from"./index-3TceeTOD.js";import{d as v,a as w}from"./X-VtgU3mKr.js";import{d as _}from"./VideoChat-6gWqq7zb.js";import{d as P,a as I}from"./Payments-e_lB6bSR.js";import{f as M}from"./index-vkJcP6vC.js";import{N as $}from"./Navbar-XOTjCJtn.js";import"./generateUtilityClasses-lap0UWya.js";import"./createSvgIcon-GwF7MXM7.js";import"./createSvgIcon-SrMR24XR.js";import"./useTimeout-nvZZxNHc.js";import"./ownerWindow-J0v5-7PB.js";import"./Toast-Zzs0v0Ml.js";import"./index-fdt_ya2m.js";/* empty css                     */const H=()=>{const f=u(),[i,h]=o.useState([]),[p,m]=o.useState(!1),j=g();return o.useEffect(()=>{(async()=>{var a,l;try{const t=await f.get("/my-mentors",{withCredentials:!0});((a=t.data)==null?void 0:a.mentors.length)>0?h((l=t.data)==null?void 0:l.mentors):m(!0)}catch(t){console.log(t)}})()},[f]),o.useEffect(()=>{(async()=>{try{i==null||i.map(a=>{var t;const l=(t=a.mentorProfile[0])==null?void 0:t.profile_img;if(l){const r=N(y,l);b(r).then(c=>{a.newProfileImg=c;const d=document.getElementById("profile_img");d.src=c}).catch(c=>{console.log(c)})}})}catch(a){console.log(a)}})()},[i]),e.jsxs(e.Fragment,{children:[e.jsx($,{}),e.jsx("div",{className:"w-full h-screen md:h-screen bg-background-two",children:p===!0?e.jsxs("div",{className:"w-full h-screen flex justify-center items-center flex-col",children:[e.jsx("h1",{className:"text-2xl font-bold text-white",children:"Please Apply to a Mentor"}),e.jsx(x,{to:"/mentor/browse",className:"mt-5 rounded bg-color-one text-white border px-2 py-1",children:"Find Mentors"})]}):e.jsxs("div",{className:"px-5 md:px-10 md:py-10",children:[e.jsx("div",{className:"py-5 font-bold text-2xl",children:e.jsx("h1",{className:"text-white",children:"My Mentors"})}),e.jsx("hr",{}),e.jsx("div",{className:"flex w-full flex-wrap",children:i==null?void 0:i.map((s,a)=>{var l,t,r,c,d,n;return e.jsx("div",{children:e.jsxs("figure",{className:"md:w-96 min-h-full rounded-xl p-8 shadow-lg mt-2 ml-2 bg-gray-800",children:[e.jsxs("div",{className:"flex",children:[e.jsx("img",{className:"w-24 h-24 rounded-full object-cover",id:"profile_img",alt:"profile_img",src:(l=s==null?void 0:s.mentorProfile[0])==null?void 0:l.profile_img}),e.jsxs("div",{className:"px-2 py-2 font-bold",children:[e.jsxs("h1",{className:"text-xl text-white",children:[(t=s==null?void 0:s.mentorProfile[0])==null?void 0:t.first_name,(r=s==null?void 0:s.mentorProfile[0])==null?void 0:r.last_name]}),e.jsx("h1",{className:"mt-2 uppercase text-sm text-white",children:(c=s==null?void 0:s.mentorProfile[0])==null?void 0:c.job_title})]})]}),e.jsxs("div",{className:"flex justify-center",children:[e.jsx("a",{href:(d=s==null?void 0:s.mentorProfile[0])==null?void 0:d.linkedIn,children:e.jsx(v,{className:"text-blue-500"})}),e.jsx("a",{href:(n=s==null?void 0:s.mentorProfile[0])==null?void 0:n.twitter,className:"ml-10",children:e.jsx(w,{className:"text-gray-300"})})]}),e.jsx("div",{className:"pt-6 space-y-4",children:e.jsxs("figcaption",{children:[e.jsxs("div",{className:"flex justify-around",children:[e.jsx("button",{className:"border px-2 py-2 rounded-md text-black",onClick:()=>{j(`/my-mentors/paymentDetails/${s==null?void 0:s._id}`)},children:e.jsx(P,{className:"text-gray-300"})}),e.jsx(x,{to:`/chat/${s==null?void 0:s.mentor_id}`,className:"border px-2 py-2 rounded-md text-gray-300",children:e.jsx(I,{})}),e.jsx(x,{to:`/video/${s==null?void 0:s.mentor_id}`,className:"border px-2 py-2 rounded-md text-gray-300",target:"_blank",children:e.jsx(_,{})})]}),e.jsx("div",{className:"px-3",children:e.jsxs("h1",{className:"py-2 font-bold text-blue-400",children:[30-parseInt(M(s.createdAt))," Days Left"]})})]})})]},a)},a)})})]})})]})};export{H as default};
