import{r as i,d as n,e as s,j as r,F as p}from"./index-VB1ztP5L.js";import{N as c}from"./Navbar-mRL4TxZk.js";import{M as l,a as d}from"./MentorProfileCard-UZUdi9iB.js";import"./Toast-ZW0aV1Z-.js";import"./index-O38OIr24.js";import"./index-yYOzs5gN.js";/* empty css                     */import"./generateUtilityClasses-Xcbp_17J.js";import"./emotion-react.browser.esm-og8XBY_v.js";import"./createSvgIcon-i2M50TJl.js";import"./createSvgIcon-CWqY05YG.js";import"./useTimeout-LW8nS8R1.js";import"./ownerWindow-lrf5Pgpu.js";import"./index-dTkvNO40.js";import"./useTheme-k5nltdN_.js";import"./Popper-wkzofr_B.js";import"./Popper-lPK0hX6I.js";import"./Grow--HwX1zoG.js";import"./TransitionGroupContext-uLuSgAyf.js";import"./X-yvOrvRzo.js";const q=()=>{const[t,m]=i.useState(),e=n();return i.useEffect(()=>{(async()=>{var a;try{const o=await e.get("/mentor/profile",{withCredentials:!0});o.data&&m((a=o.data)==null?void 0:a.mentorDetails)}catch(o){console.log(o)}})()},[e]),s(p,{children:[r(c,{}),s("div",{className:"h-full grid grid-cols-12 bg-background-two",children:[r("div",{className:"col-span-12  md:col-span-4 px-10 py-10",children:r(l,{mentor:t||void 0,user:"mentor"})}),r("div",{className:"col-span-12 md:col-span-8 md:px-10 md:py-10",children:r(d,{mentor:t||void 0,user:"mentor"})})]})]})};export{q as default};
