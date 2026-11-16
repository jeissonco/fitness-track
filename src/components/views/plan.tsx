'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { followPlan, startPlanWorkout, stopPlan } from '@/lib/actions';
import { type Plan, type PlanWorkout, daysPerWeek, planById, planStatus, weekLayout } from '@/lib/plans';
import { Icon } from '../icons';
import { hasHowto, openHowto } from '../howto-sheet';

export function PlanView({ id }: { id: string }) {
  const plan = planById(id)!;
  const state = useAppState();
  const router = useRouter();
  const t = useT(), tp = t.plans;
  const status = state ? planStatus(state) : null;
  const following = status?.plan.id === plan.id ? status : null;

  const follow = () => {
    if (status && !following && !confirm(tp.switchConfirm(status.plan.name[t.locale]))) return;
    followPlan(plan);
  };
  const start = (w: PlanWorkout) => { if (startPlanWorkout(plan, w)) router.push('/train'); };

  return (
    <>
      <Link href="/plans" className="mb-4 inline-flex min-h-[var(--tap)] items-center gap-2 font-bold text-muted-foreground">
        <Icon name="back" className="size-5" />{tp.back}
      </Link>
      <p className="eyebrow">{tp.level[plan.level]} · {tp.goal[plan.goal]}</p>
      <h1 className="display mt-2 mb-3 text-5xl">{plan.name[t.locale]}</h1>
      <p className="mb-4 text-muted-foreground">{plan.summary[t.locale]}</p>
      <div className="mb-5 flex flex-wrap gap-2 text-sm">
        <span className="chip">{tp.perWeek(daysPerWeek(plan))}</span>
        <span className="chip">{tp.weeks(plan.weeks)}</span>
        <span className="chip">{tp.equipment[plan.equipment]}</span>
        {plan.categories.map((c) => <span key={c} className="chip text-muted-foreground">{tp.category[c]}</span>)}
      </div>

      <div className="space-y-4">
        {following ? (
          <section className="rounded-lg bg-primary p-5 text-primary-foreground">
            <p className="eyebrow text-inherit opacity-70">{tp.following} · {following.finished ? tp.finished : tp.weekOf(following.week, plan.weeks)}</p>
            <div className="my-3 h-1.5 overflow-hidden rounded bg-black/15">
              <i className="block h-full bg-[var(--ink-950)]" style={{ width: `${(following.done / following.total) * 100}%` }} />
            </div>
            <p className="mb-4 font-semibold tabular-nums">{tp.progress(following.done, following.total)}</p>
            {following.next ? (
              <>
                <p className="eyebrow text-inherit opacity-70">{tp.next} · {tp.day(following.dayOfWeek)}</p>
                <h2 className="display mt-1 mb-4 text-4xl">{following.next.name[t.locale]}</h2>
                <button className="btn btn-ink w-full" onClick={() => start(following.next!)}>{tp.startNext} <Icon name="arrow" /></button>
              </>
            ) : (
              <>
                <p className="mb-4">{tp.finishedHint}</p>
                <button className="btn btn-ink w-full" onClick={() => followPlan(plan)}>{tp.restart}</button>
              </>
            )}
            <button className="mt-3 w-full text-center text-sm font-bold underline underline-offset-4" onClick={() => confirm(tp.stopConfirm) && stopPlan()}>{tp.stop}</button>
          </section>
        ) : (
          <button className="btn btn-primary w-full" disabled={!state} onClick={follow}>{tp.follow} <Icon name="check" /></button>
        )}

        <section className="card">
          <h2 className="section-title">{tp.yourWeek}</h2>
          <ol className="grid list-none gap-2 p-0">
            {weekLayout(plan, following?.week ?? 1).map((key, i) => {
              const w = plan.workouts.find((x) => x.key === key)!;
              const isNext = following?.next && following.dayOfWeek === i + 1;
              return (
                <li key={i} className={`flex items-center gap-3 rounded-md px-3 py-2 ${isNext ? 'bg-[color-mix(in_srgb,var(--strength)_16%,transparent)]' : 'bg-muted'}`}>
                  <span className="w-16 flex-none font-display font-bold uppercase text-muted-foreground">{tp.day(i + 1)}</span>
                  <span className="font-semibold">{w.name[t.locale]}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <h2 className="section-title mt-6">{tp.workouts}</h2>
        {plan.workouts.map((w) => <WorkoutCard key={w.key} plan={plan} workout={w} onStart={() => start(w)} canStart={!!state} />)}

        <section className="card">
          <h2 className="section-title">{tp.howToProgress}</h2>
          <p className="m-0 leading-relaxed">{plan.progression[t.locale]}</p>
        </section>
      </div>
    </>
  );
}

function WorkoutCard({ workout, onStart, canStart }: { plan: Plan; workout: PlanWorkout; onStart: () => void; canStart: boolean }) {
  const t = useT(), tp = t.plans;
  return (
    <article className="card">
      <h3 className="display mb-3 text-[1.75rem]">{workout.name[t.locale]}</h3>
      <ul className="mb-3 list-none p-0">
        {workout.exercises.map((e, i) => (
          <li key={i} className="flex items-center justify-between gap-3 border-t py-2 first:border-t-0 first:pt-0">
            {hasHowto(e.name) ? (
              <button className="inline-flex items-center gap-2 text-left font-semibold hover:[&>svg]:text-primary-ink" onClick={() => openHowto(e.name)} aria-label={t.train.howTo(t.ex(e.name))}>
                {t.ex(e.name)}<Icon name="info" className="size-4 text-muted-foreground" />
              </button>
            ) : <span className="font-semibold">{t.ex(e.name)}</span>}
            <span className="flex-none font-display text-lg font-bold tabular-nums text-muted-foreground">{tp.setsReps(e.sets, e.reps)}</span>
          </li>
        ))}
      </ul>
      <button className="btn btn-ghost btn-sm w-full" disabled={!canStart} onClick={onStart}><Icon name="play" className="size-[18px]" />{t.today.start}</button>
    </article>
  );
}
