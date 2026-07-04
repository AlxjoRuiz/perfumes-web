"use client";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types/cart";

type AddToCartButtonProps = {
  product: Omit<CartItem, "quantity">;
  quantity?: number;
};

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      onClick={() =>
        addItem({
          ...product,
          quantity,
        })
      }
    >
      Agregar al carrito
    </Button>
  );
}
