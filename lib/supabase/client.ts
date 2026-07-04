import { createBrowserClient as createAuthBrowserClient } from "@supabase/auth-helpers-react";

export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing public Supabase environment variables.");
  }

  return createAuthBrowserClient(supabaseUrl, supabaseAnonKey, {
    isSingleton: true,
  });
}
