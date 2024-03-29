import{d as C,u as F,r as a,j as e,Q as S,B as l}from"./index-86Yayage.js";const _=()=>{const o=C(),f=F(),[d,g]=a.useState(""),[y,x]=a.useState(!1),[w,c]=a.useState(!1),[i,b]=a.useState(!1),[j,N]=a.useState(!1),[t,v]=a.useState({password:"",re_entered_pass:""}),[P,m]=a.useState(!1),E=async r=>{r.preventDefault();try{const n=new FormData(r.currentTarget).get("emailInput");if(g(n),(await o.post("/password/checkEmail",{emailId:n},{withCredentials:!0})).data.status==="failed"){x(!0);return}b(!0),l.success("Email sent successfully")}catch(s){console.log(s)}},k=async r=>{var s;r.preventDefault();try{const u=new FormData(r.currentTarget).get("OTPinput");console.log("OTP Nm",u),((s=(await o.post("/password/OTPVerify",{userEmail:d,OTPNum:u},{withCredentials:!0})).data)==null?void 0:s.status)==="success"?N(!0):c(!0)}catch{l.error("Resend OTP and Try Again")}},p=r=>{const{name:s,value:n}=r.target;v({...t,[s]:n}),c(!1),m(!1)},T=async()=>{var r;if(t.password&&t.password!==t.re_entered_pass&&t.re_entered_pass){m(!0);return}try{const s=await o.post("/password/new-password",{userEmail:d,formData:t},{withCredentials:!0});s.data.status==="success"?(l.success((r=s.data)==null?void 0:r.message),f("/signin")):l.error(s.data.message)}catch(s){console.log(s)}},h=()=>{c(!1),m(!1),x(!1)},O=async()=>{var r;try{const s=await o.post("/password/checkEmail",{emailId:d},{withCredentials:!0});s.data.status==="success"&&l.success((r=s.data)==null?void 0:r.message)}catch(s){console.log(s)}};return e.jsxs(e.Fragment,{children:[e.jsx(S,{className:"w-40 md:w-80"}),e.jsx("div",{className:"w-full h-screen flex justify-center items-center bg-background-two",children:j===!1?e.jsx(e.Fragment,{children:e.jsx("div",{className:"border border-gray-400 px-4 py-4 rounded-md",children:e.jsxs("form",{onSubmit:i?k:E,children:[i?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h1",{className:"text-md px-4 py-1 md:py-0 md:px-0 mb-2 text-gray-300",children:"Enter the OTP send to your Email:"}),w?e.jsx(e.Fragment,{children:e.jsx("h1",{className:"text-red-600 py-2",children:"Invalid OTP Please Try Again"})}):""]}),e.jsx("label",{className:"flex justify-center",children:e.jsx("input",{className:"placeholder:text-slate-400 block bg-gray-800 text-gray-400 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",type:"text",required:!0,name:"OTPinput",onChange:h})}),e.jsx("div",{children:e.jsx("span",{className:"text-blue-500 underline cursor-pointer mt-1",onClick:O,children:"Re send OTP"})}),e.jsx("br",{})]}):e.jsxs("div",{children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h1",{className:"text-md px-4 py-1 md:py-0 md:px-0 mb-2 text-gray-300",children:"Please provide your email Address:"}),y?e.jsx(e.Fragment,{children:e.jsx("h1",{className:"text-red-600 py-2",children:"Email not found"})}):""]}),e.jsx("label",{className:"flex justify-center",children:e.jsx("input",{className:"placeholder:text-slate-400 block bg-gray-800 text-gray-400 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",placeholder:"Email",type:"email",name:"emailInput",onChange:h,required:!0})}),e.jsx("br",{})]}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{type:"submit",className:"border-1 border-slate-300 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg",children:i?"Verify":"Get OTP"})})]})})}):e.jsx(e.Fragment,{children:e.jsxs("div",{className:"border border-gray-400 px-4 py-4 rounded-md",children:[e.jsx("div",{className:"flex flex-col",children:e.jsx("h1",{className:"text-md px-4 py-1 md:py-0 md:px-0 mb-2 text-gray-300",children:"Enter New Password"})}),e.jsxs("div",{children:[e.jsxs("label",{className:"flex justify-center flex-col",children:[P?e.jsx(e.Fragment,{children:e.jsx("h1",{className:"text-red-500",children:"Password not matching"})}):"",e.jsx("input",{className:"placeholder:text-slate-400 block bg-gray-800 text-gray-400 border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",type:"text",name:"password",value:t==null?void 0:t.password,onChange:p,required:!0})]}),e.jsx("h1",{className:"text-gray-300 py-1",children:"Re-enter the Password"}),e.jsx("label",{className:"flex justify-center flex-col",children:e.jsx("input",{className:"placeholder:text-slate-400 block bg-gray-800 text-gray-400 border border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",type:"text",name:"re_entered_pass",value:t==null?void 0:t.re_entered_pass,onChange:p,required:!0})})]}),e.jsx("div",{className:"flex justify-center mt-3",children:e.jsx("button",{type:"submit",className:"border-1 border-slate-300 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg mt-2",onClick:T,children:"Change"})})]})})})]})},q=()=>e.jsx(e.Fragment,{children:e.jsx(_,{})});export{q as default};