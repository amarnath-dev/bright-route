import{u as G,r,d as K,i as A,k as Z,j as e,Q as $,B as w,n as D,A as ee,l as T}from"./index-nEkFjI82.js";import{B as te,d as se,X as le,y as ae,I as re,H as ne}from"./index-h0EcBXIo.js";/* empty css                  */import oe from"./Navbar-sImoaZyY.js";import{s as ie}from"./useThemeProps-D9wRHPMB.js";import{S as de}from"./Stack-RZC7eEFs.js";import{A as ce,T as me}from"./TextField-iVzS4asI.js";import"./ButtonBase-GRd7ZKIp.js";import"./TransitionGroupContext-RdiAp6eB.js";import"./createSvgIcon-CZt11SCJ.js";import"./createSvgIcon-ITRgJRHf.js";import"./Toast-x_KjTGdi.js";import"./index-hAF_WlJz.js";import"./index-vODKYXwj.js";import"./index-CUx-uIXr.js";import"./Popper-1yQ6vayZ.js";import"./Grow-DGXbxFAL.js";import"./Paper-MaUoLits.js";const ue=ie("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:1}),Ue=()=>{const B=G(),[c,P]=r.useState(),[j,y]=r.useState([]),v=K(),[C,F]=r.useState(""),[m,k]=r.useState(16/9),[O,u]=r.useState(),g=r.useRef(null),[o,N]=r.useState(),S=r.useRef(null),p=r.useRef(""),b=r.useRef(null),[_,f]=r.useState(!1),[s,I]=r.useState({first_name:"",last_name:"",mentorEmail:"",company:"",linkedIn:"",twitter:"",web_url:"",job_title:"",bio:"",category:"",state:""}),H=(t,l)=>{y(l)};r.useEffect(()=>{(async()=>{try{const l=await v.get("/mentor/profile",{withCredentials:!0});if(l.data){const a=l.data.mentorDetails;P(a);const i=a.skills.map(x=>({title:x}));y(i),I(a)}}catch(l){console.log(l)}})()},[_]),r.useEffect(()=>{const t=c==null?void 0:c.profile_img;if(t){const l=A(T,t);Z(l).then(a=>{const h=document.getElementById("profile_img");h.src=a}).catch(a=>{console.log(a)})}},[c]);const V=async()=>{try{console.log("Button Clicked");const t=await v.post("/mentor/profile/update",{mentorData:s,defaultSkills:j},{withCredentials:!0});t.data.status==="success"&&(w(t.data.message),setTimeout(function(){B("/mentor/profile")},1e3))}catch(t){console.log(t)}};function R(t,l,a){return re(ne({unit:"%",width:90},a,t,l),t,l)}const X=t=>{if(t.target.files&&t.target.files.length>0){u(void 0);const l=new FileReader;l.addEventListener("load",()=>{var a;F(((a=l.result)==null?void 0:a.toString())||"")}),l.readAsDataURL(t.target.files[0])}},J=t=>{if(m){const{width:l,height:a}=t.currentTarget;u(R(l,a,m))}};function z(){if(m)k(void 0);else if(k(16/9),g.current){const{width:t,height:l}=g.current,a=R(t,l,16/9);u(a),N(ae(a,t,l))}}async function Q(){var L,U;const t=g.current,l=S.current;if(!t||!l||!o)throw new Error("Crop canvas does not exist");const a=t.naturalWidth/t.width,h=t.naturalHeight/t.height,i=new OffscreenCanvas(o.width*a,o.height*h),x=i.getContext("2d");if(!x)throw new Error("No 2d context");x.drawImage(l,0,0,l.width,l.height,0,0,i.width,i.height);const E=await i.convertToBlob({type:"image/png"});if(p.current&&URL.revokeObjectURL(p.current),p.current=URL.createObjectURL(E),b.current){b.current.href=p.current;const W=Math.random().toString(16).slice(2)+(new Date().getTime()/1e3).toString(),Y=A(T,W),M=await D(Y,E);if(M.metadata){const q=M.metadata.fullPath,d=await ee.post("/mentor/profile/profileImg-update",{img_firebase_id:q},{withCredentials:!0});((L=d==null?void 0:d.data)==null?void 0:L.status)==="success"?(f(!0),w((U=d==null?void 0:d.data)==null?void 0:U.message)):w.error("Image Updation Failed")}}}const n=t=>{const{name:l,value:a}=t.target;I({...s,[l]:a})};return e.jsxs(e.Fragment,{children:[e.jsx(oe,{}),e.jsx($,{className:"w-40 md:w-80"}),e.jsxs("div",{className:"w-full h-full flex-row md:flex md:items-center md:flex-col bg-background-two text-gray-400",children:[e.jsx("div",{className:"w-full ml-1 mr-1 md:ml-0 md:mr-0  md:w-2/3 md:h-40 mt-10 rounded-lg flex flex-row",children:e.jsxs("div",{className:"w-40 h-full flex justify-center items-center flex-col px-2 py-2",children:[e.jsx("img",{alt:"profile_img",className:"mt-2 w-32 h-32 md:mt-0 rounded-full ml-2 border-2 object-cover",id:"profile_img"}),e.jsxs("div",{className:"mt-3",children:[e.jsxs(te,{id:"img_btn",onClick:()=>f(!1),style:{background:"white",color:"black",border:"1px solid black",width:180,marginLeft:30},component:"label",variant:"contained",startIcon:e.jsx(se,{}),children:["Upload Photo",e.jsx(ue,{type:"file",accept:"image/*",onChange:X,onClick:z})]}),e.jsxs("div",{className:_===!1?"":"hidden",children:[!!C&&e.jsx("div",{className:"md:ml-0",children:e.jsx(le,{crop:O,onChange:(t,l)=>u(l),onComplete:t=>N(t),aspect:m,minHeight:100,children:e.jsx("img",{width:300,ref:g,alt:"Crop Me",src:C,onLoad:J})})}),!!o&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hidden",children:e.jsx("canvas",{ref:S,style:{border:"1px solid black",objectFit:"contain",width:o.width,height:o.height}})}),e.jsxs("div",{className:"ml-1 flex flex-col",children:[e.jsx("button",{onClick:Q,className:"border-2 px-1 py-1 bg-color-one text-white rounded-md z-20",children:"Save Image"}),e.jsx("button",{className:"border-2 py-1 px-1 rounded-md bg-color-five z-20",onClick:()=>f(!0),children:"Discard"}),e.jsx("a",{href:"#hidden",ref:b,download:!0,style:{position:"absolute",top:"-200vh",visibility:"hidden"},children:"Hidden download"})]})]})]})]})]})}),e.jsxs("div",{className:"w-full h-full md:w-2/3 mt-2 rounded-lg mb-72 md:mb-3 bg-background-two",children:[e.jsxs("div",{className:"flex flex-col items-center md:flex-row md:justify-between px-2 py-2",children:[e.jsxs("label",{children:[e.jsx("h1",{children:"First Name"}),e.jsx("input",{type:"text",id:"first_name",name:"first_name",className:"md:mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5",value:s==null?void 0:s.first_name,onChange:n})]}),e.jsxs("label",{className:"mt-2",children:[e.jsx("h1",{children:"Last Name"}),e.jsx("input",{type:"text",id:"last_name",name:"last_name",className:"md:mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5",value:s==null?void 0:s.last_name,onChange:n})]}),e.jsxs("label",{className:"mt-2",children:[e.jsx("h1",{children:"Email"}),e.jsx("input",{type:"text",id:"email",name:"mentorEmail",className:"md:mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block mt-2 w-80 md:w-64 p-2.5",value:s==null?void 0:s.mentorEmail,onChange:n})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row px-2 py-2 items-center md:justify-between",children:[e.jsxs("label",{children:[e.jsx("h1",{children:"Company "}),e.jsx("input",{type:"text",id:"company",name:"company",className:"mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block mt-1 w-80 md:w-64 p-2.5",value:s==null?void 0:s.company,onChange:n})]}),e.jsxs("label",{children:[e.jsx("h1",{children:"LinkedIn"}),e.jsx("input",{type:"text",id:"linkedIn",name:"linkedIn",className:"mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:s==null?void 0:s.linkedIn,onChange:n})]}),e.jsxs("label",{children:[e.jsx("h1",{children:"Twitter"}),e.jsx("input",{type:"text",id:"twitter",name:"twitter",className:"mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:s==null?void 0:s.twitter,onChange:n})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row md:px-2 md:py-2 items-center",children:[e.jsxs("label",{children:[e.jsx("h1",{children:"Personal Website"}),e.jsx("input",{type:"text",id:"personal_web",name:"web_url",className:"mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:s==null?void 0:s.web_url,onChange:n})]}),e.jsxs("label",{className:"md:ml-8",children:[e.jsx("h1",{children:"Job Title"}),e.jsx("input",{type:"text",id:"job_title",name:"job_title",className:"mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:s==null?void 0:s.job_title,onChange:n})]}),e.jsxs("label",{className:"md:ml-8",children:[e.jsx("h1",{children:"State"}),e.jsx("input",{type:"text",id:"state",name:"state",className:"mb-6 bg-gray-800 border border-gray-300 text-sm rounded-lg block w-80 md:w-64 p-2.5",value:s==null?void 0:s.state,onChange:n})]})]}),e.jsx("div",{className:"flex flex-col md:flex-row md:px-2 md:py-2 items-center",children:e.jsxs("label",{children:[e.jsx("h1",{className:"font-bold",children:"Select Category"}),e.jsxs("select",{name:"category",id:"category",value:s==null?void 0:s.category,onChange:n,className:"placeholder:text-slate-400 bg-gray-800 block border border-slate-300 rounded-md mt-1 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-80 md:w-96 sm:text-sm",children:[e.jsx("option",{value:"null",children:"-------"}),e.jsx("option",{value:"Software Development",children:"Software Development"}),e.jsx("option",{value:"Engineering & Data",children:"Engineering & Data"}),e.jsx("option",{value:"UI & UX Design",children:"UI & UX Design"}),e.jsx("option",{value:"Bussiness & Managment",children:"Bussiness & Managment"}),e.jsx("option",{value:"Product & Marketing",children:"Product & Marketing"})]})]})})]}),e.jsxs("div",{className:"mt-46 md:w-2/3 h-screen md:mt-10 rounded-lg border px-3 py-3",children:[e.jsxs("div",{className:"px-2 md:px-0",children:[e.jsx("label",{htmlFor:"message",className:"block mb-2 text-sm font-medium",children:"ABOUT ME"}),e.jsx("textarea",{id:"bio",name:"bio",rows:10,defaultValue:s==null?void 0:s.bio,onChange:n,className:"block p-2.5 w-full text-lg rounded-lg focus:border-gray bg-gray-800 text-gray-400 border"})]}),e.jsx("h1",{className:"mt-4 font-bold",children:"Update your Skills"}),e.jsxs("div",{className:"px-1 py-1 mt-4 bg-gray-400 rounded-md",children:[e.jsx(de,{spacing:3,sx:{width:300},className:"text-gray-400",children:e.jsx(ce,{multiple:!0,id:"tags-standard",options:ge,getOptionLabel:t=>t.title,value:j,onChange:H,filterOptions:(t,{inputValue:l})=>t.filter(a=>a.title.toLowerCase().includes(l.toLowerCase())),renderInput:t=>e.jsx(me,{...t,variant:"standard",label:"Skills",placeholder:"Add Skills...",className:"placeholder:text-gray-400"})})}),e.jsx("div",{className:"flex justify-end mt-5 md:mt-0",children:e.jsx("button",{type:"button",className:"text-gray-90 font-medium rounded-lg text-sm px-5 py-2.5 me-2 bg-color-one text-gray-400 ",onClick:V,children:"Update"})})]})]})]})]})},ge=[{title:"Node js"},{title:"React"},{title:"HTML"},{title:"Typescript"},{title:"Mongodb"},{title:"Python"},{title:"Java"},{title:"Javascript"},{title:"Ruby"},{title:"Fortran"}];export{Ue as default};
