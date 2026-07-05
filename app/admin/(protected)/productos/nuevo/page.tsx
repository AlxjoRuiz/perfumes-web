import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function NewProductPage() {
  return (
    <section className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
          Private Catalog
        </p>
        <h1 className="max-w-[10ch] font-display text-[clamp(2.4rem,4vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-black">
          Crear producto
        </h1>
        <p className="mt-5 max-w-[36ch] text-[15px] leading-8 text-[#44474d]">
          Usa este formulario para agregar productos nuevos al catálogo.
        </p>
      </div>

      <div className="lg:col-span-8">
        <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_18px_35px_rgba(81,95,120,0.06)] sm:p-8">
          <ProductForm />
          <Link href="/admin/productos" className="mt-6 inline-block w-fit">
            <button className="button button--ghost">Volver al listado</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
