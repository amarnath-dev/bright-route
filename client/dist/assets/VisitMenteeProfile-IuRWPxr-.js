import{d as u,i as x,r as d,j as e,k as b,l as p,m as h}from"./index-U6pLF9IQ.js";/* empty css                  */const w=()=>{const o=u(),{menteeId:m}=x(),[l,c]=d.useState(null),[a,i]=d.useState("");return d.useEffect(()=>{(async()=>{var t,r;try{const s=await o.get(`/managment/${m}`,{withCredentials:!0});c(s.data.menteeDetails),i((r=(t=s.data)==null?void 0:t.menteeDetails)==null?void 0:r.profile_img)}catch(s){console.log(s)}})()},[o,m]),d.useEffect(()=>{a&&(async()=>{const t=a;if(t){const r=b(h,t);p(r).then(s=>{const f=document.getElementById("profile-image");f.src=s}).catch(s=>{console.log(s)})}})()},[a]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"w-full h-full flex justify-center mb-28 mt-10",children:e.jsxs("div",{className:"w-full md:w-2/3 h-full border-2 mt-10 rounded-md",children:[e.jsx("div",{className:"w-full h-full flex justify-center flex-col"}),e.jsx("div",{className:"flex justify-between px-2"}),e.jsx("div",{className:"px-2 md:px-5 md:py-2 flex items-center",children:e.jsx("div",{className:"flex w-full flex-row items-center",children:e.jsx("span",{className:"flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4",children:e.jsx("img",{src:a?"":"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png",alt:"profile_img",className:"md:h-28 md:w-28 rounded-full object-cover border-2",id:"profile-image"})})})}),e.jsxs("form",{className:"w-full px-3 md:px-0",children:[e.jsxs("div",{className:"flex flex-col w-full md:flex-row justify-center",children:[e.jsxs("label",{children:["First name",e.jsx("input",{id:"first_name",className:"placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",name:"first_name",disabled:!0,value:l==null?void 0:l.first_name})]}),e.jsxs("label",{className:"mt-2 md:mt-0",children:["Last name",e.jsx("input",{id:"last_name",className:"placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm",type:"text",name:"last_name",disabled:!0,value:l==null?void 0:l.last_name})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row justify-center",children:[e.jsxs("label",{className:"mt-2",children:["Email",e.jsx("input",{id:"email",className:"placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",name:"email",disabled:!0,value:l==null?void 0:l.email})]}),e.jsxs("label",{className:"mt-2",children:["Job Title",e.jsx("input",{id:"job_title",className:"placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3",type:"text",name:"job_title",disabled:!0,value:l==null?void 0:l.job_title})]})]}),e.jsxs("div",{className:"ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9",children:[e.jsx("label",{htmlFor:"message",className:"block mt-4 mb-2 text-sm font-medium"}),"Goal",e.jsx("textarea",{id:"goal",rows:4,name:"goal",disabled:!0,value:l==null?void 0:l.goal,className:"placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-50 rounded-lg border-2 focus:outline-none focus:ring-dark-500 focus:ring-1"})]}),e.jsx("div",{className:"mt-5 flex md:justify-end justify-center md:px-9"})]})]})})})};export{w as default};
