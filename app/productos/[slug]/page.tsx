import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { getProductBySlug } from "@/lib/products";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

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

const highlights = [
  "Creado bajo demanda en nuestro atelier",
  "Edición limitada con notas profundas y limpias",
  "Acompañamiento por WhatsApp para cerrar el pedido",
];

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-6 pb-20 pt-32 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#735c00] transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Volver al inicio
      </Link>

      <section className="grid gap-8 overflow-hidden lg:grid-cols-12">
        <div className="relative min-h-[420px] overflow-hidden bg-[#f6f3f2] lg:col-span-7 lg:min-h-[760px]">
          <Image
            src={product.imageUrl ?? "/perfume-hero.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-contain p-6 sm:p-10"
          />
          <div className="absolute bottom-6 left-6 border border-[#e5ddd2] bg-[#fcf9f8]/95 px-4 py-3 backdrop-blur-sm">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
              Edition No. 04
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:col-span-5 lg:py-6 lg:pr-0">
          <div className="space-y-6">
            <span className="block font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
              Detalle de producto
            </span>

            <div className="space-y-4">
              <h1 className="max-w-[10ch] font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-black">
                {product.name}
              </h1>
              <p className="max-w-[34ch] text-[15px] leading-8 text-[#44474d]">
                {product.description}
              </p>
            </div>

            <div className="h-px w-20 bg-[#735c00]" />

            <p className="max-w-[48ch] text-[15px] leading-8 text-[#44474d]">
              {product.detail}
            </p>

            <div className="grid gap-3 pt-2">
              {highlights.map((item) => (
                <div key={item} className="border border-[#e5ddd2] bg-[#f6f3f2] px-4 py-4">
                  <Plus size={14} className="mb-3 text-[#735c00]" />
                  <p className="m-0 text-sm leading-7 text-[#44474d]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e5ddd2] pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
                  Precio
                </span>
                <Price value={product.price} className="font-display text-4xl font-semibold text-black" />
              </div>

              <p className="text-sm text-[#44474d]">{product.stock} unidades disponibles</p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <Button
                href={buildProductWhatsAppUrl(product)}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <MessageCircle size={16} />
                Comprar por WhatsApp
              </Button>

              <AddToCartButton
                product={{
                  slug: product.slug,
                  name: product.name,
                  price: Number(product.price),
                  imageUrl: product.imageUrl,
                  stock: Number(product.stock),
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
