import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/product/product-card";
import type { ProductPreview } from "@/types/product";

type ProductGridProps = {
  items: ProductPreview[];
};

export function ProductGrid({ items }: ProductGridProps) {
  if (items.length === 0) {
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
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
