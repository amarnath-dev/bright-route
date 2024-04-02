import{u as r,a as i,r as n,j as a}from"./index-OOUbbyCE.js";import{S as l}from"./sweetalert2.all-ofjOeDPq.js";const d=()=>{const e=r(),{user:o}=i(t=>t.userAuth);return n.useEffect(()=>{l.fire({title:"Ooops...Nothing here",width:700,padding:"3em",color:"#01040d",background:"#0d1117 url(https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=)",allowOutsideClick:!1,backdrop:`
        rgba(13, 17, 23,1)
        url("https://tenor.com/sdmcH4wGlaK.gif")
        left top
        no-repeat
      `}).then(t=>{t.isConfirmed&&((o==null?void 0:o.role)==="mentee"&&(console.log("Navigating to /"),e("/")),(o==null?void 0:o.role)==="mentor"&&(console.log("Navigating to /mentor/home"),e("/mentor/home")),(o==null?void 0:o.role)==="admin"&&(console.log("Navigating to /admin/dashboard"),e("/admin/dashboard")))})},[e,o==null?void 0:o.role]),a.jsx(a.Fragment,{children:a.jsx("div",{className:"w-full h-screen flex justify-center items-center flex-col bg-background-two"})})};export{d as default};
