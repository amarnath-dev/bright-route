import{r as i,d as m,u,j as e,Q as h,B as t}from"./index-3TceeTOD.js";const b=()=>{const[a,n]=i.useState({planAmount:"",planType:"",planDescription:"",videoCallSession:"",videoCallCount:"",chatSessions:"",handsOnSupport:""}),o=m(),c=u(),d=async r=>{if(r.preventDefault(),!a.planAmount){t.error("Please select a plan amount");return}if(!a.videoCallCount){t.error("Plese select video call count");return}try{const l=await o.post("/mentor/plans/create",a,{withCredentials:!0});l.data.status==="success"&&(t(l.data.message),c("/mentor/plans"))}catch(l){console.log(l)}},s=r=>{var l;n({...a,[r.target.name]:(l=r.target)==null?void 0:l.value})};return e.jsxs(e.Fragment,{children:[e.jsx(h,{className:"w-40 md:w-80 "}),e.jsx("div",{className:"w-full h-screen fill-rule bg-background-two",children:e.jsx("div",{id:"crud-modal",tabIndex:-1,"aria-hidden":"true",className:"overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center",children:e.jsx("div",{className:"relative p-4 w-full max-w-md max-h-full",children:e.jsxs("div",{className:"relative rounded-lg shadow-xl",children:[e.jsx("div",{className:"flex items-center justify-between p-4 md:p-5 border-b rounded-md bg-gray-800",children:e.jsx("h3",{className:"text-lg font-bold text-white",children:"Create New Monthly Plan"})}),e.jsxs("form",{className:"p-4 md:p-5 bg-gray-800 text-white",onSubmit:d,children:[e.jsxs("div",{className:"grid gap-4 mb-4 grid-cols-2",children:[e.jsxs("div",{className:"col-span-2 sm:col-span-1",children:[e.jsx("label",{htmlFor:"price",className:"block mb-2 text-sm font-medium",children:"Enter the Amount"}),e.jsx("input",{type:"number",name:"planAmount",id:"price",required:!0,value:a==null?void 0:a.planAmount,onChange:s,className:"bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5",placeholder:"Ex Rs.3999"})]}),e.jsxs("div",{className:"col-span-2 sm:col-span-1",children:[e.jsx("label",{htmlFor:"category",className:"block mb-2 text-sm font-medium",children:"Plan Type"}),e.jsxs("select",{value:a==null?void 0:a.planType,name:"planType",onChange:s,id:"category",className:"bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5",children:[e.jsx("option",{children:"Select Type"}),e.jsx("option",{value:"Lite Plan",children:"Lite Plan"}),e.jsx("option",{value:"Standard Plan",children:"Standard Plan"})]})]}),e.jsx("div",{className:"w-96",children:e.jsx("h1",{className:"text-sm",children:"The plan amount should be fair and not too high."})}),e.jsxs("div",{className:"col-span-2",children:[e.jsx("label",{htmlFor:"description",className:"block mb-2 text-sm font-medium",children:"Plan Description"}),e.jsx("textarea",{id:"description",value:a==null?void 0:a.planDescription,name:"planDescription",onChange:s,rows:4,className:"block p-2.5 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Write plan description here..."})]}),e.jsxs("div",{className:"w-96",children:[e.jsx("h1",{className:"font-bold",children:"Please Select the services"}),e.jsxs("div",{className:"flex items-center mt-3",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",name:"videoCallSession",value:"Video Call Sessions",onChange:s,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"}),e.jsx("label",{htmlFor:"default-checkbox",className:"ms-2 text-sm font-medium text-white",children:"Video Call Sessions"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"video_call_count",className:"ml-10",children:"Count :"}),e.jsx("input",{type:"number",name:"videoCallCount",value:a==null?void 0:a.videoCallCount,onChange:s,className:"w-10 ml-2 px-1 rounded bg-gray-800",max:5,min:0})]})]}),e.jsxs("div",{className:"flex items-center mt-3",children:[e.jsx("input",{id:"checked-checkbox",type:"checkbox",value:"Unlimited Q&A via chat",name:"chatSessions",onChange:s,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"}),e.jsx("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-medium text-gray-900"}),"Unlimited Q&A via chat"]}),e.jsxs("div",{className:"flex items-center mt-3",children:[e.jsx("input",{id:"checked-checkbox",type:"checkbox",name:"handsOnSupport",value:"Hands-on support",onChange:s,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e.jsx("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-medium text-gray-900"}),"Hands-on support"]})]})]}),e.jsx("div",{className:"w-full",children:e.jsx("button",{type:"submit",className:"text-white w-full bg-color-five hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5",children:"Add Plan"})})]})]})})})})]})};export{b as default};
