import{r as n,d as p,j as e,L as m}from"./index-nEkFjI82.js";import{M as g}from"./MentorPaymentCard-G8e_oFzs.js";import"./createSvgIcon-ITRgJRHf.js";import"./createSvgIcon-CZt11SCJ.js";import"./useThemeProps-D9wRHPMB.js";const k=()=>{const[s,h]=n.useState(null),[l,a]=n.useState(!1),r=p(),[u,o]=n.useState(null),[x,j]=n.useState(null),f=()=>{o(i=>!i)};return x&&location.reload(),n.useEffect(()=>{(async()=>{var c,d;const t=await r.get("/mentor/plans",{withCredentials:!0});t.data.status==="success"&&t.data.plans.planDetails.length>0?(a(!0),console.log("mentor Plans",(c=t==null?void 0:t.data)==null?void 0:c.plans),h((d=t==null?void 0:t.data)==null?void 0:d.plans)):a(!1)})()},[u,o,r]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"w-full h-full md:h-screen mb-10 md:mb-0",children:l?e.jsxs(e.Fragment,{children:[s!=null&&s.planDetails&&s.planDetails.length>=2?"":e.jsx("div",{className:"w-full h-12 flex justify-end items-center",children:e.jsx(m,{to:"/mentor/new-plan",className:"mr-6 md:mr-40 border-2 px-1 py-1 rounded-md text-white bg-color-one",children:"Create Plans"})}),e.jsx("div",{className:"w-full h-full flex justify-center items-center mt-6 md:mt-0",children:e.jsx(g,{mentorPlans:l?s:null,mentor:"mentor",onChildData:f})})]}):e.jsx("div",{className:"h-screen flex justify-center items-center",children:e.jsx("div",{className:"shadow-lg",children:e.jsxs("div",{className:"block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-black hover:bg-gray-100 dark:hover:bg-gray-200",children:[e.jsx("h5",{className:"mb-2 text-2xl font-bold tracking-tight",children:"You don't have any plans yet. Please create one"}),e.jsx("p",{className:"font-norma",children:"These plans will be visible to the mentees and they can purchase youre plan to Enroll for mentorship."}),e.jsx("div",{className:"mt-5",children:e.jsx(m,{to:"/mentor/new-plan",children:e.jsxs("div",{className:"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-color-one rounded-lg hover:bg-teal-900 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:bg-dark-700 cursor-pointer",children:["Create Plan",e.jsx("svg",{className:"rtl:rotate-180 w-3.5 h-3.5 ms-2","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 10",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M1 5h12m0 0L9 1m4 4L9 9"})})]})})})]})})})})})};export{k as default};
