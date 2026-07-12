import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { AdminSession } from "@/components/admin/admin-session";
import { AdminNav } from "@/components/admin/admin-nav";

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
      setAll: async (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user?.email) {
    redirect("/admin");
  }

  const email = session.user.email.toLowerCase();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("email", email)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin?error=unauthorized");
  }

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-10 lg:px-8">
      <AdminSession />
      <AdminNav />
      {children}
    </div>
  );
}
