import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Política de privacidad - Aura Noir",
};

export default function PrivacyPolicyPage() {
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
      <h1 className="mb-10 font-display text-[clamp(1.9rem,2.7vw,2.8rem)] font-semibold tracking-[-0.02em] text-black">
        Política de privacidad
      </h1>

      <div className="grid gap-10 text-[15px] leading-8 text-[#44474d]">
        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-black">Qué información recopilamos</h2>
          <p>
            Cuando escribes por nuestro <Link href="/contacto" className="font-semibold text-[#735c00] underline">formulario de contacto</Link>,
            guardamos tu nombre, correo electrónico y el mensaje que nos envías. Usamos esta
            información únicamente para responder tu solicitud.
          </p>
          <p className="mt-4">
            El carrito de compras se guarda solo en tu navegador (almacenamiento local) y no se
            envía a nuestros servidores hasta que confirmas tu pedido por WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-black">Cómo usamos tu información</h2>
          <p>
            No compartimos tus datos con terceros para fines publicitarios. La información que nos
            compartes se usa exclusivamente para atender tu pedido o tu mensaje de contacto.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-black">Tus derechos</h2>
          <p>
            Puedes solicitar en cualquier momento que eliminemos la información que nos hayas
            compartido, escribiéndonos desde nuestra página de <Link href="/contacto" className="font-semibold text-[#735c00] underline">contacto</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
