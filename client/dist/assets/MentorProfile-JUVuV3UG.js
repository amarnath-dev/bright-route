import{r as i,d as n,e as s,j as r,F as p}from"./index-53V0LXDS.js";import{N as c}from"./index-CH0WLvGP.js";import{M as l,a as d}from"./index-BO3SBxCJ.js";import"./Toast--zzEtCBL.js";import"./index-BgbaDIlu.js";import"./index-Bx6vw0Yl.js";/* empty css                     */import"./no-profile-image-7REqqSE_.js";import"./generateUtilityClasses-oiLjEtcH.js";import"./emotion-react.browser.esm-CgD427jE.js";import"./createSvgIcon-BZeXy2Qd.js";import"./createSvgIcon-DJj2mKgs.js";import"./useTimeout-Cz1pcatV.js";import"./ownerWindow-DwpiXt6R.js";import"./index-X6AV2xZD.js";import"./useTheme-BmvWw2F6.js";import"./Popper-3oetD8nm.js";import"./Popper-DSH3K3wY.js";import"./Grow-PPaRcPKt.js";import"./TransitionGroupContext-C_WAx2Kq.js";import"./X-tSyHmjta.js";const z=()=>{const[t,m]=i.useState(),e=n();return i.useEffect(()=>{(async()=>{var a;try{const o=await e.get("/mentor/profile",{withCredentials:!0});o.data&&m((a=o.data)==null?void 0:a.mentorDetails)}catch(o){console.log(o)}})()},[e]),s(p,{children:[r(c,{}),s("div",{className:"h-full grid grid-cols-12 bg-background-two",children:[r("div",{className:"col-span-12  md:col-span-4 px-10 py-10",children:r(l,{mentor:t||void 0,user:"mentor"})}),r("div",{className:"col-span-12 md:col-span-8 md:px-10 md:py-10",children:r(d,{mentor:t||void 0,user:"mentor"})})]})]})};export{z as default};