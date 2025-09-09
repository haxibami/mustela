type unsafeWindow = typeof window;
declare const unsafeWindow: unsafeWindow;
const Win = typeof unsafeWindow < "u" ? unsafeWindow : window;

const blockDomains = [
  /pagead2\.googlesyndication\.com/,
  /securepubads\.g\.doubleclick\.net/,
  /html-load\.com/,
];

const invalidURL = "https://nobody.invalid";
const noopScript = "(() => { 'use strict'; })();";

Win.XMLHttpRequest = new Proxy(Win.XMLHttpRequest, {
  construct(target, args: []) {
    const xhrInstance = new target(...args);

    const state: { blockUrl: string | null } = {
      blockUrl: null,
    };

    return new Proxy(xhrInstance, {
      get(target, prop, _receiver) {
        if (prop === "open") {
          // @ts-expect-error
          return (method: string, url: string, ...rest) => {
            if (blockDomains.some((pattern) => pattern.test(url))) {
              state.blockUrl = url;
              url = invalidURL;
            }
            // @ts-expect-error
            return target[prop].apply(target, [method, url, ...rest]);
          };
        }
        if (prop === "responseURL") {
          return state.blockUrl || target[prop];
        }
        // @ts-expect-error
        const value = target[prop];
        return typeof value !== "function" || prop === "onreadystatechange"
          ? value
          : value.bind(target);
      },
      set(target, prop, value) {
        // @ts-expect-error
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

      if (document.currentScript) {
        document.currentScript.innerHTML = noopScript;
      }
    },
  },
);

Win.Document.prototype.write = new Proxy(Win.Document.prototype.write, {
  apply(target, thisArg, args) {
    if (!args[0].startsWith("<script")) {
      return Reflect.apply(target, thisArg, args);
    } else {
      console.log("Blocked script injection:", args[0]);
    }
  },
});
