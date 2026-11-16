const NEXT_UP = [
  { name: "Bench Press", detail: "3×5 · 80 kg" },
  { name: "Overhead Press", detail: "3×5 · 47.5 kg" },
  { name: "Incline DB Press", detail: "3×10 · 26 kg" },
  { name: "Triceps Pushdown", detail: "3×12 · 30 kg" },
];

const STATS = [
  { value: "2", unit: "/3", label: "Sessions" },
  { value: "8.4", unit: "t", label: "Volume" },
  { value: "56", unit: "min", label: "Cardio" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-[480px] px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-24">
      <header className="mb-6 flex items-center gap-2 font-display text-[1.375rem] font-extrabold uppercase tracking-wide">
        <span className="grid size-7 -skew-x-[8deg] place-items-center rounded-lg bg-primary text-primary-foreground">
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
          </svg>
        </span>
        Fitness Track
      </header>

      <section className="mb-6">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Next.js app · setup check</p>
        <h1 className="mt-2 font-display text-[4rem] font-extrabold uppercase leading-[0.92]">
          Let&apos;s
          <br />
          <em className="not-italic text-primary-ink">lift.</em>
        </h1>
      </section>

      <div className="space-y-4">
        <article className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] opacity-70">Next up</p>
          <h2 className="mt-1 mb-4 font-display text-5xl font-extrabold uppercase leading-[0.92]">Push day</h2>
          <ul className="mb-5 grid gap-1.5">
            {NEXT_UP.map((e) => (
              <li key={e.name} className="flex justify-between border-b border-black/10 pb-1.5 font-semibold">
                <span>{e.name}</span>
                <span className="tabular-nums">{e.detail}</span>
              </li>
            ))}
          </ul>
          <button className="min-h-[52px] w-full rounded-md bg-[var(--ink-950)] font-display text-lg font-extrabold uppercase tracking-wider text-[var(--volt-400)] active:scale-[.97]">
            Start workout →
          </button>
        </article>

        <div className="grid grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border bg-card px-4 py-3">
              <b className="block font-display text-4xl font-extrabold leading-none tabular-nums">
                {s.value}
                <small className="ml-0.5 text-base font-semibold text-muted-foreground">{s.unit}</small>
              </b>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Placeholder data. The real screens get ported from <code>prototype/</code> next.
        </p>
      </div>
    </main>
  );
}
