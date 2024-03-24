import{r as o,a as j,d as N,j as t,B as A,u as F,F as H,k as B,m as E,l as L}from"./index-ZbWYSfd7.js";import{N as v,D as h,A as S}from"./Toast-7kIuDuDo.js";import{G as f,F as R}from"./index-WSgq0TVm.js";import{f as _}from"./index-VSl0TVfG.js";/* empty css                     */import{l as T}from"./index-CUx-uIXr.js";function O(e){return f({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{fill:"none",strokeLinejoin:"round",strokeWidth:"32",d:"M408 64H104a56.16 56.16 0 0 0-56 56v192a56.16 56.16 0 0 0 56 56h40v80l93.72-78.14a8 8 0 0 1 5.13-1.86H408a56.16 56.16 0 0 0 56-56V120a56.16 56.16 0 0 0-56-56z"},child:[]},{tag:"circle",attr:{cx:"160",cy:"216",r:"32"},child:[]},{tag:"circle",attr:{cx:"256",cy:"216",r:"32"},child:[]},{tag:"circle",attr:{cx:"352",cy:"216",r:"32"},child:[]}]})(e)}function U(e){return f({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M440.08 341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118 0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 0 1-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 0 1-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14 0 75.36-13.29 91.42-35.31 118-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 0 0-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 0 0-4.61-37.66zM256 480a80.06 80.06 0 0 0 70.44-42.13 4 4 0 0 0-3.54-5.87H189.12a4 4 0 0 0-3.55 5.87A80.06 80.06 0 0 0 256 480z"},child:[]}]})(e)}function V(e){return f({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"},child:[]}]})(e)}function $(e){return f({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"},child:[]}]})(e)}const G=({setOpen:e,notData:g})=>{const[n,p]=o.useState([]),{user:d}=j(s=>s.userAuth),l=N(),x=()=>{e(!1)};o.useEffect(()=>{(async()=>{try{const a=await l.get(`/notification/getNotifications/${d==null?void 0:d._id}`,{withCredentials:!0});p(a.data.notifications)}catch(a){console.log(a)}})()},[g,d==null?void 0:d._id,l]);const m=async s=>{try{if((await l.delete(`/notification/delete/${s}`,{withCredentials:!0})).data.status==="success"){const u=n==null?void 0:n.map(i=>(i==null?void 0:i._id)===s?{...i,isDeleted:!0}:i);p(u),A.success("Notification Deleted")}}catch(a){console.log(a)}};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"w-96 h-screen shadow-lg rounded-lg bg-gray-800 overflow-y-scroll px-5 py-2",children:[t.jsxs("div",{className:"text-start font-bold text-gray-700 flex justify-between",children:[t.jsx("h1",{className:"py-2 px-2 text-xl text-gray-400",children:"Alerts"}),t.jsx("span",{className:"px-1 py-2",children:t.jsx(V,{className:"text-3xl cursor-pointer rounded-full hover:bg-gray-400",onClick:x})})]}),t.jsx("div",{className:"flex justify-start items-start flex-col mx-1 my-1",children:(n==null?void 0:n.length)>0?t.jsx("div",{className:"flex-wrap rounded-lg w-full",children:n==null?void 0:n.map((s,a)=>t.jsx("div",{className:"px-2 py-1 w-full hover:bg-slate-300 cursor-pointer rounded-md",children:s!=null&&s.isDeleted?"":t.jsx(t.Fragment,{children:t.jsxs("div",{children:[t.jsx("span",{className:"flex justify-end",children:t.jsx($,{className:"text-xl text-gray-700 hover:bg-gray-800 hover:text-white rounded-full",onClick:()=>m(s==null?void 0:s._id)})}),t.jsx("p",{className:"text-black rounded-md px-2",children:s==null?void 0:s.content},a),t.jsx("small",{className:"text-black px-2",children:_(s==null?void 0:s.createdAt)})]})})},a))}):t.jsx(t.Fragment,{children:t.jsx("div",{children:t.jsx("h1",{className:"text-black px-4 py-4 text-xl text-gray-400",children:"No Notifications"})})})})]})})};function W(e){return f({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"},child:[]}]})(e)}const q="/assets/BRLogo-T1lppu6R.png",J="https://bright-route.online",te=()=>{const{user:e}=j(c=>c.userAuth),[g,n]=o.useState(),[p,d]=o.useState(),l=F(),x=N(),[m,s]=o.useState(!1),[a,u]=o.useState(null),i=o.useRef(null);o.useEffect(()=>{var c;i.current=T(J),(c=i.current)==null||c.on("getNotification",r=>{u({senderId:r==null?void 0:r.senderId,content:r==null?void 0:r.content,type:r==null?void 0:r.type,createdAt:Date.now()})})},[]),o.useEffect(()=>{var c;(c=i.current)==null||c.emit("addUser",e==null?void 0:e._id)},[e]);const y=()=>{(e==null?void 0:e.role)==="mentee"&&l("/managment"),(e==null?void 0:e.role)==="mentor"&&l("/mentor/profile")},w=async()=>{(await x.delete("/logout",{withCredentials:!0})).data.status==="success"&&(H.remove("accessToken"),l("/signin"))};o.useEffect(()=>{(async()=>{try{const r=await x.get(`/getimage/${e==null?void 0:e.role}`,{withCredentials:!0});r.data&&n(r.data.profileImageId)}catch(r){console.error("Error fetching profile image ID:",r)}})()},[x,e==null?void 0:e.role]),o.useEffect(()=>{g&&(async()=>{try{const D=B(E,g),P=await L(D);d(P)}catch(r){console.error(r)}})()},[g,x]);const k=()=>{(e==null?void 0:e.role)==="mentor"&&l("/mentor/my-mentees")},I=()=>{(e==null?void 0:e.role)==="mentor"&&l("/mentor/chat"),(e==null?void 0:e.role)==="mentee"&&l("/my-mentors")},b=()=>{(e==null?void 0:e.role)==="mentor"&&l("/mentor/plans")},C=()=>{(e==null?void 0:e.role)==="mentor"&&l("/mentor/managment/password")},M=()=>{s(c=>!c)},z=()=>{(e==null?void 0:e.role)==="mentee"?l("/"):(e==null?void 0:e.role)==="mentor"?l("/mentor/home"):l("/admin/dashboard")};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"grid grid-cols-12 w-full items-center sticky shadow-lg z-10",children:[t.jsx("div",{className:"col-span-4 bg-gray-800 h-16 flex items-center",children:t.jsx("img",{src:q,className:"w-16 py-6 ml-10 cursor-pointer px-2 md:px-0",alt:"logo",onClick:z})}),t.jsx("div",{className:"col-span-8 bg-gray-800 h-16",children:t.jsx("div",{className:"flex justify-end items-center text-gray-400",children:t.jsxs("div",{className:"flex",children:[t.jsxs("div",{className:"flex gap-7 items-center",children:[t.jsx("div",{onClick:k,className:m?"hidden":"block",children:(e==null?void 0:e.role)==="mentor"?t.jsx(W,{className:"text-3xl text-gray-400 hover:text-blue-600 cursor-pointer"}):""}),t.jsx("div",{onClick:I,className:m?"hidden":"block",children:(e==null?void 0:e.role)==="mentor"?t.jsx(O,{className:"text-3xl hover:text-blue-600 cursor-pointer text-gray-400"}):t.jsx(t.Fragment,{children:t.jsx(R,{className:"text-3xl hover:text-blue-600 text-gray-400"})})}),t.jsx("div",{className:m?"hidden":"block",children:t.jsx("span",{className:"cursor-pointer",children:t.jsx(U,{className:"text-3xl hover:text-blue-600 text-gray-400",onClick:M})})})]}),t.jsx(v,{fluid:!0,rounded:!0,className:m?"hidden":"block",children:t.jsxs("div",{className:"flex px-2",children:[t.jsxs(h,{arrowIcon:!1,inline:!0,label:t.jsx(S,{alt:"User_settings",img:p||"",rounded:!0}),children:[t.jsxs(h.Header,{children:[t.jsx("span",{className:"block text-sm",children:"Signed in as"}),t.jsx("span",{className:"block truncate text-sm font-medium",children:e==null?void 0:e.email})]}),t.jsx(h.Item,{onClick:y,children:"My Profile"}),(e==null?void 0:e.role)==="mentor"?t.jsx(h.Item,{onClick:b,children:"My Plans"}):"",(e==null?void 0:e.role)==="mentor"?t.jsx(h.Item,{onClick:C,children:"Password"}):"",t.jsx(h.Divider,{}),t.jsx(h.Item,{onClick:w,children:"Log out"})]}),t.jsx(v,{})]})}),m?t.jsx(G,{setOpen:s,notData:a||null}):""]})})})]})})};export{te as default};
