import{r as n,G as c}from"./index-BH-Ykf6z.js";import{o as r}from"./generateUtilityClasses-HJM5CisE.js";let e=0;function f(t){const[o,s]=n.useState(t),a=t||o;return n.useEffect(()=>{o==null&&(e+=1,s(`mui-${e}`))},[o]),a}const u=c.useId;function i(t){if(u!==void 0){const o=u();return t??o}return f(t)}function I(t){return r(t).defaultView||window}export{I as o,i as u};