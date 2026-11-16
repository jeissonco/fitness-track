/* The plan catalog. Original plans built on published training guidance:
 * - beginners: every major muscle at least 2×/week, ~6–10 hard sets per muscle per week,
 *   double progression, 6–12 week blocks (ACSM 2009 & 2026 position stands; Schoenfeld 2016, 2017)
 * - glutes: mix hip-thrust/bridge, squat/lunge/hinge and abduction work, 2–3×/week
 *   (Plotkin 2023; Contreras 2015; NSCA glute programming), always with whole-body work.
 * Names and exact layouts are our own; no branded program is reproduced. */

import type { Plan, PlanExercise, PlanWorkout } from './plans';

const x = (name: string, sets: number, reps: string): PlanExercise => ({ name, sets, reps });
const w = (key: string, en: string, es: string, exercises: PlanExercise[]): PlanWorkout => ({ key, name: { en, es }, exercises });

/* Shared progression text; plans add their own notes after it. */
const DP = {
  en: 'Double progression: keep the weight until every set reaches the top of the rep range, then add the smallest step (1–2.5 kg) and start again at the bottom. End each set with 1–2 reps left (2–3 in the first two weeks). Rest 2–3 min on big lifts and 60–90 s on the rest.',
  es: 'Progresión doble: mantén el peso hasta que todas las series lleguen al máximo del rango de repeticiones; entonces sube el mínimo posible (1–2,5 kg) y vuelve al mínimo del rango. Termina cada serie dejando 1–2 repeticiones en reserva (2–3 las dos primeras semanas). Descansa 2–3 min en los ejercicios grandes y 60–90 s en el resto.',
};
const HOME = {
  en: ' When your dumbbells get too light: slow the lowering to 3 seconds, then add a 2-second pause, then switch to single-leg or single-arm versions.',
  es: ' Cuando tus mancuernas se queden cortas: baja en 3 segundos, después añade una pausa de 2 segundos y luego pasa a versiones a una pierna o un brazo.',
};
const deload = (weeks: string, wEs: string) => ({
  en: ` Deload in week ${weeks}: half the sets, same weights.`,
  es: ` Semana de descarga en la ${wEs}: la mitad de series, mismos pesos.`,
});
const prog = (...parts: { en: string; es: string }[]) => ({ en: parts.map((p) => p.en).join(''), es: parts.map((p) => p.es).join('') });
const note = (en: string, es: string) => ({ en: ' ' + en, es: ' ' + es });

export const PLANS: Plan[] = [
  /* ---------------- Beginner & full body ---------------- */
  {
    id: 'first-steps',
    name: { en: 'First Steps Full Body', es: 'Primeros pasos: cuerpo completo' },
    summary: {
      en: 'A gentle, machine-friendly first plan that teaches every basic movement pattern.',
      es: 'Un primer plan suave, con muchas máquinas, para aprender todos los movimientos básicos.',
    },
    categories: ['beginner', 'full-body'], level: 'beginner', goal: 'fitness', equipment: 'gym',
    weeks: 8, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Full body A', 'Cuerpo completo A', [
        x('Goblet Squat', 3, '8-12'), x('Dumbbell Bench Press', 3, '8-12'), x('Lat Pulldown', 3, '8-12'),
        x('Dumbbell Romanian Deadlift', 2, '10-12'), x('Lateral Raise', 2, '12-15'), x('Plank', 3, '20-40s'),
      ]),
      w('B', 'Full body B', 'Cuerpo completo B', [
        x('Leg Press', 3, '10-12'), x('Seated Cable Row', 3, '8-12'), x('Dumbbell Shoulder Press', 3, '8-12'),
        x('Hip Thrust', 2, '10-12'), x('Leg Curl', 2, '10-15'), x('Biceps Curl', 2, '10-12'), x('Triceps Pushdown', 2, '10-12'),
      ]),
    ],
    progression: prog(DP, note('Plank: add 5 seconds each week.', 'Plancha: suma 5 segundos cada semana.')),
  },
  {
    id: 'two-day-total-body',
    name: { en: 'Two-Day Total Body', es: 'Cuerpo completo en dos días' },
    summary: {
      en: 'The minimum effective dose for busy weeks: two sessions that still train every muscle twice.',
      es: 'La dosis mínima eficaz para semanas ocupadas: dos sesiones que trabajan cada músculo dos veces.',
    },
    categories: ['beginner', 'full-body'], level: 'beginner', goal: 'fitness', equipment: 'gym',
    weeks: 8, days: 2, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Total body A', 'Cuerpo completo A', [
        x('Leg Press', 3, '10-12'), x('Hip Thrust', 3, '8-12'), x('Dumbbell Bench Press', 3, '8-12'),
        x('Lat Pulldown', 3, '8-12'), x('Lateral Raise', 2, '12-15'), x('Cable Crunch', 2, '12-15'),
      ]),
      w('B', 'Total body B', 'Cuerpo completo B', [
        x('Goblet Squat', 3, '8-12'), x('Romanian Deadlift', 3, '8-10'), x('Seated Cable Row', 3, '8-12'),
        x('Dumbbell Shoulder Press', 3, '8-12'), x('Biceps Curl', 2, '10-12'), x('Triceps Pushdown', 2, '10-12'),
      ]),
    ],
    progression: prog(DP),
  },
  {
    id: 'full-body-abc',
    name: { en: 'Full Body Builder ABC', es: 'Cuerpo completo ABC' },
    summary: {
      en: 'Three different full-body days for more variety, giving each muscle about 8–10 sets a week.',
      es: 'Tres días distintos de cuerpo completo para más variedad, con unas 8–10 series por músculo a la semana.',
    },
    categories: ['beginner', 'full-body'], level: 'beginner', goal: 'muscle', equipment: 'gym',
    weeks: 10, days: 3, rotation: ['A', 'B', 'C'],
    workouts: [
      w('A', 'Day A · Squat & bench', 'Día A · Sentadilla y banca', [
        x('Back Squat', 3, '6-10'), x('Bench Press', 3, '6-10'), x('Lat Pulldown', 3, '8-12'),
        x('Leg Curl', 2, '10-15'), x('Lateral Raise', 2, '12-15'), x('Triceps Pushdown', 2, '10-15'),
      ]),
      w('B', 'Day B · Hinge & press', 'Día B · Bisagra y press', [
        x('Romanian Deadlift', 3, '6-10'), x('Overhead Press', 3, '6-10'), x('Seated Cable Row', 3, '8-12'),
        x('Leg Press', 2, '10-15'), x('Face Pull', 2, '12-15'), x('Biceps Curl', 2, '10-15'),
      ]),
      w('C', 'Day C · Glutes & dumbbells', 'Día C · Glúteos y mancuernas', [
        x('Hip Thrust', 3, '8-12'), x('Incline DB Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'),
        x('Dumbbell Reverse Lunge', 2, '10-12/leg'), x('Hammer Curl', 2, '10-12'), x('Hanging Leg Raise', 2, '8-12'),
      ]),
    ],
    progression: prog(DP, deload('6', 'semana 6')),
  },
  {
    id: 'barbell-basics',
    name: { en: 'Barbell Basics Strength', es: 'Fuerza básica con barra' },
    summary: {
      en: 'Learn and load the big barbell lifts with simple session-to-session progression.',
      es: 'Aprende y carga los grandes levantamientos con barra con una progresión sencilla sesión a sesión.',
    },
    categories: ['beginner', 'strength', 'full-body'], level: 'beginner', goal: 'strength', equipment: 'gym',
    weeks: 12, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Squat · Bench · Row', 'Sentadilla · Banca · Remo', [
        x('Back Squat', 3, '5'), x('Bench Press', 3, '5'), x('Barbell Row', 3, '5'), x('Face Pull', 2, '12-15'),
      ]),
      w('B', 'Squat · Press · Deadlift', 'Sentadilla · Press · Peso muerto', [
        x('Back Squat', 3, '5'), x('Overhead Press', 3, '5'), x('Deadlift', 2, '5'), x('Lat Pulldown', 3, '8-10'),
      ]),
    ],
    progression: {
      en: 'Linear progression: when you complete all reps, add 2.5 kg to squat and deadlift and 1–1.25 kg to bench, press and row next session. Miss reps two sessions in a row? Drop that lift 10% and build back up. Accessories use double progression. Rest 3 min between heavy sets. Deload in week 7: half the sets, same weights.',
      es: 'Progresión lineal: si completas todas las repeticiones, suma 2,5 kg en sentadilla y peso muerto y 1–1,25 kg en banca, press y remo la siguiente sesión. ¿Fallas dos sesiones seguidas? Baja ese ejercicio un 10 % y vuelve a subir. Los accesorios usan progresión doble. Descansa 3 min entre series pesadas. Semana de descarga en la semana 7: la mitad de series, mismos pesos.',
    },
  },
  {
    id: 'upper-lower-starter',
    name: { en: 'Upper/Lower Starter', es: 'Torso/pierna para empezar' },
    summary: {
      en: 'A classic 4-day split for beginners ready to train more often, every muscle twice a week.',
      es: 'La clásica rutina de 4 días para principiantes que quieren entrenar más, cada músculo dos veces por semana.',
    },
    categories: ['beginner', 'upper-lower'], level: 'beginner', goal: 'muscle', equipment: 'gym',
    weeks: 10, days: 4, rotation: ['UA', 'LA', 'UB', 'LB'],
    workouts: [
      w('UA', 'Upper A', 'Torso A', [
        x('Bench Press', 3, '6-10'), x('Lat Pulldown', 3, '8-12'), x('Dumbbell Shoulder Press', 2, '8-12'),
        x('Seated Cable Row', 2, '10-12'), x('Triceps Pushdown', 2, '10-15'), x('Biceps Curl', 2, '10-15'),
      ]),
      w('LA', 'Lower A', 'Pierna A', [
        x('Back Squat', 3, '6-10'), x('Romanian Deadlift', 3, '8-10'), x('Leg Curl', 2, '10-15'),
        x('Calf Raise', 3, '10-15'), x('Plank', 2, '30-45s'),
      ]),
      w('UB', 'Upper B', 'Torso B', [
        x('Incline DB Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'), x('Overhead Press', 2, '6-10'),
        x('Lat Pulldown', 2, '10-12'), x('Lateral Raise', 2, '12-20'), x('Hammer Curl', 2, '10-12'),
      ]),
      w('LB', 'Lower B', 'Pierna B', [
        x('Leg Press', 3, '10-15'), x('Hip Thrust', 3, '8-12'), x('Dumbbell Reverse Lunge', 2, '10-12/leg'),
        x('Leg Extension', 2, '12-15'), x('Cable Crunch', 2, '12-15'),
      ]),
    ],
    progression: prog(DP, deload('6', 'semana 6')),
  },
  {
    id: 'ppl-starter',
    name: { en: 'Push Pull Legs Starter', es: 'Empuje, tirón, pierna para empezar' },
    summary: {
      en: 'Meet the push/pull/legs format with one of each day per week. Move on to the 6-day version later.',
      es: 'Conoce el formato empuje/tirón/pierna con un día de cada por semana. Más adelante, pasa a la versión de 6 días.',
    },
    categories: ['beginner', 'ppl'], level: 'beginner', goal: 'muscle', equipment: 'gym',
    weeks: 8, days: 3, rotation: ['PU', 'PL', 'LG'],
    workouts: [
      w('PU', 'Push', 'Empuje', [
        x('Dumbbell Bench Press', 3, '8-12'), x('Dumbbell Shoulder Press', 3, '8-12'), x('Incline DB Press', 2, '10-12'),
        x('Lateral Raise', 3, '12-15'), x('Triceps Pushdown', 2, '10-15'),
      ]),
      w('PL', 'Pull', 'Tirón', [
        x('Lat Pulldown', 3, '8-12'), x('Seated Cable Row', 3, '8-12'), x('Face Pull', 2, '12-15'),
        x('Biceps Curl', 2, '10-12'), x('Hammer Curl', 2, '10-12'),
      ]),
      w('LG', 'Legs', 'Pierna', [
        x('Goblet Squat', 3, '8-12'), x('Romanian Deadlift', 3, '8-10'), x('Leg Press', 2, '10-15'),
        x('Leg Curl', 2, '10-15'), x('Calf Raise', 2, '10-15'), x('Plank', 2, '30s'),
      ]),
    ],
    progression: prog(DP),
  },

  /* ---------------- Glutes & legs, for women ---------------- */
  {
    id: 'glute-starter',
    name: { en: 'Glute Starter', es: 'Glúteos: primer plan' },
    summary: {
      en: 'A first glute-focused plan: about 12 glute sets a week, with upper-body work every session.',
      es: 'Un primer plan centrado en glúteos: unas 12 series de glúteo por semana, con torso en cada sesión.',
    },
    categories: ['glutes', 'women', 'beginner'], level: 'beginner', goal: 'glutes', equipment: 'gym',
    weeks: 8, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Thrust & squat', 'Hip thrust y sentadilla', [
        x('Hip Thrust', 3, '8-12'), x('Goblet Squat', 3, '8-12'), x('Leg Curl', 2, '10-15'),
        x('Dumbbell Bench Press', 3, '8-12'), x('Lat Pulldown', 3, '8-12'), x('Plank', 2, '20-40s'),
      ]),
      w('B', 'Hinge & lunge', 'Bisagra y zancada', [
        x('Romanian Deadlift', 3, '8-10'), x('Dumbbell Reverse Lunge', 3, '8-12/leg'), x('Hip Abduction', 2, '12-20'),
        x('Seated Cable Row', 3, '8-12'), x('Dumbbell Shoulder Press', 2, '8-12'), x('Cable Crunch', 2, '12-15'),
      ]),
    ],
    progression: prog(DP, note('Pause for 1 second at the top of every hip thrust.', 'Haz una pausa de 1 segundo arriba en cada hip thrust.')),
  },
  {
    id: 'two-day-glute-tone',
    name: { en: 'Two-Day Glute & Tone', es: 'Glúteos y tono en dos días' },
    summary: {
      en: 'Two efficient gym sessions: glutes and legs first, then upper body to finish.',
      es: 'Dos sesiones eficientes: primero glúteos y piernas, y para terminar, torso.',
    },
    categories: ['glutes', 'women', 'beginner'], level: 'beginner', goal: 'fitness', equipment: 'gym',
    weeks: 8, days: 2, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Glutes & back', 'Glúteos y espalda', [
        x('Hip Thrust', 3, '8-12'), x('Leg Press', 3, '10-15'), x('Hip Abduction', 2, '15-20'),
        x('Lat Pulldown', 3, '8-12'), x('Dumbbell Shoulder Press', 2, '10-12'), x('Plank', 2, '30s'),
      ]),
      w('B', 'Legs & chest', 'Piernas y pecho', [
        x('Dumbbell Romanian Deadlift', 3, '8-12'), x('Dumbbell Step-up', 3, '8-12/leg'), x('Cable Kickback', 2, '12-15/leg'),
        x('Dumbbell Bench Press', 3, '8-12'), x('Seated Cable Row', 3, '10-12'), x('Side Plank', 2, '20-30s/side'),
      ]),
    ],
    progression: prog(DP),
  },
  {
    id: 'lower-focus-full-body',
    name: { en: 'Lower-Focus Full Body', es: 'Cuerpo completo con foco en pierna' },
    summary: {
      en: 'Three full-body days that rotate the glute patterns: thrust, then squat and hinge, then single-leg.',
      es: 'Tres días de cuerpo completo que rotan los patrones de glúteo: empuje de cadera, sentadilla y bisagra, y trabajo a una pierna.',
    },
    categories: ['glutes', 'women', 'full-body'], level: 'beginner', goal: 'glutes', equipment: 'gym',
    weeks: 10, days: 3, rotation: ['A', 'B', 'C'],
    workouts: [
      w('A', 'Thrust day', 'Día de hip thrust', [
        x('Hip Thrust', 4, '8-12'), x('Leg Press', 3, '10-15'), x('Leg Curl', 2, '10-15'),
        x('Lat Pulldown', 3, '8-12'), x('Push-up', 2, '5-15'), x('Lateral Raise', 2, '12-15'),
      ]),
      w('B', 'Squat & hinge day', 'Día de sentadilla y bisagra', [
        x('Back Squat', 3, '6-10'), x('Dumbbell Romanian Deadlift', 3, '8-12'), x('Hip Abduction', 2, '15-20'),
        x('Dumbbell Shoulder Press', 3, '8-12'), x('Seated Cable Row', 3, '8-12'),
      ]),
      w('C', 'Single-leg day', 'Día a una pierna', [
        x('Dumbbell Split Squat', 3, '8-12/leg'), x('Back Extension', 3, '10-15'), x('Cable Kickback', 2, '12-15/leg'),
        x('Incline DB Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'), x('Plank', 2, '30-45s'),
      ]),
    ],
    progression: prog(DP, note('Push-ups: start on a bench or box if needed and lower it over time. Back squat can be swapped for goblet squat.', 'Flexiones: empieza apoyando las manos en un banco si lo necesitas y bájalo con el tiempo. Puedes cambiar la sentadilla trasera por sentadilla goblet.'), deload('6', 'semana 6')),
  },
  {
    id: 'glutes-legs-4-day',
    name: { en: 'Glutes & Legs 4-Day', es: 'Glúteos y piernas en 4 días' },
    summary: {
      en: 'Two lower days (glutes and hamstrings, then quads and glutes) plus two full upper days.',
      es: 'Dos días de pierna (glúteo e isquios, luego cuádriceps y glúteo) y dos días completos de torso.',
    },
    categories: ['glutes', 'women', 'upper-lower'], level: 'beginner', goal: 'glutes', equipment: 'gym',
    weeks: 10, days: 4, rotation: ['LG', 'UA', 'LQ', 'UB'],
    workouts: [
      w('LG', 'Lower · Glutes & hamstrings', 'Pierna · Glúteo e isquios', [
        x('Hip Thrust', 4, '8-12'), x('Romanian Deadlift', 3, '8-10'), x('Leg Curl', 3, '10-15'), x('Hip Abduction', 3, '12-20'),
      ]),
      w('UA', 'Upper A', 'Torso A', [
        x('Dumbbell Bench Press', 3, '8-12'), x('Lat Pulldown', 3, '8-12'), x('Dumbbell Shoulder Press', 2, '8-12'),
        x('Seated Cable Row', 2, '10-12'), x('Triceps Pushdown', 2, '10-15'), x('Plank', 2, '30-45s'),
      ]),
      w('LQ', 'Lower · Quads & glutes', 'Pierna · Cuádriceps y glúteo', [
        x('Leg Press', 3, '10-15'), x('Dumbbell Split Squat', 3, '8-12/leg'), x('Leg Extension', 2, '12-15'),
        x('Glute Bridge', 3, '12-20'), x('Calf Raise', 2, '10-15'),
      ]),
      w('UB', 'Upper B + glute finisher', 'Torso B + glúteo', [
        x('Incline DB Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'), x('Lateral Raise', 3, '12-15'),
        x('Face Pull', 2, '12-15'), x('Biceps Curl', 2, '10-12'), x('Cable Kickback', 2, '12-15/leg'),
      ]),
    ],
    progression: prog(DP, deload('6', 'semana 6')),
  },
  {
    id: 'strong-start-women',
    name: { en: 'Strong Start for Women', es: 'Fuerza desde cero para mujeres' },
    summary: {
      en: 'Barbell basics plus hip thrusts and abduction, so new lifters build real strength and glute shape.',
      es: 'Lo básico con barra más hip thrust y abducción, para ganar fuerza de verdad y forma en los glúteos desde el principio.',
    },
    categories: ['women', 'beginner', 'strength', 'full-body', 'glutes'], level: 'beginner', goal: 'strength', equipment: 'gym',
    weeks: 12, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Squat & bench', 'Sentadilla y banca', [
        x('Back Squat', 3, '5-8'), x('Bench Press', 3, '5-8'), x('Lat Pulldown', 3, '8-12'), x('Hip Thrust', 3, '8-12'), x('Plank', 2, '30-45s'),
      ]),
      w('B', 'Deadlift & press', 'Peso muerto y press', [
        x('Deadlift', 2, '5'), x('Overhead Press', 3, '5-8'), x('Seated Cable Row', 3, '8-12'),
        x('Dumbbell Reverse Lunge', 2, '8-12/leg'), x('Hip Abduction', 2, '15-20'),
      ]),
    ],
    progression: prog(DP, note('Barbell lifts: once you reach the top of the range, add 2.5 kg to squat and deadlift and 1–1.25 kg to bench and press. New to deadlifts? Use Romanian deadlifts 3×6-8 for the first weeks.', 'Ejercicios con barra: al llegar al máximo del rango, suma 2,5 kg en sentadilla y peso muerto y 1–1,25 kg en banca y press. ¿Nueva en el peso muerto? Usa peso muerto rumano 3×6-8 las primeras semanas.'), deload('7', 'semana 7')),
  },
  {
    id: 'total-body-tone',
    name: { en: 'Total Body Tone', es: 'Tono de cuerpo completo' },
    summary: {
      en: 'Moderate-to-high reps with short rests, paired lower and upper moves. Combine with two cardio days.',
      es: 'Repeticiones moderadas y altas con descansos cortos, alternando pierna y torso. Combínalo con dos días de cardio.',
    },
    categories: ['women', 'beginner', 'full-body'], level: 'beginner', goal: 'fitness', equipment: 'gym',
    weeks: 8, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Tone A', 'Tono A', [
        x('Leg Press', 3, '12-15'), x('Lat Pulldown', 3, '10-15'), x('Hip Thrust', 3, '12-15'),
        x('Dumbbell Shoulder Press', 2, '10-15'), x('Leg Curl', 2, '12-15'), x('Cable Crunch', 2, '12-15'),
      ]),
      w('B', 'Tone B', 'Tono B', [
        x('Goblet Squat', 3, '10-15'), x('Dumbbell Bench Press', 3, '10-15'), x('Dumbbell Romanian Deadlift', 3, '10-15'),
        x('Seated Cable Row', 3, '10-15'), x('Lateral Raise', 2, '12-20'), x('Plank', 2, '30-45s'),
      ]),
    ],
    progression: prog(DP, note('Rest 45–75 s, alternating a lower and an upper exercise. After week 4, cut each rest by 15 s.', 'Descansa 45–75 s alternando un ejercicio de pierna y uno de torso. A partir de la semana 4, recorta 15 s cada descanso.')),
  },
  {
    id: 'glute-priority-5-day',
    name: { en: 'Glute Priority 5-Day', es: 'Prioridad glúteos en 5 días' },
    summary: {
      en: 'High-frequency glute training: a heavy day, a legs day and a pump day, plus two upper days. About 20 glute sets a week.',
      es: 'Glúteos con alta frecuencia: un día pesado, uno de pierna y uno de bombeo, más dos días de torso. Unas 20 series de glúteo a la semana.',
    },
    categories: ['glutes', 'women'], level: 'intermediate', goal: 'glutes', equipment: 'gym',
    weeks: 12, days: 5, rotation: ['GS', 'UA', 'LG', 'UB', 'GP'],
    workouts: [
      w('GS', 'Glute strength', 'Glúteo fuerza', [
        x('Hip Thrust', 4, '6-10'), x('Romanian Deadlift', 3, '6-10'), x('Dumbbell Split Squat', 3, '8-12/leg'), x('Hip Abduction', 3, '15-20'),
      ]),
      w('UA', 'Upper A', 'Torso A', [
        x('Bench Press', 3, '6-10'), x('Lat Pulldown', 3, '8-12'), x('Dumbbell Shoulder Press', 3, '8-12'),
        x('Seated Cable Row', 3, '8-12'), x('Triceps Pushdown', 2, '10-15'),
      ]),
      w('LG', 'Legs', 'Pierna', [
        x('Back Squat', 4, '6-10'), x('Leg Press', 3, '10-15'), x('Leg Curl', 3, '10-15'), x('Calf Raise', 3, '10-15'),
      ]),
      w('UB', 'Upper B', 'Torso B', [
        x('Incline DB Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'), x('Lateral Raise', 3, '12-20'),
        x('Face Pull', 2, '12-15'), x('Biceps Curl', 2, '10-12'), x('Hanging Leg Raise', 2, '8-12'),
      ]),
      w('GP', 'Glute pump', 'Glúteo bombeo', [
        x('Hip Thrust', 3, '12-15'), x('Back Extension', 3, '12-15'), x('Walking Lunge', 2, '10-12/leg'),
        x('Cable Kickback', 3, '12-15/leg'), x('Hip Abduction', 2, '20-25'),
      ]),
    ],
    progression: prog(DP, note('Pump day hip thrusts: lighter, with a 2-second squeeze at the top.', 'Hip thrust del día de bombeo: más ligero, con 2 segundos de contracción arriba.'), deload('7 and week 12', 'semana 7 y en la 12')),
  },
  {
    id: 'strong-glutes-upper-lower',
    name: { en: 'Strong Glutes Upper/Lower', es: 'Glúteos fuertes torso/pierna' },
    summary: {
      en: 'Heavy barbell lifts plus hip thrusts twice a week, for women who want strength and shape.',
      es: 'Levantamientos pesados con barra y hip thrust dos veces por semana, para quien busca fuerza y forma.',
    },
    categories: ['glutes', 'women', 'upper-lower', 'strength'], level: 'intermediate', goal: 'strength', equipment: 'gym',
    weeks: 12, days: 4, rotation: ['LA', 'UA', 'LB', 'UB'],
    workouts: [
      w('LA', 'Lower A · Squat', 'Pierna A · Sentadilla', [
        x('Back Squat', 4, '5-8'), x('Hip Thrust', 3, '6-10'), x('Leg Curl', 3, '8-12'), x('Calf Raise', 3, '10-15'),
      ]),
      w('UA', 'Upper A · Bench', 'Torso A · Banca', [
        x('Bench Press', 4, '5-8'), x('Barbell Row', 3, '6-10'), x('Overhead Press', 3, '6-10'),
        x('Lat Pulldown', 2, '10-12'), x('Biceps Curl', 2, '10-12'),
      ]),
      w('LB', 'Lower B · Deadlift', 'Pierna B · Peso muerto', [
        x('Deadlift', 3, '4-6'), x('Dumbbell Split Squat', 3, '8-12/leg'), x('Hip Thrust', 3, '10-15'), x('Hip Abduction', 3, '15-20'),
      ]),
      w('UB', 'Upper B · Pull-up', 'Torso B · Dominadas', [
        x('Incline DB Press', 3, '8-12'), x('Chin-up', 3, '4-10'), x('Seated Cable Row', 3, '10-12'),
        x('Lateral Raise', 3, '12-15'), x('Triceps Pushdown', 2, '10-15'),
      ]),
    ],
    progression: prog(DP, note('Barbell lifts: add 2.5 kg once you reach the top of the range. Chin-ups: use the assisted machine or a band until you can do 4 on your own.', 'Ejercicios con barra: suma 2,5 kg al llegar al máximo del rango. Dominadas: usa la máquina asistida o una banda hasta que hagas 4 sola.'), deload('7 and week 12', 'semana 7 y en la 12')),
  },

  /* ---------------- Home & dumbbells ---------------- */
  {
    id: 'home-glute-sculpt',
    name: { en: 'Home Glute Sculpt', es: 'Glúteos en casa' },
    summary: {
      en: 'Glutes at home with a pair of dumbbells and a sofa, plus push, row and press work for the upper body.',
      es: 'Glúteos en casa con un par de mancuernas y un sofá, más empujes, remos y press para el torso.',
    },
    categories: ['home', 'glutes', 'women', 'beginner'], level: 'beginner', goal: 'glutes', equipment: 'bodyweight',
    weeks: 8, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Home A', 'Casa A', [
        x('Goblet Squat', 3, '10-15'), x('Hip Thrust', 3, '10-15'), x('Dumbbell Romanian Deadlift', 3, '10-12'),
        x('Dumbbell Floor Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '10-12/arm'), x('Plank', 2, '20-40s'),
      ]),
      w('B', 'Home B', 'Casa B', [
        x('Dumbbell Reverse Lunge', 3, '8-12/leg'), x('Glute Bridge', 3, '12-20'), x('Standing Hip Abduction', 2, '15-20/side'),
        x('Push-up', 3, '5-15'), x('Dumbbell Shoulder Press', 2, '10-12'), x('Rear Delt Fly', 2, '12-15'), x('Dead Bug', 2, '8-10/side'),
      ]),
    ],
    progression: prog(DP, HOME, note('Hip thrust at home: shoulders on the sofa, dumbbell across your hips.', 'Hip thrust en casa: hombros apoyados en el sofá y la mancuerna sobre la cadera.')),
  },
  {
    id: 'home-glutes-legs-plus',
    name: { en: 'Home Glutes & Legs Plus', es: 'Glúteos y piernas en casa plus' },
    summary: {
      en: 'A 4-day home split that uses single-leg work and slow tempo to challenge your glutes with light weights.',
      es: 'Rutina de 4 días en casa que usa trabajo a una pierna y tempo lento para exigir a los glúteos con poco peso.',
    },
    categories: ['home', 'glutes', 'women'], level: 'intermediate', goal: 'glutes', equipment: 'bodyweight',
    weeks: 10, days: 4, rotation: ['LG', 'UA', 'LQ', 'UB'],
    workouts: [
      w('LG', 'Lower · Glutes', 'Pierna · Glúteo', [
        x('Dumbbell Split Squat', 4, '8-12/leg'), x('Hip Thrust', 4, '10-15'), x('Single-leg Romanian Deadlift', 3, '8-12/leg'),
        x('Standing Hip Abduction', 2, '15-25/side'),
      ]),
      w('UA', 'Upper A', 'Torso A', [
        x('Dumbbell Bench Press', 3, '8-12'), x('One-Arm Dumbbell Row', 4, '8-12/arm'), x('Arnold Press', 3, '8-12'),
        x('Rear Delt Fly', 2, '12-15'), x('Hammer Curl', 2, '10-12'), x('Overhead Triceps Extension', 2, '10-12'),
      ]),
      w('LQ', 'Lower · Quads', 'Pierna · Cuádriceps', [
        x('Goblet Squat', 4, '10-15'), x('Dumbbell Step-up', 3, '8-12/leg'), x('Dumbbell Romanian Deadlift', 3, '10-12'),
        x('Glute Bridge', 3, '10-15'), x('Dumbbell Calf Raise', 3, '12-20'),
      ]),
      w('UB', 'Upper B', 'Torso B', [
        x('Push-up', 3, '6-20'), x('Dumbbell Pullover', 3, '10-12'), x('Lateral Raise', 3, '12-20'),
        x('One-Arm Dumbbell Row', 2, '10-12/arm'), x('Dead Bug', 3, '8-10/side'), x('Plank', 2, '30-60s'),
      ]),
    ],
    progression: prog(DP, HOME, note('No bench? Use the floor press instead of the bench press. Glute bridges can go single-leg.', '¿Sin banco? Haz press en el suelo en lugar de press de banca. El puente de glúteos se puede hacer a una pierna.'), deload('6', 'semana 6')),
  },
  {
    id: 'dumbbell-basics',
    name: { en: 'Dumbbell Basics Full Body', es: 'Mancuernas básico: cuerpo completo' },
    summary: {
      en: 'A whole-body plan that needs nothing but a pair of adjustable dumbbells.',
      es: 'Un plan de cuerpo completo que solo necesita un par de mancuernas ajustables.',
    },
    categories: ['home', 'full-body', 'beginner'], level: 'beginner', goal: 'muscle', equipment: 'dumbbells',
    weeks: 8, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Dumbbells A', 'Mancuernas A', [
        x('Goblet Squat', 3, '8-12'), x('Dumbbell Floor Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'),
        x('Dumbbell Romanian Deadlift', 3, '8-12'), x('Lateral Raise', 2, '12-15'), x('Plank', 2, '20-40s'),
      ]),
      w('B', 'Dumbbells B', 'Mancuernas B', [
        x('Dumbbell Reverse Lunge', 3, '8-12/leg'), x('Dumbbell Shoulder Press', 3, '8-12'), x('Dumbbell Pullover', 2, '10-12'),
        x('Hip Thrust', 3, '10-15'), x('Biceps Curl', 2, '10-12'), x('Overhead Triceps Extension', 2, '10-12'),
      ]),
    ],
    progression: prog(DP, HOME),
  },
  {
    id: 'home-upper-lower',
    name: { en: 'Home Upper/Lower', es: 'Torso/pierna en casa' },
    summary: {
      en: 'The home step up from full body: four sessions, each muscle trained twice a week.',
      es: 'El siguiente paso en casa tras el cuerpo completo: cuatro sesiones, cada músculo dos veces por semana.',
    },
    categories: ['home', 'upper-lower', 'beginner'], level: 'beginner', goal: 'muscle', equipment: 'bodyweight',
    weeks: 10, days: 4, rotation: ['UA', 'LA', 'UB', 'LB'],
    workouts: [
      w('UA', 'Upper A', 'Torso A', [
        x('Dumbbell Bench Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'), x('Dumbbell Shoulder Press', 3, '8-12'),
        x('Rear Delt Fly', 2, '12-15'), x('Biceps Curl', 2, '10-12'), x('Triceps Kickback', 2, '10-15'),
      ]),
      w('LA', 'Lower A', 'Pierna A', [
        x('Goblet Squat', 3, '8-12'), x('Dumbbell Romanian Deadlift', 3, '8-12'), x('Dumbbell Reverse Lunge', 2, '8-12/leg'),
        x('Dumbbell Calf Raise', 3, '12-20'), x('Plank', 2, '30-45s'),
      ]),
      w('UB', 'Upper B', 'Torso B', [
        x('Push-up', 3, '5-20'), x('Arnold Press', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '10-12/arm'),
        x('Dumbbell Pullover', 2, '10-12'), x('Lateral Raise', 2, '12-15'), x('Hammer Curl', 2, '10-12'),
      ]),
      w('LB', 'Lower B', 'Pierna B', [
        x('Dumbbell Split Squat', 3, '8-12/leg'), x('Hip Thrust', 3, '10-15'), x('Dumbbell Step-up', 2, '8-12/leg'),
        x('Single-leg Romanian Deadlift', 2, '8-12/leg'), x('Dead Bug', 2, '8-10/side'),
      ]),
    ],
    progression: prog(DP, HOME, deload('6', 'semana 6')),
  },
  {
    id: 'quick-home-circuit',
    name: { en: 'Quick Home Circuit', es: 'Circuito rápido en casa' },
    summary: {
      en: '30-minute home workouts in pairs: a first block to build the training habit.',
      es: 'Entrenamientos de 30 minutos en casa por parejas de ejercicios: un primer bloque para crear el hábito.',
    },
    categories: ['home', 'beginner', 'women', 'full-body'], level: 'beginner', goal: 'fitness', equipment: 'bodyweight',
    weeks: 6, days: 3, rotation: ['A', 'B'],
    workouts: [
      w('A', 'Circuit A', 'Circuito A', [
        x('Goblet Squat', 2, '10-15'), x('Push-up', 2, '5-15'), x('Dumbbell Romanian Deadlift', 2, '10-12'),
        x('One-Arm Dumbbell Row', 2, '10-12/arm'), x('Glute Bridge', 2, '15-20'), x('Plank', 2, '20-40s'),
      ]),
      w('B', 'Circuit B', 'Circuito B', [
        x('Dumbbell Reverse Lunge', 2, '8-12/leg'), x('Dumbbell Shoulder Press', 2, '10-12'), x('Dumbbell Step-up', 2, '8-12/leg'),
        x('Rear Delt Fly', 2, '12-15'), x('Standing Hip Abduction', 2, '15-20/side'), x('Dead Bug', 2, '8/side'),
      ]),
    ],
    progression: prog(DP, note('Do the exercises in pairs (1+2, 3+4, 5+6) back to back, then rest 60–90 s. From week 4, add a third set to everything.', 'Haz los ejercicios por parejas (1+2, 3+4, 5+6) seguidos y descansa 60–90 s. Desde la semana 4, añade una tercera serie a todo.')),
  },

  /* ---------------- Intermediate splits & strength ---------------- */
  {
    id: 'power-pump-upper-lower',
    name: { en: 'Power & Pump Upper/Lower', es: 'Fuerza y volumen torso/pierna' },
    summary: {
      en: 'Heavy, low-rep days early in the week and higher-rep muscle days later on.',
      es: 'Días pesados de pocas repeticiones a principio de semana y días de más repeticiones para músculo después.',
    },
    categories: ['upper-lower', 'strength'], level: 'intermediate', goal: 'strength', equipment: 'gym',
    weeks: 12, days: 4, rotation: ['UP', 'LP', 'UH', 'LH'],
    workouts: [
      w('UP', 'Upper power', 'Torso fuerza', [
        x('Bench Press', 4, '4-6'), x('Barbell Row', 4, '4-6'), x('Overhead Press', 3, '5-8'), x('Pull-up', 3, '5-8'), x('Biceps Curl', 2, '8-10'),
      ]),
      w('LP', 'Lower power', 'Pierna fuerza', [
        x('Back Squat', 4, '4-6'), x('Deadlift', 3, '3-5'), x('Leg Press', 3, '8-10'), x('Leg Curl', 3, '6-10'), x('Calf Raise', 3, '8-12'),
      ]),
      w('UH', 'Upper pump', 'Torso volumen', [
        x('Incline DB Press', 3, '8-12'), x('Seated Cable Row', 3, '10-12'), x('Dumbbell Shoulder Press', 3, '10-12'),
        x('Chest Fly', 2, '12-15'), x('Lateral Raise', 3, '12-20'), x('Triceps Pushdown', 3, '10-15'), x('Incline Dumbbell Curl', 2, '10-15'),
      ]),
      w('LH', 'Lower pump', 'Pierna volumen', [
        x('Front Squat', 3, '8-10'), x('Romanian Deadlift', 3, '8-12'), x('Hip Thrust', 3, '10-12'),
        x('Dumbbell Split Squat', 2, '10-12/leg'), x('Leg Extension', 2, '12-15'), x('Hanging Leg Raise', 3, '10-15'),
      ]),
    ],
    progression: prog(DP, note('Power-day lifts: add 2.5–5 kg once you reach the top of the range.', 'Ejercicios de los días de fuerza: suma 2,5–5 kg al llegar al máximo del rango.'), deload('7 and week 12', 'semana 7 y en la 12')),
  },
  {
    id: 'ppl-6-day',
    name: { en: 'Push Pull Legs 6-Day', es: 'Empuje, tirón, pierna en 6 días' },
    summary: {
      en: 'Every muscle twice a week: heavier A days and more varied B days.',
      es: 'Cada músculo dos veces por semana: días A más pesados y días B más variados.',
    },
    categories: ['ppl'], level: 'intermediate', goal: 'muscle', equipment: 'gym',
    weeks: 12, days: 6, rotation: ['PUA', 'PLA', 'LGA', 'PUB', 'PLB', 'LGB'],
    workouts: [
      w('PUA', 'Push A', 'Empuje A', [
        x('Bench Press', 4, '5-8'), x('Overhead Press', 3, '6-10'), x('Incline DB Press', 3, '8-12'),
        x('Lateral Raise', 3, '12-20'), x('Triceps Pushdown', 3, '10-15'), x('Overhead Triceps Extension', 2, '10-15'),
      ]),
      w('PLA', 'Pull A', 'Tirón A', [
        x('Barbell Row', 4, '6-10'), x('Pull-up', 3, '6-10'), x('Seated Cable Row', 3, '10-12'),
        x('Face Pull', 3, '12-15'), x('Biceps Curl', 3, '8-12'), x('Hammer Curl', 2, '10-12'),
      ]),
      w('LGA', 'Legs A', 'Pierna A', [
        x('Back Squat', 4, '5-8'), x('Romanian Deadlift', 3, '8-10'), x('Leg Press', 3, '10-15'), x('Leg Curl', 3, '10-15'), x('Calf Raise', 4, '8-12'),
      ]),
      w('PUB', 'Push B', 'Empuje B', [
        x('Incline Bench Press', 4, '6-10'), x('Dumbbell Shoulder Press', 3, '8-12'), x('Dips', 3, '6-12'),
        x('Chest Fly', 3, '12-15'), x('Lateral Raise', 3, '12-20'), x('Triceps Pushdown', 2, '12-15'),
      ]),
      w('PLB', 'Pull B', 'Tirón B', [
        x('Deadlift', 3, '3-5'), x('Lat Pulldown', 3, '8-12'), x('One-Arm Dumbbell Row', 3, '8-12/arm'),
        x('Rear Delt Fly', 3, '12-20'), x('Incline Dumbbell Curl', 3, '10-12'),
      ]),
      w('LGB', 'Legs B', 'Pierna B', [
        x('Front Squat', 3, '6-10'), x('Hip Thrust', 3, '8-12'), x('Dumbbell Split Squat', 3, '8-12/leg'),
        x('Leg Extension', 3, '12-15'), x('Leg Curl', 2, '10-15'), x('Hanging Leg Raise', 3, '8-15'),
      ]),
    ],
    progression: prog(DP, note('First lift of each day: add 2.5 kg (5 kg on deadlift) once you reach the top of the range. Take the seventh day off.', 'Primer ejercicio de cada día: suma 2,5 kg (5 kg en peso muerto) al llegar al máximo del rango. Descansa el séptimo día.'), deload('7 and week 12', 'semana 7 y en la 12')),
  },
  {
    id: 'tiered-strength-4-day',
    name: { en: 'Tiered Strength 4-Day', es: 'Fuerza por niveles en 4 días' },
    summary: {
      en: 'Each day pairs one heavy main lift with one medium-volume lift and light accessories.',
      es: 'Cada día combina un levantamiento principal pesado, uno de volumen medio y accesorios ligeros.',
    },
    categories: ['strength'], level: 'intermediate', goal: 'strength', equipment: 'gym',
    weeks: 12, days: 4, rotation: ['D1', 'D2', 'D3', 'D4'],
    workouts: [
      w('D1', 'Heavy squat', 'Sentadilla pesada', [x('Back Squat', 5, '3'), x('Bench Press', 3, '8-10'), x('Lat Pulldown', 3, '12-15'), x('Face Pull', 2, '15-20')]),
      w('D2', 'Heavy press', 'Press pesado', [x('Overhead Press', 5, '3'), x('Deadlift', 3, '6-8'), x('Seated Cable Row', 3, '12-15'), x('Lateral Raise', 2, '15-20')]),
      w('D3', 'Heavy bench', 'Banca pesada', [x('Bench Press', 5, '3'), x('Back Squat', 3, '8-10'), x('Lat Pulldown', 3, '12-15'), x('Hip Thrust', 2, '10-15')]),
      w('D4', 'Heavy deadlift', 'Peso muerto pesado', [x('Deadlift', 5, '3'), x('Overhead Press', 3, '8-10'), x('Seated Cable Row', 3, '12-15'), x('Biceps Curl', 2, '12-15')]),
    ],
    progression: {
      en: 'Heavy 5×3 lifts: add 2.5 kg on upper-body lifts and 5 kg on lower-body lifts each week. Miss reps two sessions in a row? Drop 10% and build back up. Medium lifts and accessories use double progression. Rest 3–4 min on the heavy lift. Deload in weeks 7 and 12: half the sets, same weights.',
      es: 'Ejercicios pesados 5×3: suma 2,5 kg en torso y 5 kg en pierna cada semana. ¿Fallas dos sesiones seguidas? Baja un 10 % y vuelve a subir. Los ejercicios medios y accesorios usan progresión doble. Descansa 3–4 min en el ejercicio pesado. Descarga en las semanas 7 y 12: la mitad de series, mismos pesos.',
    },
  },
];
