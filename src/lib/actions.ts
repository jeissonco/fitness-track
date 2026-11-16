'use client';

import { type TemplateKey, TEMPLATES, iso, newActiveExercise, volume, type Workout } from './fitness';
import { getState, update } from './store';

/** Start a session from a template (or an empty one). Returns false if the user kept their current workout. */
export function startSession(key: TemplateKey | null): boolean {
  if (getState().active && !confirm('A workout is already in progress. Discard it and start a new one?')) return false;
  update((s) => {
    const t = key ? TEMPLATES[key] : null;
    s.active = {
      template: key,
      name: t ? t.name : 'Session',
      start: Date.now(),
      exercises: t ? t.ex.map((e) => newActiveExercise(s, e[0])) : [],
      rest: null,
    };
  });
  return true;
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
    durationMin: Math.round((Date.now() - a.start) / 60000),
    exercises,
  };
  const prs = a.exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.pr).length, 0);
  update((s) => {
    s.workouts.push(w);
    if (a.template) s.rotation = (s.rotation || 0) + 1;
    s.active = null;
  });
  return { tonnes: volume(w) / 1000, prs };
}
