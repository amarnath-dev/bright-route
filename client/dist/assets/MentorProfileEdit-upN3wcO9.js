import{u as v,r as i,d as k,f as C,g as _,e as l,j as e,F as S,Q as j,s as E,B as I}from"./index-xyBAIWCM.js";import{N as M,a as T}from"./Navbar-ScRbsOyN.js";/* empty css                  */import{C as U}from"./Croper-RTR8IhhV.js";import{A as B,T as L}from"./Autocomplete-tW7AeGAq.js";import{S as P}from"./Stack-qMRItYYN.js";import"./Toast-1vpy2OyA.js";import"./index-cd0F9izP.js";import"./index-M59_vQhv.js";/* empty css                     */import"./generateUtilityClasses-ssIc8VnD.js";import"./emotion-react.browser.esm-IvYARwPB.js";import"./createSvgIcon-9XCzrbMI.js";import"./createSvgIcon-GZcFohU8.js";import"./useTimeout-rBUMBjLc.js";import"./ownerWindow-Uj0lQL_r.js";import"./ButtonBase-ggA5pZYU.js";import"./TransitionGroupContext-QQDVufmX.js";import"./index-HvMrwQDe.js";import"./useTheme-2O6Ur3bO.js";import"./Grow-PGSM4P-E.js";import"./Popper-Vwtdciq9.js";import"./Paper-xdy8uHln.js";import"./Popper-BiZBeFSH.js";const ie=()=>{const u=v(),[n,b]=i.useState(),[d,m]=i.useState([]),c=k(),[h,f]=i.useState(!1),[t,g]=i.useState({first_name:"",last_name:"",mentorEmail:"",company:"",linkedIn:"",twitter:"",web_url:"",job_title:"",bio:"",category:"",state:""});console.log(f);const y=(a,r)=>{m(r)};i.useEffect(()=>{(async()=>{try{const r=await c.get("/mentor/profile",{withCredentials:!0});if(r.data){const o=r.data.mentorDetails;b(o);const w=o.skills.map(N=>({title:N}));m(w),g(o)}}catch(r){console.log(r)}})()},[h]),i.useEffect(()=>{const a=n==null?void 0:n.profile_img;if(a){const r=C(E,a);_(r).then(o=>{const p=document.getElementById("profile_img");p.src=o}).catch(o=>{console.log(o)})}},[n]);const x=async()=>{try{console.log("Button Clicked");const a=await c.post("/mentor/profile/update",{mentorData:t,defaultSkills:d},{withCredentials:!0});a.data.status==="success"&&(I(a.data.message),setTimeout(function(){u("/mentor/profile")},1e3))}catch(a){console.log(a)}},s=a=>{const{name:r,value:o}=a.target;g({...t,[r]:o})};return l(S,{children:[e(M,{}),e(j,{className:"w-40 md:w-80"}),l("div",{className:"w-full h-full flex-row md:flex md:items-center md:flex-col bg-background-two text-white",children:[e("div",{className:"w-full md:mt-10 rounded-lg flex flex-row",children:l("div",{className:"w-full h-full flex justify-center items-center flex-col px-2 py-2",children:[e("img",{alt:"profile_img",className:"w-36 h-36 rounded-full object-cover",id:"profile_img",src:T}),e("div",{className:"py-3",children:e(U,{})})]})}),l("div",{className:"w-full h-full md:w-2/3 mt-2 rounded-lg mb-72 md:mb-3 bg-background-two",children:[l("div",{className:"flex flex-col items-center md:flex-row md:justify-between px-2 py-2",children:[l("label",{children:[e("h1",{className:"text-gray-400",children:"First Name"}),e("input",{type:"text",id:"first_name",name:"first_name",className:"md:mb-6 bg-gray-800 border-gray-800 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5",value:t==null?void 0:t.first_name,onChange:s})]}),l("label",{className:"mt-2",children:[e("h1",{className:"text-gray-400",children:"Last Name"}),e("input",{type:"text",id:"last_name",name:"last_name",className:"md:mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5",value:t==null?void 0:t.last_name,onChange:s})]}),l("label",{className:"mt-2",children:[e("h1",{className:"text-gray-400",children:"Email"}),e("input",{type:"text",id:"email",name:"mentorEmail",className:"md:mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block mt-2 w-80 md:w-64 p-2.5",value:t==null?void 0:t.mentorEmail,onChange:s})]})]}),l("div",{className:"flex flex-col md:flex-row px-2 py-2 items-center md:justify-between",children:[l("label",{children:[e("h1",{className:"text-gray-400",children:"Company"}),e("input",{type:"text",id:"company",name:"company",className:"mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block mt-1 w-80 md:w-64 p-2.5",value:t==null?void 0:t.company,onChange:s})]}),l("label",{children:[e("h1",{className:"text-gray-400",children:"LinkedIn"}),e("input",{type:"text",id:"linkedIn",name:"linkedIn",className:"mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:t==null?void 0:t.linkedIn,onChange:s})]}),l("label",{children:[e("h1",{className:"text-gray-400",children:"Twitter"}),e("input",{type:"text",id:"twitter",name:"twitter",className:"mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:t==null?void 0:t.twitter,onChange:s})]})]}),l("div",{className:"flex flex-col md:flex-row md:px-2 md:py-2 items-center",children:[l("label",{children:[e("h1",{className:"text-gray-400",children:"Personal Website"}),e("input",{type:"text",id:"personal_web",name:"web_url",className:"mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:t==null?void 0:t.web_url,onChange:s})]}),l("label",{className:"md:ml-8",children:[e("h1",{className:"text-gray-400",children:"Job Title"}),e("input",{type:"text",id:"job_title",name:"job_title",className:"mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:t==null?void 0:t.job_title,onChange:s})]}),l("label",{className:"md:ml-8",children:[e("h1",{className:"text-gray-400",children:"State"}),e("input",{type:"text",id:"state",name:"state",className:"mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:t==null?void 0:t.state,onChange:s})]})]}),e("div",{className:"flex flex-col md:flex-row md:px-2 md:py-2 items-center",children:l("label",{children:[e("h1",{className:"font-bold ",children:"Select Category"}),l("select",{name:"category",id:"category",value:t==null?void 0:t.category,onChange:s,className:"placeholder:text-slate-400 bg-gray-800 block border border-gray-800 rounded-md mt-1 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 w-80 md:w-96 sm:text-sm",children:[e("option",{value:"null",children:"-------"}),e("option",{value:"Software Development",children:"Software Development"}),e("option",{value:"Engineering & Data",children:"Engineering & Data"}),e("option",{value:"UI & UX Design",children:"UI & UX Design"}),e("option",{value:"Bussiness & Managment",children:"Bussiness & Managment"}),e("option",{value:"Product & Marketing",children:"Product & Marketing"})]})]})})]}),l("div",{className:"md:w-2/3 md:mt-10 rounded-lg border px-2 py-2",children:[l("div",{className:"px-2 md:px-0",children:[e("label",{htmlFor:"message",className:"block py-2 text-sm font-medium",children:"ABOUT ME"}),e("textarea",{id:"bio",name:"bio",rows:10,defaultValue:t==null?void 0:t.bio,onChange:s,className:"block p-2.5 w-full text-lg rounded-lg focus:border-gray-800 bg-gray-800 text-white"})]}),e("h1",{className:"py-2 font-bold",children:"Update your Skills"}),l("div",{className:"px-1 py-1 bg-gray-300 rounded-md",children:[e(P,{spacing:3,className:"text-gray-400",children:e(B,{multiple:!0,id:"tags-standard",options:F,getOptionLabel:a=>a==null?void 0:a.title,value:d,onChange:y,filterOptions:(a,{inputValue:r})=>a.filter(o=>o.title.toLowerCase().includes(r.toLowerCase())),renderInput:a=>e(L,{...a,variant:"standard",className:"placeholder:text-white"})})}),e("div",{className:"flex justify-end py-4",children:e("button",{type:"button",className:"text-gray-90 font-medium rounded-lg text-sm px-5 py-2.5 me-2 bg-color-five text-white",onClick:x,children:"Update"})})]})]})]})]})},F=[{title:"Node js"},{title:"React"},{title:"HTML"},{title:"Typescript"},{title:"Mongodb"},{title:"Python"},{title:"Java"},{title:"Javascript"},{title:"Ruby"},{title:"Fortran"}];export{ie as default};
