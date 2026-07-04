"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { buildWhatsAppCheckoutUrl } from "@/lib/whatsapp";

export function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-section-gap px-gutter max-w-container-max mx-auto min-h-screen">
        <div className="text-center py-24">
          <h1 className="font-display-lg text-display-lg text-primary mb-4">Tu carrito está vacío</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            Cuando agregues perfumes, aquí podrás revisar cantidades, precios y completar tu pedido.
          </p>
          <Link href="/">
            <Button>Continuar explorando</Button>
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = total;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax;

  return (
    <main className="pt-32 pb-section-gap px-gutter max-w-container-max mx-auto min-h-screen">
      <header className="mb-16">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Tu Selección AURA NOIR</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Cada fragancia se prepara bajo demanda en nuestro atelier. Revisa tu selección y confirma por WhatsApp.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Cart Items */}
        <section className="lg:col-span-7 space-y-12">
          {items.map((item) => (
            <div key={item.slug} className="group flex gap-8 pb-10 border-b border-outline-variant/30 transition-all">
              <div className="w-40 h-52 bg-surface-container overflow-hidden flex-shrink-0 relative">
                <Image
                  src={item.imageUrl || "/perfume-hero.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col justify-between flex-grow py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{item.name}</h3>
                    <p className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] mb-4">
                      100ml • Extrait de Parfum
                    </p>
                  </div>
                  <span className="font-body-lg text-body-lg font-medium text-primary">
                    ${item.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center border border-outline-variant/50 px-4 py-2 gap-6">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="hover:text-secondary transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="font-button text-button w-6 text-center">
                      {String(item.quantity).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="hover:text-secondary transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-on-surface-variant/50 hover:text-error transition-all flex items-center gap-2 font-label-caps text-[10px] tracking-widest uppercase"
                  >
                    ✕ Remover
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Gift Message */}
          <div className="mt-12 bg-surface-container-low p-8 border border-outline-variant/10">
            <label className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em] block mb-4">
              Mensaje Personalizado
            </label>
            <textarea
              className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/40 font-body-md text-body-md py-4 resize-none h-24 placeholder:text-on-surface-variant/30 focus:border-secondary focus:outline-none"
              placeholder="Escribe una nota personal para el envío (opcional)..."
            />
            <p className="mt-4 text-[11px] font-body-md text-on-surface-variant/50 italic">
              Los mensajes se imprimen en cartulina premium y se sellan a mano.
            </p>
          </div>
        </section>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32 bg-white p-10 shadow-2xl shadow-primary/5 border border-outline-variant/10">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-8 border-b border-outline-variant/20 pb-6 uppercase tracking-wider">
            Resumen del Pedido
          </h2>

          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center">
              <span className="font-body-md text-on-surface-variant">Subtotal</span>
              <span className="font-body-lg text-primary">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-on-surface-variant">Envío</span>
              <span className="font-label-caps text-secondary uppercase">Incluido</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-on-surface-variant">Impuestos estimados</span>
              <span className="font-body-md text-primary">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-6 border-t border-outline-variant/30 flex justify-between items-center">
              <span className="font-button text-button uppercase tracking-widest text-primary">Total</span>
              <span className="font-headline-md text-headline-md text-primary">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link href={buildWhatsAppCheckoutUrl(items)}>
              <Button className="w-full py-6 bg-primary text-on-primary hover:bg-primary-container">
                Checkout por WhatsApp
              </Button>
            </Link>
            <p className="text-center text-[11px] font-body-md text-on-surface-variant/60">
              Un asesor confirmará los detalles en el chat.
            </p>

            <Link href="/">
              <Button variant="ghost" className="w-full py-4 border border-primary">
                Continuar Explorando
              </Button>
            </Link>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-secondary text-lg">🔒</span>
              <div>
                <p className="font-button text-[12px] uppercase tracking-wider text-primary">Transacción Segura</p>
                <p className="text-[12px] text-on-surface-variant/70">Encriptada y gestionada por concierge personal.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-secondary text-lg">🚚</span>
              <div>
                <p className="font-button text-[12px] uppercase tracking-wider text-primary">Courier Prioritario</p>
                <p className="text-[12px] text-on-surface-variant/70">Entrega global 2-3 días desde París.</p>
              </div>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="mt-8 w-full py-2 text-[11px] text-error hover:text-error/80 transition-colors uppercase tracking-widest"
            >
              Vaciar Carrito
            </button>
          )}
        </aside>
      </div>
    </main>
  );
}
