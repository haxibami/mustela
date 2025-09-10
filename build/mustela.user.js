// ==UserScript==
// @name        mustela
// @namespace   https://github.com/haxibami/mustela
// @homepageURL https://github.com/haxibami/mustela
// @supportURL  https://github.com/haxibami/mustela/issues
// @updateURL   https://github.com/haxibami/mustela/raw/main/build/mustela.user.js
// @downloadURL https://github.com/haxibami/mustela/raw/main/build/mustela.user.js
// @license     MIT
// @match       *://*/*
// @grant       GM.addStyle
// @version     0.1.7
// @author      haxibami
// @description Anti-anti-adblock user script for personal use.
// @run-at      document-start
// ==/UserScript==

(()=>{GM.addStyle(`
    div[data-lyricid] { 
        user-select: text;
    }
    #tpModal {
        display: none !important;
    }
`);})();
