'use client';

import { useState } from 'react';
import { useAppState, update } from '@/lib/store';
import { type AppState, CARDIO_KINDS, type CardioKind, fmtDate, iso, pad } from '@/lib/fitness';
import { Icon } from '../icons';
import { toast } from '../toast';
import { PageSkeleton } from './skeleton';

const num = (s: string) => parseFloat(s.replace(',', '.'));

export function CardioView() {
  const state = useAppState();
  // Data (and "today") only exist in the browser; the skeleton is what gets prerendered.
  if (!state) return <PageSkeleton />;
  return <CardioScreen state={state} />;
}

function CardioScreen({ state }: { state: AppState }) {
  const today = iso(new Date());
  const [kind, setKind] = useState<CardioKind>('Run');
  const [min, setMin] = useState('');
  const [km, setKm] = useState('');
  const [hr, setHr] = useState('');
  const [date, setDate] = useState(today);
  const [rpe, setRpe] = useState(6);

  const byPace = kind === 'Run' || kind === 'Walk';
  const m = num(min), k = num(km);
  let pace = '—';
  if (m > 0 && k > 0) {
    if (byPace) { const p = m / k; pace = `${Math.floor(p)}:${pad(Math.round((p % 1) * 60) % 60)} /km`; }
    else pace = `${(k / (m / 60)).toFixed(1)} km/h`;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = parseInt(min, 10);
    if (!(minutes > 0)) { toast('Add a duration'); document.getElementById('cMin')?.focus(); return; }
    const h = parseInt(hr, 10);
    update((s) => {
      s.cardio.push({ id: 'c' + Date.now(), date: date || today, kind, min: minutes, km: k > 0 ? k : null, hr: h > 0 ? h : null, rpe });
    });
    toast(`${kind} saved · ${minutes} min`);
    setMin(''); setKm(''); setHr('');
  };

  const recent = [...state.cardio].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const field = 'field-input focus:border-accent focus:outline-none';

  return (
    <>
      <h1 className="display mb-5 text-5xl">Log<br /><span className="text-accent-ink">cardio</span></h1>
      <div className="space-y-4">
        <form className="card space-y-4" onSubmit={submit} noValidate>
          <fieldset>
            <legend className="label">Type</legend>
            <div className="flex flex-wrap gap-2">
              {CARDIO_KINDS.map((c) => (
                <label key={c} className="cursor-pointer">
                  <input type="radio" name="kind" value={c} checked={kind === c} onChange={() => setKind(c)} className="peer sr-only" />
                  <span className="inline-flex min-h-[var(--tap)] items-center rounded-full border-2 border-transparent bg-secondary px-4 font-display text-lg font-bold uppercase tracking-[0.04em] peer-checked:bg-accent peer-checked:text-accent-foreground peer-focus-visible:border-foreground">
                    {c}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            <label><span className="label">Duration (min)</span><input id="cMin" className={field} inputMode="numeric" placeholder="30" value={min} onChange={(e) => setMin(e.target.value)} /></label>
            <label><span className="label">Distance (km)</span><input className={field} inputMode="decimal" placeholder="5.0" value={km} onChange={(e) => setKm(e.target.value)} /></label>
            <label><span className="label">Avg heart rate</span><input className={field} inputMode="numeric" placeholder="bpm" value={hr} onChange={(e) => setHr(e.target.value)} /></label>
            <label><span className="label">Date</span><input className={`${field} text-lg`} type="date" value={date} max={today} onChange={(e) => setDate(e.target.value)} /></label>
          </div>
          <div>
            <label className="label" htmlFor="rpe">Effort (RPE)</label>
            <div className="flex items-center gap-3">
              <input type="range" id="rpe" min={1} max={10} value={rpe} onChange={(e) => setRpe(+e.target.value)} className="h-[var(--tap)] flex-1 accent-[var(--accent)]" />
              <output htmlFor="rpe" className="min-w-[2ch] text-right font-display text-[1.75rem] font-extrabold">{rpe}</output>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted px-4 py-3">
            <span className="label m-0">{byPace ? 'Pace' : 'Speed'}</span>
            <b className="font-display text-[1.75rem] font-extrabold text-accent-ink tabular-nums">{pace}</b>
          </div>
          <button className="btn btn-cardio w-full" type="submit">Save session</button>
        </form>

        <section className="card">
          <h2 className="section-title">Recent</h2>
          <ul className="list-none p-0">
            {recent.length === 0 && <li className="text-muted-foreground">No sessions yet</li>}
            {recent.map((c) => (
              <li key={c.id} className="flex items-center gap-3 border-t py-3 first:border-t-0 first:pt-0">
                <span className="grid size-10 flex-none place-items-center rounded-xl bg-[color-mix(in_srgb,var(--cardio)_18%,transparent)] text-accent-ink"><Icon name="activity" /></span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold">{c.kind}</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{fmtDate(c.date)}{c.hr ? ` · ${c.hr} bpm` : ''}{c.rpe ? ` · RPE ${c.rpe}` : ''}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[1.375rem] font-extrabold tabular-nums">{c.min} min</div>
                  <div className="text-sm text-muted-foreground tabular-nums">{c.km ? `${c.km} km` : ''}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
