'use client';

import { useState } from 'react';
import { useAppState } from '@/lib/store';
import { addDays, exHistory, fmtDate, iso, kgFmt, scoreUnit, weekStart } from '@/lib/fitness';
import { useT } from '@/lib/i18n';
import { LineChart } from '../line-chart';
import { PageSkeleton } from './skeleton';

export function ProgressView() {
  const state = useAppState();
  const t = useT(), tp = t.progress;
  const [mode, setMode] = useState<'strength' | 'cardio'>('strength');
  const [picked, setPicked] = useState('Bench Press');
  if (!state) return <PageSkeleton />;

  const seg = (
    <div role="group" aria-label={tp.type} className="mb-4 grid grid-cols-2 rounded-md bg-muted p-1">
      {(['strength', 'cardio'] as const).map((m) => (
        <button
          key={m}
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
          className={`min-h-10 rounded-sm font-display text-lg font-bold uppercase tracking-[0.04em] ${mode === m ? 'bg-card text-foreground shadow-[0_1px_3px_rgba(0,0,0,.2)]' : 'text-muted-foreground'}`}
        >
          {tp[m]}
        </button>
      ))}
    </div>
  );

  if (mode === 'strength') {
    const names = [...new Set(state.workouts.flatMap((w) => w.exercises.map((e) => e.name)))].sort((x, y) => t.ex(x).localeCompare(t.ex(y), t.locale));
    const ex = names.includes(picked) ? picked : names[0];
    const h = ex ? exHistory(state, ex) : [];
    const delta = h.length > 1 ? h[h.length - 1].best - h[0].best : 0;
    const unit = ex ? scoreUnit(ex) : 'kg', byKg = unit === 'kg';
    return (
      <>
        <h1 className="display mb-5 text-5xl">{tp.title}</h1>
        {seg}
        <div className="space-y-4">
          <section className="card">
            {names.length === 0 ? (
              <p className="text-muted-foreground">{tp.noLifts}</p>
            ) : (
              <>
                <label className="sr-only" htmlFor="progEx">{tp.exercise}</label>
                <select id="progEx" className="select w-full" value={ex} onChange={(e) => setPicked(e.target.value)}>
                  {names.map((n) => <option key={n} value={n}>{t.ex(n)}</option>)}
                </select>
                {h.length > 0 && (
                  <>
                    <div className="my-3 flex items-end gap-3">
                      <b className="font-display text-[4rem] font-extrabold leading-[.85] text-primary-ink tabular-nums">{Math.round(h[h.length - 1].best)}</b>
                      <small className="font-display text-[1.375rem] font-bold text-muted-foreground">{byKg ? tp.kgE1rm : `${t.unit[unit]} · ${tp.bestSet}`}</small>
                      {delta > 0 && <span className="ml-auto text-sm font-bold text-success tabular-nums">{byKg ? tp.gain(kgFmt(delta), h.length) : tp.gainCount(delta, t.unit[unit], h.length)}</span>}
                    </div>
                    <LineChart pts={h.map((p) => ({ date: p.date, y: p.best }))} unit={unit} />
                  </>
                )}
              </>
            )}
          </section>
          {h.length > 0 && (
            <section className="card">
              <h2 className="section-title">{tp.sessions} <span className="eyebrow">{tp.topSet}</span></h2>
              <ul className="list-none p-0">
                {h.slice(-6).reverse().map((p, i) => (
                  <li key={`${p.date}-${i}`} className="flex items-center gap-3 border-t py-3 first:border-t-0 first:pt-0">
                    <div className="flex-1">
                      <div className="font-bold tabular-nums">{byKg || p.top.kg ? `${kgFmt(p.top.kg)} kg × ${p.top.reps}` : `${p.top.reps} ${t.unit[unit]}`}</div>
                      <div className="text-sm text-muted-foreground">{fmtDate(p.date, t.dateLocale)}</div>
                    </div>
                    <div className="font-display text-[1.375rem] font-extrabold tabular-nums">{Math.round(p.best)} <small className="text-sm text-muted-foreground">{byKg ? tp.e1rm : t.unit[unit]}</small></div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </>
    );
  }

  const ws = weekStart(new Date());
  const weeks = [...Array(6)].map((_, i) => {
    const s = addDays(ws, (i - 5) * 7), a = iso(s), b = iso(addDays(s, 7));
    const cs = state.cardio.filter((c) => c.date >= a && c.date < b);
    return { s, min: cs.reduce((x, c) => x + c.min, 0), km: cs.reduce((x, c) => x + (c.km || 0), 0), n: cs.length };
  });
  const max = Math.max(1, ...weeks.map((w) => w.min));
  const tot = weeks.reduce((a, w) => ({ min: a.min + w.min, km: a.km + w.km, n: a.n + w.n }), { min: 0, km: 0, n: 0 });
  return (
    <>
      <h1 className="display mb-5 text-5xl">{tp.title}</h1>
      {seg}
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { v: String(tot.n), u: '', l: tp.sessions },
          { v: String(Math.round(tot.km)), u: 'km', l: tp.distance },
          { v: (tot.min / 60).toFixed(1), u: 'h', l: tp.time },
        ].map((s) => (
          <div key={s.l} className="card px-4 py-3">
            <b className="block font-display text-4xl font-extrabold leading-none tabular-nums">{s.v}<small className="ml-0.5 text-base font-semibold text-muted-foreground">{s.u}</small></b>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</span>
          </div>
        ))}
      </div>
      <section className="card">
        <h2 className="section-title">{tp.perWeek} <span className="eyebrow">{tp.sixWeeks}</span></h2>
        <div className="grid h-[150px] grid-cols-6 items-end gap-3">
          {weeks.map((w, i) => (
            <div key={i} className="flex h-full flex-col items-center justify-end gap-1.5">
              <b className="font-display tabular-nums">{w.min}</b>
              <i className={`min-h-1 w-full max-w-9 rounded-t-md rounded-b-sm ${i === 5 ? 'bg-accent-ink' : 'bg-cardio'}`} style={{ height: `${w.min ? Math.max(4, (w.min / max) * 100) : 2}%` }} />
              <span className="text-xs font-semibold text-muted-foreground">{i === 5 ? tp.thisWeek : fmtDate(iso(w.s), t.dateLocale)}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
