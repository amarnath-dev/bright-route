import{a as d,y as p,u,r as m,a3 as g,B as o,j as l,e as i,L as y,F as h}from"./index-MSa4Xrv_.js";const b=()=>{const{formOne:e,formTwo:t,formThree:s}=d(a=>a.mentorApply),n=p(),r=u();return m.useEffect(()=>{if(e&&t&&s){console.log("Form One",e),console.log("Form Two",t),console.log("Form Three",s);const a={profile_img:e==null?void 0:e.profile_image,first_name:e==null?void 0:e.first_name,last_name:e==null?void 0:e.last_name,email:e==null?void 0:e.email,password:e==null?void 0:e.email,job_title:e==null?void 0:e.job_title,company:e==null?void 0:e.company,job_category:t==null?void 0:t.job_category,skills:t==null?void 0:t.skills,bio_dec:t==null?void 0:t.bio,linkedIn_url:t==null?void 0:t.linked_in,twitter_url:t==null?void 0:t.twitter,why_mentor:s==null?void 0:s.why_mentor,achievement:s==null?void 0:s.achievement};(async()=>{try{(await n(g(a))).meta.requestStatus==="fulfilled"?r("/signin"):o.error("Something went wrong!")}catch(c){console.log(c),o.error("An error occurred during submission.")}})()}},[e,t,s,n,r]),l(h,{children:l("div",{className:"w-full h-screen bg-background-one flex",children:l("div",{className:"w-full flex justify-center items-center",children:l("figure",{className:"rounded-xl p-8 h-96 ml-5 mr-5 border-2 bg-color-two",children:i("div",{className:"md:pt-6 space-y-4",children:[i("blockquote",{children:[l("p",{className:"text-lg font-bold text-center text-color-five md:text-3xl",children:"Thank you for applying as a Mentor!"}),i("p",{className:"text-sm font-bold text-center mt-4 md:text-2xl",children:["We will review your're application and get back to you as soon as possible.",l("br",{}),"Generally, you should hear from us within 1-2 working days."]})]}),l("div",{className:"flex justify-center",children:l(y,{to:"/mentor/login",className:"border-2 py-1 px-3 bg-color-one text-white md:py-2 md:px-5 rounded-md md:mt-10",children:"Back to Home"})})]})})})})})};export{b as default};
