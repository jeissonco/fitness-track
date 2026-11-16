'use client';

import { signOut, useAccount } from '@/lib/store';
import { useT } from '@/lib/i18n';

/** Initial of the signed-in user; tap to sign out. Hidden while signed out. */
export function AccountButton() {
  const account = useAccount();
  const t = useT();
  if (!account) return null;
  return (
    <button
      onClick={() => confirm(t.signOutConfirm(account.email)) && signOut()}
      className="grid size-[var(--tap)] place-items-center rounded-full border bg-card font-display text-lg font-extrabold uppercase"
      aria-label={t.signedInAs(account.email)}
      title={account.email}
    >
      {account.email.charAt(0)}
    </button>
  );
}
