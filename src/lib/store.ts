'use client';

/* Browser-only app state, persisted to localStorage.
 * Every screen reads it through useAppState(); every change goes through update().
 * Step 3 (Supabase) replaces load/persist without the screens needing to change. */

import { useSyncExternalStore } from 'react';
import { type AppState, emptyState, seedData } from './fitness';

const KEY = 'fitness-track.v1';

let state: AppState | null = null;
const listeners = new Set<() => void>();

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (Array.isArray(parsed.workouts) && Array.isArray(parsed.cardio)) {
        if (parsed.active && parsed.active.rest === undefined) parsed.active.rest = null;
        return parsed;
      }
    }
  } catch {
    /* corrupt or unavailable storage: fall through to sample data */
  }
  return seedData();
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked (private mode) — keep working in memory */
  }
}

function getSnapshot(): AppState {
  if (!state) state = load();
  return state;
}
const getServerSnapshot = () => null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Keep tabs in sync when the app is open twice.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) { state = load(); cb(); }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

/** Current state, or null while rendering on the server / before hydration. */
export function useAppState(): AppState | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Apply a change. The recipe mutates a copy, so React sees a new object. */
export function update(recipe: (draft: AppState) => void) {
  const draft = structuredClone(getSnapshot());
  recipe(draft);
  state = draft;
  persist();
  listeners.forEach((l) => l());
}

export function resetToEmpty() {
  state = emptyState();
  persist();
  listeners.forEach((l) => l());
}

export function getState() {
  return getSnapshot();
}
