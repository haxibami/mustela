type unsafeWindow = typeof window;
declare const unsafeWindow: unsafeWindow;
const Win = typeof unsafeWindow < "u" ? unsafeWindow : window;

const OriginalRegExpTest = Win.RegExp.prototype.test;

const blockDomains = [
  /pagead2\.googlesyndication\.com/,
  /securepubads\.g\.doubleclick\.net/,
  /html-load\.com/,
  /content-loader\.com/,
];

const invalidURL = "https://nobody.invalid";
const noopScript = "(() => { 'use strict'; })();";

console.log("Ad scripts blocker active");

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
            if (
              blockDomains.some((pattern) =>
                OriginalRegExpTest.call(pattern, url),
              )
            ) {
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
        args[0] === "src" &&
        blockDomains.some((pattern) =>
          OriginalRegExpTest.call(pattern, args[1]),
        )
      ) {
        args[1] = `data:text/javascript,${encodeURIComponent(noopScript)}`;
      }
      return Reflect.apply(target, thisArg, args);
    },
  },
);

const o = (n: string) => {
  let e = 0;
  for (let t = 0, r = n.length; t < r; t++) {
    e = (e << 5) - e + n.charCodeAt(t);
    e |= 0;
  }
  return e;
};

const a = Date.now();
const s = a - (a % 86400000);
const dates = [s, s - 86400000, s + 86400000];

for (const date of dates) {
  // @ts-expect-error
  Win[`as_${o(`loader-check_${date}`)}`] = true;
}
