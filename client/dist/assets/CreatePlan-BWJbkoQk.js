import{r as m,d as u,u as h,e as l,j as e,F as b,B as s,Q as g}from"./index-Cm1l80VI.js";const f=()=>{const[a,o]=m.useState({planAmount:"",planType:"",planDescription:"",videoCallSession:"",videoCallCount:"",chatSessions:"",handsOnSupport:""}),c=u(),d=h(),i=async n=>{if(n.preventDefault(),!a.planAmount){s.error("Please select a plan amount");return}if(!a.videoCallCount){s.error("Plese select video call count");return}try{const t=await c.post("/mentor/plans/create",a,{withCredentials:!0});t.data.status==="success"&&(s(t.data.message),d("/mentor/plans"))}catch(t){console.log(t)}},r=n=>{var t;o({...a,[n.target.name]:(t=n.target)==null?void 0:t.value})};return l(b,{children:[e(g,{className:"w-40 md:w-80 "}),e("div",{className:"w-full h-screen fill-rule bg-background-two",children:e("div",{id:"crud-modal",tabIndex:-1,"aria-hidden":"true",className:"overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center",children:e("div",{className:"relative p-4 w-full max-w-md max-h-full",children:l("div",{className:"relative rounded-lg shadow-xl",children:[e("div",{className:"flex items-center justify-between p-4 md:p-5 border-b rounded-md bg-gray-800",children:e("h3",{className:"text-lg font-bold text-white",children:"Create New Monthly Plan"})}),l("form",{className:"p-4 md:p-5 bg-gray-800 text-white",onSubmit:i,children:[l("div",{className:"grid gap-4 mb-4 grid-cols-2",children:[l("div",{className:"col-span-2 sm:col-span-1",children:[e("label",{htmlFor:"price",className:"block mb-2 text-sm font-medium",children:"Enter the Amount"}),e("input",{type:"number",name:"planAmount",id:"price",required:!0,value:a==null?void 0:a.planAmount,onChange:r,className:"bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5",placeholder:"Ex Rs.3999"})]}),l("div",{className:"col-span-2 sm:col-span-1",children:[e("label",{htmlFor:"category",className:"block mb-2 text-sm font-medium",children:"Plan Type"}),l("select",{value:a==null?void 0:a.planType,name:"planType",onChange:r,id:"category",className:"bg-gray-800 border border-gray-300 text-sm rounded-lg block w-full p-2.5",children:[e("option",{children:"Select Type"}),e("option",{value:"Lite Plan",children:"Lite Plan"}),e("option",{value:"Standard Plan",children:"Standard Plan"})]})]}),e("div",{className:"w-96",children:e("h1",{className:"text-sm",children:"The plan amount should be fair and not too high."})}),l("div",{className:"col-span-2",children:[e("label",{htmlFor:"description",className:"block mb-2 text-sm font-medium",children:"Plan Description"}),e("textarea",{id:"description",value:a==null?void 0:a.planDescription,name:"planDescription",onChange:r,rows:4,className:"block p-2.5 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Write plan description here..."})]}),l("div",{className:"w-96",children:[e("h1",{className:"font-bold",children:"Please Select the services"}),l("div",{className:"flex items-center mt-3",children:[e("input",{id:"default-checkbox",type:"checkbox",name:"videoCallSession",value:"Video Call Sessions",onChange:r,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"}),e("label",{htmlFor:"default-checkbox",className:"ms-2 text-sm font-medium text-white",children:"Video Call Sessions(Weekly)"}),l("div",{children:[e("label",{htmlFor:"video_call_count",className:"ml-10",children:"Count :"}),e("input",{type:"number",name:"videoCallCount",value:a==null?void 0:a.videoCallCount,onChange:r,className:"w-10 ml-2 px-1 rounded bg-gray-800",max:5,min:0})]})]}),l("div",{className:"flex items-center mt-3",children:[e("input",{id:"checked-checkbox",type:"checkbox",value:"Unlimited Q&A via chat",name:"chatSessions",onChange:r,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"}),e("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-medium text-gray-900"}),"Unlimited Q&A via chat"]}),l("div",{className:"flex items-center mt-3",children:[e("input",{id:"checked-checkbox",type:"checkbox",name:"handsOnSupport",value:"Hands-on support",onChange:r,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"}),e("label",{htmlFor:"checked-checkbox",className:"ms-2 text-sm font-medium text-gray-900"}),"Hands-on support"]})]})]}),e("div",{className:"w-full",children:e("button",{type:"submit",className:"text-white w-full bg-color-five hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5",children:"Add Plan"})})]})]})})})})]})};export{f as default};