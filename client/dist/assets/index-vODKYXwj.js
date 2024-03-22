import{w as M}from"./index-nEkFjI82.js";var c={},m={},o={};Object.defineProperty(o,"__esModule",{value:!0});var u=[60,60,24,7,365/7/12,12];function s(e){return e instanceof Date?+e:!isNaN(e)||/^\d+$/.test(e)?+new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),+new Date(e))}o.toDate=s;function E(e,r){var t=e<0?1:0;e=Math.abs(e);for(var a=e,n=0;e>=u[n]&&n<u.length;n++)e/=u[n];return e=~~e,n*=2,e>(n===0?9:1)&&(n+=1),r(e,n,a)[t].replace("%s",e)}o.formatDiff=E;function P(e,r){return r=r?s(r):+new Date,(r-s(e))/1e3}o.diffSec=P;function w(e){for(var r=1,t=0,a=Math.abs(e);e>=u[t]&&t<u.length;t++)e/=u[t],r*=u[t];return a=a%r,a=a?r-a:r,~~a}o.nextInterval=w;var l={},g={};Object.defineProperty(g,"__esModule",{value:!0});var N=["second","minute","hour","day","week","month","year"];function x(e,r){if(r===0)return["just now","right now"];var t=N[~~(r/2)];return e>1&&(t+="s"),[e+" "+t+" ago","in "+e+" "+t]}g.default=x;var T={};Object.defineProperty(T,"__esModule",{value:!0});var C=["秒","分钟","小时","天","周","个月","年"];function L(e,r){if(r===0)return["刚刚","片刻后"];var t=C[~~(r/2)];return[e+" "+t+"前",e+" "+t+"后"]}T.default=L;var A=M&&M.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(l,"__esModule",{value:!0});var O=A(g),R=A(T),j={en_US:O.default,zh_CN:R.default};l.register=function(e,r){j[e]=r};l.getLocale=function(e){return j[e]||O.default};Object.defineProperty(m,"__esModule",{value:!0});var h=o,U=l;m.format=function(e,r,t){var a=h.diffSec(e,t&&t.relativeDate);return h.formatDiff(a,U.getLocale(r))};var v={},i={};Object.defineProperty(i,"__esModule",{value:!0});var y="timeago-tid",z="datetime";function k(e){return e.getAttribute(z)}i.getDateAttribute=k;function G(e,r){e.setAttribute(y,r)}i.setTimerId=G;function Z(e){return~~e.getAttribute(y)}i.getTimerId=Z;Object.defineProperty(v,"__esModule",{value:!0});var f=i,_=o,H=l,b={},d=function(e){clearTimeout(e),delete b[e]};function p(e,r,t,a){d(f.getTimerId(e));var n=a.relativeDate,$=a.minInterval,D=_.diffSec(r,n);e.innerText=_.formatDiff(D,t);var I=setTimeout(function(){p(e,r,t,a)},Math.max(_.nextInterval(D),$||1)*1e3,2147483647);b[I]=0,f.setTimerId(e,I)}function Y(e){e?d(f.getTimerId(e)):Object.keys(b).forEach(d)}v.cancel=Y;function q(e,r,t){var a="length"in e?e:[e];return a.forEach(function(n){p(n,f.getDateAttribute(n),H.getLocale(r),t||{})}),a}v.render=q;Object.defineProperty(c,"__esModule",{value:!0});var B=m,Q=c.format=B.format,S=v;c.render=S.render;c.cancel=S.cancel;var J=l;c.register=J.register;export{Q as f};
