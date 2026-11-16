/* Training plans: types, lookups and progress maths. The catalog itself is in plan-catalog.ts.
 * Pure functions only, like fitness.ts. */

import type { Locale } from './i18n';
import type { AppState } from './fitness';
import { PLANS } from './plan-catalog';

export type L10n = Record<Locale, string>;

export type PlanCategory = 'beginner' | 'glutes' | 'women' | 'full-body' | 'home' | 'upper-lower' | 'ppl' | 'strength';
export const PLAN_CATEGORIES: PlanCategory[] = ['beginner', 'glutes', 'women', 'full-body', 'home', 'upper-lower', 'ppl', 'strength'];

export type PlanLevel = 'beginner' | 'intermediate';
export type PlanGoal = 'strength' | 'muscle' | 'glutes' | 'fitness';
export type PlanEquipment = 'gym' | 'dumbbells' | 'bodyweight';

export interface PlanExercise {
  name: string;
  sets: number;
  /** Target per set: "8-12", "5", seconds for timed holds ("30-45s"), optionally per side ("8-12/leg", "20-30s/side"). */
  reps: string;
}
export interface PlanWorkout {
  key: string;
  name: L10n;
  exercises: PlanExercise[];
}
export interface Plan {
  id: string;
  name: L10n;
  summary: L10n;
  categories: PlanCategory[];
  level: PlanLevel;
  goal: PlanGoal;
  equipment: PlanEquipment;
  weeks: number;
  /** Training days per week. */
  days: number;
  /** Workout keys in the order they come round, e.g. ['A', 'B'] alternates A/B/A then B/A/B over 3 days. */
  rotation: string[];
  workouts: PlanWorkout[];
  progression: L10n;
}

/** What the user is following, stored with their account (user_state.plan). */
export interface PlanProgress {
  id: string;
  /** YYYY-MM-DD */
  started: string;
  /** Plan workouts finished so far. */
  done: number;
}

export const planById = (id: string): Plan | undefined => PLANS.find((p) => p.id === id);
export const daysPerWeek = (p: Plan) => p.days;
export const totalWorkouts = (p: Plan) => p.days * p.weeks;

/** Workout keys for each training day of a given week (1-based). */
export const weekLayout = (p: Plan, week: number) =>
  Array.from({ length: p.days }, (_, d) => p.rotation[((week - 1) * p.days + d) % p.rotation.length]);

/** Saved workouts point at their plan workout as "planId/workoutKey". */
export const planRef = (p: Plan, w: PlanWorkout) => `${p.id}/${w.key}`;
export function findPlanWorkout(ref: string | null | undefined): { plan: Plan; workout: PlanWorkout } | null {
  if (!ref) return null;
  const [id, key] = ref.split('/');
  const plan = planById(id), workout = plan?.workouts.find((w) => w.key === key);
  return plan && workout ? { plan, workout } : null;
}

/** Where the user is in their plan, or null when not following one. */
export function planStatus(state: AppState) {
  const prog = state.plan;
  const plan = prog ? planById(prog.id) : undefined;
  if (!prog || !plan) return null;
  const perWeek = daysPerWeek(plan), total = totalWorkouts(plan);
  const done = Math.min(prog.done, total);
  const finished = done >= total;
  const next = finished ? null : plan.workouts.find((w) => w.key === plan.rotation[done % plan.rotation.length]) ?? null;
  return {
    plan, progress: prog, done, total, finished, next,
    week: Math.min(plan.weeks, Math.floor(done / perWeek) + 1),
    dayOfWeek: (done % perWeek) + 1,
  };
}

/** Lowest number in a target like "8-12" or "30-45s", used to pre-fill reps. */
export const targetLow = (reps: string) => parseInt(reps, 10) || 0;
export const isTimed = (reps: string) => /\ds\b/.test(reps);
