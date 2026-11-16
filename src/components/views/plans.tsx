'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppState } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { PLANS } from '@/lib/plan-catalog';
import { PLAN_CATEGORIES, type Plan, type PlanCategory, daysPerWeek, planStatus } from '@/lib/plans';
import { Icon } from '../icons';

const DAY_FILTERS = [0, 2, 3, 4, 5] as const; // 0 = any, 5 = five or more

export function PlansView() {
  const state = useAppState();
  const t = useT(), tp = t.plans;
  const [cat, setCat] = useState<PlanCategory | 'all'>('all');
  const [days, setDays] = useState<(typeof DAY_FILTERS)[number]>(0);
  const status = state ? planStatus(state) : null;

  const list = PLANS.filter((p) =>
    (cat === 'all' || p.categories.includes(cat)) &&
    (!days || (days === 5 ? daysPerWeek(p) >= 5 : daysPerWeek(p) === days)));
  const chip = (on: boolean) =>
    `min-h-[var(--tap)] flex-none rounded-full border-2 px-4 font-display text-base font-bold uppercase tracking-[0.04em] transition-colors ${on ? 'border-primary bg-primary text-primary-foreground' : 'border-transparent bg-secondary text-secondary-foreground'}`;

  return (
    <>
      <h1 className="display mb-3 text-5xl">{tp.title[0]}<br /><span className="text-primary-ink">{tp.title[1]}</span></h1>
      <p className="mb-5 text-muted-foreground">{tp.intro}</p>

      {status && (
        <Link href={`/plans/${status.plan.id}`} className="mb-5 block rounded-lg bg-primary p-4 text-primary-foreground">
          <p className="eyebrow text-inherit opacity-70">{tp.yours} · {status.finished ? tp.finished : tp.weekOf(status.week, status.plan.weeks)}</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <h2 className="display text-[1.75rem]">{status.plan.name[t.locale]}</h2>
            <Icon name="arrow" />
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded bg-black/15">
            <i className="block h-full bg-[var(--ink-950)]" style={{ width: `${(status.done / status.total) * 100}%` }} />
          </div>
          <p className="mt-2 mb-0 text-sm font-semibold tabular-nums">
            {tp.progress(status.done, status.total)}{status.next ? ` · ${tp.next}: ${status.next.name[t.locale]}` : ''}
          </p>
        </Link>
      )}

      <div role="group" aria-label={tp.title.join(' ')} className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {(['all', ...PLAN_CATEGORIES] as const).map((c) => (
          <button key={c} className={chip(cat === c)} aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c === 'all' ? tp.all : tp.category[c]}
          </button>
        ))}
      </div>
      <div className="mb-4 flex items-center gap-3">
        <span className="label m-0 flex-none">{tp.daysFilter}</span>
        <div role="group" aria-label={tp.daysFilter} className="grid flex-1 grid-cols-5 rounded-md bg-muted p-1">
          {DAY_FILTERS.map((d) => (
            <button
              key={d}
              aria-pressed={days === d}
              onClick={() => setDays(d)}
              className={`min-h-9 rounded-sm font-display font-bold tabular-nums ${days === d ? 'bg-card text-foreground shadow-[0_1px_3px_rgba(0,0,0,.2)]' : 'text-muted-foreground'}`}
            >
              {d === 0 ? tp.any : d === 5 ? '5+' : d}
            </button>
          ))}
        </div>
      </div>

      <p className="eyebrow mb-3" aria-live="polite">{tp.count(list.length)}</p>
      <div className="grid gap-3">
        {list.length === 0 && <p className="card text-muted-foreground">{tp.none}</p>}
        {list.map((p) => <PlanCard key={p.id} plan={p} following={status?.plan.id === p.id} />)}
      </div>
    </>
  );
}

function PlanCard({ plan, following }: { plan: Plan; following: boolean }) {
  const t = useT(), tp = t.plans;
  return (
    <Link href={`/plans/${plan.id}`} className={`card block transition-colors hover:border-primary-ink ${following ? 'border-primary-ink' : ''}`}>
      <p className="eyebrow">
        {tp.level[plan.level]} · {tp.goal[plan.goal]}
        {following && <span className="pr-tag bg-primary text-primary-foreground">{tp.following.toUpperCase()}</span>}
      </p>
      <h2 className="display mt-1 mb-2 text-[1.75rem]">{plan.name[t.locale]}</h2>
      <p className="mb-3 text-sm text-muted-foreground">{plan.summary[t.locale]}</p>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="chip">{tp.perWeek(daysPerWeek(plan))}</span>
        <span className="chip">{tp.weeks(plan.weeks)}</span>
        <span className="chip">{tp.equipment[plan.equipment]}</span>
      </div>
    </Link>
  );
}
