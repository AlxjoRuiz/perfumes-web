import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const demoProducts = new Map([
  [
    "sauvage-intense",
    {
      name: "Sauvage Intense",
      description:
        "Una salida fresca y especiada con fondo ambarado, pensada para dejar huella.",
      detail:
        "Ideal para quien busca presencia, proyeccion y un estilo moderno que funcione en cualquier momento del dia.",
      price: 385000,
      stock: 12,
    },
  ],
  [
    "bleu-signature",
    {
      name: "Bleu Signature",
      description:
        "Perfil elegante y limpio con un aire versatil, ideal para uso diario o eventos.",
      detail:
        "Su equilibrio entre frescura y elegancia lo convierte en una fragancia facil de llevar y muy comercial.",
      price: 420000,
      stock: 7,
    },
  ],
]);

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = demoProducts.get(slug);

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
  const product = demoProducts.get(slug);

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
        <div className="product-detail-visual">
          <img src="/perfume-hero.svg" alt={product.name} />
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
