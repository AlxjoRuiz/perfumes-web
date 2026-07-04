import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function NewProductPage() {
  return (
    <section className="page-panel">
      <div className="space-y-6 rounded-[24px] border border-[#e5ddd2] bg-[#fcf9f8] p-10 shadow-[0_18px_35px_rgba(81,95,120,0.06)]">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#735c00]">Admin</p>
          <h1 className="mt-2 text-3xl font-display font-semibold">Crear producto</h1>
          <p className="mt-2 max-w-[56ch] text-[#44474d]">
            Usa este formulario para agregar productos nuevos al catálogo.
          </p>
        </div>

        <div className="grid gap-6">
          <ProductForm />
          <Link href="/admin/productos" className="inline-block w-fit">
            <button className="button button--ghost">Volver al listado</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
