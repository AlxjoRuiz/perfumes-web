import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { AdminProductTable } from "@/components/admin/product-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="page-panel">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-[#735c00]">Admin</p>
            <h1 className="mt-2 text-3xl font-display font-semibold">Productos</h1>
          </div>
          <Link href="/admin/productos/nuevo">
            <button className="button button--ghost">Nuevo producto</button>
          </Link>
        </div>

        <AdminProductTable products={products} />
      </div>
    </section>
  );
}
