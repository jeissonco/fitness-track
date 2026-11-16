-- Training plans: which plan a user follows, and which plan workout each saved workout came from.
-- Run once in the Supabase SQL editor after 20261116000000_init.sql.

-- { "id": "glute-foundations", "started": "2026-11-17", "done": 4 }
alter table public.user_state add column if not exists plan jsonb;

-- "planId/workoutKey", e.g. "glute-foundations/A"
alter table public.workouts add column if not exists plan text;
