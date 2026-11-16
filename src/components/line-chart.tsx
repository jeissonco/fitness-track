import { fmtDate } from '@/lib/fitness';

/** Small SVG area/line chart for estimated 1RM over time. */
export function LineChart({ pts }: { pts: { date: string; y: number }[] }) {
  const W = 320, H = 170, L = 6, R = 6, T = 22, B = 22;
  const ys = pts.map((p) => p.y);
  let lo = Math.min(...ys), hi = Math.max(...ys);
  if (hi - lo < 2) { hi += 1; lo -= 1; }
  const pd = (hi - lo) * 0.18;
  lo -= pd; hi += pd;
  const x = (i: number) => L + (pts.length === 1 ? 0.5 : i / (pts.length - 1)) * (W - L - R);
  const y = (v: number) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.y).toFixed(1)}`).join(' ');
  const last = pts.length - 1;
  return (
    <svg
      className="block h-auto w-full text-chart-1"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Estimated one rep max from ${Math.round(pts[0].y)} to ${Math.round(pts[last].y)} kilograms`}
    >
      {[0, 0.5, 1].map((f) => (
        <line key={f} x1={0} x2={W} y1={T + f * (H - T - B)} y2={T + f * (H - T - B)} stroke="var(--border)" strokeWidth={1} />
      ))}
      <path d={`${d} L${x(last)} ${H - B} L${x(0)} ${H - B} Z`} fill="currentColor" fillOpacity={0.14} />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.y)} r={i === last ? 5 : 2.5} fill={i === last ? 'currentColor' : 'var(--card)'} stroke="currentColor" strokeWidth={2}>
          <title>{`${fmtDate(p.date)}: ${Math.round(p.y)} kg`}</title>
        </circle>
      ))}
      <text x={Math.min(x(last), W - 4)} y={y(pts[last].y) - 10} textAnchor="end" className="fill-foreground font-display text-[13px] font-extrabold">
        {Math.round(pts[last].y)}
      </text>
      <text x={0} y={H - 4} className="fill-muted-foreground text-[10px] font-semibold">{fmtDate(pts[0].date)}</text>
      <text x={W} y={H - 4} textAnchor="end" className="fill-muted-foreground text-[10px] font-semibold">{fmtDate(pts[last].date)}</text>
    </svg>
  );
}
