import{z as s}from"./zod-uSXiFAcm.js";const o=s.object({email:s.string().email().refine(e=>e.trim()!=="",{message:"Email should not be empty"}),password:s.string().refine(e=>e.trim()!=="",{message:"Password should not be empty"})});export{o as l};