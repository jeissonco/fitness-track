import type { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';

/* Landing page for the link in Supabase's confirmation email.
 * Handles both link styles: `token_hash` (works on any device; needs the email
 * template change in the README) and the default `code` (same browser only). */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') ?? '/';
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';

  const supabase = await serverSupabase();
  const { error } = tokenHash && type
    ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
    : code
      ? await supabase.auth.exchangeCodeForSession(code)
      : { error: new Error('Missing token') };

  if (error) return NextResponse.redirect(new URL('/login?error=link', request.url));
  return NextResponse.redirect(new URL(safeNext, request.url));
}
