import{j as e,u as p,r as l}from"./index-ZbWYSfd7.js";import h from"./Navbar-0n8U2OQz.js";import{m as d,A as u}from"./AnimatedText-FGZv56rp.js";import"./Toast-7kIuDuDo.js";import"./index-WSgq0TVm.js";import"./index-VSl0TVfG.js";/* empty css                     */import"./index-CUx-uIXr.js";const x=({children:t})=>e.jsx("span",{className:"word-wrapper",children:t}),g={paragraph:"p",heading1:"h1",heading2:"h2"},f=t=>{console.log("Hello Two",t);const a={hidden:{y:"200%",transition:{ease:[.455,.03,.515,.955],duration:.85}},visible:{y:0,transition:{ease:[.455,.03,.515,.955],duration:.75}}},c=t.text.split(" "),r=[];for(const[,n]of c.entries())r.push(n.split(""));r.forEach(n=>n.push(" "));const o=g[t.type];return e.jsx(o,{children:r.map((n,s)=>e.jsx(x,{children:r[s].flat().map((i,m)=>e.jsx("span",{style:{overflow:"hidden",display:"inline-block",fontSize:"45px",height:"65px"},children:e.jsx(d.span,{style:{display:"inline-block"},variants:a,children:i})},m))},s))})},E=()=>{const t=p(),[a,c]=l.useState(!0),r=[{type:"heading1",text:"Welcome,"}],o={visible:{transition:{staggerChildren:.025}}},n=[{type:"heading2",text:"Share your knowledge"}];return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"w-full h-screen bg-background-two",children:[e.jsx(h,{}),e.jsx("div",{className:"w-full md:w-full h-16 bg-background-two text-white flex items-center justify-around"}),e.jsx("div",{className:"w-full h-80 bg-background-two flex justify-start",children:e.jsxs("div",{className:"ml-3 md:ml-10",children:[e.jsxs(d.div,{className:"App",initial:"hidden",animate:a?"visible":"hidden",variants:o,children:[e.jsx("div",{className:"container font-semibold text-color-five",children:r.map((s,i)=>l.createElement(u,{...s,key:i}))}),e.jsx("div",{className:"text-3xl py-3 text-gray-400",children:n.map((s,i)=>l.createElement(f,{...s,key:i}))})]}),e.jsx("div",{className:"mt-4",children:e.jsx("button",{type:"button",className:"text-white bg-gradient-to-r bg-color-five w-40 md:w-52 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",onClick:()=>{t("/mentor/profile")},children:"Profile"})})]})})]})})};export{E as default};
