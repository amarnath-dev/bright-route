import{r as l,S as q,d as z,a as G,R as H,j as a,e as f,F as J,f as j,n as K,g as Q,o as W,s as M}from"./index-Cm1l80VI.js";import{C as X,E as Z,M as ee,d as se,a as te,b as ae,c as oe}from"./Close-CpZDz3Ng.js";/* empty css                     */import"./generateUtilityClasses-CbuUGrSe.js";import"./emotion-react.browser.esm-EPQkPldl.js";import"./createSvgIcon-ZfMzdwQK.js";import"./createSvgIcon-CUMYJe6H.js";import"./useTimeout-BfMRyHkY.js";import"./ownerWindow-B806um-j.js";import"./sweetalert2.all-aYo_8JHa.js";import"./index-ByZ0f9l0.js";const ue=()=>{const c=l.useContext(q),r=z(),[x,P]=l.useState([]),[o,B]=l.useState(),{user:s}=G(e=>e.userAuth),[p,u]=l.useState([]),[v,w]=l.useState(""),[h,R]=l.useState(null),E=H.useRef(null),[b,S]=l.useState(!1),[C,I]=l.useState(),[m,A]=l.useState("");l.useEffect(()=>{var e;(e=c==null?void 0:c.current)==null||e.on("getMessage",t=>{R(t)})},[c]),l.useEffect(()=>{(async()=>{try{const e=await r.get("chat/conversation",{withCredentials:!0});P(e.data.conversation)}catch(e){console.log(e)}})()},[r]);const D=async e=>{try{if(e.members&&Array.isArray(e.members)){const t=e==null?void 0:e.members.find(n=>n!==(s==null?void 0:s._id));t!==void 0?(await r.post("chat/conversation",{receiverId:t,senderId:s==null?void 0:s._id},{withCredentials:!0}),B(e)):console.log("No mentee found.")}else console.log("conversation.members is undefined or not an array.")}catch(t){console.log(t)}};l.useEffect(()=>{(async()=>{var e;try{const t=await r.get(`chat/allConversation/${o==null?void 0:o._id}`);(e=t.data)!=null&&e.messages&&u(t.data.messages)}catch(t){console.log(t)}})()},[x,r,s==null?void 0:s._id,o==null?void 0:o._id]),l.useEffect(()=>{h&&(o!=null&&o.members.includes(h==null?void 0:h.senderId))&&u(e=>[...e,h])},[h,x,o==null?void 0:o.members]);const $=async e=>{var t,n,N;if(e.preventDefault(),!(!v&&!m)){if(C&&m){const d=o==null?void 0:o.members.find(i=>i!==(s==null?void 0:s._id));if(d!==void 0){(t=c==null?void 0:c.current)==null||t.emit("sendMessage",{senderId:s==null?void 0:s._id,receiverId:d,text:m,type:"image"});try{const i={senderId:s==null?void 0:s._id,text:m,conversationId:o==null?void 0:o._id,type:"image"},g=await r.post("chat/message",i,{withCredentials:!0});u([...p,g.data.savedMessage]),w(""),I(!1)}catch(i){console.log(i)}}else console.log("No reciverId found.")}if(v){const d=o==null?void 0:o.members.find(i=>i!==(s==null?void 0:s._id));if(d!==void 0){(n=c==null?void 0:c.current)==null||n.emit("sendMessage",{senderId:s==null?void 0:s._id,receiverId:d,text:v,type:"text"});try{const i={senderId:s==null?void 0:s._id,text:v,conversationId:o==null?void 0:o._id,type:"text"},g=await r.post("chat/message",i,{withCredentials:!0});u([...p,g.data.savedMessage]),w(""),I(!1)}catch(i){console.log(i)}}else console.log("No reciverId found.")}try{const d=o==null?void 0:o.members.find(y=>y!==(s==null?void 0:s._id)),i={userId:d,content:"You have one new Message 🔔",role:"mentee",messageType:"new chat",senderId:s==null?void 0:s._id};await r.post(`/notification/chatNotification/${s==null?void 0:s._id}`,{ChatMessage:i},{withCredentials:!0})?(N=c==null?void 0:c.current)==null||N.emit("sendNotification",{senderId:s==null?void 0:s._id,receiverId:d,content:"You have a new message 🔔",type:"chat message"}):console.log("Chat notification send failed")}catch(d){console.log(d)}}};l.useEffect(()=>{var e;(e=E.current)==null||e.scrollIntoView({behavior:"smooth"})},[p]);const F=e=>{const t=e.emoji;t?w(n=>n+t):console.log("emoji is not available")},T=()=>{S(e=>!e)},k=e=>{const t=document.getElementById("imoji-btn"),n=document.getElementById("imoji-picker");t&&n&&!t.contains(e.target)&&!n.contains(e.target)&&S(!1)};l.useEffect(()=>(b&&window.addEventListener("click",k),()=>{window.removeEventListener("click",k)}),[b]);const O=async e=>{var t;if(e.target.files){const n=e.target.files[0],N=new Blob([n],{type:n.type}),d=Math.random().toString(16).slice(2)+(new Date().getTime()/1e3).toString(),i=j(M,d),g=await K(i,N);if(g){const y=(t=g.metadata)==null?void 0:t.fullPath;if(A(y),y){const Y=j(M,y);I(!0),Q(Y).then(_=>{const V=document.getElementById("chat_img_main");V.src=_}).catch(_=>{console.log(_)})}}e.target.value=""}},L=()=>{const e=j(M,m);W(e).then(()=>{I(!1)}).catch(t=>{console.log("Error Occured",t)})},U=e=>{console.log("my parent mentor, deletd id -> ",e);const t=p.findIndex(n=>n._id===e);if(t>=0){const n=[...p];n[t]={...n[t],IsDeleted:!0},u(n)}};return a(J,{children:f("div",{className:"grid grid-cols-12 h-full md:h-screen px-3 py-15 bg-background-two",children:[a("div",{className:"col-span-full md:col-span-3 px-1 py-1",children:f("div",{className:"w-full overflow-y-scroll",id:"chat_header",children:[a("div",{className:"rounded-full",children:a("h1",{className:"text-center text-xl font-bold text-white",children:"Mentees"})}),x.map((e,t)=>(console.log(x),a("div",{onClick:()=>D(e),className:"mt-3 cursor-pointer",children:a(X,{conversation:e,currentUser:s,index:t})},t)))]})}),a("div",{className:"col-span-12 md:col-span-9 bg-gray-800 h-full rounded-md",children:f("div",{className:"flex flex-col items-center justify-center w-full h-screen text-gray-800 rounded relative",children:[a("div",{className:"w-full absolute",children:a("div",{id:"imoji-picker",children:b&&a(Z,{onEmojiClick:F})})}),a("div",{className:"flex flex-col flex-grow w-full shadow-xl rounded-lg overflow-hidden h-96 py-8 px-1",children:o?f("div",{children:[a("div",{className:"flex flex-col flex-grow p-4 overflow-auto h-screen",children:p.map((e,t)=>a("div",{ref:E,children:a(ee,{paretnType:"mentor",sendDataToParent:U,message:e,own:(e==null?void 0:e.senderId)===(s==null?void 0:s._id),index:t,currentChat:o,userId:s==null?void 0:s._id})},t))}),C&&f("div",{className:"bg-gray-800 flex justify-center px-3 py-3",children:[a("img",{id:"chat_img_main",src:"",className:"object-cover h-40"}),a("span",{className:"px-2 cursor-pointer",onClick:L,children:a(se,{className:"border-2 rounded text-gray-400"})})]}),f("div",{className:"flex items-center px-1 w-full",children:[f("div",{className:"px-1 hover:bg-gray-900 rounded-full",children:[a("span",{className:"hidden",children:a("input",{type:"file",src:m||"",id:"imageFile",onChange:O})}),a("span",{onClick:()=>{var e;(e=document.getElementById("imageFile"))==null||e.click()},children:a(te,{className:"text-gray-400"})})]}),a("input",{type:"text",placeholder:"Type a message...",className:"w-full rounded-l h-10 pl-2 bg-gray-800 text-white",value:v,onChange:e=>w(e.target.value)}),a("div",{children:a("span",{className:"px-2 py-2 cursor-pointer",id:"imoji-btn",onClick:T,children:a(ae,{className:"text-gray-400"})})}),a("div",{className:"bg-gray-800 rounded-r h-10 flex items-center px-2 cursor-pointer",onClick:$,children:a(oe,{className:"text-gray-400"})})]})]}):a("div",{className:"text-center mt-10",children:a("span",{className:"font-bold text-xl text-gray-400",children:"Please Select a chat to start messaging"})})})]})}),a("div",{className:"col-span-3"})]})})};export{ue as default};