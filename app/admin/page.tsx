import { Lock } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminPage() {
  return (
    <section className="page-panel">
      <EmptyState
        title="Zona admin en preparacion"
        description="La autenticacion y el CRUD de productos llegaran en la fase 9."
        actionHref="/"
        actionLabel="Volver al inicio"
      >
        <span className="empty-state-icon" aria-hidden="true">
          <Lock size={20} />
        </span>
      </EmptyState>
    </section>
  );
}
