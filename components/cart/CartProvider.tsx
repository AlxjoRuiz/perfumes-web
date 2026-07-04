"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";
import { loadCartItems, saveCartItems } from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartItems());

  useEffect(() => {
    saveCartItems(items);
  }, [items]);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.slug === item.slug);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.slug === item.slug
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + item.quantity, item.stock) }
            : cartItem,
        );
      }
      return [...current, { ...item, quantity: Math.min(item.quantity, item.stock) }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.slug === slug
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, itemCount, total, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
