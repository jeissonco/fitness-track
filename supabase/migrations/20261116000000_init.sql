-- Fitness Track: per-user workout log.
-- Run once in the Supabase SQL editor (or `supabase db push`).
-- Every table is locked to its owner with row-level security.

-- Saved strength sessions. Sets are stored as JSON on the workout:
-- [{ "name": "Bench Press", "sets": [{ "kg": 80, "reps": 5 }, ...] }, ...]
create table public.workouts (
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id           text not null,
  date         date not null,
  template     text,
  name         text not null,
  duration_min integer not null default 0 check (duration_min >= 0),
  exercises    jsonb not null default '[]'::jsonb,
  created_at   timestamptz not null default now(),
  primary key (user_id, id)
);
create index workouts_user_date on public.workouts (user_id, date);

create table public.cardio_sessions (
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id         text not null,
  date       date not null,
  kind       text not null check (kind in ('Run', 'Bike', 'Row', 'Walk', 'Swim', 'Other')),
  min        integer not null check (min > 0),
  km         real check (km > 0),
  hr         integer check (hr > 0),
  rpe        integer not null check (rpe between 1 and 10),
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
create index cardio_sessions_user_date on public.cardio_sessions (user_id, date);

-- One row per user: position in the push/pull/legs rotation and the workout in progress.
create table public.user_state (
  user_id    uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  rotation   integer not null default 0,
  active     jsonb,
  updated_at timestamptz not null default now()
);

alter table public.workouts        enable row level security;
alter table public.cardio_sessions enable row level security;
alter table public.user_state      enable row level security;

-- (select auth.uid()) is evaluated once per query instead of once per row.
create policy "Own workouts" on public.workouts
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Own cardio sessions" on public.cardio_sessions
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Own state" on public.user_state
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
