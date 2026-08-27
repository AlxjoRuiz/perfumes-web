"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";

export function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto min-h-screen max-w-[1280px] px-6 pb-20 pt-32 lg:px-8">
        <section className="overflow-hidden border border-[#e5ddd2] bg-[#fcf9f8] shadow-[0_18px_35px_rgba(81,95,120,0.08)]">
          <div className="grid gap-0 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12 lg:col-span-7 lg:min-h-[560px] lg:p-14">
              <div className="space-y-6">
                <span className="block font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
                  El carrito
                </span>
                <h1 className="max-w-[10ch] font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-black">
                  Tu carrito está vacío
                </h1>
                <p className="max-w-[34ch] text-[15px] leading-8 text-[#44474d]">
                  Cuando agregues perfumes, podrás revisar cantidades, comparar notas y finalizar tu pedido por WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/" className="w-fit">
                  Continuar explorando
                </Button>
                <Button href="/#collections" variant="ghost" className="w-fit">
                  Ver colecciones
                </Button>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden bg-[#f6f3f2] lg:col-span-5 lg:min-h-[560px]">
              <div className="absolute inset-0">
                <Image
                  src="/perfume-hero.svg"
                  alt="THEONYS PARFUM hero bottle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f8] via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 border border-[#e5ddd2] bg-[#fcf9f8]/95 p-6 backdrop-blur-sm">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#735c00]">
                  Servicio de firma
                </p>
                <p className="max-w-[28ch] text-sm leading-7 text-[#44474d]">
                  Preparamos cada pedido con el mismo cuidado que una fragancia a medida.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-6 pb-20 pt-32 lg:px-8">
      <header className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <span className="mb-4 block font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
            Bolsa de compra
          </span>
          <h1 className="max-w-[12ch] font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-black">
            Tu selección THEONYS PARFUM
          </h1>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-8 text-[#44474d]">
            Cada fragancia se prepara bajo demanda. Revisa tu selección y completa el pedido con un asesor por WhatsApp.
          </p>
        </div>

        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <div className="inline-flex items-center gap-3 border border-[#e5ddd2] bg-[#fcf9f8] px-4 py-3 text-sm font-semibold text-[#1b1c1c] shadow-[0_10px_24px_rgba(81,95,120,0.05)]">
            <ShoppingBag size={18} className="text-[#735c00]" />
            <span>{items.length} artículo{items.length === 1 ? "" : "s"}</span>
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <section className="space-y-4 lg:col-span-7">
          {items.map((item) => (
            <article
              key={item.slug}
              className="grid gap-5 border border-[#e5ddd2] bg-[#fcf9f8] p-4 shadow-[0_14px_34px_rgba(81,95,120,0.06)] sm:p-5 md:grid-cols-[160px_minmax(0,1fr)] md:gap-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f6f3f2]">
                <Image
                  src={item.imageUrl || "/perfume-hero.svg"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-6 py-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="mb-3 block font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#735c00]">
                      Extrait de Parfum
                    </span>
                    <h2 className="truncate font-display text-[clamp(1.4rem,2vw,2rem)] font-semibold tracking-[-0.03em] text-black">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[#44474d]">
                      Fragancia seleccionada para tu colección personal.
                    </p>
                  </div>

                  <Price
                    value={item.price * item.quantity}
                    className="shrink-0 font-body text-[1rem] font-semibold text-[#1b1c1c]"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center border border-[#e5ddd2] bg-[#f6f3f2]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="inline-flex h-11 w-11 items-center justify-center text-[#1b1c1c] transition-colors hover:bg-[#ece8e4]"
                      aria-label={`Disminuir cantidad de ${item.name}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-12 px-4 text-center font-body text-sm font-semibold tracking-[0.18em] text-[#1b1c1c]">
                      {String(item.quantity).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="inline-flex h-11 w-11 items-center justify-center text-[#1b1c1c] transition-colors hover:bg-[#ece8e4]"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#735c00] transition-colors hover:text-black"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}

          <section className="border border-[#e5ddd2] bg-[#f6f3f2] p-6 sm:p-8">
            <span className="mb-4 block font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-[#735c00]">
              Nota de regalo
            </span>
            <textarea
              className="min-h-28 w-full resize-none border border-[#e5ddd2] bg-[#fcf9f8] px-4 py-4 text-sm leading-7 text-[#1b1c1c] outline-none transition-colors placeholder:text-[#7d7b78] focus:border-[#735c00]"
              placeholder="Escribe una nota personal para el envío (opcional)..."
            />
            <p className="mt-3 text-xs leading-6 text-[#44474d]">
              Si quieres, podemos incluir un mensaje impreso en la presentación final.
            </p>
          </section>
        </section>

        <aside className="lg:col-span-5 lg:sticky lg:top-28">
          <CartSummary items={items} total={total} onClear={clearCart} />
        </aside>
      </div>
    </main>
  );
}
