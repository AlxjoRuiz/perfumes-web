import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
  return (
    <section className="loading-screen" aria-label="Cargando contenido">
      <LoadingState />
    </section>
  );
}
