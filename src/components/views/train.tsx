'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppState, update } from '@/lib/store';
import { finishSession, startSession } from '@/lib/actions';
import { type ActiveWorkout, LIBRARY, ORDER, TEMPLATES, bestE1rm, e1rm, kgFmt, lastSets, newActiveExercise, nextTemplate, pad, restSecondsFor } from '@/lib/fitness';
import { Icon } from '../icons';
import { toast } from '../toast';
import { hasHowto, openHowto } from '../howto-sheet';
import { PageSkeleton } from './skeleton';

/** Re-render every `ms` while mounted (for clocks). */
function useNow(ms: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

function Elapsed({ start }: { start: number }) {
  const now = useNow(1000);
  const s = Math.max(0, Math.floor((now - start) / 1000)), h = Math.floor(s / 3600);
  return (
    <div className="font-display text-4xl font-extrabold text-primary-ink tabular-nums" aria-label="Elapsed time">
      {(h ? h + ':' : '') + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60)}
    </div>
  );
}

function RestTimer({ rest }: { rest: NonNullable<ActiveWorkout['rest']> }) {
  const now = useNow(250);
  const left = Math.ceil((rest.end - now) / 1000);
  useEffect(() => {
    if (left > 0) return;
    update((s) => { if (s.active) s.active.rest = null; });
    toast('Rest over. Next set!');
    try { navigator.vibrate?.([120, 60, 120]); } catch {}
  }, [left]);
  if (left <= 0) return null;
  const adjust = (d: number) =>
    update((s) => {
      const r = s.active?.rest;
      if (!r) return;
      r.end += d * 1000;
      r.total = Math.max(r.total, (r.end - Date.now()) / 1000);
    });
  const btn = 'min-h-[var(--tap)] min-w-[var(--tap)] rounded-md bg-[color-mix(in_srgb,var(--background)_15%,transparent)] font-bold';
  return (
    <div role="timer" aria-live="off" className="sticky top-[84px] z-[9] mb-4 flex items-center gap-3 rounded-lg bg-foreground px-4 py-3 text-background shadow-[0_10px_30px_rgba(0,0,0,.35)]">
      <div className="flex-1">
        <span className="eyebrow text-inherit opacity-70">Rest</span>
        <div><b className="inline-block min-w-[3.2ch] font-display text-4xl font-extrabold leading-none tabular-nums">{Math.floor(left / 60)}:{pad(left % 60)}</b></div>
        <div className="mt-1.5 h-1 overflow-hidden rounded bg-[color-mix(in_srgb,var(--background)_25%,transparent)]">
          <i className="block h-full bg-primary" style={{ width: `${(left / rest.total) * 100}%` }} />
        </div>
      </div>
      <button className={btn} onClick={() => adjust(-15)} aria-label="Subtract 15 seconds">−15</button>
      <button className={btn} onClick={() => adjust(15)} aria-label="Add 15 seconds">+15</button>
      <button className={`${btn} grid place-items-center`} onClick={() => update((s) => { if (s.active) s.active.rest = null; })} aria-label="Skip rest"><Icon name="x" /></button>
    </div>
  );
}

function ChooseSession() {
  const state = useAppState()!;
  const next = nextTemplate(state);
  const tile = 'flex w-full items-center gap-4 rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary-ink';
  return (
    <>
      <h1 className="display mb-5 text-5xl">Choose a<br />session</h1>
      <div className="grid gap-3">
        {ORDER.map((k) => (
          <button key={k} className={tile} onClick={() => startSession(k)}>
            <span className="grid size-10 flex-none place-items-center rounded-xl bg-[color-mix(in_srgb,var(--strength)_18%,transparent)] text-primary-ink"><Icon name="dumbbell" /></span>
            <span className="min-w-0">
              <h2 className="display text-[1.75rem]">
                {TEMPLATES[k].name}
                {k === next && <span className="pr-tag bg-primary text-primary-foreground">NEXT</span>}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{TEMPLATES[k].ex.map((e) => e[0]).join(' · ')}</p>
            </span>
            <span className="ml-auto text-primary-ink"><Icon name="arrow" /></span>
          </button>
        ))}
        <button className={tile} onClick={() => startSession(null)}>
          <span className="grid size-10 flex-none place-items-center rounded-xl bg-secondary"><Icon name="plus" /></span>
          <span><h2 className="display text-[1.75rem]">Empty session</h2><p className="mt-1 text-sm text-muted-foreground">Build it as you go</p></span>
          <span className="ml-auto text-primary-ink"><Icon name="arrow" /></span>
        </button>
      </div>
    </>
  );
}

export function TrainView() {
  const state = useAppState();
  const router = useRouter();
  const [pick, setPick] = useState(LIBRARY[0]);
  if (!state) return <PageSkeleton />;
  const a = state.active;
  if (!a) return <ChooseSession />;

  const total = a.exercises.reduce((n, e) => n + e.sets.length, 0);
  const done = a.exercises.reduce((n, e) => n + e.sets.filter((s) => s.done).length, 0);

  const setField = (i: number, j: number, f: 'kg' | 'reps', v: string) =>
    update((s) => { s.active!.exercises[i].sets[j][f] = v.replace(',', '.'); });

  const toggle = (i: number, j: number) => {
    const ex = a.exercises[i], st = ex.sets[j];
    if (st.done) {
      update((s) => { const x = s.active!.exercises[i].sets[j]; x.done = false; x.pr = false; });
      return;
    }
    const kg = parseFloat(st.kg), reps = parseInt(st.reps, 10);
    if (!(kg >= 0) || !(reps > 0)) { toast('Enter weight and reps first'); return; }
    const v = e1rm(kg, reps);
    const best = Math.max(bestE1rm(state, ex.name), ...ex.sets.filter((x, k) => k !== j && x.done).map((x) => e1rm(+x.kg, +x.reps)));
    const pr = best > 0 && v > best + 0.01;
    if (pr) toast(`New PR! ${ex.name} ${kgFmt(kg)} × ${reps}`, true);
    const secs = restSecondsFor(ex.name);
    update((s) => {
      const x = s.active!.exercises[i].sets[j];
      x.done = true; x.pr = pr;
      s.active!.rest = { end: Date.now() + secs * 1000, total: secs };
    });
  };

  const finish = () => {
    const r = finishSession();
    if (!r) { toast('Tick at least one set to finish'); return; }
    router.push('/');
    toast(`Workout saved · ${r.tonnes.toFixed(1)} t lifted${r.prs ? ` · ${r.prs} PR${r.prs > 1 ? 's' : ''}` : ''}`, r.prs > 0);
  };

  const cols = 'grid grid-cols-[28px_1fr_72px_64px_var(--tap)] items-center gap-2';
  const input = 'w-full min-h-[var(--tap)] rounded-sm border border-transparent text-center font-display text-[1.375rem] font-bold tabular-nums focus:border-ring focus:outline-none';

  return (
    <>
      <div className="sticky top-0 z-10 mb-2 flex items-end justify-between gap-3 bg-background pt-2 pb-3">
        <div>
          <p className="eyebrow">In progress · <span className="tabular-nums">{done}/{total}</span> sets</p>
          <h1 className="display text-5xl">{a.name}</h1>
        </div>
        <Elapsed start={a.start} />
      </div>
      <div className="-mt-2 mb-4 h-1 overflow-hidden rounded bg-muted">
        <i className="block h-full bg-primary transition-[width] duration-[var(--dur)]" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>

      {a.rest && <RestTimer rest={a.rest} />}

      <div className="space-y-4">
        {a.exercises.map((ex, i) => {
          const best = bestE1rm(state, ex.name), prev = lastSets(state, ex.name) ?? [];
          return (
            <article key={i} className="card">
              <header className="mb-3 flex items-baseline justify-between gap-2">
                <h2 className="display text-[1.75rem]">
                  {hasHowto(ex.name) ? (
                    <button className="inline-flex items-center gap-2 rounded-sm text-left uppercase hover:[&>svg]:text-primary-ink" onClick={() => openHowto(ex.name)} aria-label={`How to do ${ex.name}`}>
                      {ex.name}<Icon name="info" className="size-[18px] text-muted-foreground" />
                    </button>
                  ) : ex.name}
                </h2>
                <span className="text-sm text-muted-foreground tabular-nums">{best ? `Best ${Math.round(best)} kg e1RM` : 'First time'}</span>
              </header>
              <div role="table" aria-label={`${ex.name} sets`}>
                <div role="row" className={`${cols} px-1 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground [&>span:nth-child(n+3)]:text-center`}>
                  <span role="columnheader">Set</span><span role="columnheader">Previous</span><span role="columnheader">kg</span><span role="columnheader">Reps</span>
                  <span role="columnheader"><span className="sr-only">Done</span></span>
                </div>
                {ex.sets.map((s, j) => (
                  <div key={j} role="row" className={`${cols} rounded-md p-1 transition-colors ${s.done ? 'bg-[color-mix(in_srgb,var(--strength)_14%,transparent)]' : ''}`}>
                    <span role="cell" className="text-center font-display text-lg font-extrabold tabular-nums">{j + 1}</span>
                    <span role="cell" className="text-sm text-muted-foreground tabular-nums">
                      {prev[j] ? `${kgFmt(prev[j].kg)} × ${prev[j].reps}` : '—'}
                      {s.pr && <span className="pr-tag">PR</span>}
                    </span>
                    <input role="cell" className={`${input} ${s.done ? 'bg-transparent' : 'bg-muted'}`} inputMode="decimal" value={s.kg} onChange={(e) => setField(i, j, 'kg', e.target.value)} aria-label={`Set ${j + 1} weight, kilograms`} />
                    <input role="cell" className={`${input} ${s.done ? 'bg-transparent' : 'bg-muted'}`} inputMode="numeric" value={s.reps} onChange={(e) => setField(i, j, 'reps', e.target.value)} aria-label={`Set ${j + 1} reps`} />
                    <span role="cell">
                    <button
                      onClick={() => toggle(i, j)}
                      aria-pressed={s.done}
                      aria-label={`Set ${j + 1} done`}
                      className={`grid size-[var(--tap)] place-items-center rounded-sm border-2 transition-all ${s.done ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}
                    >
                      <Icon name="check" />
                    </button>
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="mt-2 min-h-[var(--tap)] w-full rounded-md border border-dashed font-bold text-muted-foreground"
                onClick={() => update((s) => {
                  const sets = s.active!.exercises[i].sets, l = sets[sets.length - 1] ?? { kg: '', reps: '' };
                  sets.push({ kg: l.kg, reps: l.reps, done: false, pr: false });
                })}
              >
                + Add set
              </button>
            </article>
          );
        })}

        <div className="flex gap-2">
          <label className="sr-only" htmlFor="exSel">Exercise to add</label>
          <select id="exSel" className="select flex-1" value={pick} onChange={(e) => setPick(e.target.value)}>
            {LIBRARY.map((n) => <option key={n}>{n}</option>)}
          </select>
          <button className="btn btn-ghost btn-sm" onClick={() => update((s) => { s.active!.exercises.push(newActiveExercise(s, pick)); })}>
            <Icon name="plus" />Add
          </button>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-3">
          <button className="btn btn-ghost" onClick={() => confirm('Discard this workout? Logged sets will be lost.') && (update((s) => { s.active = null; }), router.push('/'))}>Discard</button>
          <button className="btn btn-primary" onClick={finish}>Finish <Icon name="check" /></button>
        </div>
      </div>
    </>
  );
}
