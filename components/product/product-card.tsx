import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Price } from "@/components/ui/price";
import { ProductImage } from "@/components/product/product-image";
import type { ProductPreview } from "@/types/product";

type ProductCardProps = {
  product: ProductPreview;
};

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = typeof product.stock === "number" ? product.stock > 0 : true;

  return (
    <article className="overflow-hidden rounded-[18px] border border-[#e5ddd2] bg-[#fbf7f4] shadow-[0_18px_35px_rgba(81,95,120,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_45px_rgba(81,95,120,0.12)]">
      <ProductImage src={product.imageUrl} alt={product.name} />
      <div className="flex flex-col gap-4 px-4 pb-5 pt-6 text-center">
        <div className="flex items-center justify-between gap-3 px-2">
          <span className="rounded-full border border-[#d8c39a] bg-[#fff8e7] px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8841e]">
            {product.badge ?? "Seleccion"}
          </span>
          <span className={isInStock ? "stock-pill" : "stock-pill stock-pill--muted"}>
            <BadgeCheck size={14} />
            {isInStock ? "Disponible" : "Agotado"}
          </span>
        </div>
        <div className="grid gap-2 px-2">
          <h3 className="m-0 font-display text-[1.1rem] font-semibold tracking-[-0.01em] text-[#1b1c1c]">
            {product.name}
          </h3>
          <p className="m-0 text-[0.94rem] leading-6 text-[#44474d]">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <Price value={product.price} className="font-body text-[1rem] font-semibold text-[#0a192f]" />
          <Link href={`/productos/${product.slug}`} className="inline-flex items-center gap-2 font-body text-sm font-bold text-[#735c00] transition-transform duration-200 hover:translate-x-0.5 hover:text-[#1b1c1c]">
            Ver detalle
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
