import { ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function CartPage() {
  return (
    <section className="page-panel">
      <EmptyState
        title="Tu carrito aun esta vacio"
        description="Cuando integremos el carrito, aqui veras los perfumes seleccionados y el resumen de compra."
        actionHref="/"
        actionLabel="Volver al inicio"
      >
        <span className="empty-state-icon" aria-hidden="true">
          <ShoppingBag size={20} />
        </span>
      </EmptyState>
    </section>
  );
}
