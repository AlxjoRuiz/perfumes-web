import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { getActiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const scentNotes = [
  { number: "01", title: "Top Notes", desc: "The initial sensory awakening" },
  { number: "02", title: "Heart Notes", desc: "The character and core narrative" },
  { number: "03", title: "Base Notes", desc: "The lasting, mysterious memory" },
];

export default async function Home() {
  const { products, source, error } = await getActiveProducts();
  const shouldShowCatalogNote = source !== "supabase" || Boolean(error);

  return (
    <>
      <section className="grid min-h-[calc(100vh-80px)] grid-cols-1 overflow-hidden lg:grid-cols-[minmax(320px,0.33fr)_minmax(0,0.67fr)]">
        <div className="order-2 flex items-center px-4 py-12 lg:order-1 lg:px-10 xl:px-12">
          <div className="max-w-[300px]">
            <span className="mb-4 block font-body text-[9px] font-semibold uppercase tracking-[0.4em] text-[#d2a03d]">
              The Essence of Midnight
            </span>

            <h1 className="m-0 font-display text-[clamp(2.7rem,4vw,4.6rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-black">
              Ephemeral Echoes of the Noir
            </h1>

            <p className="mt-5 max-w-[280px] text-[12px] leading-6 text-[#6a6764]">
              Discover an olfactory journey through shadowed gardens and rare botanical treasures. A collection crafted for the silent observer.
            </p>

            <Button href="#collections" className="mt-6 !rounded-none !px-6 !py-3 !text-[10px] !tracking-[0.24em]">
              Discover the Collection
            </Button>
          </div>
        </div>

        <div className="relative order-1 min-h-[540px] overflow-hidden bg-[#eef0ef] lg:order-2 lg:min-h-[calc(100vh-80px)]">
          <Image
            src="/perfume-hero.svg"
            alt="Aura Noir Signature Bottle"
            fill
            priority
            className="object-cover object-[center_45%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,249,248,0.98)_0%,rgba(252,249,248,0.56)_20%,rgba(252,249,248,0.12)_40%,rgba(27,28,28,0.16)_100%)]" />
        </div>
      </section>

      <section id="scent-stories" className="mx-auto max-w-[1280px] px-8 py-[112px]">
        <div className="grid items-center grid-cols-12 gap-10">
          <div className="order-1 col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaBEeFpQweJYHoFk8iFWKyh8LD_AKqbq9F3qFaPBF1WrowDOarHwcQrqnK2-ZcUu5Fx0kdbWf7lpXpJA0dp2iAkNoJAsUtRDDr_ksAblm07dSUCNxPB4arCtxWpByeYoWhh1_cTftHCI7yET-iAMXq6IE-eIy8xUlDcQ01SpYjboRwyHWIStg0KnSp8GezU9wlc9sZcNb-veR1_R126wbH77PwH5sRytcXSD4AbumZSVKCne2HPMlhPmG0_EvGNx0ZziyP6EPeko0"
                alt="Botanical Ingredients"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-1000"
              />
            </div>
          </div>

          <div className="col-span-5 order-0 flex flex-col gap-7 pl-12">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-[#e9c349]">
              Heritage
            </span>

            <h2 className="m-0 font-display text-[32px] font-semibold leading-[1.3] tracking-[-0.02em] text-black">
              The Art of Invisible Sculpting
            </h2>

            <div className="h-px w-20 bg-[#735c00]" />

            <p className="m-0 text-base leading-[1.6] text-[#44474d]">
              At AURA NOIR, we view fragrance as an architectural form. Our heritage is rooted in the precision of the master alchemist and the soul of the avant-garde artist. Each scent is a narrative composed of the world's most elusive molecules.
            </p>

            <p className="m-0 text-base leading-[1.6] text-[#44474d]">
              Sourced from our private estates in Grasse and the untamed peaks of the Himalayas, our ingredients represent the pinnacle of global biodiversity.
            </p>

            <Button href="/admin" variant="ghost" className="story-link">
              Our Story
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section id="collections" className="w-full bg-[#f6f3f2] py-[108px]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e9c349]">
                Curated
              </span>
              <h2 className="m-0 font-display text-[31px] font-semibold tracking-[-0.02em] text-black">
                Featured Creations
              </h2>
            </div>
            <Link
              href="/admin"
              className="cursor-pointer font-body text-sm font-medium uppercase tracking-[0.1em] text-[#44474d] underline decoration-inherit decoration-offset-8 transition-colors duration-300"
            >
              View All Parcels
            </Link>
          </div>

          <div className="mt-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      <section id="atelier" className="mx-auto max-w-[1280px] px-4 py-[104px] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex min-h-[400px] flex-col justify-between border border-[#c5c6cd] bg-[#fcf9f8] p-12">
            <div>
              <span className="mb-8 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#e9c349]">
                The Atelier Experience
              </span>

              <h2 className="m-0 mb-6 font-display text-[31px] font-semibold tracking-[-0.02em] text-black">
                Create Your Bespoke Identity
              </h2>

              <p className="mb-12 text-[15px] leading-[1.65] text-[#44474d]">
                Consult with our master perfumers to design a signature scent that resonates with your unique soul architecture.
              </p>
            </div>

            <Button href="/admin" variant="ghost" className="atelier-cta">
              Book Consultation
            </Button>
          </div>

          {/* Right - Accordions */}
          <div className="grid grid-cols-1 gap-8">
            {scentNotes.map((note) => (
              <div
                key={note.number}
                className="flex cursor-pointer items-center justify-between border-b border-[#735c0033] bg-[#f0eded] p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display text-[64px] font-bold text-black opacity-10">
                    {note.number}
                  </span>
                  <div>
                    <h4 className="m-0 mb-1 font-display text-2xl font-medium">
                      {note.title}
                    </h4>
                    <p className="m-0 text-xs text-[#44474d]">
                      {note.desc}
                    </p>
                  </div>
                </div>
                <span className="text-2xl text-[#735c00]">
                  +
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {shouldShowCatalogNote && (
        <div className="mx-auto max-w-[1280px] p-8">
          <p className="m-0 border border-[#735c0033] px-[14px] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#735c00]">
            {error ?? "Loading example catalog..."}
          </p>
        </div>
      )}
    </>
  );
}
