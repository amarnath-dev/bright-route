import{d as Y,r as a,a as V,R as q,j as t,i as N,n as z,k as G,x as H,l as _}from"./index-nEkFjI82.js";import{C as J,E as K,M as Q,d as W,a as X,b as Z,c as ee}from"./Close-36w-zKET.js";import{l as se}from"./index-CUx-uIXr.js";import"./createSvgIcon-ITRgJRHf.js";import"./createSvgIcon-CZt11SCJ.js";import"./useThemeProps-D9wRHPMB.js";import"./sweetalert2.all-Ftp-RA2-.js";import"./index-vODKYXwj.js";const de=()=>{const r=Y(),[y,S]=a.useState([]),[n,R]=a.useState(),{user:s}=V(e=>e.userAuth),[x,j]=a.useState([]),[h,u]=a.useState(""),[f,B]=a.useState(null),M=q.useRef(null),d=a.useRef(null),[b,k]=a.useState(!1),[E,v]=a.useState(),[m,P]=a.useState("");a.useEffect(()=>{var e;d.current=se("ws://localhost:3000"),(e=d.current)==null||e.on("getMessage",o=>{B(o)})},[]),a.useEffect(()=>{(async()=>{try{const o=await r.get("chat/conversation",{withCredentials:!0});S(o.data.conversation)}catch(o){console.log(o)}})()},[r]);const A=async e=>{console.log("This is the conversation",e);try{if(e.members&&Array.isArray(e.members)){const o=e==null?void 0:e.members.find(c=>c!==(s==null?void 0:s._id));o!==void 0?(await r.post("chat/conversation",{receiverId:o,senderId:s==null?void 0:s._id},{withCredentials:!0}),R(e)):console.log("No mentee found.")}else console.log("conversation.members is undefined or not an array.")}catch(o){console.log(o)}};a.useEffect(()=>{try{(async()=>{const o=await r.get(`chat/allConversation/${n==null?void 0:n._id}`);o.data.allMessages&&j(o.data.allMessages)})()}catch(e){console.log(e)}},[y,r,s==null?void 0:s._id,n==null?void 0:n._id]),a.useEffect(()=>{f&&(n!=null&&n.members.includes(f==null?void 0:f.senderId))&&j(e=>[...e,f])},[f,y,n==null?void 0:n.members]),a.useEffect(()=>{var e,o;(e=d.current)==null||e.emit("addUser",s==null?void 0:s._id),(o=d.current)==null||o.on("getUsers",c=>{console.log(c)})},[s,d]);const U=async e=>{var o,c,w;if(e.preventDefault(),!(!h&&!m)){if(E&&m){const l=n==null?void 0:n.members.find(i=>i!==(s==null?void 0:s._id));if(l!==void 0){(o=d.current)==null||o.emit("sendMessage",{senderId:s==null?void 0:s._id,receiverId:l,text:m,type:"image"});try{const i={senderId:s==null?void 0:s._id,text:m,conversationId:n==null?void 0:n._id,type:"image"},g=await r.post("chat/message",i,{withCredentials:!0});j([...x,g.data.savedMessage]),u(""),v(!1)}catch(i){console.log(i)}}else console.log("No reciverId found.")}if(h){const l=n==null?void 0:n.members.find(i=>i!==(s==null?void 0:s._id));if(l!==void 0){(c=d.current)==null||c.emit("sendMessage",{senderId:s==null?void 0:s._id,receiverId:l,text:h,type:"text"});try{const i={senderId:s==null?void 0:s._id,text:h,conversationId:n==null?void 0:n._id,type:"text"},g=await r.post("chat/message",i,{withCredentials:!0});j([...x,g.data.savedMessage]),u(""),v(!1)}catch(i){console.log(i)}}else console.log("No reciverId found.")}try{const l=n==null?void 0:n.members.find(p=>p!==(s==null?void 0:s._id)),i={userId:l,content:"You have one new Message!!🔔",role:"mentee",messageType:"new chat",senderId:s==null?void 0:s._id};await r.post(`/notification/chatNotification/${s==null?void 0:s._id}`,{ChatMessage:i},{withCredentials:!0})?(w=d.current)==null||w.emit("sendNotification",{senderId:s==null?void 0:s._id,receiverId:l,content:"You have a new message 🔔",type:"chat message"}):console.log("Chat notification send failed")}catch(l){console.log(l)}}};a.useEffect(()=>{var e;(e=M.current)==null||e.scrollIntoView({behavior:"smooth"})},[x]);const $=e=>{const o=e.emoji;o?u(c=>c+o):console.log("emoji is not available")},O=()=>{k(e=>!e)},C=e=>{const o=document.getElementById("imoji-btn"),c=document.getElementById("imoji-picker");o&&c&&!o.contains(e.target)&&!c.contains(e.target)&&k(!1)};a.useEffect(()=>(b&&window.addEventListener("click",C),()=>{window.removeEventListener("click",C)}),[b]);const T=async e=>{var o;if(e.target.files){const c=e.target.files[0],w=new Blob([c],{type:c.type}),l=Math.random().toString(16).slice(2)+(new Date().getTime()/1e3).toString(),i=N(_,l),g=await z(i,w);if(g){const p=(o=g.metadata)==null?void 0:o.fullPath;if(P(p),p){const F=N(_,p);v(!0),G(F).then(I=>{const L=document.getElementById("chat_img_main");L.src=I}).catch(I=>{console.log(I)})}}e.target.value=""}},D=()=>{const e=N(_,m);H(e).then(()=>{v(!1)}).catch(o=>{console.log("Error Occured",o)})};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"grid grid-cols-12 h-full bg-gray-100",children:[t.jsx("div",{className:"col-span-full md:col-span-3 px-1 py-1",children:t.jsxs("div",{className:"w-full",id:"chat_header",children:[t.jsx("div",{className:"rounded-full",children:t.jsx("h1",{className:"text-center text-xl font-bold",children:"Mentees"})}),y.map((e,o)=>t.jsx("div",{onClick:()=>A(e),className:"mt-3",children:t.jsx(J,{conversation:e,currentUser:s,index:o})},o))]})}),t.jsx("div",{className:"col-span-12 md:col-span-6 bg-white rounded-md",children:t.jsxs("div",{className:"flex flex-col items-center justify-center w-full min-h-screen text-gray-800 rounded relative",children:[t.jsx("div",{className:"w-full absolute bottom-15 left-36",children:t.jsx("div",{id:"imoji-picker",children:b&&t.jsx(K,{onEmojiClick:$})})}),t.jsx("div",{className:"flex flex-col flex-grow w-full shadow-xl rounded-lg overflow-hidden",children:n?t.jsxs("div",{children:[t.jsx("div",{className:"flex flex-col flex-grow p-4 overflow-auto h-screen",children:x.map((e,o)=>t.jsx("div",{ref:M,children:t.jsx(Q,{message:e,own:(e==null?void 0:e.senderId)===(s==null?void 0:s._id),index:o,currentChat:n,userId:s==null?void 0:s._id})},o))}),E?t.jsxs("div",{className:"bg-gray-100 border-2 flex justify-center px-3 py-3",children:[t.jsx("img",{id:"chat_img_main",src:"",className:"object-cover h-40"}),t.jsx("span",{className:"px-2 cursor-pointer",onClick:D,children:t.jsx(W,{className:"border-2 rounded"})})]}):"",t.jsxs("div",{className:"flex items-center px-1 w-full mb-4",children:[t.jsxs("div",{className:"px-2 hover:bg-gray-300 rounded-full",children:[t.jsx("span",{className:"hidden",children:t.jsx("input",{type:"file",src:m||"",id:"imageFile",onChange:T})}),t.jsx("span",{onClick:()=>{var e;(e=document.getElementById("imageFile"))==null||e.click()},children:t.jsx(X,{})})]}),t.jsx("input",{type:"text",placeholder:"Type a message...",className:"w-full rounded-l h-10 pl-2",value:h,onChange:e=>u(e.target.value)}),t.jsx("div",{children:t.jsx("span",{className:"px-2 py-2 cursor-pointer",id:"imoji-btn",onClick:O,children:t.jsx(Z,{})})}),t.jsx("div",{className:"bg-gray-200 rounded-r h-10 flex items-center px-2 cursor-pointer hover:bg-slate-300",onClick:U,children:t.jsx(ee,{})})]})]}):t.jsx("div",{className:"text-center mt-10",children:t.jsxs("span",{className:"font-bold text-xl",children:["Please Select a chat to start messaging",t.jsx("img",{src:"https://www.csr-online.net/wp-content/uploads/2020/06/people-speech-bubbles-chatting-communication-concept-vector-illustration-141568372-450x350.jpg",alt:""})]})})})]})}),t.jsx("div",{className:"col-span-3"})]})})};export{de as default};