import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { AdminProductTable } from "@/components/admin/product-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="space-y-8">
      <div className="grid gap-6 border border-[#e5ddd2] bg-[#fcf9f8] p-6 sm:p-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
            Catálogo privado
          </p>
          <h1 className="max-w-[11ch] font-display text-[clamp(2.4rem,4vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-black">
            Productos
          </h1>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-8 text-[#44474d]">
            Gestiona el catálogo público, el stock y la disponibilidad de cada fragancia.
          </p>
        </div>
        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <Link href="/admin/productos/nuevo" className="w-full sm:w-auto">
            <button className="button w-full sm:w-auto">Nuevo producto</button>
          </Link>
        </div>
      </div>

      <AdminProductTable products={products} />
    </section>
  );
}
