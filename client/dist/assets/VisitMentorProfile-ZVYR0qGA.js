import{h as d,r as s,d as f,R as u,j as t}from"./index-nEkFjI82.js";import x from"./MentorAboutSkill-_2OM_sox.js";import h from"./MentorProfileCard-YFdWF8rZ.js";import{M as j}from"./MentorPaymentCard-G8e_oFzs.js";import g from"./Navbar-sImoaZyY.js";import"./createSvgIcon-ITRgJRHf.js";import"./createSvgIcon-CZt11SCJ.js";import"./useThemeProps-D9wRHPMB.js";import"./Grow-DGXbxFAL.js";import"./TransitionGroupContext-RdiAp6eB.js";import"./Popper-1yQ6vayZ.js";import"./X-BrFi4Akf.js";import"./Toast-x_KjTGdi.js";import"./index-hAF_WlJz.js";import"./index-vODKYXwj.js";import"./index-CUx-uIXr.js";const $=()=>{const{mentorId:r}=d(),[n,m]=s.useState(),o=f(),i=u.useRef(null),[l,p]=s.useState(null);return s.useEffect(()=>{(async()=>{try{const e=await o.get(`/visit/mentor-profile/${r}`,{withCredentials:!0});e.data&&m(e.data.mentorDetails)}catch(e){console.log(e)}})()},[o,r]),s.useEffect(()=>{(async()=>{var c;const e=await o.get(`/mentor/plans/${r}`,{withCredentials:!0});e.data.status==="success"&&p((c=e==null?void 0:e.data)==null?void 0:c.plans)})()},[o,r]),s.useEffect(()=>{var a;(a=i.current)==null||a.scrollIntoView({behavior:"smooth"})},[]),t.jsxs(t.Fragment,{children:[t.jsx(g,{}),t.jsxs("div",{className:"h-full grid grid-cols-12 bg-background-two",ref:i,children:[t.jsx("div",{className:"col-span-12 px-3 py-3 md:col-span-4 md:px-10 md:py-10",children:t.jsx(h,{mentor:n,user:"mentee"})}),t.jsx("div",{className:"col-span-12 md:col-span-8 md:px-10 md:py-10",children:t.jsx(x,{mentor:n,user:"mentee"})})]}),t.jsx("div",{className:"flex justify-center bg-background-two",children:t.jsx(j,{mentorPlans:l,mentor:"",onChildData:()=>{}})})]})};export{$ as default};
