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
    <article className="overflow-hidden bg-[#fbf7f4]">
      <ProductImage src={product.imageUrl} alt={product.name} />
      <div className="flex flex-col gap-3 px-1 pb-2 pt-4 text-center">
        <div className="flex items-center justify-between gap-3 px-2">
          <span className="border border-[#d8c39a] px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8841e]">
            {product.badge ?? "Seleccion"}
          </span>
          <span className={isInStock ? "stock-pill" : "stock-pill stock-pill--muted"}>
            <BadgeCheck size={14} />
            {isInStock ? "Disponible" : "Agotado"}
          </span>
        </div>
        <div className="grid gap-1 px-2">
          <h3 className="m-0 font-display text-[1.02rem] font-medium tracking-[-0.01em] text-[#1b1c1c]">
            {product.name}
          </h3>
          <p className="m-0 text-[0.96rem] leading-6 text-[#44474d]">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <Price value={product.price} className="font-body text-[0.95rem] font-medium text-[#1b1c1c]" />
          <Link href={`/productos/${product.slug}`} className="inline-flex items-center gap-2 font-body text-sm font-bold text-[#0a192f] transition-transform duration-200 hover:translate-x-0.5">
            Ver detalle
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
