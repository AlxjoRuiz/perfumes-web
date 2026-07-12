"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminAuth() {
  const [status, setStatus] = useState<"idle" | "redirecting" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleGoogleSignIn = async () => {
    setStatus("redirecting");
    setMessage("");

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="grid gap-4">
      <Button type="button" onClick={handleGoogleSignIn} disabled={status === "redirecting"}>
        {status === "redirecting" ? "Redirigiendo..." : "Iniciar sesión con Google"}
      </Button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-[#735c00]"}`}>{message}</p>
      ) : null}
    </div>
  );
}
