import{j as e,e as a,F as h,a as N,d as v,r as d,L as k,f as _,g as j,s as C}from"./index-MSa4Xrv_.js";import{a as I,N as S}from"./index-DUeOS12C.js";import{C as P}from"./Croper-C2bXGvmS.js";/* empty css                  */import{S as c}from"./sweetalert2.all-CuoLsYrO.js";import"./Toast-RnQcExTH.js";import"./index-3w_A1nHd.js";import"./index-DKBfrxI9.js";/* empty css                     */import"./generateUtilityClasses-e-Van3DU.js";import"./emotion-react.browser.esm-BgjWKLVn.js";import"./createSvgIcon-CltYtxMl.js";import"./createSvgIcon-TtRVqJ9-.js";import"./useTimeout-B8Lbx4ZM.js";import"./ownerWindow-BBij6FeE.js";import"./ButtonBase-ClnSlWZ_.js";import"./TransitionGroupContext-DOXd_jAu.js";const B=()=>e(h,{children:e("div",{children:e("div",{className:"flex justify-center items-center mt-2 px-4",children:a("div",{className:"flex-1 text-sm ring-1 ring-[#fff7625c] bg-gray-800 px-2 py-2 md:px-4 md:py-4 rounded-md",children:[a("span",{className:"flex flex-row",children:[e("h1",{className:"font-bold text-color-five",children:"Tips"}),e("img",{src:"https://www.google.com/images/hpp/gemini-48x48px.png",alt:"",className:"ml-1 h-6 w-6"})]}),a("ul",{className:"text-white",children:[e("li",{className:"text-md md:mt-2",children:"Adding your photo and social media profiles helps mentors feel confident that you’re a real person (e.g. not a bot)."}),e("li",{className:"text-md md:mt-2",children:"Your profile is only visible to mentors that you send applications to. It is not indexed on search engines like Google."})]})]})})})}),Q=()=>{const{user:n}=N(r=>r.userAuth),f=v(),[u,p]=d.useState(""),[F,x]=d.useState(""),[b,y]=d.useState(""),[t,g]=d.useState({profile_img:"",first_name:"",last_name:"",email:"",country:"",job_title:"",linkedIn:"",twitter:"",goal:""}),o=r=>{const{name:l,value:i}=r.target;g({...t,[l]:i})};d.useEffect(()=>{(async()=>{var l,i;try{const s=(await f.get(`/managment/${n==null?void 0:n._id}`,{withCredentials:!0})).data.menteeDetails[0];p((l=s.menteeProfile)==null?void 0:l.goal),x((i=s.menteeProfile)==null?void 0:i.profile_img),g(s.menteeProfile),y(s==null?void 0:s.email)}catch(m){console.log(m)}})()},[f,n==null?void 0:n._id]),t.profile_img&&(async()=>{const l=t.profile_img;if(l){const i=_(C,l);j(i).then(m=>{const s=document.getElementById("profile-image");s.src=m}).catch(m=>{console.log(m)})}})();const w=async()=>{c.fire({title:"Do you want to save the changes?",showDenyButton:!0,showCancelButton:!0,confirmButtonText:"Save",denyButtonText:"Don't save"}).then(async r=>{if(r.isConfirmed){t.goal=u;try{if(t.first_name=t.first_name.replace(/\s/g,""),t.last_name=t.last_name.replace(/\s/g,""),t.job_title=t.job_title.replace(/\s/g,""),t.goal=t.goal.replace(/\s/g,""),!t.first_name||!t.last_name||!t.goal){c.fire({title:"Fields are Required",text:"Firstname Lastname Job Title and Goal fields are required",icon:"error"});return}const l=await f.post("/managment/profie-update",t,{withCredentials:!0});l&&l.data.status==="success"&&c.fire("Saved!","","success")}catch(l){c.fire("Unable to save the changes","","error"),console.log(l)}}else r.isDenied&&c.fire("Changes are not saved","","info")})};return a(h,{children:[e(S,{}),e("div",{className:"w-full h-full flex justify-center bg-background-two py-4",children:a("div",{className:"w-full md:w-2/3 h-full border border-gray-500 mt-10 rounded-md",children:[a("div",{className:"w-full h-full flex justify-center flex-col",children:[e("h1",{className:"text-center mt-4 text-md md:text-lg font-bold text-white",children:"Personal Information"}),e(B,{})]}),e("div",{className:"flex justify-between px-2",children:e("div",{className:"flex justify-center px-4 items-center",children:e(k,{to:"/managment/password",className:"text-blue-500 underline",children:"Change Password"})})}),t!=null&&t.profile_img?"":e("div",{className:"flex flex-col ml-6",children:e("h1",{className:"font-bold text-white",children:"Add a profile Image"})}),e("div",{className:"px-2 md:px-5 md:py-2 flex items-center py-3",children:a("div",{className:"flex w-full flex-col items-center",children:[e("span",{className:"flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4",children:e("img",{src:I,alt:"profile_img",className:"md:h-38 md:w-38 rounded-full object-cover",id:"profile-image"})}),e("div",{className:"w-full flex justify-center items-center py-2",children:e(P,{})})]})}),a("div",{className:"w-full px-3 md:px-0",children:[a("div",{className:"flex flex-col w-full md:flex-row justify-center text-gray-400",children:[a("label",{children:[e("span",{className:"text-gray-400",children:"First Name"}),e("input",{id:"first_name",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",name:"first_name",required:!0,onChange:o,value:t.first_name})]}),a("label",{className:"mt-2 md:mt-0",children:[e("span",{className:"text-gray-400",children:"Last name"}),e("input",{id:"last_name",className:"placeholder:text-black text-white field mt-1 block bg-gray-800 border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm",type:"text",name:"last_name",required:!0,value:t==null?void 0:t.last_name,onChange:o})]})]}),a("div",{className:"flex flex-col md:flex-row justify-center",children:[a("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"Email"}),e("input",{id:"email",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",name:"email",disabled:!0,value:b,onChange:o})]}),a("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"Job Title"}),e("input",{id:"job_title",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3",type:"text",name:"job_title",value:t.job_title,onChange:o})]})]}),a("div",{className:"flex flex-col md:flex-row justify-center",children:[a("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"LinkedIn"}),e("input",{id:"linkedIn",className:"placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm",type:"text",name:"linkedIn",onChange:o,value:t.linkedIn})]}),a("label",{className:"mt-2",children:[e("span",{className:"text-gray-400",children:"Twitter(Optional)"}),e("input",{id:"twitter",className:"placeholder:text-black field mt-1 block bg-gray-800 border-gray-800 text-white rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm",type:"text",name:"twitter",value:t.twitter,onChange:o})]})]}),a("div",{className:"ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9",children:[e("label",{htmlFor:"message",className:"block mt-4 mb-2 text-sm font-medium"}),e("span",{className:"text-gray-400",children:"Goal"}),e("textarea",{id:"goal",rows:4,name:"goal",value:u,onChange:r=>p(r.target.value),className:"placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-800 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-dark-500 focus:ring-1"}),e("h1",{className:"mt-2 text-sm text-white",children:"It's good practice to build mentorship around a long-term goal of yours. This is shared with mentors."})]}),e("div",{className:"flex md:justify-end justify-center py-4 md:px-9",children:e("button",{type:"submit",id:"saveBtn",className:"px-2 py-2 md:px-2 md:py-2 rounded-md bg-color-five text-white mb-4",onClick:w,children:"Save Changes"})})]})]})})]})};export{Q as default};
