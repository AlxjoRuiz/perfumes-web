"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setStatus("error");
      setErrorMessage(result.error ?? "No pudimos enviar tu mensaje. Intenta de nuevo.");
      return;
    }

    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
  };

  if (status === "sent") {
    return (
      <p className="border border-[#e5ddd2] bg-[#f6f3f2] px-6 py-8 text-sm leading-7 text-[#44474d]">
        Gracias por escribirnos. Te responderemos pronto a tu correo.
      </p>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <Input label="Nombre" value={name} onChange={(event) => setName(event.target.value)} required />
      <Input
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Textarea
        label="Mensaje"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={6}
        required
      />
      <Button type="submit" disabled={status === "sending"} className="w-fit">
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </Button>
      {status === "error" ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
    </form>
  );
}
