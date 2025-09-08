// ==UserScript==
// @name        Mustela
// @encoding    utf-8
// @namespace   https://github.com/haxibami/mustela
// @homepageURL https://github.com/haxibami/mustela
// @supportURL  https://github.com/haxibami/mustela/issues
// @updateURL   https://github.com/haxibami/mustela/raw/main/mustela.user.js
// @license     MIT
// @match       *://*/*
// @grant       unsafeWindow
// @version     0.1.0
// @author      haxibami
// @description Anti-anti-adblock user script for personal use.
// @run-at      document-start
// ==/UserScript==
(() => {
  var Win = typeof unsafeWindow < "u" ? unsafeWindow : window;

  const blockDomains = [
    /pagead2\.googlesyndication\.com/,
    /securepubads\.g\.doubleclick\.net/,
    /html-load\.com/,
  ];

  const invalidURL = "https://nobody.invalid";
  const noopScript = "(() => { 'use strict'; })();";

  Win.XMLHttpRequest = new Proxy(Win.XMLHttpRequest, {
    construct(target, args) {
      const xhrInstance = new target(...args);

      const state = {
        blockUrl: null,
      };

      return new Proxy(xhrInstance, {
        get(target, prop, _receiver) {
          if (prop === "open") {
            return (method, url, ...rest) => {
              if (blockDomains.some((pattern) => pattern.test(url))) {
                state.blockUrl = url;
                url = invalidURL;
              }
              return target[prop].apply(target, [method, url, ...rest]);
            };
          }
          if (prop === "responseURL") {
            return state.blockUrl || target[prop];
          }
          const value = target[prop];
          return typeof value !== "function" || prop === "onreadystatechange"
            ? value
            : value.bind(target);
        },
        set(target, prop, value) {
          target[prop] = value;
          return true;
        },
      });
    },
  });

  Win.Element.prototype.setAttribute = new Proxy(
    Win.Element.prototype.setAttribute,
    {
      apply(target, thisArg, args) {
        if (
          args[0] !== "src" ||
          blockDomains.every((pattern) => !pattern.test(args[1]))
        ) {
          return Reflect.apply(target, thisArg, args);
        }
        document.currentScript.innerHTML = noopScript;
      },
    },
  );
})();
