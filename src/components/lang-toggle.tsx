'use client';

import { setLocale, useT } from '@/lib/i18n';

/** Shows the current language; tap to switch between English and Spanish. */
export function LangToggle() {
  const t = useT();
  return (
    <button
      onClick={() => setLocale(t.locale === 'en' ? 'es' : 'en')}
      className="grid size-[var(--tap)] place-items-center rounded-full border bg-card font-display text-base font-extrabold uppercase tracking-wide"
      aria-label={t.langToggle}
      title={t.langToggle}
    >
      {t.locale}
    </button>
  );
}
