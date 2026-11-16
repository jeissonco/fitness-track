/* Domain model, templates, date helpers and derived stats.
 * Pure functions only — no React, no storage — so they can move to the server later. */

export interface SetEntry { kg: number; reps: number }
export interface LoggedExercise { name: string; sets: SetEntry[] }
export interface Workout {
  id: string;
  date: string; // YYYY-MM-DD (local)
  template: TemplateKey | null;
  name: string;
  durationMin: number;
  exercises: LoggedExercise[];
}
export type CardioKind = 'Run' | 'Bike' | 'Row' | 'Walk' | 'Swim' | 'Other';
export interface CardioSession {
  id: string;
  date: string;
  kind: CardioKind;
  min: number;
  km: number | null;
  hr: number | null;
  rpe: number;
}
/** Sets in an in-progress workout keep raw input strings so half-typed values ("72.") survive. */
export interface ActiveSet { kg: string; reps: string; done: boolean; pr: boolean }
export interface ActiveExercise { name: string; sets: ActiveSet[] }
export interface ActiveWorkout {
  template: TemplateKey | null;
  name: string;
  start: number;
  exercises: ActiveExercise[];
  rest: { end: number; total: number } | null;
}
export interface AppState {
  workouts: Workout[];
  cardio: CardioSession[];
  active: ActiveWorkout | null;
  rotation: number;
  /** True while the account still holds generated sample history. */
  demo?: boolean;
}

/* ---------------- Templates & library ---------------- */
type TemplateExercise = [name: string, baseKg: number, reps: number, weeklyIncKg: number];
export const TEMPLATES = {
  push: { name: 'Push day', ex: [['Bench Press', 80, 5, 1.25], ['Overhead Press', 47.5, 5, 0.5], ['Incline DB Press', 26, 10, 0.25], ['Triceps Pushdown', 30, 12, 0.25]] as TemplateExercise[] },
  pull: { name: 'Pull day', ex: [['Deadlift', 140, 5, 2.5], ['Barbell Row', 70, 8, 1], ['Lat Pulldown', 60, 10, 0.5], ['Biceps Curl', 14, 12, 0.2]] as TemplateExercise[] },
  legs: { name: 'Leg day', ex: [['Back Squat', 110, 5, 2], ['Romanian Deadlift', 90, 8, 1], ['Leg Press', 180, 10, 2.5], ['Calf Raise', 80, 12, 1]] as TemplateExercise[] },
};
export type TemplateKey = keyof typeof TEMPLATES;
export const ORDER: TemplateKey[] = ['push', 'pull', 'legs'];
const EXTRA = ['Pull-up', 'Front Squat', 'Hip Thrust', 'Lateral Raise', 'Face Pull', 'Dumbbell Lunge', 'Chest Fly', 'Hammer Curl'];
export const LIBRARY = [...new Set([...ORDER.flatMap((k) => TEMPLATES[k].ex.map((e) => e[0])), ...EXTRA])].sort();
const COMPOUND = new Set(['Bench Press', 'Overhead Press', 'Deadlift', 'Barbell Row', 'Back Squat', 'Romanian Deadlift', 'Front Squat', 'Hip Thrust', 'Pull-up']);
export const restSecondsFor = (name: string) => (COMPOUND.has(name) ? 150 : 90);
export const CARDIO_KINDS: CardioKind[] = ['Run', 'Bike', 'Row', 'Walk', 'Swim', 'Other'];

/* ---------------- Dates & formatting ---------------- */
export const pad = (n: number) => String(n).padStart(2, '0');
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseIso = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const fmtDate = (s: string) => parseIso(s).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
export const weekStart = (d: Date) => {
  const x = startOfDay(d);
  return addDays(x, -((x.getDay() + 6) % 7));
};
export const isoWeek = (d: Date) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const n = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - n);
  const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((+t - +y) / 864e5 + 1) / 7);
};
export const kgFmt = (x: number) => (Math.round(x * 10) / 10).toString();
const r05 = (x: number) => Math.round(x * 2) / 2;

/** Epley estimated one-rep max. */
export const e1rm = (kg: number, reps: number) => (kg > 0 && reps > 0 ? (reps === 1 ? kg : kg * (1 + reps / 30)) : 0);

/* ---------------- Sample data ---------------- */
function rng(seed: number) {
  return () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
}
export function seedData(): AppState {
  const r = rng(46);
  const workouts: Workout[] = [];
  const cardio: CardioSession[] = [];
  const today = startOfDay(new Date());
  let n = 0;
  for (let ago = 42; ago >= 1; ago--) {
    const d = addDays(today, -ago), dow = d.getDay(), wk = Math.floor((42 - ago) / 7);
    if ([1, 3, 5].includes(dow)) {
      const key = ORDER[n++ % 3], t = TEMPLATES[key];
      workouts.push({
        id: 'w' + ago, date: iso(d), template: key, name: t.name, durationMin: 50 + Math.round(r() * 20),
        exercises: t.ex.map(([name, base, reps, inc]) => {
          const kg = r05(base + inc * wk);
          return { name, sets: [0, 1, 2].map((i) => ({ kg, reps: i === 2 && r() < 0.35 ? reps - 1 : reps })) };
        }),
      });
    } else if (dow === 2 || dow === 6) {
      const run = dow === 2, min = run ? 24 + Math.round(r() * 10) : 40 + Math.round(r() * 15);
      cardio.push({
        id: 'c' + ago, date: iso(d), kind: run ? 'Run' : 'Bike', min,
        km: run ? +(min / 5.6 + r() * 0.4).toFixed(1) : +(min * 0.42).toFixed(1),
        hr: 140 + Math.round(r() * 18), rpe: 5 + Math.round(r() * 2),
      });
    }
  }
  return { workouts, cardio, active: null, rotation: n, demo: true };
}
export const emptyState = (): AppState => ({ workouts: [], cardio: [], active: null, rotation: 0, demo: false });

/* ---------------- Derived ---------------- */
export function topSet(sets: { kg: number; reps: number }[]) {
  let best = 0, top: SetEntry | null = null;
  for (const s of sets) {
    const v = e1rm(+s.kg, +s.reps);
    if (v > best) { best = v; top = s; }
  }
  return { best, top };
}
export function exHistory(state: AppState, name: string) {
  return state.workouts.flatMap((w) => {
    const ex = w.exercises.find((e) => e.name === name);
    if (!ex) return [];
    const t = topSet(ex.sets);
    return t.best && t.top ? [{ date: w.date, best: t.best, top: t.top }] : [];
  });
}
export const bestE1rm = (state: AppState, name: string) => Math.max(0, ...exHistory(state, name).map((h) => h.best));
export function lastSets(state: AppState, name: string): SetEntry[] | null {
  for (let i = state.workouts.length - 1; i >= 0; i--) {
    const ex = state.workouts[i].exercises.find((e) => e.name === name);
    if (ex) return ex.sets;
  }
  return null;
}
export const volume = (w: Workout) => w.exercises.reduce((a, ex) => a + ex.sets.reduce((b, s) => b + s.kg * s.reps, 0), 0);
export function recentPRs(state: AppState, limit = 3) {
  const best: Record<string, number> = {};
  const prs: { date: string; name: string; kg: number; reps: number; e: number; gain: number }[] = [];
  for (const w of state.workouts)
    for (const ex of w.exercises) {
      const t = topSet(ex.sets), prev = best[ex.name];
      if (prev && t.top && t.best > prev + 0.01) prs.push({ date: w.date, name: ex.name, kg: t.top.kg, reps: t.top.reps, e: t.best, gain: t.best - prev });
      if (t.best > (prev || 0)) best[ex.name] = t.best;
    }
  return prs.slice(-limit).reverse();
}
/** Consecutive past weeks (not counting this one) with 3+ workouts. */
export function weekStreak(state: AppState) {
  let s = 0, ws = addDays(weekStart(new Date()), -7);
  for (;;) {
    const a = iso(ws), b = iso(addDays(ws, 7));
    if (state.workouts.filter((w) => w.date >= a && w.date < b).length >= 3) { s++; ws = addDays(ws, -7); }
    else return s;
  }
}
export const nextTemplate = (state: AppState): TemplateKey => ORDER[(state.rotation || 0) % ORDER.length];

export function newActiveExercise(state: AppState, name: string): ActiveExercise {
  const prev = lastSets(state, name);
  const base = prev ?? [{ kg: '', reps: '' }, { kg: '', reps: '' }, { kg: '', reps: '' }];
  return { name, sets: base.map((s) => ({ kg: String(s.kg), reps: String(s.reps), done: false, pr: false })) };
}
