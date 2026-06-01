import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="product-detail">
      <div className="product-detail-back">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>

      <div className="product-detail-grid">
        <div className="product-detail-visual relative">
          <Image
            src={product.imageUrl ?? "/perfume-hero.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div className="product-detail-copy">
          <p className="eyebrow">Detalle de producto</p>
          <h1>{product.name}</h1>
          <p className="hero-lead">{product.description}</p>
          <p className="product-detail-text">{product.detail}</p>
          <div className="product-detail-meta">
            <Price value={product.price} className="product-card-price" />
            <span>{product.stock} unidades disponibles</span>
          </div>
          <div className="hero-actions">
            <Button href="https://wa.me/573000000000" variant="ghost">
              <MessageCircle size={16} />
              Comprar por WhatsApp
            </Button>
            <Button href="/carrito">Agregar al carrito</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
