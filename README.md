# Fitness Track

Strength and cardio tracker, built as an installable web app (PWA).
Brand: near-black base, volt lime for strength, heat orange for cardio, Barlow Condensed + Barlow.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Supabase setup (once)

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run each file in [`supabase/migrations/`](supabase/migrations/) once, oldest first: `20261116000000_init.sql` creates the tables and locks each row to its owner; `20261117000000_plans.sql` adds training-plan progress.
3. Copy `.env.example` to `.env.local` and fill in the project URL and publishable key (**Project Settings > API Keys**). Restart `npm run dev`.
4. In **Authentication > URL Configuration**, set the Site URL to `http://localhost:3000` (your real domain once deployed) and add `http://localhost:3000/auth/confirm` to the redirect URLs.
5. Recommended: in **Authentication > Emails > Confirm signup**, change the link to
   `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
   so the confirmation link works even when opened on a different device than the one used to sign up.

Supabase's built-in email sender is rate-limited and meant for testing; add your own SMTP server under **Authentication > Emails** before launch.

## What's in it

- **Today**: next workout (from your plan, or the push/pull/legs rotation), weekly stats and chart, streak, recent PRs
- **Plans**: a catalog of 22 original training plans (mostly beginner; 9 glute & leg plans for women that still train the whole body; 5 home/dumbbell plans; upper/lower, push/pull/legs and strength), filterable by category and days per week. Follow one and Today/Train line up each workout with target sets and reps. See `src/lib/plan-catalog.ts` for the sources behind them
- **Train**: push/pull/legs rotation plus a dumbbell full-body session; log sets (weight, reps), previous-session values, rest timer, PR alerts. The workout clock starts with the first ticked set (or the Start button), not when the session is opened. 49 exercises to add, grouped by equipment (20 with dumbbells)
- **Cardio**: log run/bike/row/walk/swim with automatic pace or speed
- **Progress**: estimated 1-rep max per lift, cardio minutes per week
- **How-to sheets**: start/end photos, steps and muscles for each exercise (free-exercise-db, public domain), and a short form video that plays inside the app (YouTube, privacy-enhanced mode)
- English and Spanish (toggle in the header; defaults to the device language), light/dark theme, installable to the home screen

- Accounts (email + password). Signed-out visitors are sent to `/login`.

Each user's log is stored in Supabase and cached on the device, so the app opens instantly and keeps working offline; changes queue up and sync when the connection returns (`src/lib/store.ts`). On first sign-in, data saved in the browser by the pre-account version is offered for upload.

## Project layout

| Path | What |
|---|---|
| `design/tokens.css` | Brand colours, type, spacing (single source, used by app and prototype) |
| `src/app/` | Routes: `/`, `/train`, `/cardio`, `/progress`, plus manifest and icons |
| `src/components/views/` | One component per screen |
| `src/lib/fitness.ts` | Data model, templates and stats (pure functions) |
| `src/lib/i18n.ts` | All English and Spanish text, and the chosen language |
| `src/lib/plans.ts`, `plan-catalog.ts` | Plan types and progress maths; the plan catalog (English and Spanish) |
| `src/lib/exercise-info.ts`, `exercise-es.ts`, `exercise-videos.ts` | How-to data, its Spanish translation, and one video per exercise per language |
| `src/lib/store.ts` | App state: Supabase sync, offline cache and write queue |
| `src/lib/supabase/` | Supabase clients (browser and server) and config |
| `src/proxy.ts` | Refreshes the login cookie, redirects signed-out visitors |
| `src/app/login/`, `src/app/auth/confirm/` | Sign in / sign up, email confirmation link |
| `supabase/migrations/` | Database schema and row-level security |
| `prototype/` | Original single-file HTML prototype (reference only) |

## Roadmap

1. ~~Next.js app with the prototype's screens~~
2. ~~Accounts and online database (Supabase)~~ (still to add: password reset, Google sign-in)
3. ~~Programs catalog~~ (22 plans); still to do: machine photo scanner, custom/suggested sessions
4. Deploy to Vercel, custom domain, privacy policy and terms
