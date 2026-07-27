import type { CartItem } from "@/types/cart";

const WHATSAPP_BASE = "https://wa.me";
const DEFAULT_WHATSAPP_PHONE = "3161465867";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function getWhatsAppPhone() {
  return process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? DEFAULT_WHATSAPP_PHONE;
}

export function buildWhatsAppMessage(items: CartItem[]) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = [
    "Hola, quiero hacer un pedido:",
    "",
    ...items.map((item) =>
      `- ${item.quantity} x ${item.name} (${formatCurrency(item.price)}) = ${formatCurrency(
        item.price * item.quantity,
      )}`,
    ),
    "",
    `Total: ${formatCurrency(total)}`,
    "",
    "Por favor, confirmen disponibilidad y el costo de envío.",
  ];
  return lines.join("\n");
}

export function buildProductWhatsAppUrl(item: Pick<CartItem, "name" | "price">) {
  const phone = getWhatsAppPhone();
  const message = [
    "Hola, quiero comprar este perfume:",
    "",
    `Producto: ${item.name}`,
    `Precio: ${formatCurrency(item.price)}`,
    "Cantidad: 1",
    "",
    "Por favor, confirmen disponibilidad y costo de envío.",
  ].join("\n");
  return `${WHATSAPP_BASE}/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppCheckoutUrl(items: CartItem[]) {
  const phone = getWhatsAppPhone();
  if (items.length === 0) {
    return `${WHATSAPP_BASE}/${phone}`;
  }
  const message = buildWhatsAppMessage(items);
  return `${WHATSAPP_BASE}/${phone}?text=${encodeURIComponent(message)}`;
}
