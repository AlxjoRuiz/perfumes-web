"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { ADMIN_EMAIL_ALLOWLIST } from "@/components/admin/admin-allowlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminAuth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    if (!ADMIN_EMAIL_ALLOWLIST.includes(email.toLowerCase())) {
      setStatus("error");
      setMessage("Este correo no está autorizado para acceder al admin.");
      return;
    }

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage("Revisa tu correo para iniciar sesión.");
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar enlace"}
      </Button>
      {message ? <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}>{message}</p> : null}
    </form>
  );
}
