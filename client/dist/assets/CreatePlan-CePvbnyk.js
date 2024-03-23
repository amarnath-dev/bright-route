import{r as i,d as m,u,j as e,Q as h,B as t}from"./index-iuj1aMbv.js";const g=()=>{const[a,n]=i.useState({planAmount:"",planType:"",planDescription:"",videoCallSession:"",videoCallCount:"",chatSessions:"",handsOnSupport:""}),o=m(),d=u(),c=async l=>{if(l.preventDefault(),!a.planAmount){t.error("Please select a plan amount");return}if(!a.videoCallCount){t.error("Plese select video call count");return}try{const s=await o.post("/mentor/plans/create",a,{withCredentials:!0});s.data.status==="success"&&(t(s.data.message),d("/mentor/plans"))}catch(s){console.log(s)}},r=l=>{var s;n({...a,[l.target.name]:(s=l.target)==null?void 0:s.value})};return e.jsxs(e.Fragment,{children:[e.jsx(h,{className:"w-40 md:w-80 "}),e.jsx("div",{className:"w-full h-screen fill-rule",children:e.jsx("div",{id:"crud-modal",tabIndex:-1,"aria-hidden":"true",className:"overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center",children:e.jsx("div",{className:"relative p-4 w-full max-w-md max-h-full",children:e.jsxs("div",{className:"relative rounded-lg shadow-xl",children:[e.jsx("div",{className:"flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600",children:e.jsx("h3",{className:"text-lg font-bold text-gray-900",children:"Create New Monthly Plan"})}),e.jsxs("form",{className:"p-4 md:p-5",onSubmit:c,children:[e.jsxs("div",{className:"grid gap-4 mb-4 grid-cols-2",children:[e.jsxs("div",{className:"col-span-2 sm:col-span-1",children:[e.jsx("label",{htmlFor:"price",className:"block mb-2 text-sm font-medium text-gray-900",children:"Enter the Amount"}),e.jsx("input",{type:"number",name:"planAmount",id:"price",required:!0,value:a.planAmount,onChange:r,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Ex Rs.3999"})]}),e.jsxs("div",{className:"col-span-2 sm:col-span-1",children:[e.jsx("label",{htmlFor:"category",className:"block mb-2 text-sm font-medium text-gray-900",children:"Plan Type"}),e.jsxs("select",{value:a.planType,name:"planType",onChange:r,id:"category",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500",children:[e.jsx("option",{children:"---Select Type---"}),e.jsx("option",{value:"Lite Plan",children:"Lite Plan"}),e.jsx("option",{value:"Standard Plan",children:"Standard Plan"})]})]}),e.jsx("div",{className:"w-96",children:e.jsx("h1",{className:"text-sm",children:"The plan amount should be fair and not too high."})}),e.jsxs("div",{className:"col-span-2",children:[e.jsx("label",{htmlFor:"description",className:"block mb-2 text-sm font-medium text-gray-900",children:"Plan Description"}),e.jsx("textarea",{id:"description",value:a.planDescription,name:"planDescription",onChange:r,rows:4,className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Write plan description here"})]}),e.jsxs("div",{className:"w-96",children:[e.jsx("h1",{className:"font-bold",children:"Please Select the services"}),e.jsxs("div",{className:"flex items-center mt-3",children:[e.jsx("input",{id:"default-checkbox",type:"checkbox",name:"videoCallSession",value:"Video Call Sessions",onChange:r,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e.jsx("label",{htmlFor:"default-checkbox",className:"ms-2 text-sm font-medium text-gray-900",children:"Video Call Sessions"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"video_call_count",className:"ml-10",children:"Count :"}),e.jsx("input",{type:"number",name:"videoCallCount",value:a.videoCallCount,onChange:r,className:"w-10 ml-2 px-1 rounded",max:5,min:0})]})]}),e.jsxs("div",{className:"flex items-center mt-3",children:[e.jsx("input",{id:"checked-checkbox",type:"checkbox",value:"Unlimited Q&A via chat",name:"chatSessions",onChange:r,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e.jsx("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-medium text-gray-900"}),"Unlimited Q&A via chat"]}),e.jsxs("div",{className:"flex items-center mt-3",children:[e.jsx("input",{id:"checked-checkbox",type:"checkbox",name:"handsOnSupport",value:"Hands-on support",onChange:r,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e.jsx("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-medium text-gray-900"}),"Hands-on support"]})]})]}),e.jsxs("button",{type:"submit",className:"text-white inline-flex items-center bg-color-one hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-color-one mt-5",children:[e.jsx("svg",{className:"me-1 -ms-1 w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fillRule:"evenodd",d:"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",clipRule:"evenodd"})}),"Add Plan"]})]})]})})})})]})};export{g as default};