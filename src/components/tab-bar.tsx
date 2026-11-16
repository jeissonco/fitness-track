'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from './icons';
import { useAppState } from '@/lib/store';
import { isPublicPath } from '@/lib/supabase/config';
import { type Dict, useT } from '@/lib/i18n';

const TABS: { href: string; label: keyof Dict['nav']; icon: IconName }[] = [
  { href: '/', label: 'today', icon: 'home' },
  { href: '/train', label: 'train', icon: 'dumbbell' },
  { href: '/plans', label: 'plans', icon: 'calendar' },
  { href: '/cardio', label: 'cardio', icon: 'activity' },
  { href: '/progress', label: 'progress', icon: 'chart' },
];

export function TabBar() {
  const path = usePathname();
  const state = useAppState();
  const t = useT();
  if (isPublicPath(path)) return null;
  return (
    <nav aria-label={t.nav.label} className="fixed inset-x-0 bottom-0 z-20 border-t bg-[color-mix(in_srgb,var(--card)_88%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-[14px]">
      <div className="mx-auto grid max-w-[480px] grid-cols-5">
        {TABS.map((tab) => {
          const active = tab.href === '/' ? path === '/' : path.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-16 flex-col items-center justify-center gap-0.5 font-display text-[13px] font-bold uppercase tracking-[0.04em] transition-colors ${
                active ? 'text-primary-ink before:absolute before:inset-x-[30%] before:top-0 before:h-[3px] before:rounded-b-[3px] before:bg-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={tab.icon} />
              {t.nav[tab.label]}
              {tab.href === '/train' && state?.active && (
                <span className="absolute top-3 right-[calc(50%-18px)] size-2 rounded-full bg-accent" aria-label={t.nav.active} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
