"use client";

import type { CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";

type CartItemRowProps = {
  item: CartItem;
  onRemove: (slug: string) => void;
  onQuantityChange: (slug: string, quantity: number) => void;
};

export function CartItemRow({ item, onRemove, onQuantityChange }: CartItemRowProps) {
  return (
    <div className="cart-item-row">
      <div>
        <p className="font-display text-lg font-semibold">{item.name}</p>
        <p className="text-sm text-[#44474d]">{item.slug}</p>
        <p className="mt-2 text-sm text-[#1b1c1c]">Precio: {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(item.price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          max={item.stock}
          value={item.quantity}
          onChange={(event) => onQuantityChange(item.slug, Number(event.target.value))}
          className="input w-20"
        />
        <Button type="button" variant="ghost" className="px-3 py-2 text-sm" onClick={() => onRemove(item.slug)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
