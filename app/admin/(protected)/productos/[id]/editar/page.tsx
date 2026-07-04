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
    <section className="page-panel">
      <div className="space-y-6 rounded-[24px] border border-[#e5ddd2] bg-[#fcf9f8] p-10 shadow-[0_18px_35px_rgba(81,95,120,0.06)]">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#735c00]">Admin</p>
          <h1 className="mt-2 text-3xl font-display font-semibold">Editar producto</h1>
          <p className="mt-2 max-w-[56ch] text-[#44474d]">
            Edita los datos del producto <strong>{product.name}</strong> y guarda los cambios.
          </p>
        </div>

        <div className="grid gap-6">
          <ProductForm product={product} />
        </div>
      </div>
    </section>
  );
}
