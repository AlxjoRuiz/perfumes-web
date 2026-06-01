import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/product/product-card";
import type { ProductPreview } from "@/types/product";

type ProductGridProps = {
  items?: ProductPreview[];
  products?: ProductPreview[];
};

export function ProductGrid({ items, products }: ProductGridProps) {
  const catalog = items ?? products ?? [];

  if (catalog.length === 0) {
    return (
      <EmptyState
        title="Aun no hay productos para mostrar"
        description="Cuando conectemos Supabase, los productos publicados apareceran aqui automaticamente."
        actionHref="/admin"
        actionLabel="Ir al admin"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {catalog.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
