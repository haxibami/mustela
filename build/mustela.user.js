// ==UserScript==
// @name        Mustela
// @encoding    utf-8
// @namespace   https://github.com/haxibami/mustela
// @homepageURL https://github.com/haxibami/mustela
// @supportURL  https://github.com/haxibami/mustela/issues
// @updateURL   https://github.com/haxibami/mustela/raw/main/build/mustela.user.js
// @downloadURL https://github.com/haxibami/mustela/raw/main/build/mustela.user.js
// @license     MIT
// @match       *://*/*
// @grant       unsafeWindow
// @version     0.1.5
// @author      haxibami
// @description Anti-anti-adblock user script for personal use.
// @run-at      document-start
// ==/UserScript==

(()=>{var r=typeof unsafeWindow<"u"?unsafeWindow:window,p=r.RegExp.prototype.test,f=[/pagead2\.googlesyndication\.com/,/securepubads\.g\.doubleclick\.net/,/html-load\.com/,/content-loader\.com/];console.log("Ad scripts blocker active");r.XMLHttpRequest=new Proxy(r.XMLHttpRequest,{construct(n,e){let t=new n(...e),s={blockUrl:null};return new Proxy(t,{get(c,o,d){if(o==="open")return(y,i,...w)=>{if(f.some((b)=>p.call(b,i)))s.blockUrl=i,i="https://nobody.invalid";return c[o].apply(c,[y,i,...w])};if(o==="responseURL")return s.blockUrl||c[o];let l=c[o];return typeof l!=="function"||o==="onreadystatechange"?l:l.bind(c)},set(c,o,d){return c[o]=d,!0}})}});r.Element.prototype.setAttribute=new Proxy(r.Element.prototype.setAttribute,{apply(n,e,t){if(t[0]==="src"&&f.some((s)=>p.call(s,t[1])))t[1]=`data:text/javascript,${encodeURIComponent("(() => { 'use strict'; })();")}`;return Reflect.apply(n,e,t)}});var m=(n)=>{let e=0;for(let t=0,s=n.length;t<s;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return e},u=Date.now(),a=u-u%86400000,R=[a,a-86400000,a+86400000];for(let n of R)r[`as_${m(`loader-check_${n}`)}`]=!0;})();
