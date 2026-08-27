import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { getActiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Catálogo - Theonys Parfum",
};

export default async function ProductsPage() {
  const { products, source, error } = await getActiveProducts();
  const shouldShowCatalogNote = source === "fallback" || Boolean(error);

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-6 pb-20 pt-32 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#735c00] transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Volver al inicio
      </Link>

      <span className="mb-4 block font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e9c349]">
        Curaduría
      </span>
      <h1 className="mb-16 font-display text-[clamp(1.9rem,2.7vw,2.8rem)] font-semibold tracking-[-0.02em] text-black">
        Catálogo completo
      </h1>

      <ProductGrid products={products} />

      {shouldShowCatalogNote && (
        <div className="mt-8">
          <p className="m-0 border border-[#735c0033] px-[14px] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#735c00]">
            {error ?? "Cargando catálogo de ejemplo..."}
          </p>
        </div>
      )}
    </main>
  );
}
