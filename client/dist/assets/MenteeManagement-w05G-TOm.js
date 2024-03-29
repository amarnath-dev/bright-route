import{d as j,r as i,u,j as s,B as x}from"./index-86Yayage.js";import{A as g}from"./AdminSidebar-HMGuSqvW.js";import"./index-f5koxsUU.js";import"./sweetalert2.all-8kJa4Vly.js";const v=()=>{const l=j(),[o,n]=i.useState([]),[h,m]=i.useState(""),p=u();i.useEffect(()=>{(async()=>{var c;try{const a=await l.get("/admin/mentee",{withCredentials:!0});a.data&&n((c=a.data)==null?void 0:c.mentees)}catch(a){console.log(a)}})()},[l]);const d=async(e,c)=>{try{if(c==="block"){const a=await l.patch(`/admin/block/${e}`,{},{withCredentials:!0});if(a.data.status==="success"){const r=o.map(t=>(t==null?void 0:t._id)===e?{...t,is_blocked:!0}:t);n(r),x.success(a.data.message)}}else{const a=await l.patch(`/admin/unblock/${e}`,{},{withCredentials:!0});if(a.data.status==="success"){const r=o.map(t=>(t==null?void 0:t._id)===e?{...t,is_blocked:!1}:t);n(r),x.success(a.data.message)}}}catch(a){console.log(a)}};i.useEffect(()=>{},[l,h,m]);const b=()=>{try{console.log("Get Next")}catch(e){console.log(e)}};return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"grid grid-cols-12 h-screen bg-background-two",children:[s.jsx("div",{className:"hidden md:block col-span-3",children:s.jsx(g,{})}),s.jsxs("div",{className:"col-span-12 md:col-span-9 h-screen px-2 py-2",children:[s.jsx("div",{className:"mt-4",children:s.jsx("div",{children:s.jsxs("h1",{className:"font-bold text-gray-400",children:[s.jsx("span",{onClick:()=>p("/admin/dashboard"),className:"cursor-pointer",children:"Dashboard"}),"/ ",s.jsx("small",{children:"Mentee Management"})]})})}),o.length>0?s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"relative overflow-x-auto py-10",children:s.jsxs("table",{className:"w-full text-sm text-left rtl:text-right rounded",children:[s.jsx("thead",{className:"text-xs border border-gray-800 rounded-md",children:s.jsxs("tr",{className:"text-gray-400",children:[s.jsx("th",{scope:"col",className:"px-6 py-3",children:"Name"}),s.jsx("th",{scope:"col",className:"px-6 py-3",children:"Email"}),s.jsx("th",{scope:"col",className:"px-6 py-3",children:"Block/Unblock"})]})}),o.map((e,c)=>{var a,r;return s.jsx(s.Fragment,{children:s.jsx("tbody",{children:s.jsxs("tr",{className:"bg-gray-800 border-b text-gray-400",children:[s.jsxs("th",{scope:"row",className:"px-6 py-4 font-medium",children:[(a=e.profileDetails)==null?void 0:a.first_name," ",(r=e.profileDetails)==null?void 0:r.last_name]}),s.jsx("td",{className:"px-6 py-4",children:e==null?void 0:e.email}),s.jsx("td",{className:"px-6 py-4",children:e.is_blocked?s.jsx("button",{className:"py-1 px-5 rounded bg-color-five text-black",onClick:()=>d(e==null?void 0:e._id,"unblock"),children:"Unblock"}):s.jsx("button",{className:"py-1 px-5 rounded bg-red-600 hover:bg-red-500 text-black",onClick:()=>d(e==null?void 0:e._id,"block"),children:"Block"})})]})},c)})})]})}),s.jsx("div",{className:"flex w-full flex-col items-end",children:s.jsxs("div",{className:"inline-flex mt-2 xs:mt-0",children:[s.jsx("button",{className:"flex items-center justify-center px-3 h-8 text-sm font-medium bg-color-one rounded text-white",children:"Prev"}),s.jsx("button",{className:"flex items-center justify-center px-3 h-8 text-sm font-medium bg-gray-200 hover:bg-gray-300 border-0 border-s rounded-e",onClick:b,children:"Next"})]})})]}):s.jsx(s.Fragment,{children:s.jsx("div",{children:s.jsx("h1",{className:"text-3xl text-gray-400 py-5",children:"Not Mentees are Available"})})})]})]})})};export{v as default};
