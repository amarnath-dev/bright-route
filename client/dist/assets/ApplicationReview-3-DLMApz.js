import{h as f,r as i,u as g,d as j,i as w,k as b,j as s,B as d,l as y}from"./index-iuj1aMbv.js";import{S as a}from"./sweetalert2.all-j0jBbo7g.js";const N=()=>{const{mentor:t}=f(),[e,m]=i.useState(),c=g(),o=j(),x=async n=>{a.fire({title:"Approve Application",text:"Are you sure to procced ?",showCancelButton:!0,icon:"warning"}).then(async l=>{if(l.isConfirmed)try{if(t){const r=await o.patch(`/admin/single-application/approve/${n}`,{},{withCredentials:!0});r.data&&r.data.status=="success"&&(d.success(r.data.message),c("/admin/mentor-application"))}}catch(r){console.log(r),d.error("Approval Failed")}})},h=async n=>{a.fire({title:"Reject Application",text:"Proceed with Action ?",showCancelButton:!0,icon:"warning"}).then(async l=>{if(l.isConfirmed)try{if(t){const r=await o.patch(`/admin/single-application/reject/${n}`,{},{withCredentials:!0});r.data.status==="success"&&(d.success(r.data.message),c("/admin/mentor-application"))}}catch(r){console.log(r),d.error("Reject Failed")}})};return i.useEffect(()=>{(async()=>{try{const l=await o.get(`/admin/single-application/${t}`,{withCredentials:!0});if(l.data){console.log(l.data);const r=l.data.applications[0];m(r)}}catch{d.error("Something went wrong")}})()},[t,o]),i.useEffect(()=>{const n=e==null?void 0:e.profile_img;if(n){const l=w(y,n);b(l).then(r=>{const u=document.getElementById("profile-image");u.src=r}).catch(r=>{console.log(r)})}},[e]),s.jsx(s.Fragment,{children:s.jsx("div",{className:"w-full h-full bg-background-two",children:s.jsx("div",{className:"w-full h-full flex justify-center",children:s.jsxs("figure",{className:"rounded-xl p-8 w-full md:w-2/3 bg-gray-800",children:[s.jsxs("div",{children:[s.jsx("img",{className:"w-24 h-24 rounded-md",id:"profile-image",alt:""}),s.jsxs("div",{className:"pt-6 space-y-4 text-gray-400",children:[s.jsxs("div",{className:"flex gap-3",children:["Name:",s.jsxs("h1",{children:[e==null?void 0:e.first_name," ",e==null?void 0:e.last_name]})]}),s.jsxs("div",{className:"flex gap-3",children:["Email:",s.jsx("h1",{children:e==null?void 0:e.mentorEmail})]}),s.jsxs("div",{className:"flex gap-3",children:["Job Title: ",s.jsx("h1",{children:e==null?void 0:e.job_title})]}),s.jsxs("div",{className:"flex gap-3",children:["Company: ",s.jsx("h1",{children:e==null?void 0:e.company})]}),s.jsxs("div",{className:"flex gap-3",children:["State: ",s.jsx("h1",{children:e==null?void 0:e.state})]}),s.jsx("div",{children:s.jsx("p",{className:"font-semibold",children:e==null?void 0:e.bio})}),s.jsx("div",{children:s.jsx("div",{className:"flex flex-row placeholder:text-bold flex-wrap p-2.5 w-full text-sm text-gray-900 bg-gray-800 rounded-lg overflow-x-scroll",children:e==null?void 0:e.skills.map(n=>s.jsx("span",{className:"font-bold text-gray-400 mt-1 text-md rounded border px-1 py-1 ml-2",children:n}))})}),s.jsxs("div",{children:[s.jsxs("h1",{className:"font-semibold",children:["Why do you want to be a Mentor ?",s.jsx("br",{}),s.jsx("span",{children:" Answer:"})]}),s.jsx("textarea",{rows:6,className:"w-full border border-background-two bg-gray-800 rounded-md py-1 px-1 font-semibold",disabled:!0,value:e==null?void 0:e.why_mentor})]}),s.jsxs("div",{children:[s.jsxs("h1",{className:"font-semibold",children:["What is your Biggest Achievement ?",s.jsx("br",{}),s.jsx("span",{children:" Answer:"})]}),s.jsx("textarea",{rows:6,className:"w-full border border-background-two bg-gray-800 rounded-md py-1 px-2",disabled:!0,value:e==null?void 0:e.why_mentor}),s.jsx("small",{children:"Above questions were asked when mentor applied"})]})]})]}),s.jsxs("div",{className:"w-full flex justify-center md:justify-end gap-4 py-4",children:[s.jsx("button",{className:"px-3 py-1 border rounded-md bg-red-500",onClick:()=>h(e==null?void 0:e._id),children:"Reject"}),s.jsx("button",{className:"px-3 py-1 border rounded-md bg-color-five text-white",onClick:()=>x(e==null?void 0:e._id),children:"Approve"})]})]})})})})};export{N as default};