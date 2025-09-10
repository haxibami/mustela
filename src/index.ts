declare namespace GM {
  function addStyle(css: string): HTMLElement;
}

GM.addStyle(`
    div[data-lyricid] { 
        user-select: text;
    }
    #tpModal {
        display: none !important;
    }
`);
