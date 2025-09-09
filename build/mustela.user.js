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

(()=>{var o=typeof unsafeWindow<"u"?unsafeWindow:window,p=[/pagead2\.googlesyndication\.com/,/securepubads\.g\.doubleclick\.net/,/html-load\.com/];o.XMLHttpRequest=new Proxy(o.XMLHttpRequest,{construct(c,i){let e=new c(...i),r={blockUrl:null};return new Proxy(e,{get(n,t,u){if(t==="open")return(d,s,...y)=>{if(p.some((a)=>a.test(s)))r.blockUrl=s,s="https://nobody.invalid";return n[t].apply(n,[d,s,...y])};if(t==="responseURL")return r.blockUrl||n[t];let l=n[t];return typeof l!=="function"||t==="onreadystatechange"?l:l.bind(n)},set(n,t,u){return n[t]=u,!0}})}});o.Element.prototype.setAttribute=new Proxy(o.Element.prototype.setAttribute,{apply(c,i,e){if(e[0]!=="src"||p.every((r)=>!r.test(e[1])))return Reflect.apply(c,i,e);if(document.currentScript)document.currentScript.innerHTML="(() => { 'use strict'; })();"}});o.Document.prototype.write=new Proxy(o.Document.prototype.write,{apply(c,i,e){if(!e[0].startsWith("<script"))return Reflect.apply(c,i,e);else console.log("Blocked script injection:",e[0])}});})();
