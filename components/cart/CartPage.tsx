"use client";

import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/components/cart/CartProvider";

export function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="page-panel">
        <div className="empty-state">
          <h2 className="text-2xl font-display font-semibold">Tu carrito aun esta vacio</h2>
          <p className="max-w-[40ch] text-[#44474d]">
            Cuando agregues perfumes, aqui podras revisar cantidades, precios y completar tu pedido por WhatsApp.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-panel grid gap-10 lg:grid-cols-[1.7fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-[18px] border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_18px_35px_rgba(81,95,120,0.06)]">
          <h1 className="mb-6 text-3xl font-display font-semibold">Tu carrito</h1>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.slug}
                item={item}
                onRemove={removeItem}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>
        </div>
      </div>

      <CartSummary items={items} total={total} onClear={clearCart} />
    </section>
  );
}
