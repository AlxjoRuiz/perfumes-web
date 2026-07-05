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
    <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_14px_34px_rgba(81,95,120,0.06)] sm:p-8">
      <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-[#735c00]">Order Summary</p>
      <div className="mb-6 space-y-3 border-t border-[#e5ddd2] pt-6">
        <div className="flex items-center justify-between text-sm text-[#44474d]">
          <span>Items</span>
          <span className="font-semibold text-[#1b1c1c]">{items.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-[#44474d]">
          <span>Total</span>
          <Price value={total} className="font-semibold text-[#1b1c1c]" />
        </div>
      </div>
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
  );
}
