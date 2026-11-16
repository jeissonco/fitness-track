'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from './icons';
import { useAppState } from '@/lib/store';

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: '/', label: 'Today', icon: 'home' },
  { href: '/train', label: 'Train', icon: 'dumbbell' },
  { href: '/cardio', label: 'Cardio', icon: 'activity' },
  { href: '/progress', label: 'Progress', icon: 'chart' },
];

export function TabBar() {
  const path = usePathname();
  const state = useAppState();
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-20 border-t bg-[color-mix(in_srgb,var(--card)_88%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-[14px]">
      <div className="mx-auto grid max-w-[480px] grid-cols-4">
        {TABS.map((t) => {
          const active = t.href === '/' ? path === '/' : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-16 flex-col items-center justify-center gap-0.5 font-display text-sm font-bold uppercase tracking-[0.06em] transition-colors ${
                active ? 'text-primary-ink before:absolute before:inset-x-[30%] before:top-0 before:h-[3px] before:rounded-b-[3px] before:bg-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={t.icon} />
              {t.label}
              {t.href === '/train' && state?.active && (
                <span className="absolute top-3 right-[calc(50%-18px)] size-2 rounded-full bg-accent" aria-label="Workout in progress" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
