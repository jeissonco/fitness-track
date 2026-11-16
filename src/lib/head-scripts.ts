/* Inline <head> scripts that apply saved preferences before first paint.
 * This file must stay free of 'use client' and React imports: the server layout
 * reads these strings, and a client module would hand it a placeholder instead. */

export const THEME_KEY = 'fitness-track.v1.theme';
export const LANG_KEY = 'fitness-track.v1.lang';

export const headInitScript =
  `try{var t=localStorage.getItem('${THEME_KEY}');if(t)document.documentElement.dataset.theme=t}catch(e){}` +
  `try{var l=localStorage.getItem('${LANG_KEY}')||(navigator.language||'').slice(0,2).toLowerCase();document.documentElement.lang=l==='es'?'es':'en'}catch(e){}`;
