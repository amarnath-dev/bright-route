import{r as g,d as y,y as N,u as w,a as v,j as e,F as m,e as r,L as f,_ as k,B as i,$ as j}from"./index-xyBAIWCM.js";import{u as S,t as D}from"./index-ffpqIHaM.js";import{l as M}from"./loginSchema-xct-HLrh.js";import{G as E}from"./GoogleAuth-SDTrhsJW.js";const F=()=>{const[b,u]=g.useState(!1),p=y(),h=N(),l=w(),{user:t}=v(o=>o.userAuth);g.useEffect(()=>{(async()=>{try{(await p.get("/checkToken",{withCredentials:!0})).data.status==="exists"?((t==null?void 0:t.role)==="mentee"&&l("/"),(t==null?void 0:t.role)==="mentor"&&(console.log("Navigating"),l("/mentor/home")),(t==null?void 0:t.role)==="admin"&&l("/admin/dashboard")):console.log("User not logged In")}catch(s){console.error("Error checking token:",s)}})()},[p,l,t==null?void 0:t.role]);const{register:c,handleSubmit:x,formState:{errors:a}}=S({resolver:D(M)});return e(m,{children:b?e(m,{children:e("div",{className:"w-full h-screen bg-background-two",children:e("div",{className:"flex justify-center items-center h-full",children:r("form",{onSubmit:x(async o=>{try{const n=(await h(j(o))).payload;n.status==="success"?l("/mentor/home"):i.error(n.message)}catch(s){typeof s=="string"&&console.log(s)}}),className:"border border-gray-500 py-12 px-5 rounded-md",children:[r("div",{className:"flex",children:[e("h1",{className:"text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5 text-gray-300",children:"Log in as Mentor"}),e("button",{onClick:()=>u(!1),type:"button",className:"text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline",children:"I am a Mentee"})]}),e("label",{className:"flex justify-center",children:e("input",{className:"placeholder:text-slate-400 block border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none bg-gray-800 text-gray-300 focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",placeholder:"Email",type:"email",...c("email")})}),e("div",{className:"flex flex-col",children:a.email&&r("small",{className:"text-red-600 text-sm italic",children:["*",a.email.message]})}),e("label",{className:"flex justify-center flex-row",children:e("input",{className:"placeholder:text-slate-400 block border border-slate-300 bg-gray-800 text-gray-400 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",placeholder:"Password",type:"password",...c("password")})}),e("div",{className:"flex flex-col",children:a.password&&r("small",{className:"text-red-600 text-sm italic",children:["*",a.password.message]})}),e("br",{}),e("div",{className:"flex justify-center",children:e("button",{type:"submit",className:"border-1 border-slate-300 mt-2 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg",children:"Signin"})}),e("div",{className:"flex justify-center",children:r("h1",{className:"mt-3 text-white",children:["Don’t have an account?",e(f,{to:"/signup",className:"ml-2 text-color-five font-bold",children:"Signup"})]})})]})})})}):e(m,{children:e("div",{className:"w-full h-screen bg-background-two",children:e("div",{className:"flex justify-center items-center h-full py-16",children:r("form",{onSubmit:x(async o=>{try{const s=await h(k(o));if(s){const n=s.payload;if(n.status==="success"){const d=n.user;d.role==="mentee"?l("/"):(d==null?void 0:d.role)==="mentor"?i.error("Canno't Find Email"):d.role==="admin"&&i.error("Canno't Find Email")}else i.error(n.message)}}catch(s){console.log(s)}}),className:"border border-gray-500 py-12 px-5 rounded-md",children:[r("div",{className:"flex",children:[e("h1",{className:"text-md px-4 py-1 md:py-0 md:px-0 md:text-2xl font-bold mb-5 text-white",children:"Log in as Mentee"}),e("button",{type:"button",className:"text-md px-5 py-1 md:px-0 md:py-0 md:text-xl h-8 font-bold text-color-five md:ml-12 underline",onClick:()=>u(!0),children:"I am a Mentor"})]}),e("label",{className:"flex justify-center",children:e("input",{className:"placeholder:text-slate-400 block border border-slate-300 bg-gray-800 text-gray-300 rounded-md py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",placeholder:"Email",type:"email",...c("email")})}),e("div",{className:"flex flex-col",children:a.email&&r("small",{className:"text-red-600 text-sm italic",children:["*",a.email.message]})}),e("label",{className:"flex justify-center flex-row",children:e("input",{className:"placeholder:text-slate-400 block border border-slate-300 bg-gray-800 text-gray-300 rounded-md mt-4 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-72 md:w-96 sm:text-lg",placeholder:"Password",type:"password",...c("password")})}),e("div",{className:"flex flex-col",children:a.password&&r("small",{className:"text-red-600 text-sm italic",children:["*",a.password.message]})}),e("br",{}),e("div",{className:"flex justify-center",children:e("button",{type:"submit",className:"border-1 border-slate-300 bg-color-five text-white rounded-md font-bold py-2 w-72 md:w-96 sm:text-lg",children:"Signin"})}),e("div",{className:"mt-2",children:e(f,{to:"/forgotpassword",className:"text-blue-500 underline",children:"Forgot Password ?"})}),e("div",{className:"mt-3 flex justify-center items-center",children:e(E,{})}),e("div",{className:"flex justify-center",children:r("h1",{className:"mt-3 text-gray-300 text-lg font-bold",children:["Don’t have an account?",e(f,{to:"/signup",className:"ml-2 text-color-five font-bold underline",children:"Signup"})]})})]})})})})})},G=()=>e(m,{children:e(F,{})});export{G as default};
