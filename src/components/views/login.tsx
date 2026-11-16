'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { supabaseConfigured } from '@/lib/supabase/config';
import { type Dict, useT } from '@/lib/i18n';

type Mode = 'signin' | 'signup';

/** Reads the URL, so the page renders it inside <Suspense>. */
export function LoginView() {
  const params = useSearchParams();
  const router = useRouter();
  const t = useT(), tl = t.login;
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  // Error keys rather than text, so the message follows a language switch.
  const [error, setError] = useState<keyof Dict['login'] | string>(() => (params.get('error') === 'link' ? 'linkExpired' : ''));
  const [sentTo, setSentTo] = useState('');

  // Where to go after signing in: ?next=/path, same-site paths only.
  const n = params.get('next') ?? '/';
  const next = n.startsWith('/') && !n.startsWith('//') ? n : '/';

  if (!supabaseConfigured) {
    return (
      <div className="card space-y-2">
        <h1 className="section-title">Setup needed</h1>
        <p className="m-0 text-sm text-muted-foreground">
          Supabase keys are missing. Copy <code>.env.example</code> to <code>.env.local</code>, fill in your project URL and publishable key, then restart <code>npm run dev</code>.
        </p>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) return setError('needEmail');
    if (password.length < (mode === 'signup' ? 8 : 1)) return setError(mode === 'signup' ? 'shortPassword' : 'needPassword');
    setBusy(true);
    const auth = supabase().auth;
    const { data, error } = mode === 'signin'
      ? await auth.signInWithPassword({ email, password })
      : await auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/confirm` } });
    setBusy(false);
    if (error) return setError(errorKey(error.message));
    // Sign-up with email confirmation on returns a user but no session until the link is clicked.
    if (!data.session) return setSentTo(email);
    router.replace(next);
  };

  if (sentTo) {
    return (
      <section className="space-y-4">
        <h1 className="display text-5xl">{tl.check[0]}<br /><span className="text-primary-ink">{tl.check[1]}</span></h1>
        <p className="text-muted-foreground">{tl.sent[0]}<b className="text-foreground">{sentTo}</b>{tl.sent[1]}</p>
        <button className="btn btn-ghost w-full" onClick={() => { setSentTo(''); setMode('signin'); }}>{tl.back}</button>
      </section>
    );
  }

  const message = error in tl ? (tl[error as keyof typeof tl] as string) : error;
  const field = 'field-input font-sans text-base font-medium focus:border-primary focus:outline-none';
  const head = mode === 'signin' ? tl.welcome : tl.join;
  return (
    <section className="space-y-6">
      <h1 className="display text-[4rem]">{head[0]}<br /><em className="not-italic text-primary-ink">{head[1]}</em></h1>

      <form className="card space-y-4" onSubmit={submit} noValidate>
        <div>
          <label className="label" htmlFor="email">{tl.email}</label>
          <input id="email" className={field} type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
        </div>
        <div>
          <label className="label" htmlFor="password">{tl.password}</label>
          <input id="password" className={field} type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} />
          {mode === 'signup' && <p className="mt-2 mb-0 text-xs text-muted-foreground">{tl.min8}</p>}
        </div>
        {message && <p role="alert" className="m-0 text-sm font-semibold text-destructive">{message}</p>}
        <button className="btn btn-primary w-full" disabled={busy}>{busy ? tl.wait : mode === 'signin' ? tl.signIn : tl.create}</button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {mode === 'signin' ? tl.newHere : tl.haveAccount}{' '}
        <button className="font-bold text-foreground underline underline-offset-4" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}>
          {mode === 'signin' ? tl.createLink : tl.signIn}
        </button>
      </p>
    </section>
  );
}

/** Our message for Supabase's common auth errors; anything else is shown as Supabase wrote it. */
function errorKey(msg: string): keyof Dict['login'] | string {
  if (/invalid login credentials/i.test(msg)) return 'wrong';
  if (/email not confirmed/i.test(msg)) return 'unconfirmed';
  if (/already registered/i.test(msg)) return 'exists';
  return msg;
}
