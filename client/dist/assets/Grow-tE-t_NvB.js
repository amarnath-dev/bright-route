import{_ as f,f as A,u as X,C as ot,T as st,D as rt,b as at}from"./useThemeProps-OBVlNcmu.js";import{c as U,D as w,R as H,r as L,j as lt}from"./index-iuj1aMbv.js";import{_ as ut,T as Z}from"./TransitionGroupContext--2qQM7Os.js";function dt(s){return typeof s=="string"}function ct(s,a,i){return s===void 0||dt(s)?a:f({},a,{ownerState:f({},a.ownerState,i)})}function ft(s,a=[]){if(s===void 0)return{};const i={};return Object.keys(s).filter(e=>e.match(/^on[A-Z]/)&&typeof s[e]=="function"&&!a.includes(e)).forEach(e=>{i[e]=s[e]}),i}function pt(s,a,i){return typeof s=="function"?s(a,i):s}function j(s){if(s===void 0)return{};const a={};return Object.keys(s).filter(i=>!(i.match(/^on[A-Z]/)&&typeof s[i]=="function")).forEach(i=>{a[i]=s[i]}),a}function Et(s){const{getSlotProps:a,additionalProps:i,externalSlotProps:e,externalForwardedProps:n,className:t}=s;if(!a){const O=U(i==null?void 0:i.className,t,n==null?void 0:n.className,e==null?void 0:e.className),S=f({},i==null?void 0:i.style,n==null?void 0:n.style,e==null?void 0:e.style),p=f({},i,n,e);return O.length>0&&(p.className=O),Object.keys(S).length>0&&(p.style=S),{props:p,internalRef:void 0}}const o=ft(f({},n,e)),r=j(e),u=j(n),d=a(o),c=U(d==null?void 0:d.className,i==null?void 0:i.className,t,n==null?void 0:n.className,e==null?void 0:e.className),E=f({},d==null?void 0:d.style,i==null?void 0:i.style,n==null?void 0:n.style,e==null?void 0:e.style),g=f({},d,i,u,r);return c.length>0&&(g.className=c),Object.keys(E).length>0&&(g.style=E),{props:g,internalRef:d.ref}}const ht=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function bt(s){var a;const{elementType:i,externalSlotProps:e,ownerState:n,skipResolvingSlotProps:t=!1}=s,o=A(s,ht),r=t?{}:pt(e,n),{props:u,internalRef:d}=Et(f({},o,{externalSlotProps:r})),c=X(d,r==null?void 0:r.ref,(a=s.additionalProps)==null?void 0:a.ref);return ct(i,f({},u,{ref:c}),n)}function mt(){const s=ot(rt);return s[st]||s}const F={disabled:!1};var xt=function(a){return a.scrollTop},k="unmounted",y="exited",T="entering",D="entered",I="exiting",m=function(s){ut(a,s);function a(e,n){var t;t=s.call(this,e,n)||this;var o=n,r=o&&!o.isMounting?e.enter:e.appear,u;return t.appearStatus=null,e.in?r?(u=y,t.appearStatus=T):u=D:e.unmountOnExit||e.mountOnEnter?u=k:u=y,t.state={status:u},t.nextCallback=null,t}a.getDerivedStateFromProps=function(n,t){var o=n.in;return o&&t.status===k?{status:y}:null};var i=a.prototype;return i.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},i.componentDidUpdate=function(n){var t=null;if(n!==this.props){var o=this.state.status;this.props.in?o!==T&&o!==D&&(t=T):(o===T||o===D)&&(t=I)}this.updateStatus(!1,t)},i.componentWillUnmount=function(){this.cancelNextCallback()},i.getTimeouts=function(){var n=this.props.timeout,t,o,r;return t=o=r=n,n!=null&&typeof n!="number"&&(t=n.exit,o=n.enter,r=n.appear!==void 0?n.appear:o),{exit:t,enter:o,appear:r}},i.updateStatus=function(n,t){if(n===void 0&&(n=!1),t!==null)if(this.cancelNextCallback(),t===T){if(this.props.unmountOnExit||this.props.mountOnEnter){var o=this.props.nodeRef?this.props.nodeRef.current:w.findDOMNode(this);o&&xt(o)}this.performEnter(n)}else this.performExit();else this.props.unmountOnExit&&this.state.status===y&&this.setState({status:k})},i.performEnter=function(n){var t=this,o=this.props.enter,r=this.context?this.context.isMounting:n,u=this.props.nodeRef?[r]:[w.findDOMNode(this),r],d=u[0],c=u[1],E=this.getTimeouts(),g=r?E.appear:E.enter;if(!n&&!o||F.disabled){this.safeSetState({status:D},function(){t.props.onEntered(d)});return}this.props.onEnter(d,c),this.safeSetState({status:T},function(){t.props.onEntering(d,c),t.onTransitionEnd(g,function(){t.safeSetState({status:D},function(){t.props.onEntered(d,c)})})})},i.performExit=function(){var n=this,t=this.props.exit,o=this.getTimeouts(),r=this.props.nodeRef?void 0:w.findDOMNode(this);if(!t||F.disabled){this.safeSetState({status:y},function(){n.props.onExited(r)});return}this.props.onExit(r),this.safeSetState({status:I},function(){n.props.onExiting(r),n.onTransitionEnd(o.exit,function(){n.safeSetState({status:y},function(){n.props.onExited(r)})})})},i.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},i.safeSetState=function(n,t){t=this.setNextCallback(t),this.setState(n,t)},i.setNextCallback=function(n){var t=this,o=!0;return this.nextCallback=function(r){o&&(o=!1,t.nextCallback=null,n(r))},this.nextCallback.cancel=function(){o=!1},this.nextCallback},i.onTransitionEnd=function(n,t){this.setNextCallback(t);var o=this.props.nodeRef?this.props.nodeRef.current:w.findDOMNode(this),r=n==null&&!this.props.addEndListener;if(!o||r){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[o,this.nextCallback],d=u[0],c=u[1];this.props.addEndListener(d,c)}n!=null&&setTimeout(this.nextCallback,n)},i.render=function(){var n=this.state.status;if(n===k)return null;var t=this.props,o=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var r=A(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return H.createElement(Z.Provider,{value:null},typeof o=="function"?o(n,r):H.cloneElement(H.Children.only(o),r))},a}(H.Component);m.contextType=Z;m.propTypes={};function R(){}m.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:R,onEntering:R,onEntered:R,onExit:R,onExiting:R,onExited:R};m.UNMOUNTED=k;m.EXITED=y;m.ENTERING=T;m.ENTERED=D;m.EXITING=I;const vt=m,gt=s=>s.scrollTop;function W(s,a){var i,e;const{timeout:n,easing:t,style:o={}}=s;return{duration:(i=o.transitionDuration)!=null?i:typeof n=="number"?n:n[a.mode]||0,easing:(e=o.transitionTimingFunction)!=null?e:typeof t=="object"?t[a.mode]:t,delay:o.transitionDelay}}const yt=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function $(s){return`scale(${s}, ${s**2})`}const Tt={entering:{opacity:1,transform:$(1)},entered:{opacity:1,transform:"none"}},G=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),z=L.forwardRef(function(a,i){const{addEndListener:e,appear:n=!0,children:t,easing:o,in:r,onEnter:u,onEntered:d,onEntering:c,onExit:E,onExited:g,onExiting:O,style:S,timeout:p="auto",TransitionComponent:K=vt}=a,q=A(a,yt),B=at(),M=L.useRef(),N=mt(),P=L.useRef(null),J=X(P,t.ref,i),C=l=>x=>{if(l){const v=P.current;x===void 0?l(v):l(v,x)}},Q=C(c),V=C((l,x)=>{gt(l);const{duration:v,delay:_,easing:h}=W({style:S,timeout:p,easing:o},{mode:"enter"});let b;p==="auto"?(b=N.transitions.getAutoHeightDuration(l.clientHeight),M.current=b):b=v,l.style.transition=[N.transitions.create("opacity",{duration:b,delay:_}),N.transitions.create("transform",{duration:G?b:b*.666,delay:_,easing:h})].join(","),u&&u(l,x)}),Y=C(d),tt=C(O),nt=C(l=>{const{duration:x,delay:v,easing:_}=W({style:S,timeout:p,easing:o},{mode:"exit"});let h;p==="auto"?(h=N.transitions.getAutoHeightDuration(l.clientHeight),M.current=h):h=x,l.style.transition=[N.transitions.create("opacity",{duration:h,delay:v}),N.transitions.create("transform",{duration:G?h:h*.666,delay:G?v:v||h*.333,easing:_})].join(","),l.style.opacity=0,l.style.transform=$(.75),E&&E(l)}),et=C(g),it=l=>{p==="auto"&&B.start(M.current||0,l),e&&e(P.current,l)};return lt.jsx(K,f({appear:n,in:r,nodeRef:P,onEnter:V,onEntered:Y,onEntering:Q,onExit:nt,onExited:et,onExiting:tt,addEndListener:it,timeout:p==="auto"?null:p},q,{children:(l,x)=>L.cloneElement(t,f({style:f({opacity:0,transform:$(.75),visibility:l==="exited"&&!r?"hidden":void 0},Tt[l],S,t.props.style),ref:J},x))}))});z.muiSupportAuto=!0;const Rt=z;export{Rt as G,vt as T,bt as a,ct as b,ft as e,W as g,dt as i,gt as r,mt as u};