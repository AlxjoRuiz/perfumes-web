import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { AdminSession } from "@/components/admin/admin-session";
import { ADMIN_EMAIL_ALLOWLIST } from "@/components/admin/admin-allowlist";

export const metadata: Metadata = {
  title: "Admin - Aura Noir",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: async () =>
        (await cookieStore.getAll()).map((cookie) => ({ name: cookie.name, value: cookie.value })),
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user?.email) {
    redirect("/admin");
  }

  const email = session.user.email.toLowerCase();
  if (!ADMIN_EMAIL_ALLOWLIST.includes(email)) {
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <AdminSession />
      {children}
    </div>
  );
}
