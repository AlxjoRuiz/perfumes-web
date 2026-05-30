import Link from "next/link";
import { ArrowRight, CheckCircle2, Truck, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { getActiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const trustItems = [
  {
    icon: Truck,
    title: "Envios seguros",
    description: "Despachos bien empacados y seguimiento claro para cada pedido.",
  },
  {
    icon: MessageCircle,
    title: "Pedidos por WhatsApp",
    description: "Compra rapida con un mensaje directo y atencion personalizada.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad y originalidad",
    description: "Seleccion curada con foco en perfumes confiables y presentables.",
  },
];

export default async function Home() {
  const { products, source, error } = await getActiveProducts();
  const shouldShowCatalogNote = source !== "supabase" || Boolean(error);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Tienda de perfumes</p>
          <h1>Fragancias que se sienten tan bien como se ven.</h1>
          <p className="hero-lead">
            Una base editorial para vender perfumes con una experiencia clara,
            elegante y lista para crecer con Supabase, carrito y WhatsApp.
          </p>

          <div className="hero-actions">
            <Button href="#destacados">
              Ver destacados
              <ArrowRight size={16} />
            </Button>
            <Button href="/admin" variant="ghost">
              Acceso admin
            </Button>
          </div>

          <div className="hero-points">
            <span>
              <CheckCircle2 size={16} />
              Catalogo curado
            </span>
            <span>
              <CheckCircle2 size={16} />
              Checkout simple
            </span>
            <span>
              <CheckCircle2 size={16} />
              Base lista para escalar
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Imagen de perfume elegante">
          <img src="/perfume-hero.svg" alt="Frasco de perfume elegante sobre fondo calido" />
          <div className="hero-visual-card">
            <strong>Seleccion premium</strong>
            <p>Diseno sobrio, lectura rapida y foco en conversion.</p>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Beneficios principales">
        {[
          ["Asesoria", "Acompanamiento rapido por WhatsApp"],
          ["Calidad", "Productos pensados para destacar"],
          ["Velocidad", "Landing ligera y responsive"],
        ].map(([title, text]) => (
          <article key={title} className="stat-card">
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="section" id="destacados">
        <div className="section-heading">
          <p className="eyebrow">Destacados</p>
          <h2>Productos listos para darle forma al catalogo.</h2>
          <p>
            La grilla ya lee Supabase y, si hace falta, muestra una version de
            ejemplo para que la experiencia no se corte.
          </p>
          {shouldShowCatalogNote ? (
            <p className="section-note" role="status">
              {error ?? "Mostrando un catalogo de ejemplo mientras cargamos los productos reales."}
            </p>
          ) : null}
        </div>
        <ProductGrid items={products} />
      </section>

      <section className="section" id="confianza">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Confianza</p>
            <h2>Una propuesta clara para vender sin ruido.</h2>
          </div>
          <p>
            La interfaz prioriza legibilidad, jerarquia visual y sensacion de
            marca desde el primer scroll.
          </p>
        </div>

        <div className="trust-grid">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="trust-card">
                <span className="trust-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cta-strip">
        <div>
          <p className="eyebrow">Siguiente paso</p>
          <h2>Conectar esta base con productos reales de Supabase.</h2>
        </div>
        <Link href="/admin" className="cta-strip-link">
          Ir al admin
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
