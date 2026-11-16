const PATHS = {
  check: <path d="M20 6 9 17l-5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  flame: <path d="M12 22c4 0 7-2.8 7-7 0-4-3-6.5-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 4.5-5 8 0 4.2 3 7 7 7z" />,
  trophy: (<><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></>),
  dumbbell: <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />,
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  info: (<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>),
  play: <path d="m7 4 13 8-13 8z" />,
  home: <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" />,
  chart: (<><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></>),
};
export type IconName = keyof typeof PATHS;

export function Icon({ name, className = 'size-[22px]' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`flex-none ${className}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
