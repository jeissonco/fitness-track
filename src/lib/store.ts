'use client';

/* App state for the signed-in user, kept in sync with Supabase.
 * Every screen reads it through useAppState(); every change goes through update().
 *
 * - A copy is cached in localStorage per user, so screens open instantly and work offline.
 * - Each update() is diffed against the previous state and the resulting writes are
 *   queued in an outbox (also in localStorage), then sent in order. Failed sends are
 *   retried when the device comes back online.
 * - Saved workouts and cardio sessions are never edited in place, so the diff only
 *   looks for added and removed ids. The rotation and the in-progress workout go to
 *   one user_state row, debounced so typing in a set doesn't send a request per key. */

import { useSyncExternalStore } from 'react';
import type { PostgrestError, Session } from '@supabase/supabase-js';
import { type AppState, type CardioSession, type Workout, emptyState } from './fitness';
import { supabase } from './supabase/client';
import { isPublicPath, supabaseConfigured } from './supabase/config';
import { t } from './i18n';
import { toast } from '@/components/toast';

export interface Account { id: string; email: string }

type Table = 'workouts' | 'cardio_sessions' | 'user_state';
type Op = { k: 'put'; table: Table; row: Record<string, unknown> } | { k: 'del'; table: Table; id: string };

/** Browser-only data from before accounts existed. Offered for upload on first sign-in. */
const LEGACY_KEY = 'fitness-track.v1';
const LEGACY_KEPT = 'fitness-track.v1.kept';
const cacheKey = (uid: string) => `fitness-track.v2.${uid}`;
const outboxKey = (uid: string) => `fitness-track.v2.${uid}.outbox`;

let account: Account | null = null;
let state: AppState | null = null;
let outbox: Op[] = [];
let started = false;
let flushing: Promise<void> | null = null;
let flushTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked (private mode): keep working in memory */
  }
}
function remove(...keys: string[]) {
  try { keys.forEach((k) => localStorage.removeItem(k)); } catch {}
}

/* ---------------- Row mapping ---------------- */
const workoutRow = (uid: string, w: Workout) => ({
  user_id: uid, id: w.id, date: w.date, template: w.template, name: w.name, duration_min: w.durationMin, exercises: w.exercises, plan: w.plan ?? null,
});
const fromWorkoutRow = (r: ReturnType<typeof workoutRow>): Workout => ({
  id: r.id, date: r.date, template: r.template, name: r.name, durationMin: r.duration_min, exercises: r.exercises, plan: r.plan,
});
const cardioRow = (uid: string, c: CardioSession) => ({ user_id: uid, ...c });
const fromCardioRow = ({ id, date, kind, min, km, hr, rpe }: CardioSession): CardioSession => ({ id, date, kind, min, km, hr, rpe });
const stateRow = (uid: string, s: AppState) => ({ user_id: uid, rotation: s.rotation, active: s.active, plan: s.plan ?? null, updated_at: new Date().toISOString() });

/** The writes that turn `prev` into `next`. */
function diff(uid: string, prev: AppState, next: AppState): Op[] {
  const ops: Op[] = [];
  const list = <T extends { id: string }>(table: Table, a: T[], b: T[], row: (uid: string, x: T) => Record<string, unknown>) => {
    const before = new Set(a.map((x) => x.id)), after = new Set(b.map((x) => x.id));
    for (const x of b) if (!before.has(x.id)) ops.push({ k: 'put', table, row: row(uid, x) });
    for (const x of a) if (!after.has(x.id)) ops.push({ k: 'del', table, id: x.id });
  };
  list('workouts', prev.workouts, next.workouts, workoutRow);
  list('cardio_sessions', prev.cardio, next.cardio, cardioRow);
  if (prev.rotation !== next.rotation || JSON.stringify(prev.active) !== JSON.stringify(next.active) || JSON.stringify(prev.plan) !== JSON.stringify(next.plan))
    ops.push({ k: 'put', table: 'user_state', row: stateRow(uid, next) });
  return ops;
}

/* ---------------- Outbox ---------------- */
function enqueue(ops: Op[]) {
  if (!account || !ops.length) return;
  for (const op of ops) {
    // Only the latest user_state matters.
    if (op.table === 'user_state') outbox = outbox.filter((o) => o.table !== 'user_state');
    outbox.push(op);
  }
  write(outboxKey(account.id), outbox);
  scheduleFlush(ops.every((o) => o.table === 'user_state') ? 1000 : 0);
}

function scheduleFlush(ms: number) {
  clearTimeout(flushTimer);
  flushTimer = setTimeout(() => void flush(), ms);
}

/* Errors that mean the database is behind the app (a migration not run yet): keep the change
 * and retry, so nothing is lost while the migration is applied. */
const SCHEMA_BEHIND = new Set(['PGRST204', 'PGRST205', '42703', '42P01']);
/** A network, expired-session or missing-migration error is worth retrying; a rejected row is not. */
const retryable = (e: PostgrestError) => !navigator.onLine || !e.code || e.code.startsWith('PGRST3') || SCHEMA_BEHIND.has(e.code);

/** Send queued writes in order. Resolves once the queue is empty or a send failed. */
function flush(): Promise<void> {
  clearTimeout(flushTimer);
  return (flushing ??= (async () => {
    while (account && outbox.length) {
      const uid = account.id, op = outbox[0], q = supabase().from(op.table);
      const { error } = op.k === 'put' ? await q.upsert(op.row) : await q.delete().eq('user_id', uid).eq('id', op.id);
      if (account?.id !== uid) return;
      if (error && retryable(error)) { scheduleFlush(15000); return; }
      if (error) {
        console.error('Dropped a change Supabase rejected', op, error);
        toast(t().sync.rejected);
      }
      // Remove by identity: a newer user_state op may have replaced queued ones meanwhile.
      outbox = outbox.filter((o) => o !== op);
      write(outboxKey(uid), outbox);
    }
  })().finally(() => { flushing = null; }));
}

/* ---------------- Session & loading ---------------- */
function start() {
  if (started || !supabaseConfigured) return;
  started = true;
  // Supabase recommends not awaiting other calls inside this callback, so defer the work.
  supabase().auth.onAuthStateChange((_event, session) => { setTimeout(() => onSession(session), 0); });
  addEventListener('online', () => void flush());
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') void flush(); });
  // Keep tabs in sync when the app is open twice.
  addEventListener('storage', (e) => {
    if (account && e.key === cacheKey(account.id)) {
      const s = read<AppState>(e.key);
      if (s) { state = s; notify(); }
    }
  });
}

function onSession(session: Session | null) {
  const user = session?.user;
  if (!user) {
    if (account) { account = null; state = null; outbox = []; notify(); }
    // A full page load on purpose: it drops everything held in memory for the old user.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    if (!isPublicPath(location.pathname)) location.assign('/login');
    return;
  }
  if (account?.id === user.id) return; // token refresh, nothing new
  account = { id: user.id, email: user.email ?? '' };
  state = read<AppState>(cacheKey(user.id));
  outbox = read<Op[]>(outboxKey(user.id)) ?? [];
  notify();
  void loadRemote(user.id);
}

async function loadRemote(uid: string) {
  await flush();
  // Still offline with unsent changes: the cached copy is the newest we have.
  if (outbox.length && state) return;
  const db = supabase();
  const [w, c, s] = await Promise.all([
    db.from('workouts').select('*').order('date').order('created_at').order('id'),
    db.from('cardio_sessions').select('*').order('date').order('created_at'),
    db.from('user_state').select('*').maybeSingle(),
  ]);
  if (account?.id !== uid) return;
  const error = w.error || c.error || s.error;
  if (error) {
    console.error('Loading from Supabase failed', error);
    if (!state) { toast(t().sync.loadFailed); setTimeout(() => void loadRemote(uid), 5000); }
    return;
  }
  // Something was changed while the request was in flight: keep the local copy.
  if (outbox.length) return;
  set({
    workouts: w.data.map(fromWorkoutRow),
    cardio: c.data.map(fromCardioRow),
    active: s.data?.active ?? null,
    rotation: s.data?.rotation ?? 0,
    plan: s.data?.plan ?? null,
    demo: false,
  });
  if (!w.data.length && !c.data.length) offerLegacyImport();
}

function offerLegacyImport() {
  const old = read<AppState>(LEGACY_KEY);
  if (!old || old.demo || read(LEGACY_KEPT)) return;
  const nw = old.workouts?.length ?? 0, nc = old.cardio?.length ?? 0;
  if (!nw && !nc) return;
  if (!confirm(t().sync.importConfirm(nw, nc))) {
    write(LEGACY_KEPT, true);
    return;
  }
  update((s) => {
    s.workouts = old.workouts;
    s.cardio = old.cardio;
    s.rotation = old.rotation || 0;
    s.active = old.active ? { ...old.active, rest: null } : null;
  });
  remove(LEGACY_KEY);
  toast(t().sync.copied);
}

function set(next: AppState) {
  state = next;
  if (account) write(cacheKey(account.id), next);
  notify();
}

/* ---------------- Public API ---------------- */
function subscribe(cb: () => void) {
  start();
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

/** Current state, or null while signed out, rendering on the server, or loading for the first time. */
export function useAppState(): AppState | null {
  return useSyncExternalStore(subscribe, () => state, () => null);
}

/** The signed-in user, or null. */
export function useAccount(): Account | null {
  return useSyncExternalStore(subscribe, () => account, () => null);
}

/** Apply a change. The recipe mutates a copy, so React sees a new object. No-op until data has loaded. */
export function update(recipe: (draft: AppState) => void) {
  if (!state || !account) return;
  const prev = state, draft = structuredClone(prev);
  recipe(draft);
  set(draft);
  enqueue(diff(account.id, prev, draft));
}

export function resetToEmpty() {
  update((s) => Object.assign(s, emptyState()));
}

export function getState(): AppState {
  return state ?? emptyState();
}

/** Send pending changes, then sign out and clear this user's cached copy from the device. */
export async function signOut() {
  const uid = account?.id;
  await flush();
  if (outbox.length && !confirm(t().sync.unsynced)) return;
  await supabase().auth.signOut();
  if (uid) remove(cacheKey(uid), outboxKey(uid));
}
