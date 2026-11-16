/* Project URL and publishable key, from .env.local (see .env.example).
 * Both are safe to expose to the browser: row-level security protects the data. */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** Pages a signed-out visitor may open. */
export const isPublicPath = (path: string) => path === '/login' || path.startsWith('/auth/');
