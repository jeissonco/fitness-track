/** Shown for the instant before saved data is read from the browser. */
export function PageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading">
      <div className="h-6 w-40 animate-pulse rounded bg-muted" />
      <div className="h-32 w-3/4 animate-pulse rounded bg-muted" />
      <div className="h-64 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}
