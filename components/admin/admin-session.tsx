"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminSession() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  if (!email) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-[#e5ddd2] bg-[#fcf9f8] p-4 text-sm text-[#44474d]">
      <span>Sesión iniciada como <strong>{email}</strong></span>
      <Button variant="ghost" onClick={handleSignOut} className="!px-4 !py-3">
        Cerrar sesión
      </Button>
    </div>
  );
}
