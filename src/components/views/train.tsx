'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppState, update } from '@/lib/store';
import { finishSession, startPlanWorkout, startSession } from '@/lib/actions';
import { planStatus, targetLow } from '@/lib/plans';
import Link from 'next/link';
import { t as text, useT, workoutName } from '@/lib/i18n';
import { EXERCISE_INFO } from '@/lib/exercise-info';
import { type ActiveWorkout, LIBRARY, SESSIONS, TEMPLATES, bestScore, isBodyweight, kgFmt, lastSets, newActiveExercise, nextTemplate, pad, restSecondsFor, scoreUnit, setScore } from '@/lib/fitness';
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

function Elapsed({ start }: { start: number | null }) {
  const now = useNow(1000);
  const t = useT();
  if (start === null) {
    return (
      <button
        className="btn btn-primary btn-sm flex-none"
        onClick={() => update((s) => { if (s.active && s.active.start === null) s.active.start = Date.now(); })}
        title={t.train.startClockHint}
      >
        <Icon name="play" className="size-[18px]" />{t.train.startClock}
      </button>
    );
  }
  const s = Math.max(0, Math.floor((now - start) / 1000)), h = Math.floor(s / 3600);
  return (
    <div className="font-display text-4xl font-extrabold text-primary-ink tabular-nums" aria-label={t.train.elapsed}>
      {(h ? h + ':' : '') + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60)}
    </div>
  );
}

function RestTimer({ rest }: { rest: NonNullable<ActiveWorkout['rest']> }) {
  const now = useNow(250);
  const t = useT();
  const left = Math.ceil((rest.end - now) / 1000);
  useEffect(() => {
    if (left > 0) return;
    update((s) => { if (s.active) s.active.rest = null; });
    toast(text().train.restOver);
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
        <span className="eyebrow text-inherit opacity-70">{t.train.rest}</span>
        <div><b className="inline-block min-w-[3.2ch] font-display text-4xl font-extrabold leading-none tabular-nums">{Math.floor(left / 60)}:{pad(left % 60)}</b></div>
        <div className="mt-1.5 h-1 overflow-hidden rounded bg-[color-mix(in_srgb,var(--background)_25%,transparent)]">
          <i className="block h-full bg-primary" style={{ width: `${(left / rest.total) * 100}%` }} />
        </div>
      </div>
      <button className={btn} onClick={() => adjust(-15)} aria-label={t.train.minus15}>−15</button>
      <button className={btn} onClick={() => adjust(15)} aria-label={t.train.plus15}>+15</button>
      <button className={`${btn} grid place-items-center`} onClick={() => update((s) => { if (s.active) s.active.rest = null; })} aria-label={t.train.skipRest}><Icon name="x" /></button>
    </div>
  );
}

function ChooseSession() {
  const state = useAppState()!;
  const t = useT();
  const next = nextTemplate(state);
  const ps = planStatus(state);
  const tile = 'flex w-full items-center gap-4 rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary-ink';
  return (
    <>
      <h1 className="display mb-5 text-5xl">{t.train.choose[0]}<br />{t.train.choose[1]}</h1>
      {ps?.next && (
        <>
          <p className="eyebrow mb-2">{t.plans.fromPlan} · {ps.plan.name[t.locale]} · {t.plans.weekOf(ps.week, ps.plan.weeks)}</p>
          <button className={`${tile} mb-2 border-primary-ink`} onClick={() => startPlanWorkout(ps.plan, ps.next!)}>
            <span className="grid size-10 flex-none place-items-center rounded-xl bg-primary text-primary-foreground"><Icon name="calendar" /></span>
            <span className="min-w-0">
              <h2 className="display text-[1.75rem]">{ps.next.name[t.locale]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{ps.next.exercises.map((e) => t.ex(e.name)).join(' · ')}</p>
            </span>
            <span className="ml-auto text-primary-ink"><Icon name="arrow" /></span>
          </button>
          <Link href={`/plans/${ps.plan.id}`} className="mb-6 block text-sm font-bold text-muted-foreground underline underline-offset-4">{t.plans.yours}: {t.plans.progress(ps.done, ps.total)}</Link>
          <p className="eyebrow mb-2">{t.plans.quick}</p>
        </>
      )}
      <div className="grid gap-3">
        {SESSIONS.map((k) => (
          <button key={k} className={tile} onClick={() => startSession(k)}>
            <span className="grid size-10 flex-none place-items-center rounded-xl bg-[color-mix(in_srgb,var(--strength)_18%,transparent)] text-primary-ink"><Icon name="dumbbell" /></span>
            <span className="min-w-0">
              <h2 className="display text-[1.75rem]">
                {t.template[k]}
                {k === next && <span className="pr-tag bg-primary text-primary-foreground">{t.train.next}</span>}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{TEMPLATES[k].ex.map((e) => t.ex(e[0])).join(' · ')}</p>
            </span>
            <span className="ml-auto text-primary-ink"><Icon name="arrow" /></span>
          </button>
        ))}
        <button className={tile} onClick={() => startSession(null)}>
          <span className="grid size-10 flex-none place-items-center rounded-xl bg-secondary"><Icon name="plus" /></span>
          <span><h2 className="display text-[1.75rem]">{t.train.empty}</h2><p className="mt-1 text-sm text-muted-foreground">{t.train.emptyHint}</p></span>
          <span className="ml-auto text-primary-ink"><Icon name="arrow" /></span>
        </button>
        {!ps && (
          <Link href="/plans" className={`${tile} border-dashed`}>
            <span className="grid size-10 flex-none place-items-center rounded-xl bg-secondary text-primary-ink"><Icon name="calendar" /></span>
            <span><h2 className="display text-[1.75rem]">{t.plans.browse}</h2><p className="mt-1 text-sm text-muted-foreground">{t.plans.intro}</p></span>
            <span className="ml-auto text-primary-ink"><Icon name="arrow" /></span>
          </Link>
        )}
      </div>
    </>
  );
}

export function TrainView() {
  const state = useAppState();
  const router = useRouter();
  const t = useT(), tr = t.train;
  const [pick, setPick] = useState(LIBRARY[0]);
  if (!state) return <PageSkeleton />;
  const a = state.active;
  if (!a) return <ChooseSession />;

  const total = a.exercises.reduce((n, e) => n + e.sets.length, 0);
  const done = a.exercises.reduce((n, e) => n + e.sets.filter((s) => s.done).length, 0);
  // Picker options grouped by equipment, each group sorted by the displayed name.
  const groups = Object.entries(tr.equipmentGroup).map(([eq, label]) => ({
    label,
    names: LIBRARY.filter((n) => (EXERCISE_INFO[n]?.equipment ?? 'body only') === eq).sort((x, y) => t.ex(x).localeCompare(t.ex(y), t.locale)),
  })).filter((g) => g.names.length);

  const setField = (i: number, j: number, f: 'kg' | 'reps', v: string) =>
    update((s) => { s.active!.exercises[i].sets[j][f] = v.replace(',', '.'); });

  // Ask first only when ticked work would be lost.
  const removeExercise = (i: number) => {
    const ex = a.exercises[i];
    if (ex.sets.some((x) => x.done) && !confirm(tr.removeExerciseConfirm(t.ex(ex.name)))) return;
    update((s) => { s.active!.exercises.splice(i, 1); });
  };
  const removeSet = (i: number) => {
    const sets = a.exercises[i].sets;
    if (sets.length <= 1 || (sets[sets.length - 1].done && !confirm(tr.removeSetConfirm))) return;
    update((s) => { s.active!.exercises[i].sets.pop(); });
  };

  const toggle = (i: number, j: number) => {
    const ex = a.exercises[i], st = ex.sets[j];
    if (st.done) {
      update((s) => { const x = s.active!.exercises[i].sets[j]; x.done = false; x.pr = false; });
      return;
    }
    // A blank weight on a bodyweight exercise (push-up, plank…) counts as 0 kg.
    const bodyweight = isBodyweight(ex.name);
    const kg = st.kg.trim() === '' && bodyweight ? 0 : parseFloat(st.kg), reps = parseInt(st.reps, 10);
    if (!(kg >= 0) || !(reps > 0)) { toast(tr.needWeightReps); return; }
    const v = setScore(ex.name, kg, reps);
    const best = Math.max(bestScore(state, ex.name), ...ex.sets.filter((x, k) => k !== j && x.done).map((x) => setScore(ex.name, parseFloat(x.kg) || 0, parseInt(x.reps, 10))));
    const pr = best > 0 && v > best + 0.01;
    if (pr) toast(scoreUnit(ex.name) === 'kg' ? tr.newPR(t.ex(ex.name), kgFmt(kg), reps) : tr.newPRCount(t.ex(ex.name), reps, t.unit[scoreUnit(ex.name)]), true);
    const secs = restSecondsFor(ex.name);
    update((s) => {
      const x = s.active!.exercises[i].sets[j];
      x.done = true; x.pr = pr;
      s.active!.start ??= Date.now();
      s.active!.rest = { end: Date.now() + secs * 1000, total: secs };
    });
  };

  const finish = () => {
    const r = finishSession();
    if (!r) { toast(tr.tickOne); return; }
    router.push('/');
    toast(tr.saved(r.tonnes.toFixed(1), r.prs), r.prs > 0);
  };

  const cols = 'grid grid-cols-[28px_1fr_72px_64px_var(--tap)] items-center gap-2';
  const input = 'w-full min-h-[var(--tap)] rounded-sm border border-transparent text-center font-display text-[1.375rem] font-bold tabular-nums focus:border-ring focus:outline-none';

  return (
    <>
      <div className="sticky top-0 z-10 mb-2 flex items-end justify-between gap-3 bg-background pt-2 pb-3">
        <div>
          <p className="eyebrow tabular-nums">{a.start === null ? `${tr.planning} · ${tr.startClockHint}` : tr.inProgress(done, total)}</p>
          <h1 className="display text-5xl">{workoutName(t, a.template, a.name, a.plan)}</h1>
        </div>
        <Elapsed start={a.start} />
      </div>
      <div className="-mt-2 mb-4 h-1 overflow-hidden rounded bg-muted">
        <i className="block h-full bg-primary transition-[width] duration-[var(--dur)]" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>

      {a.rest && <RestTimer rest={a.rest} />}

      <div className="space-y-4">
        {a.exercises.map((ex, i) => {
          const best = bestScore(state, ex.name), prev = lastSets(state, ex.name) ?? [], name = t.ex(ex.name);
          const unit = scoreUnit(ex.name), bw = isBodyweight(ex.name);
          return (
            <article key={`${i}-${ex.name}`} className="card">
              <header className="mb-3 flex items-baseline justify-between gap-2">
                <h2 className="display text-[1.75rem]">
                  {hasHowto(ex.name) ? (
                    <button className="inline-flex items-center gap-2 rounded-sm text-left uppercase hover:[&>svg]:text-primary-ink" onClick={() => openHowto(ex.name)} aria-label={tr.howTo(name)}>
                      {name}<Icon name="info" className="size-[18px] text-muted-foreground" />
                    </button>
                  ) : name}
                </h2>
                <span className="flex flex-none items-center gap-1 text-sm text-muted-foreground tabular-nums">
                  {best ? (unit === 'kg' ? tr.best(Math.round(best)) : tr.bestCount(best, t.unit[unit])) : tr.firstTime}
                  <button
                    className="-mr-2 grid size-[var(--tap)] place-items-center rounded-full hover:bg-secondary hover:text-foreground"
                    onClick={() => removeExercise(i)}
                    aria-label={tr.removeExercise(name)}
                    title={tr.removeExercise(name)}
                  >
                    <Icon name="x" className="size-5" />
                  </button>
                </span>
              </header>
              {ex.target && <p className="-mt-2 mb-3 text-sm font-bold text-primary-ink tabular-nums">{t.plans.target}: {t.plans.setsReps(ex.sets.length, ex.target)}</p>}
              <div role="table" aria-label={tr.setsOf(name)}>
                <div role="row" className={`${cols} px-1 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground [&>span:nth-child(n+3)]:text-center`}>
                  <span role="columnheader">{tr.colSet}</span><span role="columnheader">{tr.colPrev}</span><span role="columnheader">{tr.colKg}</span><span role="columnheader">{tr.colReps}</span>
                  <span role="columnheader"><span className="sr-only">{tr.colDone}</span></span>
                </div>
                {ex.sets.map((s, j) => (
                  <div key={j} role="row" className={`${cols} rounded-md p-1 transition-colors ${s.done ? 'bg-[color-mix(in_srgb,var(--strength)_14%,transparent)]' : ''}`}>
                    <span role="cell" className="text-center font-display text-lg font-extrabold tabular-nums">{j + 1}</span>
                    <span role="cell" className="text-sm text-muted-foreground tabular-nums">
                      {prev[j] ? `${bw && !prev[j].kg ? tr.bw : kgFmt(prev[j].kg)} × ${prev[j].reps}` : '—'}
                      {s.pr && <span className="pr-tag">PR</span>}
                    </span>
                    <input role="cell" className={`${input} ${s.done ? 'bg-transparent' : 'bg-muted'}`} inputMode="decimal" value={s.kg} placeholder={bw ? tr.bw : undefined} onChange={(e) => setField(i, j, 'kg', e.target.value)} aria-label={tr.setWeight(j + 1)} />
                    <input role="cell" className={`${input} ${s.done ? 'bg-transparent' : 'bg-muted'}`} inputMode="numeric" value={s.reps} placeholder={ex.target ? String(targetLow(ex.target) || '') : undefined} onChange={(e) => setField(i, j, 'reps', e.target.value)} aria-label={tr.setReps(j + 1)} />
                    <span role="cell">
                    <button
                      onClick={() => toggle(i, j)}
                      aria-pressed={s.done}
                      aria-label={tr.setDone(j + 1)}
                      className={`grid size-[var(--tap)] place-items-center rounded-sm border-2 transition-all ${s.done ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}
                    >
                      <Icon name="check" />
                    </button>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  className="min-h-[var(--tap)] rounded-md border border-dashed font-bold text-muted-foreground disabled:opacity-40"
                  disabled={ex.sets.length <= 1}
                  onClick={() => removeSet(i)}
                >
                  {tr.removeSet}
                </button>
                <button
                  className="min-h-[var(--tap)] rounded-md border border-dashed font-bold text-muted-foreground"
                  onClick={() => update((s) => {
                    const sets = s.active!.exercises[i].sets, l = sets[sets.length - 1] ?? { kg: '', reps: '' };
                    sets.push({ kg: l.kg, reps: l.reps, done: false, pr: false });
                  })}
                >
                  {tr.addSet}
                </button>
              </div>
            </article>
          );
        })}

        <div className="flex gap-2">
          <label className="sr-only" htmlFor="exSel">{tr.exerciseToAdd}</label>
          <select id="exSel" className="select min-w-0 flex-1" value={pick} onChange={(e) => setPick(e.target.value)}>
            {groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.names.map((n) => <option key={n} value={n}>{t.ex(n)}</option>)}
              </optgroup>
            ))}
          </select>
          <button className="btn btn-ghost btn-sm" onClick={() => update((s) => { s.active!.exercises.push(newActiveExercise(s, pick)); })}>
            <Icon name="plus" />{tr.add}
          </button>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-3">
          <button className="btn btn-ghost" onClick={() => confirm(tr.discardConfirm) && (update((s) => { s.active = null; }), router.push('/'))}>{tr.discard}</button>
          <button className="btn btn-primary" onClick={finish}>{tr.finish} <Icon name="check" /></button>
        </div>
      </div>
    </>
  );
}
