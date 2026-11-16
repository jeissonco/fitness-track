'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from './config';

let client: SupabaseClient | null = null;

/** Shared browser client. The session lives in cookies so proxy.ts can read it too. */
export function supabase(): SupabaseClient {
  if (!supabaseConfigured) throw new Error('Supabase is not configured: set the keys in .env.local');
  return (client ??= createBrowserClient(SUPABASE_URL, SUPABASE_KEY));
}
