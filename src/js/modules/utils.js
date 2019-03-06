export const $ = (ctx, sel) => (sel ? ctx : document).querySelector(sel || ctx);
export const $$ = (ctx, sel) => Array.from((sel ? ctx : document).querySelectorAll(sel || ctx));
