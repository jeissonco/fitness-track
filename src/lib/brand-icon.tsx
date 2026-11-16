import { ImageResponse } from "next/og";

/** Volt dumbbell mark on ink. `pad` shrinks the mark for maskable/Apple icons that get cropped. */
export function brandIcon(size: number, pad = 0.18) {
  const inner = Math.round(size * (1 - pad * 2));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0c" }}>
        <div
          style={{
            width: inner, height: inner, borderRadius: inner * 0.22, background: "#d4ff3a",
            display: "flex", alignItems: "center", justifyContent: "center", transform: "skewX(-8deg)",
          }}
        >
          <svg width={inner * 0.66} height={inner * 0.66} viewBox="0 0 24 24" fill="none" stroke="#0b0b0c" strokeWidth={2.6} strokeLinecap="round">
            <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
          </svg>
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
