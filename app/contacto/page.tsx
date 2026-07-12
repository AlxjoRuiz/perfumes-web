import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contacto - Aura Noir",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[720px] px-6 pb-20 pt-32 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#735c00] transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Volver al inicio
      </Link>

      <span className="mb-4 block font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e9c349]">
        Atención al cliente
      </span>
      <h1 className="mb-6 font-display text-[clamp(1.9rem,2.7vw,2.8rem)] font-semibold tracking-[-0.02em] text-black">
        Contáctanos
      </h1>
      <p className="mb-12 max-w-[52ch] text-[15px] leading-8 text-[#44474d]">
        Escríbenos y te responderemos lo antes posible a tu correo.
      </p>

      <ContactForm />
    </main>
  );
}
