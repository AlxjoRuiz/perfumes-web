"use client";

import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function CartCount() {
  const { itemCount } = useCart();

  return (
    <Link href="/carrito" className="relative inline-flex items-center gap-2 text-sm font-semibold text-[#1b1c1c]">
      <ShoppingBag size={18} />
      <span>Carrito</span>
      {itemCount > 0 ? (
        <span className="absolute -right-3 top-0 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#735c00] px-2 text-[10px] font-semibold text-white">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}
