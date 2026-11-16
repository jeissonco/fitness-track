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

## What's in it

- **Today**: next workout in the push/pull/legs rotation, weekly stats and chart, streak, recent PRs
- **Train**: log sets (weight, reps), previous-session values, rest timer, PR alerts, add exercises
- **Cardio**: log run/bike/row/walk/swim with automatic pace or speed
- **Progress**: estimated 1-rep max per lift, cardio minutes per week
- **How-to sheets**: start/end photos, steps and muscles for each exercise (free-exercise-db, public domain)
- Light/dark theme, installable to the home screen

Data is currently saved in the browser only (`src/lib/store.ts`). New installs start with sample data and a "Start fresh" button.

## Project layout

| Path | What |
|---|---|
| `design/tokens.css` | Brand colours, type, spacing (single source, used by app and prototype) |
| `src/app/` | Routes: `/`, `/train`, `/cardio`, `/progress`, plus manifest and icons |
| `src/components/views/` | One component per screen |
| `src/lib/fitness.ts` | Data model, templates and stats (pure functions) |
| `src/lib/store.ts` | Browser storage; swapped for Supabase in the next step |
| `prototype/` | Original single-file HTML prototype (reference only) |

## Roadmap

1. ~~Next.js app with the prototype's screens~~
2. Accounts and online database (Supabase)
3. Machine photo scanner, custom/suggested sessions, programs (Beginner 6-Week, Full Body, PPL, Upper/Lower, Women's Strength & Glutes, Dumbbell/Home)
4. Deploy to Vercel, custom domain, privacy policy and terms
