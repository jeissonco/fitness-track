'use client';

import { type TemplateKey, ORDER, TEMPLATES, iso, newActiveExercise, newPlanExercise, volume, type Workout } from './fitness';
import { getState, update } from './store';
import { t } from './i18n';
import { type Plan, type PlanWorkout, planRef, planStatus } from './plans';

/** Start a session from a template (or an empty one). Returns false if the user kept their current workout. */
export function startSession(key: TemplateKey | null): boolean {
  if (getState().active && !confirm(t().train.replaceConfirm)) return false;
  update((s) => {
    const t = key ? TEMPLATES[key] : null;
    s.active = {
      template: key,
      name: t ? t.name : 'Session',
      start: null,
      exercises: t ? t.ex.map((e) => newActiveExercise(s, e[0])) : [],
      rest: null,
    };
  });
  return true;
}

/** Start one of a plan's workouts. Returns false if the user kept their current workout. */
export function startPlanWorkout(plan: Plan, workout: PlanWorkout): boolean {
  if (getState().active && !confirm(t().train.replaceConfirm)) return false;
  update((s) => {
    s.active = {
      template: null,
      plan: planRef(plan, workout),
      name: workout.name.en,
      start: null,
      exercises: workout.exercises.map((e) => newPlanExercise(s, e.name, e.sets, e.reps)),
      rest: null,
    };
  });
  return true;
}

/** Follow a plan from its first workout (replaces any plan in progress). */
export function followPlan(plan: Plan) {
  update((s) => { s.plan = { id: plan.id, started: iso(new Date()), done: 0 }; });
}

export function stopPlan() {
  update((s) => { s.plan = null; });
}

/** Save ticked sets as a workout. Returns a summary for the toast, or null if nothing was ticked. */
export function finishSession(): { tonnes: number; prs: number } | null {
  const a = getState().active;
  if (!a) return null;
  const exercises = a.exercises
    .map((ex) => ({ name: ex.name, sets: ex.sets.filter((s) => s.done).map((s) => ({ kg: parseFloat(s.kg), reps: parseInt(s.reps, 10) })) }))
    .filter((ex) => ex.sets.length);
  if (!exercises.length) return null;
  const w: Workout = {
    id: 'w' + Date.now(),
    date: iso(new Date()),
    template: a.template,
    name: a.name,
    durationMin: a.start ? Math.round((Date.now() - a.start) / 60000) : 0,
    exercises,
    plan: a.plan ?? null,
  };
  const prs = a.exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.pr).length, 0);
  update((s) => {
    s.workouts.push(w);
    if (a.template && ORDER.includes(a.template)) s.rotation = (s.rotation || 0) + 1;
    // A workout from the followed plan moves it on, even if it wasn't the one suggested.
    const st = planStatus(s);
    if (a.plan && st && !st.finished && a.plan.startsWith(st.plan.id + '/')) s.plan!.done += 1;
    s.active = null;
  });
  return { tonnes: volume(w) / 1000, prs };
}
