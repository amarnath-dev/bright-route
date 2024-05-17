import{_ as A,e as ee,g as me,s as te,u as be,a as je,f as ue,h as Ue}from"./generateUtilityClasses-CbuUGrSe.js";import{r as a,R as W,q as C,p as F}from"./index-Cm1l80VI.js";import{k as ne}from"./emotion-react.browser.esm-EPQkPldl.js";import{u as _e,a as H}from"./useTimeout-BfMRyHkY.js";import{_ as ze,T as ce}from"./TransitionGroupContext-CLKuesy1.js";import{a as Oe}from"./createSvgIcon-CUMYJe6H.js";function Ke(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function oe(e,s){var r=function(t){return s&&a.isValidElement(t)?s(t):t},l=Object.create(null);return e&&a.Children.map(e,function(n){return n}).forEach(function(n){l[n.key]=r(n)}),l}function Ae(e,s){e=e||{},s=s||{};function r(f){return f in s?s[f]:e[f]}var l=Object.create(null),n=[];for(var t in e)t in s?n.length&&(l[t]=n,n=[]):n.push(t);var o,c={};for(var u in s){if(l[u])for(o=0;o<l[u].length;o++){var p=l[u][o];c[l[u][o]]=r(p)}c[u]=r(u)}for(o=0;o<n.length;o++)c[n[o]]=r(n[o]);return c}function $(e,s,r){return r[s]!=null?r[s]:e.props[s]}function Xe(e,s){return oe(e.children,function(r){return a.cloneElement(r,{onExited:s.bind(null,r),in:!0,appear:$(r,"appear",e),enter:$(r,"enter",e),exit:$(r,"exit",e)})})}function Ye(e,s,r){var l=oe(e.children),n=Ae(s,l);return Object.keys(n).forEach(function(t){var o=n[t];if(a.isValidElement(o)){var c=t in s,u=t in l,p=s[t],f=a.isValidElement(p)&&!p.props.in;u&&(!c||f)?n[t]=a.cloneElement(o,{onExited:r.bind(null,o),in:!0,exit:$(o,"exit",e),enter:$(o,"enter",e)}):!u&&c&&!f?n[t]=a.cloneElement(o,{in:!1}):u&&c&&a.isValidElement(p)&&(n[t]=a.cloneElement(o,{onExited:r.bind(null,o),in:p.props.in,exit:$(o,"exit",e),enter:$(o,"enter",e)}))}}),n}var We=Object.values||function(e){return Object.keys(e).map(function(s){return e[s]})},He={component:"div",childFactory:function(s){return s}},ie=function(e){ze(s,e);function s(l,n){var t;t=e.call(this,l,n)||this;var o=t.handleExited.bind(Ke(t));return t.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},t}var r=s.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},s.getDerivedStateFromProps=function(n,t){var o=t.children,c=t.handleExited,u=t.firstRender;return{children:u?Xe(n,c):Ye(n,o,c),firstRender:!1}},r.handleExited=function(n,t){var o=oe(this.props.children);n.key in o||(n.props.onExited&&n.props.onExited(t),this.mounted&&this.setState(function(c){var u=A({},c.children);return delete u[n.key],{children:u}}))},r.render=function(){var n=this.props,t=n.component,o=n.childFactory,c=ee(n,["component","childFactory"]),u=this.state.contextValue,p=We(this.state.children).map(o);return delete c.appear,delete c.enter,delete c.exit,t===null?W.createElement(ce.Provider,{value:u},p):W.createElement(ce.Provider,{value:u},W.createElement(t,c,p))},s}(W.Component);ie.propTypes={};ie.defaultProps=He;const Ge=ie;function qe(e){const{className:s,classes:r,pulsate:l=!1,rippleX:n,rippleY:t,rippleSize:o,in:c,onExited:u,timeout:p}=e,[f,g]=a.useState(!1),b=C(s,r.ripple,r.rippleVisible,l&&r.ripplePulsate),E={width:o,height:o,top:-(o/2)+t,left:-(o/2)+n},h=C(r.child,f&&r.childLeaving,l&&r.childPulsate);return!c&&!f&&g(!0),a.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),F.jsx("span",{className:b,style:E,children:F.jsx("span",{className:h})})}const m=me("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Je=["center","classes","className"];let G=e=>e,pe,de,fe,he;const Z=550,Qe=80,Ze=ne(pe||(pe=G`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),et=ne(de||(de=G`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),tt=ne(fe||(fe=G`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),nt=te("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),ot=te(qe,{name:"MuiTouchRipple",slot:"Ripple"})(he||(he=G`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,Ze,Z,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,et,Z,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,tt,({theme:e})=>e.transitions.easing.easeInOut),it=a.forwardRef(function(s,r){const l=be({props:s,name:"MuiTouchRipple"}),{center:n=!1,classes:t={},className:o}=l,c=ee(l,Je),[u,p]=a.useState([]),f=a.useRef(0),g=a.useRef(null);a.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=a.useRef(!1),E=_e(),h=a.useRef(null),R=a.useRef(null),U=a.useCallback(d=>{const{pulsate:M,rippleX:x,rippleY:L,rippleSize:j,cb:z}=d;p(y=>[...y,F.jsx(ot,{classes:{ripple:C(t.ripple,m.ripple),rippleVisible:C(t.rippleVisible,m.rippleVisible),ripplePulsate:C(t.ripplePulsate,m.ripplePulsate),child:C(t.child,m.child),childLeaving:C(t.childLeaving,m.childLeaving),childPulsate:C(t.childPulsate,m.childPulsate)},timeout:Z,pulsate:M,rippleX:x,rippleY:L,rippleSize:j},f.current)]),f.current+=1,g.current=z},[t]),N=a.useCallback((d={},M={},x=()=>{})=>{const{pulsate:L=!1,center:j=n||M.pulsate,fakeElement:z=!1}=M;if((d==null?void 0:d.type)==="mousedown"&&b.current){b.current=!1;return}(d==null?void 0:d.type)==="touchstart"&&(b.current=!0);const y=z?null:R.current,P=y?y.getBoundingClientRect():{width:0,height:0,left:0,top:0};let v,D,w;if(j||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)v=Math.round(P.width/2),D=Math.round(P.height/2);else{const{clientX:S,clientY:V}=d.touches&&d.touches.length>0?d.touches[0]:d;v=Math.round(S-P.left),D=Math.round(V-P.top)}if(j)w=Math.sqrt((2*P.width**2+P.height**2)/3),w%2===0&&(w+=1);else{const S=Math.max(Math.abs((y?y.clientWidth:0)-v),v)*2+2,V=Math.max(Math.abs((y?y.clientHeight:0)-D),D)*2+2;w=Math.sqrt(S**2+V**2)}d!=null&&d.touches?h.current===null&&(h.current=()=>{U({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:x})},E.start(Qe,()=>{h.current&&(h.current(),h.current=null)})):U({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:x})},[n,U,E]),_=a.useCallback(()=>{N({},{pulsate:!0})},[N]),I=a.useCallback((d,M)=>{if(E.clear(),(d==null?void 0:d.type)==="touchend"&&h.current){h.current(),h.current=null,E.start(0,()=>{I(d,M)});return}h.current=null,p(x=>x.length>0?x.slice(1):x),g.current=M},[E]);return a.useImperativeHandle(r,()=>({pulsate:_,start:N,stop:I}),[_,N,I]),F.jsx(nt,A({className:C(m.root,t.root,o),ref:R},c,{children:F.jsx(Ge,{component:null,exit:!0,children:u})}))}),st=it;function rt(e){return je("MuiButtonBase",e)}const at=me("MuiButtonBase",["root","disabled","focusVisible"]),lt=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],ut=e=>{const{disabled:s,focusVisible:r,focusVisibleClassName:l,classes:n}=e,o=Ue({root:["root",s&&"disabled",r&&"focusVisible"]},rt,n);return r&&l&&(o.root+=` ${l}`),o},ct=te("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,s)=>s.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${at.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),pt=a.forwardRef(function(s,r){const l=be({props:s,name:"MuiButtonBase"}),{action:n,centerRipple:t=!1,children:o,className:c,component:u="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:E="a",onBlur:h,onClick:R,onContextMenu:U,onDragLeave:N,onFocus:_,onFocusVisible:I,onKeyDown:d,onKeyUp:M,onMouseDown:x,onMouseLeave:L,onMouseUp:j,onTouchEnd:z,onTouchMove:y,onTouchStart:P,tabIndex:v=0,TouchRippleProps:D,touchRippleRef:w,type:S}=l,V=ee(l,lt),O=a.useRef(null),T=a.useRef(null),ge=ue(T,w),{isFocusVisibleRef:se,onFocus:Re,onBlur:Me,ref:xe}=Oe(),[k,X]=a.useState(!1);p&&k&&X(!1),a.useImperativeHandle(n,()=>({focusVisible:()=>{X(!0),O.current.focus()}}),[]);const[q,ye]=a.useState(!1);a.useEffect(()=>{ye(!0)},[]);const Te=q&&!f&&!p;a.useEffect(()=>{k&&b&&!f&&q&&T.current.pulsate()},[f,b,k,q]);function B(i,ae,Ie=g){return H(le=>(ae&&ae(le),!Ie&&T.current&&T.current[i](le),!0))}const Ce=B("start",x),Ee=B("stop",U),ve=B("stop",N),Ve=B("stop",j),Be=B("stop",i=>{k&&i.preventDefault(),L&&L(i)}),Pe=B("start",P),De=B("stop",z),we=B("stop",y),Le=B("stop",i=>{Me(i),se.current===!1&&X(!1),h&&h(i)},!1),Se=H(i=>{O.current||(O.current=i.currentTarget),Re(i),se.current===!0&&(X(!0),I&&I(i)),_&&_(i)}),J=()=>{const i=O.current;return u&&u!=="button"&&!(i.tagName==="A"&&i.href)},Q=a.useRef(!1),ke=H(i=>{b&&!Q.current&&k&&T.current&&i.key===" "&&(Q.current=!0,T.current.stop(i,()=>{T.current.start(i)})),i.target===i.currentTarget&&J()&&i.key===" "&&i.preventDefault(),d&&d(i),i.target===i.currentTarget&&J()&&i.key==="Enter"&&!p&&(i.preventDefault(),R&&R(i))}),$e=H(i=>{b&&i.key===" "&&T.current&&k&&!i.defaultPrevented&&(Q.current=!1,T.current.stop(i,()=>{T.current.pulsate(i)})),M&&M(i),R&&i.target===i.currentTarget&&J()&&i.key===" "&&!i.defaultPrevented&&R(i)});let Y=u;Y==="button"&&(V.href||V.to)&&(Y=E);const K={};Y==="button"?(K.type=S===void 0?"button":S,K.disabled=p):(!V.href&&!V.to&&(K.role="button"),p&&(K["aria-disabled"]=p));const Fe=ue(r,xe,O),re=A({},l,{centerRipple:t,component:u,disabled:p,disableRipple:f,disableTouchRipple:g,focusRipple:b,tabIndex:v,focusVisible:k}),Ne=ut(re);return F.jsxs(ct,A({as:Y,className:C(Ne.root,c),ownerState:re,onBlur:Le,onClick:R,onContextMenu:Ee,onFocus:Se,onKeyDown:ke,onKeyUp:$e,onMouseDown:Ce,onMouseLeave:Be,onMouseUp:Ve,onDragLeave:ve,onTouchEnd:De,onTouchMove:we,onTouchStart:Pe,ref:Fe,tabIndex:p?-1:v,type:S},K,V,{children:[o,Te?F.jsx(st,A({ref:ge,center:t},D)):null]}))}),Mt=pt;export{Mt as B};
