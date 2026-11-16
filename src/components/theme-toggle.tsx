'use client';

import { Icon } from './icons';

const KEY = 'fitness-track.v1.theme';

/** Inline script for <head>: applies the saved theme before first paint (no flash). */
export const themeInitScript = `try{var t=localStorage.getItem('${KEY}');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

function currentTheme(): 'light' | 'dark' {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Sun in dark mode, moon in light mode — chosen by CSS (globals.css .ti-*) so it never flashes. */
export function ThemeToggle() {
  const toggle = () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch {}
  };
  return (
    <button onClick={toggle} className="grid size-[var(--tap)] place-items-center rounded-full border bg-card" aria-label="Toggle light and dark theme">
      <span className="ti-sun"><Icon name="sun" /></span>
      <span className="ti-moon"><Icon name="moon" /></span>
    </button>
  );
}
