import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_KEY, SUPABASE_URL, isPublicPath, supabaseConfigured } from '@/lib/supabase/config';

/* Refreshes the Supabase session cookie on every page request and sends
 * signed-out visitors to /login. This is only the optimistic check: the
 * database's row-level security is what actually protects each user's data. */
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!supabaseConfigured) {
    return isPublicPath(path) ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list, headers) {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  // getClaims() validates the JWT; it must run before any redirect so refreshed cookies are kept.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims?.sub);

  const redirect = (to: string) => {
    const r = NextResponse.redirect(new URL(to, request.url));
    response.cookies.getAll().forEach((c) => r.cookies.set(c));
    return r;
  };
  if (!signedIn && !isPublicPath(path)) return redirect(path === '/' ? '/login' : `/login?next=${encodeURIComponent(path)}`);
  if (signedIn && path === '/login') return redirect('/');
  return response;
}

export const config = {
  // Pages only: skip build assets, icons and the manifest.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)'],
};
