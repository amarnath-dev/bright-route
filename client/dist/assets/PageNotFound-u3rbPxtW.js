import{u as r,a as i,r as n,j as a,F as l}from"./index-KMt4GyZR.js";import{S as s}from"./sweetalert2.all-W_mkf_Vb.js";const g=()=>{const e=r(),{user:o}=i(t=>t.userAuth);return n.useEffect(()=>{s.fire({title:"Ooops...Nothing here",width:700,padding:"3em",color:"#01040d",background:"#0d1117 url(https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=)",allowOutsideClick:!1,backdrop:`
        rgba(13, 17, 23,1)
        url("https://tenor.com/sdmcH4wGlaK.gif")
        left top
        no-repeat
      `}).then(t=>{t.isConfirmed&&((o==null?void 0:o.role)==="mentee"&&(console.log("Navigating to /"),e("/")),(o==null?void 0:o.role)==="mentor"&&(console.log("Navigating to /mentor/home"),e("/mentor/home")),(o==null?void 0:o.role)==="admin"&&(console.log("Navigating to /admin/dashboard"),e("/admin/dashboard")))})},[e,o==null?void 0:o.role]),a(l,{children:a("div",{className:"w-full h-screen flex justify-center items-center flex-col bg-background-two"})})};export{g as default};
