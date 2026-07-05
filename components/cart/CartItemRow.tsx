"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { Price } from "@/components/ui/price";

type CartItemRowProps = {
  item: CartItem;
  onRemove: (slug: string) => void;
  onQuantityChange: (slug: string, quantity: number) => void;
};

export function CartItemRow({ item, onRemove, onQuantityChange }: CartItemRowProps) {
  return (
    <article className="grid gap-5 border border-[#e5ddd2] bg-[#fcf9f8] p-4 sm:p-5 md:grid-cols-[160px_minmax(0,1fr)] md:gap-6">
      <div className="aspect-[4/5] overflow-hidden bg-[#f6f3f2]">
        <div className="grid h-full place-items-center">
          <span className="font-body text-[10px] uppercase tracking-[0.24em] text-[#735c00]">
            {item.quantity.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 py-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="mb-3 block font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#735c00]">
              Extrait de Parfum
            </span>
            <p className="truncate font-display text-[clamp(1.4rem,2vw,2rem)] font-semibold tracking-[-0.03em] text-black">
              {item.name}
            </p>
            <p className="mt-2 text-sm leading-7 text-[#44474d]">{item.slug}</p>
          </div>

          <Price value={item.price * item.quantity} className="shrink-0 font-body text-[1rem] font-semibold text-[#1b1c1c]" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center border border-[#e5ddd2] bg-[#f6f3f2]">
            <button
              type="button"
              onClick={() => onQuantityChange(item.slug, item.quantity - 1)}
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
              onClick={() => onQuantityChange(item.slug, item.quantity + 1)}
              className="inline-flex h-11 w-11 items-center justify-center text-[#1b1c1c] transition-colors hover:bg-[#ece8e4]"
              aria-label={`Aumentar cantidad de ${item.name}`}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.slug)}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#735c00] transition-colors hover:text-black"
          >
            <Trash2 size={14} />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
