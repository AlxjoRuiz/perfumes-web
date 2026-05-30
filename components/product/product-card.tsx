import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Price } from "@/components/ui/price";
import { ProductImage } from "@/components/product/product-image";

export type ProductCardData = {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  stock?: number;
  badge?: string;
};

type ProductCardProps = {
  product: ProductCardData;
};

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = typeof product.stock === "number" ? product.stock > 0 : true;

  return (
    <article className="product-card">
      <ProductImage src={product.imageUrl} alt={product.name} />
      <div className="product-card-body">
        <div className="product-card-meta">
          {product.badge ? <span>{product.badge}</span> : <span>Seleccion</span>}
          <span className={isInStock ? "stock-pill" : "stock-pill stock-pill--muted"}>
            <BadgeCheck size={14} />
            {isInStock ? "Disponible" : "Agotado"}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <Price value={product.price} className="product-card-price" />
          <Link href={`/productos/${product.slug}`} className="product-card-link">
            Ver detalle
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
