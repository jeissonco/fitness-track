'use client';

import { Icon } from './icons';
import { useT } from '@/lib/i18n';
import { THEME_KEY } from '@/lib/head-scripts';

// The saved theme is applied before first paint by headInitScript in lib/head-scripts.ts.

function currentTheme(): 'light' | 'dark' {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Sun in dark mode, moon in light mode — chosen by CSS (globals.css .ti-*) so it never flashes. */
export function ThemeToggle() {
  const t = useT();
  const toggle = () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch {}
  };
  return (
    <button onClick={toggle} className="grid size-[var(--tap)] place-items-center rounded-full border bg-card" aria-label={t.themeToggle}>
      <span className="ti-sun"><Icon name="sun" /></span>
      <span className="ti-moon"><Icon name="moon" /></span>
    </button>
  );
}
