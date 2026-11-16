/* One short form tutorial per exercise, per language (YouTube video ids).
 * All were checked to allow embedding. Played through youtube-nocookie.com,
 * which sets no tracking cookies until the viewer presses play. */

import type { Locale } from './i18n';

/** English is required; a missing Spanish video falls back to English with Spanish captions. */
export const EXERCISE_VIDEOS: Record<string, { en: string; es?: string }> = {
  'Bench Press':       { en: 'lWFknlOTbyM', es: 'jlFl7WJ1TzI' },
  'Overhead Press':    { en: 'KP1sYz2VICk', es: 'j_Buh54Sb-w' },
  'Incline DB Press':  { en: 'IP4oeKh1Sd4', es: 'MkMf308jXww' },
  'Triceps Pushdown':  { en: '-zLyUAo1gMw', es: 'HAS8uy73HqM' },
  'Deadlift':          { en: 'XxWcirHIwVo', es: '7Sjfm61-HC4' },
  'Barbell Row':       { en: 'FWJR5Ve8bnQ', es: 'OXH-ecu-Obw' },
  'Lat Pulldown':      { en: '43hWj8mfYGY', es: '72q0tKij5uU' },
  'Biceps Curl':       { en: 'XE_pHwbst04', es: 'uICWtGLd4-I' },
  'Back Squat':        { en: 'aOzrA4FgnM0', es: 'qsAkuNORgmk' },
  'Romanian Deadlift': { en: '3VXmecChYYM', es: '99aPIw8XxRg' },
  'Leg Press':         { en: 'nDh_BlnLCGc', es: 'xvCynwyNoP4' },
  'Calf Raise':        { en: 'SVtg-1loH4c', es: 'WpwoqT91d74' },
  'Pull-up':           { en: 'XB_7En-zf_M', es: 'ZZbQ8x9BW4U' },
  'Front Squat':       { en: 'wyDbagKS7Rg', es: 'KXhu0HkJ7K4' },
  'Hip Thrust':        { en: 'Zp26q4BY5HE', es: 'aMntMBkmv0g' },
  'Lateral Raise':     { en: 'PzsMitRdI_8', es: 'hgLpdwMtEEs' },
  'Face Pull':         { en: 'eTCBSFlCJ_s', es: 'X-xCQ1gh-kA' },
  'Dumbbell Lunge':    { en: '3TM-vVWuLYE', es: '-iGRWD09Jn8' },
  'Chest Fly':         { en: 'eozdVDA78K0', es: 'xyHdY99F640' },
  'Hammer Curl':       { en: 'BRVDS6HVR9Q', es: 'znTSJ_2zJN0' },
  'Dumbbell Bench Press':          { en: 'z6A4W5Dib28', es: 'jrDDz7x1Dpo' },
  'Dumbbell Floor Press':          { en: 'Bx4QPVH-J1g', es: 'aHZuTZBrRAs' },
  'Dumbbell Shoulder Press':       { en: 'qEwKCR5JCog', es: 'o5M9RZ-vWrc' },
  'Arnold Press':                  { en: 'Tux8PGVa9wQ', es: 'Iy_oDX85OZo' },
  'One-Arm Dumbbell Row':          { en: 'dFzUjzfih7k', es: 'Pkr1WW3p05A' },
  'Dumbbell Pullover':             { en: '5lbvUCXfDU0', es: 'BnHyH5PmPFE' },
  'Goblet Squat':                  { en: 'gm4ln6PO4rc', es: 'FoQsAJ1n0Mk' },
  'Dumbbell Squat':                { en: 'v_c67Omje48', es: 'dqynXqte24o' },
  'Dumbbell Romanian Deadlift':    { en: 'hQgFixeXdZo', es: '7EFlWfvU59w' },
  'Dumbbell Split Squat':          { en: 'uODWo4YqbT8', es: 'Xfa3Ql_NwmE' },
  'Dumbbell Reverse Lunge':        { en: 'sjlsISvHyZs', es: 'uqvt79Uh4o4' },
  'Dumbbell Step-up':              { en: 'aKj-6hgiViA', es: 'CpKJ1B4iNwc' },
  'Dumbbell Calf Raise':           { en: 'hPA98_r-6e4', es: 'OF1lY_2uYc4' },
  'Front Raise':                   { en: '-t7fuZ0KhDA', es: 'joO2vLGujcA' },
  'Rear Delt Fly':                 { en: 'dKluhLck1Zs', es: 'K9RirVc6Rkk' },
  'Dumbbell Shrug':                { en: 'cJRVVxmytaM', es: 'Dwg9o97kUY8' },
  'Overhead Triceps Extension':    { en: '-Vyt2QdsR7E', es: 'fQ-KB40W3d8' },
  'Triceps Kickback':              { en: '6SS6K3lAwZ8', es: 'i_38xEoC5wA' },
  'Concentration Curl':            { en: 'Jvj2wV0vOYU' },
  'Incline Dumbbell Curl':         { en: 'HhHHBj3qTJ4', es: 'nw2Y9iHHzlU' },
  'Incline Bench Press':           { en: 'SrqOu55lrYU', es: 'vUMtItXfO8Y' },
  'Dips':                          { en: 'TrJVszDm7ik', es: 'DcS44T6Y5GQ' },
  'Push-up':                       { en: 'IODxDxX7oi4', es: 'b2UagYWNErY' },
  'Chin-up':                       { en: 'e1YSApl-QcM', es: '0dQJUwwUevk' },
  'Seated Cable Row':              { en: 'vwHG9Jfu4sw', es: 'Z8umZlW9ZM4' },
  'Leg Extension':                 { en: 'swZQC689o9U', es: 'Q2-N3JmOQvI' },
  'Leg Curl':                      { en: 'q1cKTmaeQWo', es: '9xbBr5Ytl8c' },
  'Hanging Leg Raise':             { en: 'Pr1ieGZ5atk', es: 'i7StVAy8RCk' },
  'Cable Crunch':                  { en: 'aBd6T01PBqw', es: 'ui3iEsYbXtI' },
  'Glute Bridge':                  { en: 'wPM8icPu6H8', es: 'NUFvi-gPojg' },
  'Hip Abduction':                 { en: 'OjI5OpV6IWA', es: '2vCRMi-lgJ4' },
  'Cable Kickback':                { en: 'l4zReIOfPCQ', es: 'EIst_zqP2dg' },
  'Back Extension':                { en: 'WJm88qItjeE', es: 'nMiVlx_gUzQ' },
  'Standing Hip Abduction':        { en: 'qBqKuEQl9sI', es: 'Lm1aljOSxQU' },
  'Single-leg Romanian Deadlift':  { en: 'lI8-igvsnVQ', es: 'DEREaLy-vdc' },
  'Walking Lunge':                 { en: 'Pbmj6xPo-Hw', es: 'uqvt79Uh4o4' },
  'Plank':                         { en: 'pSHjTRCQxIw', es: 'AoSrdEnYZo8' },
  'Side Plank':                    { en: 'XeN4pEZZJNI', es: '45t3tTcRcKE' },
  'Dead Bug':                      { en: 'lqnuY3wiBzA', es: '6VQZ2JokRtc' },
};

export function videoEmbedUrl(name: string, locale: Locale): string | null {
  const v = EXERCISE_VIDEOS[name];
  const id = v?.[locale] ?? v?.en;
  if (!id) return null;
  const q = new URLSearchParams({ autoplay: '1', playsinline: '1', rel: '0', hl: locale, cc_lang_pref: locale });
  return `https://www.youtube-nocookie.com/embed/${id}?${q}`;
}
