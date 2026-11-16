'use client';

import { useEffect, useState } from 'react';

type Toast = { msg: string; pr: boolean; id: number };
let current: Toast | null = null;
const subs = new Set<(t: Toast | null) => void>();

/** Show a short status message. `pr` uses the cardio-orange celebration style. */
export function toast(msg: string, pr = false) {
  current = { msg, pr, id: Date.now() };
  subs.forEach((s) => s(current));
}

export function Toaster() {
  const [t, setT] = useState<Toast | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const s = (x: Toast | null) => { setT(x); setShow(true); };
    subs.add(s);
    return () => { subs.delete(s); };
  }, []);
  useEffect(() => {
    if (!t) return;
    const h = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(h);
  }, [t]);
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed left-1/2 z-30 max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full px-5 py-3 text-center font-bold shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-all duration-[var(--dur)] ease-[var(--ease-out)] bottom-[calc(84px+env(safe-area-inset-bottom))] ${
        t?.pr ? 'bg-accent text-accent-foreground' : 'bg-foreground text-background'
      } ${show && t ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
    >
      {t?.msg}
    </div>
  );
}
