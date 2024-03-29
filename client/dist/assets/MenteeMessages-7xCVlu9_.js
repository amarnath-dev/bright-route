import{r as i,S as q,d as z,a as H,b as J,R as K,j as t,L as k,e as E,f as Q,g as W,n as X,s as M}from"./index-3TceeTOD.js";import{C as Z,E as ee,M as se,d as te,a as ae,b as ne,c as oe}from"./Close-Vf-LoMuY.js";import{d as A}from"./VideoChat-6gWqq7zb.js";/* empty css                     */import{N as ie}from"./Navbar-XOTjCJtn.js";import"./generateUtilityClasses-lap0UWya.js";import"./createSvgIcon-GwF7MXM7.js";import"./createSvgIcon-SrMR24XR.js";import"./useTimeout-nvZZxNHc.js";import"./ownerWindow-J0v5-7PB.js";import"./sweetalert2.all-KwTCPX7N.js";import"./index-vkJcP6vC.js";import"./Toast-Zzs0v0Ml.js";import"./index-fdt_ya2m.js";const we=()=>{const o=i.useContext(q),m=z(),[S,$]=i.useState([]),[a,C]=i.useState(null),{user:e}=H(s=>s.userAuth),{mentorId:x,menteeID:y}=J(),[v,w]=i.useState([]),[f,I]=i.useState(""),[h,L]=i.useState(null),u=K.useRef(null),[N,B]=i.useState(!1),[P,b]=i.useState(),[j,R]=i.useState("");i.useEffect(()=>{var n;const s=a==null?void 0:a.members.find(c=>c!==(e==null?void 0:e._id));(n=o==null?void 0:o.current)==null||n.emit("typing",s)},[f]),i.useEffect(()=>{var s;f||(s=o==null?void 0:o.current)==null||s.emit("notTyping",a==null?void 0:a.members)},[f]),i.useEffect(()=>{var s;console.log("Get typing is running..."),(s=o==null?void 0:o.current)==null||s.on("getTyping",()=>{console.log("TYPING...")})},[]),i.useEffect(()=>{var s;(s=o==null?void 0:o.current)==null||s.on("getMessage",n=>{console.log("Arrival Message -> ",n),L(n)})},[o==null?void 0:o.current]),i.useEffect(()=>{(async()=>{var n;try{if((await m.post("chat/conversation",{receiverId:x||y,senderId:e==null?void 0:e._id},{withCredentials:!0})).data)if(x){const r=await m.get(`chat/mentee/conversation/${e==null?void 0:e._id}/${x}`,{withCredentials:!0});console.log("-->",r.data),r.data&&($(r.data.conversation),C((n=r.data.conversation)==null?void 0:n[0]))}else{const r=await m.get(`chat/mentor/conversation/${e==null?void 0:e._id}/${y}`,{withCredentials:!0});r.data&&($(r.data.conversation),C(r.data.conversation[0]))}}catch(c){console.log(c)}})()},[m,y,x,e==null?void 0:e._id]),i.useEffect(()=>{h&&(a!=null&&a.members.includes(h==null?void 0:h.senderId))&&w(s=>[...s,h])},[h,a,a==null?void 0:a.members]),i.useEffect(()=>{try{(async()=>{const n=await m.get(`chat/allConversation/${a==null?void 0:a._id}`);n.data&&w(n.data.allMessages)})()}catch(s){console.log(s)}},[S,m,e==null?void 0:e._id,a==null?void 0:a._id,a]);const D=async s=>{var n,c,r;if(s.preventDefault(),!(!f&&!j))try{if(P&&j){const l={senderId:e==null?void 0:e._id,text:j,conversationId:a==null?void 0:a._id,type:"image"},p=a==null?void 0:a.members.find(g=>g!==(e==null?void 0:e._id)),d=await m.post("chat/message",l,{withCredentials:!0});d&&((n=o==null?void 0:o.current)==null||n.emit("sendMessage",{...d.data.savedMessage,receiverId:p}),w([...v,d.data.savedMessage]),R(""),b(!1))}if(f){const l={senderId:e==null?void 0:e._id,text:f,conversationId:a==null?void 0:a._id,type:"text"},p=a==null?void 0:a.members.find(g=>g!==(e==null?void 0:e._id)),d=await m.post("chat/message",l,{withCredentials:!0});d&&((c=o==null?void 0:o.current)==null||c.emit("sendMessage",{...d.data.savedMessage,receiverId:p})),w([...v,d.data.savedMessage]),I("")}try{const l=a==null?void 0:a.members.find(g=>g!==(e==null?void 0:e._id)),p={userId:l,content:"You have New Message 🔔",role:"mentor",messageType:"new chat",senderId:e==null?void 0:e._id};await m.post(`/notification/chatNotification/${e==null?void 0:e._id}`,{ChatMessage:p},{withCredentials:!0})?(r=o==null?void 0:o.current)==null||r.emit("sendNotification",{senderId:e==null?void 0:e._id,receiverId:l,content:"You have a New Message 🔔",type:"chat message"}):console.log("Chat notification send failed")}catch(l){console.log(l)}}catch(l){console.log(l)}};i.useEffect(()=>{var s;(s=u==null?void 0:u.current)==null||s.scrollIntoView({behavior:"smooth"})},[v]);const F=()=>{B(s=>!s)},T=s=>{const n=document.getElementById("imoji-btn"),c=document.getElementById("imoji-picker");n&&c&&!n.contains(s==null?void 0:s.target)&&!c.contains(s==null?void 0:s.target)&&B(!1)};i.useEffect(()=>(N&&window.addEventListener("click",T),()=>{window.removeEventListener("click",T)}),[N]);const O=s=>{const n=s.emoji;n?I(c=>c+n):console.log("emoji is not available")},Y=async s=>{var n;if(s.target.files){const c=s.target.files[0],r=new Blob([c],{type:c.type}),l=Math.random().toString(16).slice(2)+(new Date().getTime()/1e3).toString(),p=E(M,l),d=await Q(p,r);if(d){const g=(n=d.metadata)==null?void 0:n.fullPath;if(R(g),g){const U=E(M,g);b(!0),W(U).then(_=>{const V=document.getElementById("chat_img_main");V.src=_}).catch(_=>{console.log(_)})}}s.target.value=""}},G=()=>{const s=E(M,j);X(s).then(()=>{b(!1)}).catch(n=>{console.log("Error Occured",n)})};return i.useEffect(()=>{b(!1)},[]),i.useEffect(()=>{var s;(s=u.current)==null||s.scrollIntoView({behavior:"smooth"})},[v]),t.jsxs(t.Fragment,{children:[t.jsx(ie,{}),t.jsxs("div",{className:"grid grid-cols-12 h-full bg-background-two",children:[t.jsx("div",{className:"col-span-3 px-1 py-1"}),t.jsx("div",{className:"col-span-12 md:col-span-6 bg-gray-800 rounded-md",children:t.jsxs("div",{className:"flex flex-col items-center justify-center w-full min-h-screen text-gray-800 rounded",children:[t.jsx("div",{className:"w-full",id:"chat_header",children:t.jsx("div",{children:S.map((s,n)=>t.jsxs("div",{className:"flex",children:[t.jsx(Z,{conversation:s,currentUser:e,index:n}),t.jsxs("div",{className:"flex justify-center items-center px-4",children:[(e==null?void 0:e.role)==="mentee"&&t.jsx(k,{to:`/video/${x}`,className:"border rounded-md text-gray-400 bg-gray-900 px-4 py-4",target:"_blank",children:t.jsx(A,{className:"text-gray-200"})}),(e==null?void 0:e.role)==="mentor"&&t.jsx(t.Fragment,{children:t.jsx(k,{to:`/video/${y}`,className:"border rounded-md text-gray-400 bg-gray-900 px-4 py-4",target:"_blank",children:t.jsx(A,{})})})]})]},n))})}),t.jsx("div",{id:"imoji-picker",children:N&&t.jsx(ee,{onEmojiClick:O})}),t.jsxs("div",{className:"flex flex-col flex-grow w-full bg-green shadow-xl rounded-lg overflow-hidden",children:[t.jsx("div",{className:"flex flex-col flex-grow h-0 p-4 overflow-auto",children:v.map((s,n)=>t.jsx("div",{ref:u,children:t.jsx(se,{message:s,own:(s==null?void 0:s.senderId)===(e==null?void 0:e._id),index:n,currentChat:a,userId:e==null?void 0:e._id})},n))}),P?t.jsxs("div",{className:"bg-gray-100 border-2 flex justify-center px-3 py-3",children:[t.jsx("img",{id:"chat_img_main",src:"",className:"object-cover h-40"}),t.jsx("span",{className:"px-2 cursor-pointer",onClick:G,children:t.jsx(te,{className:"border-2 rounded"})})]}):"",t.jsxs("div",{className:"flex items-center px-1 w-full mb-4",children:[t.jsxs("div",{className:"px-2 hover:bg-gray-300 rounded-full",children:[t.jsx("span",{className:"hidden",children:t.jsx("input",{type:"file",src:j||"",id:"imageFile",onChange:Y})}),t.jsx("span",{onClick:()=>{var s;(s=document.getElementById("imageFile"))==null||s.click()},children:t.jsx(ae,{className:"text-gray-400"})})]}),t.jsx("input",{type:"text",id:"messageInput",placeholder:"Type a message...",className:"w-full rounded-l h-10 pl-2 bg-gray-800 text-white",value:f,onChange:s=>I(s.target.value)}),t.jsx("div",{children:t.jsx("span",{className:"px-2 py-2",onClick:F,id:"imoji-btn",children:t.jsx(ne,{className:"text-gray-400"})})}),t.jsx("div",{className:"bg-gray-800 rounded-r h-10 flex items-center px-2 cursor-pointer hover:bg-slate-300",onClick:D,children:t.jsx(oe,{className:"text-gray-400"})})]})]})]})}),t.jsx("div",{className:"col-span-3"})]})]})};export{we as default};
