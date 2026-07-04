"use client";

import { Button } from "@/components/ui/button";
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
    <div className="cart-summary">
      <div className="rounded-[18px] border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_14px_34px_rgba(81,95,120,0.06)]">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#735c00]">Resumen de compra</p>
        <p className="mb-1 text-sm text-[#44474d]">Items: {items.length}</p>
        <p className="mb-5 text-2xl font-semibold text-[#1b1c1c]">Total: {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(total)}</p>
        <div className="flex flex-col gap-3">
          <Button
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer"
            disabled={isEmpty}
          >
            Finalizar por WhatsApp
          </Button>
          <Button type="button" variant="ghost" onClick={onClear}>
            Vaciar carrito
          </Button>
        </div>
        {isEmpty ? (
          <p className="mt-3 text-sm text-[#735c00]">Agrega productos al carrito antes de finalizar.</p>
        ) : null}
      </div>
    </div>
  );
}
