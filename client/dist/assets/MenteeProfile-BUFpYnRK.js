import{j as e,e as t,F as v,a as C,d as F,r as h,L,f as T,g as B,s as R}from"./index-DtWHIpjr.js";import{N as A}from"./index-B08Qlj6G.js";import{N as D}from"./no-profile-image-7REqqSE_.js";import{C as G}from"./Croper-CVHpfUz2.js";/* empty css                  */import{S as p}from"./sweetalert2.all-CxQ19U5j.js";import{z as o,u as K,t as M}from"./zod-B43yW0Dj.js";import"./Toast-AB0qw3ul.js";import"./index-DF-r5Wg3.js";import"./index-B2AvPDlt.js";/* empty css                     */import"./generateUtilityClasses-DhbyLaEU.js";import"./emotion-react.browser.esm-CJluNN3Y.js";import"./createSvgIcon-DLY8qKTy.js";import"./createSvgIcon-Crw48D2s.js";import"./useTimeout-DbyD90bz.js";import"./ownerWindow-DoR9szSX.js";import"./ButtonBase-CVzde2X-.js";import"./TransitionGroupContext-BfLHsqtj.js";const U=()=>e(v,{children:e("div",{children:e("div",{className:"flex justify-center items-center mt-2 px-4",children:t("div",{className:"flex-1 text-sm ring-1 ring-[#fff7625c] bg-gray-800 px-2 py-2 md:px-4 md:py-4 rounded-md",children:[t("span",{className:"flex flex-row",children:[e("h1",{className:"font-bold text-color-five",children:"Tips"}),e("img",{src:"https://www.google.com/images/hpp/gemini-48x48px.png",alt:"",className:"ml-1 h-6 w-6"})]}),t("ul",{className:"text-white",children:[e("li",{className:"text-md md:mt-2",children:"Adding your photo and social media profiles helps mentors feel confident that you’re a real person (e.g. not a bot)."}),e("li",{className:"text-md md:mt-2",children:"Your profile is only visible to mentors that you send applications to. It is not indexed on search engines like Google."})]})]})})})}),g=s=>!/\d/.test(s),q=o.object({first_name:o.string().min(3,{message:"Enter atleast 3 characters"}).max(15,{message:"Keep it below 15 characters"}).refine(s=>s.trim()!=="",{message:"First name should not be empty"}).refine(g,{message:"First name should not contain numbers"}),last_name:o.string().min(2,{message:"Enter atleast 2 characters"}).max(15,{message:"Keep it below 15 characters"}).refine(s=>s.trim()!=="",{message:"Last name should not be empty"}).refine(g,{message:"Numbers are not allowed"}),email:o.string().email({message:"Invalid email address"}).refine(s=>s.trim()!=="",{message:"Email should not be empty"}),linkedIn:o.string().url({message:"Invalid LinkedIn URL"}).refine(s=>s.trim()!=="",{message:"Field should not be empty"}).refine(g,{message:"Numbers are not allowed"}),twitter:o.string().url({message:"Invalid Twitter URL"}).refine(s=>s.trim()!=="",{message:"Field should not be empty"}).refine(g,{message:"Numbers are not allowed"}),job_title:o.string().min(3,{message:"Enter atleast 3 characters"}).max(25,{message:"Keep it below 25 characters"}).refine(s=>s.trim()!=="",{message:"Job Title is required"}).refine(g,{message:"Numbers are not allowed"}),goal:o.string().min(150,{message:"Enter atleast 100 characters"}).max(600,{message:"Keep it below 600 characters"}).refine(s=>s.trim()!=="",{message:"Goal should not be empty"})}),oe=()=>{const{user:s}=C(f=>f.userAuth),x=F(),[_,j]=h.useState(""),[I,P]=h.useState(),[b,S]=h.useState(),{register:d,handleSubmit:E,formState:{errors:l},setValue:r}=K({resolver:M(q)});return h.useEffect(()=>{(async()=>{var n,i,c,u,w,y,N;try{const a=(n=(await x.get(`/managment/${s==null?void 0:s._id}`,{withCredentials:!0})).data)==null?void 0:n.menteeDetails[0],m=a==null?void 0:a.menteeProfile;j(m==null?void 0:m.goal),S(m==null?void 0:m.profile_img),r("profile_img",m==null?void 0:m.profile_img),r("goal",(i=a.menteeProfile)==null?void 0:i.goal),r("first_name",(c=a.menteeProfile)==null?void 0:c.first_name),r("last_name",(u=a.menteeProfile)==null?void 0:u.last_name),r("email",a==null?void 0:a.email),r("job_title",(w=a.menteeProfile)==null?void 0:w.job_title),r("linkedIn",(y=a.menteeProfile)==null?void 0:y.linkedIn),r("twitter",(N=a.menteeProfile)==null?void 0:N.twitter),P(a==null?void 0:a.email)}catch(k){console.log(k)}})()},[x,s==null?void 0:s._id,r]),b&&(async()=>{const n=b;if(n){const i=T(R,n);B(i).then(c=>{const u=document.getElementById("profile-image");u.src=c}).catch(c=>{console.log(c)})}})(),t(v,{children:[e(A,{}),e("div",{className:"w-full h-full flex justify-center bg-background-two py-4",children:t("div",{className:"w-full md:w-2/3 h-full border border-gray-500 mt-10 rounded-md",children:[t("div",{className:"w-full h-full flex justify-center flex-col",children:[e("h1",{className:"text-center mt-4 text-md md:text-lg font-bold text-white",children:"Personal Information"}),e(U,{})]}),e("div",{className:"flex justify-between px-2",children:e("div",{className:"flex justify-center px-4 items-center",children:e(L,{to:"/managment/password",className:"text-blue-500 underline",children:"Change Password"})})}),_?"":e("div",{className:"flex flex-col ml-6",children:e("h1",{className:"font-bold text-white",children:"Add a profile Image"})}),e("div",{className:"px-2 md:px-5 md:py-2 flex items-center py-3",children:t("div",{className:"flex w-full flex-col items-center",children:[e("span",{className:"flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4",children:e("img",{src:D,className:"md:h-38 md:w-38 rounded-full object-cover",id:"profile-image"})}),e("div",{className:"w-full flex justify-center items-center py-2",children:e(G,{})})]})}),e("div",{className:"w-full px-3 md:px-0",children:t("form",{onSubmit:E(async f=>{p.fire({title:"Do you want to save the changes?",showDenyButton:!0,showCancelButton:!0,confirmButtonText:"Save",denyButtonText:"Don't save"}).then(async n=>{if(n.isConfirmed)try{const i=await x.post("/managment/profie-update",f,{withCredentials:!0});i&&i.data.status==="success"&&p.fire("Saved!","","success")}catch(i){p.fire("Unable to save the changes","","error"),console.log(i)}else n.isDenied&&p.fire("Changes are not saved","","info")})}),children:[t("div",{className:"flex flex-col w-full md:flex-row justify-center text-gray-400",children:[t("label",{children:[e("span",{className:"text-gray-400",children:"First Name"}),e("input",{id:"first_name",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",...d("first_name")}),l.first_name&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.first_name.message]})]}),t("label",{className:"mt-2 md:mt-0",children:[e("span",{className:"text-gray-400",children:"Last name"}),e("input",{id:"last_name",className:"placeholder:text-black text-white field mt-1 block bg-gray-800 border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm",type:"text",...d("last_name")}),l.last_name&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.last_name.message]})]})]}),t("div",{className:"flex flex-col md:flex-row justify-center",children:[t("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"Email"}),e("input",{id:"email",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",disabled:!0,value:I,...d("email")}),l.email&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.email.message]})]}),t("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"Job Title"}),e("input",{id:"job_title",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3",type:"text",...d("job_title")}),l.job_title&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.job_title.message]})]})]}),t("div",{className:"flex flex-col md:flex-row justify-center",children:[t("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"LinkedIn"}),e("input",{id:"linkedIn",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",...d("linkedIn")}),l.linkedIn&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.linkedIn.message]})]}),t("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"Twitter (Optional)"}),e("input",{id:"twitter",className:"placeholder:text-black field mt-1 block bg-gray-800 border-gray-800 text-white rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm",type:"text",...d("twitter")}),l.twitter&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.twitter.message]})]})]}),t("div",{className:"ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9",children:[e("label",{htmlFor:"message",className:"block mt-4 mb-2 text-sm font-medium"}),e("span",{className:"text-gray-400",children:"Goal"}),e("textarea",{id:"goal",rows:4,className:"placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-800 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-dark-500 focus:ring-1",...d("goal")}),l.goal&&t("small",{className:"text-red-500 text-sm italic",children:["*",l.goal.message]}),e("h1",{className:"mt-2 text-sm text-white",children:"It's good practice to build mentorship around a long-term goal of yours. This is shared with mentors."})]}),e("div",{className:"flex md:justify-end justify-center py-4 md:px-9",children:e("button",{type:"submit",id:"saveBtn",className:"px-2 py-2 md:px-2 md:py-2 rounded-md bg-color-five text-white mb-4",children:"Save Changes"})})]})})]})})]})};export{oe as default};
