import Link from "next/link";
import { Price } from "@/components/ui/price";
import { ProductImage } from "@/components/product/product-image";
import type { ProductPreview } from "@/types/product";

type ProductCardProps = {
  product: ProductPreview;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-[#f6f3f2]">
        <ProductImage src={product.imageUrl} alt={product.name} />
        <div className="absolute inset-0 flex items-end justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100">
          <Link
            href={`/productos/${product.slug}`}
            className="mb-6 inline-flex translate-y-2 items-center gap-2 bg-[#fcf9f8] px-5 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1b1c1c] shadow-[0_10px_22px_rgba(81,95,120,0.12)] transition-transform duration-300 group-hover:translate-y-0"
          >
            Quick View
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 font-body text-[10px] uppercase tracking-[0.2em] text-[#735c00]">
          {product.badge ?? "EAU DE PARFUM"}
        </span>
        <h3 className="m-0 font-display text-[1.1rem] font-medium tracking-[-0.01em] text-[#1b1c1c] transition-colors group-hover:text-[#735c00]">
          {product.name}
        </h3>
        <p className="m-0 mt-3 text-[0.92rem] leading-6 text-[#44474d]">
          {product.description}
        </p>
        <Price value={product.price} className="mt-3 font-body text-[0.95rem] font-medium text-[#1b1c1c]" />
      </div>
    </article>
  );
}
