// ==UserScript==
// @name        Mustela
// @encoding    utf-8
// @namespace   https://github.com/haxibami/mustela
// @homepageURL https://github.com/haxibami/mustela
// @supportURL  https://github.com/haxibami/mustela/issues
// @updateURL   https://github.com/haxibami/mustela/raw/main/dist/mustela.user.js
// @downloadURL https://github.com/haxibami/mustela/raw/main/dist/mustela.user.js
// @license     MIT
// @match       *://*/*
// @grant       unsafeWindow
// @version     0.1.4
// @author      haxibami
// @description Anti-anti-adblock user script for personal use.
// @run-at      document-start
// ==/UserScript==
var i=typeof unsafeWindow<"u"?unsafeWindow:window,l=[/pagead2\.googlesyndication\.com/,/securepubads\.g\.doubleclick\.net/,/html-load\.com/];i.XMLHttpRequest=new Proxy(i.XMLHttpRequest,{construct(o,s){let t=new o(...s),r={blockUrl:null};return new Proxy(t,{get(n,e,u){if(e==="open")return(p,c,...m)=>{if(l.some((d)=>d.test(c)))r.blockUrl=c,c="https://nobody.invalid";return n[e].apply(n,[p,c,...m])};if(e==="responseURL")return r.blockUrl||n[e];let a=n[e];return typeof a!=="function"||e==="onreadystatechange"?a:a.bind(n)},set(n,e,u){return n[e]=u,!0}})}});i.Element.prototype.setAttribute=new Proxy(i.Element.prototype.setAttribute,{apply(o,s,t){if(t[0]!=="src"||l.every((r)=>!r.test(t[1])))return Reflect.apply(o,s,t);if(document.currentScript)document.currentScript.innerHTML="(() => { 'use strict'; })();"}});i.Document.prototype.write=new Proxy(i.Document.prototype.write,{apply(o,s,t){if(!t[0].startsWith("<script"))return Reflect.apply(o,s,t);else console.log("Blocked script injection:",t[0])}});
