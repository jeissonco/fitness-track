'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppState, resetToEmpty } from '@/lib/store';
import { startPlanWorkout, startSession } from '@/lib/actions';
import { planStatus } from '@/lib/plans';
import { useT, workoutName } from '@/lib/i18n';
import { TEMPLATES, addDays, fmtDate, iso, isoWeek, kgFmt, lastSets, nextTemplate, recentPRs, volume, weekStart, weekStreak } from '@/lib/fitness';
import { Icon } from '../icons';
import { PageSkeleton } from './skeleton';

export function TodayView() {
  const state = useAppState();
  const router = useRouter();
  const t = useT(), tt = t.today;
  if (!state) return <PageSkeleton />;

  const now = new Date(), ws = weekStart(now), wsI = iso(ws), endI = iso(addDays(ws, 7));
  const wkW = state.workouts.filter((w) => w.date >= wsI && w.date < endI);
  const wkC = state.cardio.filter((c) => c.date >= wsI && c.date < endI);
  const vol = wkW.reduce((a, w) => a + volume(w), 0);
  const cmin = wkC.reduce((a, c) => a + c.min, 0);
  const days = [...Array(7)].map((_, i) => {
    const d = addDays(ws, i), k = iso(d);
    return {
      d, k,
      v: state.workouts.filter((w) => w.date === k).reduce((a, w) => a + volume(w), 0),
      c: state.cardio.filter((c) => c.date === k).reduce((a, c) => a + c.min, 0),
    };
  });
  const maxV = Math.max(1, ...days.map((d) => d.v)), maxC = Math.max(1, ...days.map((d) => d.c));
  const nextKey = nextTemplate(state), tpl = TEMPLATES[nextKey], streak = weekStreak(state), act = state.active;
  const prs = recentPRs(state);
  // Following a plan: its next workout replaces the push/pull/legs suggestion.
  const ps = planStatus(state), planNext = !act && ps?.next ? { ...ps, next: ps.next } : null;
  const go = () => {
    if (act) return router.push('/train');
    if (planNext ? startPlanWorkout(planNext.plan, planNext.next) : startSession(nextKey)) router.push('/train');
  };
  const weekday = (d: Date, weekday: 'long' | 'narrow') => d.toLocaleDateString(t.dateLocale, { weekday });

  return (
    <>
      <section className="mb-6">
        <p className="eyebrow">{tt.eyebrow(weekday(now, 'long'), isoWeek(now))}</p>
        <h1 className="display mt-2 mb-3 text-[4rem]">
          {act ? <>{tt.back[0]}<br />{tt.back[1]}</> : wkW.length >= 3 ? <>{tt.streak[0]}<br /><em className="not-italic text-primary-ink">{tt.streak[1]}</em> {tt.streak[2]}</> : <>{tt.lift[0]}<br /><em className="not-italic text-primary-ink">{tt.lift[1]}</em></>}
        </h1>
        {streak > 0 && <span className="chip text-accent-ink"><Icon name="flame" />{tt.streakChip(streak)}</span>}
      </section>

      <div className="space-y-4">
        {state.demo && (
          <div className="card flex items-center gap-3 border-dashed">
            <p className="m-0 flex-1 text-sm text-muted-foreground">{tt.sample[0]}<b className="text-foreground">{tt.sample[1]}</b>{tt.sample[2]}</p>
            <button className="btn btn-ghost btn-sm" onClick={() => confirm(tt.startFreshConfirm) && resetToEmpty()}>{tt.startFresh}</button>
          </div>
        )}

        <article className="relative overflow-hidden rounded-lg bg-primary p-5 text-primary-foreground after:pointer-events-none after:absolute after:inset-0 after:bg-[repeating-linear-gradient(-55deg,transparent_0_22px,rgba(0,0,0,.05)_22px_44px)]">
          <div className="relative z-[1]">
            <p className="eyebrow text-inherit opacity-70">{act ? tt.inProgress : planNext ? `${tt.nextUp} · ${planNext.plan.name[t.locale]} · ${t.plans.weekOf(planNext.week, planNext.plan.weeks)}` : tt.nextUp}</p>
            <h2 className="display mt-1 mb-4 text-5xl">{act ? workoutName(t, act.template, act.name, act.plan) : planNext ? planNext.next.name[t.locale] : t.template[nextKey]}</h2>
            <ul className="mb-5 grid list-none gap-1.5 p-0">
              {act
                ? act.exercises.map((e) => (
                    <li key={e.name} className="flex justify-between gap-3 border-b border-black/10 pb-1.5 font-semibold">
                      <span>{t.ex(e.name)}</span><span className="flex-none tabular-nums">{tt.setsDone(e.sets.filter((s) => s.done).length, e.sets.length)}</span>
                    </li>
                  ))
                : planNext
                ? planNext.next.exercises.map((e, i) => (
                    <li key={i} className="flex justify-between gap-3 border-b border-black/10 pb-1.5 font-semibold">
                      <span>{t.ex(e.name)}</span><span className="flex-none tabular-nums">{t.plans.setsReps(e.sets, e.reps)}</span>
                    </li>
                  ))
                : tpl.ex.map(([n]) => {
                    const ls = lastSets(state, n);
                    return (
                      <li key={n} className="flex justify-between gap-3 border-b border-black/10 pb-1.5 font-semibold">
                        <span>{t.ex(n)}</span><span className="flex-none tabular-nums">{ls ? `${ls.length}×${ls[0].reps} · ${kgFmt(ls[0].kg)} kg` : tt.newEx}</span>
                      </li>
                    );
                  })}
            </ul>
            <button className="btn btn-ink w-full" onClick={go}>
              {act ? tt.resume : tt.start} <Icon name="arrow" />
            </button>
          </div>
        </article>
        {!ps && (
          <Link href="/plans" className="card flex items-center gap-3 border-dashed">
            <span className="grid size-10 flex-none place-items-center rounded-xl bg-secondary text-primary-ink"><Icon name="calendar" /></span>
            <span className="flex-1 font-bold">{t.plans.browse}<span className="block text-sm font-normal text-muted-foreground">{t.plans.intro}</span></span>
            <Icon name="arrow" />
          </Link>
        )}

        <div className="grid grid-cols-3 gap-3">
          {[
            { v: String(wkW.length), u: '/3', l: tt.sessions },
            { v: (vol / 1000).toFixed(1), u: 't', l: tt.volume },
            { v: String(cmin), u: 'min', l: tt.cardio },
          ].map((s) => (
            <div key={s.l} className="card px-4 py-3">
              <b className="block font-display text-4xl font-extrabold leading-none tabular-nums">{s.v}<small className="ml-0.5 text-base font-semibold text-muted-foreground">{s.u}</small></b>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</span>
            </div>
          ))}
        </div>

        <section className="card">
          <h2 className="section-title">{tt.thisWeek}</h2>
          <div className="grid h-[132px] grid-cols-7 items-end gap-2">
            {days.map((d) => (
              <div key={d.k} className="flex h-full flex-col items-center gap-1.5" aria-label={tt.dayAria(weekday(d.d, 'long'), Math.round(d.v), d.c)}>
                <div className="flex w-full flex-1 items-end justify-center gap-[3px]">
                  <div className={`w-3 min-h-1 rounded-t rounded-b-sm ${d.v ? 'bg-strength' : 'bg-muted'}`} style={{ height: `${d.v ? Math.max(8, (d.v / maxV) * 100) : 4}%` }} />
                  <div className={`w-3 min-h-1 rounded-t rounded-b-sm ${d.c ? 'bg-cardio' : 'bg-muted'}`} style={{ height: `${d.c ? Math.max(8, (d.c / maxC) * 70) : 4}%` }} />
                </div>
                <span className={`text-xs font-bold uppercase ${d.k === iso(now) ? 'text-foreground' : 'text-muted-foreground'}`}>{weekday(d.d, 'narrow')}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
            <span><i className="mr-1.5 inline-block size-2.5 rounded-[3px] bg-strength align-[-1px]" />{tt.strengthVolume}</span>
            <span><i className="mr-1.5 inline-block size-2.5 rounded-[3px] bg-cardio align-[-1px]" />{tt.cardioMinutes}</span>
          </div>
        </section>

        {prs.length > 0 && (
          <section className="card">
            <h2 className="section-title">{tt.recentPRs} <span className="eyebrow">{tt.est1rm}</span></h2>
            <ul className="list-none p-0">
              {prs.map((p) => (
                <li key={p.date + p.name} className="flex items-center gap-3 border-t py-3 first:border-t-0 first:pt-0">
                  <span className="grid size-10 flex-none place-items-center rounded-xl bg-[color-mix(in_srgb,var(--strength)_18%,transparent)] text-primary-ink"><Icon name="trophy" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold">{t.ex(p.name)}</div>
                    <div className="text-sm text-muted-foreground tabular-nums">{kgFmt(p.kg)} kg × {p.reps} · {fmtDate(p.date, t.dateLocale)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[1.375rem] font-extrabold tabular-nums">{Math.round(p.e)} kg</div>
                    <div className="text-sm font-bold text-success tabular-nums">+{kgFmt(p.gain)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
