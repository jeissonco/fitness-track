'use client';

import { useEffect, useRef, useState } from 'react';
import { EXERCISE_IMG_BASE, EXERCISE_INFO } from '@/lib/exercise-info';
import { Icon } from './icons';

let openFn: ((name: string) => void) | null = null;
/** Open the how-to sheet for an exercise (no-op if we have no guide for it). */
export const openHowto = (name: string) => openFn?.(name);
export const hasHowto = (name: string) => name in EXERCISE_INFO;

export function HowtoSheet() {
  const ref = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<Element | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);
  const [auto, setAuto] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    openFn = (n) => {
      if (!EXERCISE_INFO[n]) return;
      returnTo.current = document.activeElement;
      setName(n); setPhase(0); setAuto(true); setOffline(false);
      ref.current?.showModal();
    };
    return () => { openFn = null; };
  }, []);

  // Flip between start/end photos like a two-frame animation, unless the user picks a phase.
  useEffect(() => {
    if (!name || !auto || offline || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setPhase((p) => 1 - p), 1100);
    return () => clearInterval(t);
  }, [name, auto, offline]);

  const info = name ? EXERCISE_INFO[name] : null;
  const video = name ? 'https://www.youtube.com/results?search_query=' + encodeURIComponent(name + ' exercise proper form') : '#';

  return (
    <dialog
      ref={ref}
      aria-labelledby="howtoTitle"
      onClose={() => { setName(null); (returnTo.current as HTMLElement | null)?.focus?.(); }}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      className="m-auto mb-0 max-h-[92vh] w-full max-w-[480px] flex-col overflow-hidden rounded-t-3xl bg-card p-0 text-card-foreground open:flex backdrop:bg-[rgba(5,10,15,.7)] backdrop:backdrop-blur-[3px] sm:mb-auto sm:rounded-3xl"
    >
      {info && name && (
        <>
          <div className="relative aspect-[3/2] flex-none bg-muted">
            {info.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- remote public-domain photos, swapped for self-hosted next/image in step 5
              <img
                key={src}
                src={EXERCISE_IMG_BASE + encodeURI(src)}
                alt={`${name}, ${i ? 'end' : 'start'} position`}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${phase === i ? 'opacity-100' : 'opacity-0'}`}
                onError={() => setOffline(true)}
              />
            ))}
            {offline && <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-muted-foreground">Photos need an internet connection.</div>}
            <button onClick={() => ref.current?.close()} className="absolute top-3 right-3 z-[2] grid size-[var(--tap)] place-items-center rounded-full bg-[rgba(11,11,12,.6)] text-white" aria-label="Close">
              <Icon name="x" />
            </button>
            {!offline && (
              <div role="group" aria-label="Movement phase" className="absolute bottom-3 left-3 z-[2] flex rounded-full bg-[rgba(11,11,12,.6)] p-[3px] backdrop-blur-md">
                {['Start', 'End'].map((l, i) => (
                  <button
                    key={l}
                    aria-pressed={phase === i}
                    onClick={() => { setAuto(false); setPhase(i); }}
                    className={`min-h-9 min-w-16 rounded-full font-display text-sm font-bold uppercase tracking-[0.06em] ${phase === i ? 'bg-[var(--volt-400)] text-[var(--ink-950)]' : 'text-white'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="overflow-y-auto px-5 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <p className="eyebrow">{info.equipment} · {info.level}</p>
            <h2 id="howtoTitle" className="display mb-3 text-4xl">{name}</h2>
            <div className="mb-5 flex flex-wrap gap-2">
              {info.primary.map((m) => <span key={m} className="chip bg-[color-mix(in_srgb,var(--strength)_16%,transparent)] capitalize text-primary-ink">{m}</span>)}
              {info.secondary.map((m) => <span key={m} className="chip capitalize text-muted-foreground">{m}</span>)}
            </div>
            <ol className="mb-5 list-none p-0 [counter-reset:s]">
              {info.steps.map((s, i) => (
                <li key={i} className="relative pb-3 pl-10 leading-normal [counter-increment:s] before:absolute before:-top-0.5 before:left-0 before:grid before:size-7 before:place-items-center before:rounded-full before:bg-secondary before:font-display before:font-extrabold before:content-[counter(s)]">
                  {s}
                </li>
              ))}
            </ol>
            <a className="btn btn-ghost w-full" href={video} target="_blank" rel="noopener noreferrer">
              <Icon name="play" />Watch a video
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Photos &amp; steps: <a className="underline" href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noopener noreferrer">free-exercise-db</a> (public domain)
            </p>
          </div>
        </>
      )}
    </dialog>
  );
}
