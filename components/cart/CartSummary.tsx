"use client";

import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { buildWhatsAppCheckoutUrl } from "@/lib/whatsapp";
import type { CartItem } from "@/types/cart";

type CartSummaryProps = {
  items: CartItem[];
  total: number;
  onClear: () => void;
};

export function CartSummary({ items, total, onClear }: CartSummaryProps) {
  const checkoutUrl = buildWhatsAppCheckoutUrl(items);
  const isEmpty = items.length === 0;

  return (
    <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_18px_35px_rgba(81,95,120,0.08)] sm:p-8">
      <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-[#735c00]">
        Resumen del pedido
      </p>
      <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.03em] text-black">
        Resumen del pedido
      </h2>

      <div className="mt-8 space-y-4 border-t border-[#e5ddd2] pt-6">
        <div className="flex items-center justify-between text-sm text-[#44474d]">
          <span>Subtotal</span>
          <Price value={total} className="font-semibold text-[#1b1c1c]" />
        </div>
        <div className="flex items-center justify-between text-sm text-[#44474d]">
          <span>Envío</span>
          <span className="font-semibold text-[#735c00]">Incluido</span>
        </div>
        <div className="flex items-center justify-between text-sm text-[#44474d]">
          <span>Impuestos estimados</span>
          <span className="font-semibold text-[#1b1c1c]">$0</span>
        </div>
        <div className="flex items-center justify-between border-t border-[#e5ddd2] pt-5">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1b1c1c]">
            Total
          </span>
          <Price value={total} className="font-display text-3xl font-semibold text-[#1b1c1c]" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Button
          href={checkoutUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full"
          disabled={isEmpty}
        >
          Finalizar por WhatsApp
        </Button>
        <Button href="/" variant="ghost" className="w-full">
          Seguir explorando
        </Button>
      </div>

      <div className="mt-8 border-t border-[#e5ddd2] pt-6">
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#735c00] transition-colors hover:text-black"
        >
          Vaciar carrito
        </button>
      </div>
      {isEmpty ? (
        <p className="mt-3 text-sm text-[#735c00]">Agrega productos al carrito antes de finalizar.</p>
      ) : null}
    </div>
  );
}
