import{r as e,R as O,y as q,u as H,j as b,F as N,Z as V,B as Z}from"./index-CEyOv1Zh.js";function J(o={}){const{nonce:t,onScriptLoadSuccess:c,onScriptLoadError:s}=o,[l,u]=e.useState(!1),n=e.useRef(c);n.current=c;const v=e.useRef(s);return v.current=s,e.useEffect(()=>{const r=document.createElement("script");return r.src="https://accounts.google.com/gsi/client",r.async=!0,r.defer=!0,r.nonce=t,r.onload=()=>{var i;u(!0),(i=n.current)===null||i===void 0||i.call(n)},r.onerror=()=>{var i;u(!1),(i=v.current)===null||i===void 0||i.call(v)},document.body.appendChild(r),()=>{document.body.removeChild(r)}},[t]),l}const B=e.createContext(null);function K({clientId:o,nonce:t,onScriptLoadSuccess:c,onScriptLoadError:s,children:l}){const u=J({nonce:t,onScriptLoadSuccess:c,onScriptLoadError:s}),n=e.useMemo(()=>({clientId:o,scriptLoadedSuccessfully:u}),[o,u]);return O.createElement(B.Provider,{value:n},l)}function P(){const o=e.useContext(B);if(!o)throw new Error("Google OAuth components must be used within GoogleOAuthProvider");return o}function Q(o){var t;return(t=o==null?void 0:o.clientId)!==null&&t!==void 0?t:o==null?void 0:o.client_id}const U={large:40,medium:32,small:20};function W({onSuccess:o,onError:t,useOneTap:c,promptMomentNotification:s,type:l="standard",theme:u="outline",size:n="large",text:v,shape:r,logo_alignment:i,width:x,locale:A,click_listener:F,containerProps:g,...M}){const C=e.useRef(null),{clientId:I,scriptLoadedSuccessfully:j}=P(),R=e.useRef(o);R.current=o;const w=e.useRef(t);w.current=t;const D=e.useRef(s);return D.current=s,e.useEffect(()=>{var p,m,h,_,y,S,E,G,L;if(j)return(h=(m=(p=window==null?void 0:window.google)===null||p===void 0?void 0:p.accounts)===null||m===void 0?void 0:m.id)===null||h===void 0||h.initialize({client_id:I,callback:d=>{var a;if(!(d!=null&&d.credential))return(a=w.current)===null||a===void 0?void 0:a.call(w);const{credential:f,select_by:k}=d;R.current({credential:f,clientId:Q(d),select_by:k})},...M}),(S=(y=(_=window==null?void 0:window.google)===null||_===void 0?void 0:_.accounts)===null||y===void 0?void 0:y.id)===null||S===void 0||S.renderButton(C.current,{type:l,theme:u,size:n,text:v,shape:r,logo_alignment:i,width:x,locale:A,click_listener:F}),c&&((L=(G=(E=window==null?void 0:window.google)===null||E===void 0?void 0:E.accounts)===null||G===void 0?void 0:G.id)===null||L===void 0||L.prompt(D.current)),()=>{var d,a,f;c&&((f=(a=(d=window==null?void 0:window.google)===null||d===void 0?void 0:d.accounts)===null||a===void 0?void 0:a.id)===null||f===void 0||f.cancel())}},[I,j,c,l,u,n,v,r,i,x,A]),O.createElement("div",{...g,ref:C,style:{height:U[n],...g==null?void 0:g.style}})}const Y=()=>{const o=q(),t=H();return b(N,{children:b(K,{clientId:"686952413069-mu14ppoaajuiuv03r2b5noletf2qvpj7.apps.googleusercontent.com",children:b(W,{onSuccess:async l=>{if(l.credential){const n=(await o(V(l.credential))).payload;n.status==="success"?t("/"):n.status==409&&Z.error(n.message)}},onError:async()=>{console.log("Error Occured")},width:"380"})})})};export{Y as G};