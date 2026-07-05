import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type EditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditPageProps) {
  const { id } = await params;
  const products = await getAllProducts();
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <section className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
          Private Catalog
        </p>
        <h1 className="max-w-[10ch] font-display text-[clamp(2.4rem,4vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-black">
          Editar producto
        </h1>
        <p className="mt-5 max-w-[36ch] text-[15px] leading-8 text-[#44474d]">
          Edita los datos del producto <strong>{product.name}</strong> y guarda los cambios.
        </p>
      </div>

      <div className="lg:col-span-8">
        <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_18px_35px_rgba(81,95,120,0.06)] sm:p-8">
          <ProductForm product={product} />
        </div>
      </div>
    </section>
  );
}
