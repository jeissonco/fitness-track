/* English / Spanish text for every screen, and the chosen language.
 * Screens call useT(); code outside React (toasts, confirms) calls t().
 * Saved data keeps English exercise and template names as ids: they are only
 * translated for display, so switching language never changes the log. */

import { useSyncExternalStore } from 'react';
import { ES_EXERCISE_NAMES, ES_EQUIPMENT, ES_LEVEL, ES_MUSCLES } from './exercise-es';
import type { CardioKind, ScoreUnit, TemplateKey } from './fitness';
import { LANG_KEY } from './head-scripts';
import { findPlanWorkout, type PlanCategory, type PlanEquipment, type PlanGoal, type PlanLevel } from './plans';

export type Locale = 'en' | 'es';
const KEY = LANG_KEY;

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const en = {
  locale: 'en' as Locale,
  /** Passed to toLocaleDateString; undefined keeps the device's own English format. */
  dateLocale: undefined as string | undefined,
  ex: (name: string) => name,
  muscle: (m: string) => m,
  equipment: (e: string) => e,
  level: (l: string) => l,
  kind: (k: CardioKind): string => k,
  template: { push: 'Push day', pull: 'Pull day', legs: 'Leg day', dumbbell: 'Dumbbell full body' } as Record<TemplateKey, string>,
  session: 'Session',
  unit: { kg: 'kg', reps: 'reps', s: 's' } as Record<ScoreUnit, string>,

  langToggle: 'Language: English. Cambiar a español',
  themeToggle: 'Toggle light and dark theme',
  signedInAs: (email: string) => `Signed in as ${email}. Sign out`,
  signOutConfirm: (email: string) => `Sign out of ${email}?`,
  loading: 'Loading',
  nav: { label: 'Main', today: 'Today', train: 'Train', plans: 'Plans', cardio: 'Cardio', progress: 'Progress', active: 'Workout in progress' },

  today: {
    eyebrow: (weekday: string, week: number) => `${weekday} · Week ${week}`,
    back: ['Back', 'at it.'],
    streak: ['Keep the', 'streak', 'alive.'],
    lift: ["Let's", 'lift.'],
    streakChip: (n: number) => `${n}-week streak`,
    sample: ["You're looking at ", 'sample data', ' so the charts have something to show.'],
    startFresh: 'Start fresh',
    startFreshConfirm: 'Delete the sample workouts and start with a clean log?',
    inProgress: 'In progress',
    nextUp: 'Next up',
    setsDone: (done: number, total: number) => `${done}/${total} sets`,
    newEx: 'New',
    resume: 'Resume workout',
    start: 'Start workout',
    sessions: 'Sessions',
    volume: 'Volume',
    cardio: 'Cardio',
    thisWeek: 'This week',
    dayAria: (day: string, kg: number, min: number) => `${day}: ${kg} kg lifted, ${min} minutes cardio`,
    strengthVolume: 'Strength volume',
    cardioMinutes: 'Cardio minutes',
    recentPRs: 'Recent PRs',
    est1rm: 'Est. 1RM',
  },

  train: {
    rest: 'Rest',
    restOver: 'Rest over. Next set!',
    minus15: 'Subtract 15 seconds',
    plus15: 'Add 15 seconds',
    skipRest: 'Skip rest',
    elapsed: 'Elapsed time',
    startClock: 'Start',
    startClockHint: 'Clock starts with your first set',
    planning: 'Planning',
    choose: ['Choose a', 'session'],
    next: 'NEXT',
    empty: 'Empty session',
    emptyHint: 'Build it as you go',
    replaceConfirm: 'A workout is already in progress. Discard it and start a new one?',
    inProgress: (done: number, total: number) => `In progress · ${done}/${total} sets`,
    howTo: (name: string) => `How to do ${name}`,
    best: (kg: number) => `Best ${kg} kg e1RM`,
    bestCount: (n: number, unit: string) => `Best ${n} ${unit}`,
    bw: 'BW',
    firstTime: 'First time',
    setsOf: (name: string) => `${name} sets`,
    colSet: 'Set', colPrev: 'Previous', colKg: 'kg', colReps: 'Reps', colDone: 'Done',
    setWeight: (n: number) => `Set ${n} weight, kilograms`,
    setReps: (n: number) => `Set ${n} reps`,
    setDone: (n: number) => `Set ${n} done`,
    addSet: '+ Add set',
    removeSet: '− Remove set',
    removeSetConfirm: 'The last set is ticked. Remove it anyway?',
    removeExercise: (name: string) => `Remove ${name} from this workout`,
    removeExerciseConfirm: (name: string) => `Remove ${name}? Its ticked sets will be lost.`,
    exerciseToAdd: 'Exercise to add',
    equipmentGroup: { barbell: 'Barbell', dumbbell: 'Dumbbells', cable: 'Cable', machine: 'Machine', 'body only': 'Bodyweight' } as Record<string, string>,
    add: 'Add',
    discard: 'Discard',
    discardConfirm: 'Discard this workout? Logged sets will be lost.',
    finish: 'Finish',
    needWeightReps: 'Enter weight and reps first',
    newPR: (name: string, kg: string, reps: number) => `New PR! ${name} ${kg} × ${reps}`,
    newPRCount: (name: string, n: number, unit: string) => `New PR! ${name} ${n} ${unit}`,
    tickOne: 'Tick at least one set to finish',
    saved: (tonnes: string, prs: number) => `Workout saved · ${tonnes} t lifted${prs ? ` · ${plural(prs, 'PR', 'PRs')}` : ''}`,
  },

  plans: {
    title: ['Training', 'plans'],
    intro: 'Pick a plan and the app lines up each workout for you, with sets and reps to aim for.',
    all: 'All',
    category: {
      beginner: 'Beginner', glutes: 'Glutes & legs', women: 'For women', 'full-body': 'Full body', home: 'Home & dumbbells',
      'upper-lower': 'Upper / lower', ppl: 'Push pull legs', strength: 'Strength',
    } as Record<PlanCategory, string>,
    level: { beginner: 'Beginner', intermediate: 'Intermediate' } as Record<PlanLevel, string>,
    goal: { strength: 'Strength', muscle: 'Muscle', glutes: 'Glutes', fitness: 'Fitness & tone' } as Record<PlanGoal, string>,
    equipment: { gym: 'Gym', dumbbells: 'Dumbbells', bodyweight: 'Bodyweight + dumbbells' } as Record<PlanEquipment, string>,
    daysFilter: 'Days per week',
    any: 'Any',
    perWeek: (n: number) => `${n}×/week`,
    weeks: (n: number) => `${n} weeks`,
    count: (n: number) => plural(n, 'plan', 'plans'),
    none: 'No plans match these filters.',
    yours: 'Your plan',
    weekOf: (w: number, total: number) => `Week ${w} of ${total}`,
    progress: (done: number, total: number) => `${done}/${total} workouts`,
    follow: 'Follow this plan',
    following: 'Following',
    stop: 'Stop plan',
    stopConfirm: 'Stop following this plan? Your logged workouts stay.',
    switchConfirm: (name: string) => `You're following ${name}. Switch to this plan instead?`,
    startNext: 'Start next workout',
    next: 'Next workout',
    yourWeek: 'Your week',
    day: (n: number) => `Day ${n}`,
    workouts: 'Workouts',
    howToProgress: 'How to progress',
    finished: 'Plan complete!',
    finishedHint: 'Nice work. Start it again with heavier weights, or pick a new plan.',
    restart: 'Start again',
    back: 'All plans',
    browse: 'Browse plans',
    fromPlan: 'From your plan',
    quick: 'Quick sessions',
    setsReps: (sets: number, reps: string) => `${sets} × ${reps.replace(/(\d)s\b/, '$1 s')}`,
    target: 'Target',
  },

  cardio: {
    title: ['Log', 'cardio'],
    type: 'Type',
    duration: 'Duration (min)',
    distance: 'Distance (km)',
    hr: 'Avg heart rate',
    date: 'Date',
    effort: 'Effort (RPE)',
    pace: 'Pace',
    speed: 'Speed',
    save: 'Save session',
    recent: 'Recent',
    none: 'No sessions yet',
    needDuration: 'Add a duration',
    saved: (kind: string, min: number) => `${kind} saved · ${min} min`,
  },

  progress: {
    title: 'Progress',
    type: 'Progress type',
    strength: 'Strength',
    cardio: 'Cardio',
    noLifts: 'Finish a workout to see your lifts here.',
    exercise: 'Exercise',
    e1rm: 'e1RM',
    kgE1rm: 'kg e1RM',
    gain: (kg: string, n: number) => `+${kg} kg in ${n} sessions`,
    gainCount: (n: number, unit: string, sessions: number) => `+${n} ${unit} in ${sessions} sessions`,
    bestSet: 'best set',
    unitWords: { kg: 'kilograms', reps: 'reps', s: 'seconds' } as Record<ScoreUnit, string>,
    sessions: 'Sessions',
    topSet: 'Top set',
    distance: 'Distance',
    time: 'Time',
    perWeek: 'Minutes per week',
    sixWeeks: '6 wks',
    thisWeek: 'This wk',
    chartAria: (from: number, to: number, unit: string) => `Best set from ${from} to ${to} ${unit}`,
  },

  howto: {
    close: 'Close',
    position: (name: string, end: boolean) => `${name}, ${end ? 'end' : 'start'} position`,
    phase: 'Movement phase',
    start: 'Start',
    end: 'End',
    offline: 'Photos need an internet connection.',
    watch: 'Watch a video',
    photos: 'Show photos',
    video: (name: string) => `${name} video`,
    credit: 'Photos & steps:',
    publicDomain: '(public domain)',
  },

  login: {
    welcome: ['Welcome', 'back.'],
    join: ['Start', 'tracking.'],
    email: 'Email',
    password: 'Password',
    min8: 'At least 8 characters.',
    signIn: 'Sign in',
    create: 'Create account',
    wait: 'One moment…',
    newHere: 'New here?',
    createLink: 'Create an account',
    haveAccount: 'Already have an account?',
    needEmail: 'Enter your email address.',
    needPassword: 'Enter your password.',
    shortPassword: 'Use at least 8 characters for your password.',
    linkExpired: 'That confirmation link has expired or was already used. Sign in, or sign up again for a new link.',
    wrong: 'Wrong email or password.',
    unconfirmed: 'Confirm your email first: open the link we sent you.',
    exists: 'That email already has an account. Sign in instead.',
    check: ['Check your', 'email'],
    sent: ['We sent a confirmation link to ', '. Open it on this device to finish creating your account.'],
    back: 'Back to sign in',
  },

  sync: {
    rejected: "A change couldn't be saved to your account",
    loadFailed: "Couldn't load your log. Retrying…",
    copied: 'Copied to your account',
    importConfirm: (w: number, c: number) =>
      `This device has ${plural(w, 'workout', 'workouts')} and ${plural(c, 'cardio session', 'cardio sessions')} saved from before you had an account. Copy them into your account?`,
    unsynced: "Some changes haven't reached your account yet (you may be offline). Sign out and lose them?",
  },
};

export type Dict = typeof en;

const es: Dict = {
  locale: 'es',
  dateLocale: 'es',
  ex: (name) => ES_EXERCISE_NAMES[name] ?? name,
  muscle: (m) => ES_MUSCLES[m] ?? m,
  equipment: (e) => ES_EQUIPMENT[e] ?? e,
  level: (l) => ES_LEVEL[l] ?? l,
  kind: (k) => ({ Run: 'Correr', Bike: 'Bici', Row: 'Remo', Walk: 'Caminar', Swim: 'Nadar', Other: 'Otro' })[k],
  template: { push: 'Día de empuje', pull: 'Día de tirón', legs: 'Día de pierna', dumbbell: 'Cuerpo completo con mancuernas' },
  session: 'Sesión',
  unit: { kg: 'kg', reps: 'reps', s: 's' },

  langToggle: 'Idioma: español. Switch to English',
  themeToggle: 'Cambiar entre tema claro y oscuro',
  signedInAs: (email) => `Sesión iniciada como ${email}. Cerrar sesión`,
  signOutConfirm: (email) => `¿Cerrar la sesión de ${email}?`,
  loading: 'Cargando',
  nav: { label: 'Principal', today: 'Hoy', train: 'Entrenar', plans: 'Planes', cardio: 'Cardio', progress: 'Progreso', active: 'Entrenamiento en curso' },

  today: {
    eyebrow: (weekday, week) => `${weekday} · Semana ${week}`,
    back: ['De vuelta', 'al ruedo.'],
    streak: ['Mantén la', 'racha', 'viva.'],
    lift: ['¡A', 'entrenar!'],
    streakChip: (n) => `Racha de ${plural(n, 'semana', 'semanas')}`,
    sample: ['Estás viendo ', 'datos de ejemplo', ' para que los gráficos tengan algo que mostrar.'],
    startFresh: 'Empezar de cero',
    startFreshConfirm: '¿Borrar los entrenamientos de ejemplo y empezar con un registro vacío?',
    inProgress: 'En curso',
    nextUp: 'Siguiente',
    setsDone: (done, total) => `${done}/${total} series`,
    newEx: 'Nuevo',
    resume: 'Continuar',
    start: 'Empezar',
    sessions: 'Sesiones',
    volume: 'Volumen',
    cardio: 'Cardio',
    thisWeek: 'Esta semana',
    dayAria: (day, kg, min) => `${day}: ${kg} kg levantados, ${min} minutos de cardio`,
    strengthVolume: 'Volumen de fuerza',
    cardioMinutes: 'Minutos de cardio',
    recentPRs: 'Récords recientes',
    est1rm: '1RM est.',
  },

  train: {
    rest: 'Descanso',
    restOver: '¡Descanso terminado! Siguiente serie.',
    minus15: 'Restar 15 segundos',
    plus15: 'Sumar 15 segundos',
    skipRest: 'Saltar descanso',
    elapsed: 'Tiempo transcurrido',
    startClock: 'Iniciar',
    startClockHint: 'El reloj empieza con tu primera serie',
    planning: 'Planificando',
    choose: ['Elige una', 'sesión'],
    next: 'SIGUIENTE',
    empty: 'Sesión libre',
    emptyHint: 'Créala sobre la marcha',
    replaceConfirm: 'Ya hay un entrenamiento en curso. ¿Descartarlo y empezar uno nuevo?',
    inProgress: (done, total) => `En curso · ${done}/${total} series`,
    howTo: (name) => `Cómo hacer ${name}`,
    best: (kg) => `Mejor ${kg} kg 1RM est.`,
    bestCount: (n, unit) => `Mejor ${n} ${unit}`,
    bw: 'PC',
    firstTime: 'Primera vez',
    setsOf: (name) => `Series de ${name}`,
    colSet: 'Serie', colPrev: 'Anterior', colKg: 'kg', colReps: 'Reps', colDone: 'Hecha',
    setWeight: (n) => `Serie ${n}, peso en kilos`,
    setReps: (n) => `Serie ${n}, repeticiones`,
    setDone: (n) => `Serie ${n} hecha`,
    addSet: '+ Añadir serie',
    removeSet: '− Quitar serie',
    removeSetConfirm: 'La última serie está marcada. ¿Quitarla de todos modos?',
    removeExercise: (name) => `Quitar ${name} de este entrenamiento`,
    removeExerciseConfirm: (name) => `¿Quitar ${name}? Se perderán sus series marcadas.`,
    exerciseToAdd: 'Ejercicio para añadir',
    equipmentGroup: { barbell: 'Barra', dumbbell: 'Mancuernas', cable: 'Polea', machine: 'Máquina', 'body only': 'Peso corporal' },
    add: 'Añadir',
    discard: 'Descartar',
    discardConfirm: '¿Descartar este entrenamiento? Se perderán las series registradas.',
    finish: 'Terminar',
    needWeightReps: 'Primero escribe el peso y las repeticiones',
    newPR: (name, kg, reps) => `¡Nuevo récord! ${name} ${kg} × ${reps}`,
    newPRCount: (name, n, unit) => `¡Nuevo récord! ${name} ${n} ${unit}`,
    tickOne: 'Marca al menos una serie para terminar',
    saved: (tonnes, prs) => `Entrenamiento guardado · ${tonnes} t levantadas${prs ? ` · ${plural(prs, 'récord', 'récords')}` : ''}`,
  },

  plans: {
    title: ['Planes de', 'entrenamiento'],
    intro: 'Elige un plan y la app te prepara cada entrenamiento, con las series y repeticiones a las que apuntar.',
    all: 'Todos',
    category: {
      beginner: 'Principiante', glutes: 'Glúteos y piernas', women: 'Para mujeres', 'full-body': 'Cuerpo completo', home: 'Casa y mancuernas',
      'upper-lower': 'Torso / pierna', ppl: 'Empuje, tirón, pierna', strength: 'Fuerza',
    },
    level: { beginner: 'Principiante', intermediate: 'Intermedio' },
    goal: { strength: 'Fuerza', muscle: 'Músculo', glutes: 'Glúteos', fitness: 'Forma y tono' },
    equipment: { gym: 'Gimnasio', dumbbells: 'Mancuernas', bodyweight: 'Peso corporal + mancuernas' },
    daysFilter: 'Días por semana',
    any: 'Todos',
    perWeek: (n) => `${n}×/semana`,
    weeks: (n) => `${n} semanas`,
    count: (n) => plural(n, 'plan', 'planes'),
    none: 'Ningún plan coincide con estos filtros.',
    yours: 'Tu plan',
    weekOf: (w, total) => `Semana ${w} de ${total}`,
    progress: (done, total) => `${done}/${total} entrenamientos`,
    follow: 'Seguir este plan',
    following: 'Siguiendo',
    stop: 'Dejar el plan',
    stopConfirm: '¿Dejar de seguir este plan? Tus entrenamientos registrados se conservan.',
    switchConfirm: (name) => `Estás siguiendo ${name}. ¿Cambiar a este plan?`,
    startNext: 'Empezar siguiente',
    next: 'Siguiente entrenamiento',
    yourWeek: 'Tu semana',
    day: (n) => `Día ${n}`,
    workouts: 'Entrenamientos',
    howToProgress: 'Cómo progresar',
    finished: '¡Plan completado!',
    finishedHint: 'Buen trabajo. Repítelo con más peso o elige un plan nuevo.',
    restart: 'Empezar de nuevo',
    back: 'Todos los planes',
    browse: 'Ver planes',
    fromPlan: 'De tu plan',
    quick: 'Sesiones rápidas',
    setsReps: (sets, reps) => `${sets} × ${reps.replace(/(\d)s\b/, '$1 s').replace('/leg', '/pierna').replace('/arm', '/brazo').replace('/side', '/lado')}`,
    target: 'Objetivo',
  },

  cardio: {
    title: ['Registrar', 'cardio'],
    type: 'Tipo',
    duration: 'Duración (min)',
    distance: 'Distancia (km)',
    hr: 'FC media',
    date: 'Fecha',
    effort: 'Esfuerzo (RPE)',
    pace: 'Ritmo',
    speed: 'Velocidad',
    save: 'Guardar sesión',
    recent: 'Recientes',
    none: 'Aún no hay sesiones',
    needDuration: 'Añade la duración',
    saved: (kind, min) => `Guardado: ${kind} · ${min} min`,
  },

  progress: {
    title: 'Progreso',
    type: 'Tipo de progreso',
    strength: 'Fuerza',
    cardio: 'Cardio',
    noLifts: 'Termina un entrenamiento para ver aquí tus levantamientos.',
    exercise: 'Ejercicio',
    e1rm: '1RM est.',
    kgE1rm: 'kg 1RM est.',
    gain: (kg, n) => `+${kg} kg en ${n} sesiones`,
    gainCount: (n, unit, sessions) => `+${n} ${unit} en ${sessions} sesiones`,
    bestSet: 'mejor serie',
    unitWords: { kg: 'kilos', reps: 'repeticiones', s: 'segundos' },
    sessions: 'Sesiones',
    topSet: 'Mejor serie',
    distance: 'Distancia',
    time: 'Tiempo',
    perWeek: 'Minutos por semana',
    sixWeeks: '6 sem',
    thisWeek: 'Esta sem',
    chartAria: (from, to, unit) => `Mejor serie de ${from} a ${to} ${unit}`,
  },

  howto: {
    close: 'Cerrar',
    position: (name, end) => `${name}, posición ${end ? 'final' : 'inicial'}`,
    phase: 'Fase del movimiento',
    start: 'Inicio',
    end: 'Final',
    offline: 'Las fotos necesitan conexión a internet.',
    watch: 'Ver vídeo',
    photos: 'Ver fotos',
    video: (name) => `Vídeo de ${name}`,
    credit: 'Fotos y pasos:',
    publicDomain: '(dominio público)',
  },

  login: {
    welcome: ['Hola de', 'nuevo.'],
    join: ['Empieza a', 'entrenar.'],
    email: 'Correo electrónico',
    password: 'Contraseña',
    min8: 'Al menos 8 caracteres.',
    signIn: 'Iniciar sesión',
    create: 'Crear cuenta',
    wait: 'Un momento…',
    newHere: '¿Eres nuevo?',
    createLink: 'Crea una cuenta',
    haveAccount: '¿Ya tienes cuenta?',
    needEmail: 'Escribe tu correo electrónico.',
    needPassword: 'Escribe tu contraseña.',
    shortPassword: 'Usa al menos 8 caracteres para la contraseña.',
    linkExpired: 'Ese enlace de confirmación ha caducado o ya se usó. Inicia sesión, o regístrate otra vez para recibir uno nuevo.',
    wrong: 'Correo o contraseña incorrectos.',
    unconfirmed: 'Primero confirma tu correo: abre el enlace que te enviamos.',
    exists: 'Ese correo ya tiene una cuenta. Inicia sesión.',
    check: ['Revisa tu', 'correo'],
    sent: ['Enviamos un enlace de confirmación a ', '. Ábrelo en este dispositivo para terminar de crear tu cuenta.'],
    back: 'Volver a iniciar sesión',
  },

  sync: {
    rejected: 'No se pudo guardar un cambio en tu cuenta',
    loadFailed: 'No se pudo cargar tu registro. Reintentando…',
    copied: 'Copiado a tu cuenta',
    importConfirm: (w, c) =>
      `Este dispositivo tiene ${plural(w, 'entrenamiento', 'entrenamientos')} y ${plural(c, 'sesión de cardio', 'sesiones de cardio')} guardados de antes de tener cuenta. ¿Copiarlos a tu cuenta?`,
    unsynced: 'Algunos cambios aún no llegaron a tu cuenta (puede que no tengas conexión). ¿Cerrar sesión y perderlos?',
  },
};

const DICTS: Record<Locale, Dict> = { en, es };

/* ---------------- Chosen language ---------------- */
let current: Locale | null = null;
const subs = new Set<() => void>();

function detect(): Locale {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function getLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  return (current ??= detect());
}

export function setLocale(l: Locale) {
  current = l;
  try { localStorage.setItem(KEY, l); } catch {}
  document.documentElement.lang = l;
  subs.forEach((f) => f());
}

const subscribe = (cb: () => void) => {
  subs.add(cb);
  return () => { subs.delete(cb); };
};

/** Text for the current language. English while rendering on the server. */
export function useT(): Dict {
  return DICTS[useSyncExternalStore(subscribe, getLocale, () => 'en' as Locale)];
}

/** Text for the current language, outside React. */
export const t = (): Dict => DICTS[getLocale()];

/** Display name of a saved or active workout, translated when it came from a template or plan. */
export function workoutName(d: Dict, template: TemplateKey | null, name: string, plan?: string | null) {
  const p = findPlanWorkout(plan);
  if (p) return p.workout.name[d.locale];
  return template ? d.template[template] : name === 'Session' ? d.session : name;
}
