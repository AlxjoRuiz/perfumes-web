import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { getActiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const scentNotes = [
  { number: "01", title: "Notas de salida", desc: "El despertar sensorial inicial" },
  { number: "02", title: "Notas de corazón", desc: "El carácter y la narrativa central" },
  { number: "03", title: "Notas de fondo", desc: "La memoria duradera y misteriosa" },
];

export default async function Home() {
  const { products, source, error } = await getActiveProducts();
  const shouldShowCatalogNote = source !== "supabase" || Boolean(error);

  return (
    <>
      <section id="page-hero" className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1280px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:px-8 lg:py-0">
          <div className="relative z-10 lg:col-span-5 lg:max-w-[460px] lg:py-16">
            <span className="mb-7 block font-body text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d2a03d]">
              Esencia de medianoche
            </span>

            <h1 className="m-0 max-w-[11ch] font-display text-[clamp(3rem,6vw,5.9rem)] font-bold leading-[0.95] tracking-[-0.055em] text-black">
              Ephemeral Echoes of the Noir
            </h1>

            <p className="mt-7 max-w-[29ch] text-[15px] leading-8 text-[#6a6764]">
              Descubre un viaje olfativo entre jardines en sombra y tesoros botánicos raros. Una colección creada para el observador silencioso.
            </p>

            <Button href="#collections" className="mt-7 !rounded-none !px-7 !py-4 !text-[10px] !tracking-[0.28em]">
              Descubrir la colección
            </Button>
          </div>

          <div className="relative lg:col-span-7 lg:self-stretch">
            <div className="relative h-[420px] overflow-hidden lg:h-[760px]">
              <Image
                src="/perfume-solaris-oud.svg"
                alt="Aura Noir Signature Bottle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f8] via-[#fcf9f8]/35 to-transparent lg:from-[#fcf9f8]/10 lg:via-transparent lg:to-[#fcf9f8]/15" />
            </div>
          </div>
        </div>
      </section>

      <section id="scent-stories" className="mx-auto max-w-[1280px] px-6 py-[112px] lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative order-2 lg:order-1 lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f3f2]">
              <Image
                src="/perfume-nocturnal-bloom.svg"
                alt="Ingredientes botánicos"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 hidden w-64 border border-[#c5c6cd] bg-[#fcf9f8] p-8 lg:block">
              <span className="mb-2 block font-display text-[22px] italic text-black">Est. 1924</span>
              <p className="m-0 text-[10px] uppercase tracking-[0.18em] text-[#44474d]">
                Un siglo de excelencia en Grasse, Francia.
              </p>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-5 lg:pl-12">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-[#e9c349]">
              Herencia
            </span>

            <h2 className="m-0 max-w-[11ch] font-display text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.25] tracking-[-0.02em] text-black">
              El arte de esculpir lo invisible
            </h2>

            <div className="h-px w-20 bg-[#735c00]" />

            <p className="m-0 max-w-[36ch] text-base leading-[1.75] text-[#44474d]">
              En AURA NOIR entendemos la fragancia como una forma arquitectónica. Nuestra herencia nace de la precisión del maestro alquimista y del alma del artista de vanguardia.
            </p>

            <p className="m-0 max-w-[36ch] text-base leading-[1.75] text-[#44474d]">
              Provenientes de nuestras fincas privadas en Grasse y de las cumbres indómitas del Himalaya, nuestros ingredientes representan la cima de la biodiversidad global.
            </p>

            <Button href="/admin" variant="ghost" className="w-fit !px-0 !py-0 !text-[11px] !tracking-[0.22em]">
              Nuestra historia
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <section id="collections" className="bg-[#f6f3f2] py-[112px]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e9c349]">
                Curaduría
              </span>
              <h2 className="m-0 font-display text-[clamp(1.9rem,2.7vw,2.8rem)] font-semibold tracking-[-0.02em] text-black">
                Creaciones destacadas
              </h2>
            </div>
            <Link
              href="/admin"
              className="font-body text-sm font-medium uppercase tracking-[0.12em] text-[#44474d] underline decoration-inherit decoration-offset-8 transition-colors duration-300 hover:text-black"
            >
              Ver todo el catálogo
            </Link>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>

      <section id="atelier" className="mx-auto max-w-[1280px] px-6 py-[112px] lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex min-h-[400px] flex-col justify-between border border-[#e5ddd2] bg-[#fcf9f8] p-12">
            <div>
              <span className="mb-8 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#e9c349]">
                Experiencia del atelier
              </span>

              <h2 className="m-0 mb-6 max-w-[12ch] font-display text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.02em] text-black">
                Crea tu identidad a medida
              </h2>

              <p className="mb-12 max-w-[34ch] text-[15px] leading-[1.75] text-[#44474d]">
                Consulta con nuestros perfumistas maestros para diseñar una firma olfativa que resuene con tu arquitectura interior.
              </p>
            </div>

            <Button href="/admin" variant="ghost" className="w-fit">
              Reservar consulta
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {scentNotes.map((note) => (
              <div
                key={note.number}
                className="flex cursor-pointer items-center justify-between border-b border-[#735c0033] bg-[#f0eded] px-8 py-7 transition-all duration-300 hover:bg-[#ece8e4]"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display text-[64px] font-bold text-black opacity-10">
                    {note.number}
                  </span>
                  <div>
                    <h4 className="m-0 mb-1 font-display text-2xl font-medium text-black">
                      {note.title}
                    </h4>
                    <p className="m-0 text-xs text-[#44474d]">
                      {note.desc}
                    </p>
                  </div>
                </div>
                <Plus size={22} className="text-[#735c00]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {shouldShowCatalogNote && (
        <div className="mx-auto max-w-[1280px] px-6 pb-8 lg:px-8">
          <p className="m-0 border border-[#735c0033] px-[14px] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#735c00]">
            {error ?? "Cargando catálogo de ejemplo..."}
          </p>
        </div>
      )}
    </>
  );
}
