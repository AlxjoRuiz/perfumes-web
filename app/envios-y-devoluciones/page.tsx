import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Envíos y devoluciones - Theonys Parfum",
};

export default function ShippingAndReturnsPage() {
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
        Envíos y devoluciones
      </h1>

      <div className="grid gap-10 text-[15px] leading-8 text-[#44474d]">
        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-black">Envíos</h2>
          <p>
            Una vez confirmamos tu pedido por WhatsApp, coordinamos el envío directamente contigo:
            dirección de entrega, tiempo estimado y costo según tu ciudad. Recibirás el número de
            guía o el detalle de la entrega por el mismo canal.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-black">Devoluciones y cambios</h2>
          <p>
            Si tu fragancia llega en mal estado o no corresponde a lo solicitado, escríbenos por
            WhatsApp o desde nuestro <Link href="/contacto" className="font-semibold text-[#735c00] underline">formulario de contacto</Link> dentro
            de los primeros días después de recibir tu pedido, y coordinamos el cambio o la
            devolución.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-black">¿Dudas?</h2>
          <p>
            Escríbenos desde la página de <Link href="/contacto" className="font-semibold text-[#735c00] underline">contacto</Link> y te
            respondemos a la brevedad.
          </p>
        </section>
      </div>
    </main>
  );
}
