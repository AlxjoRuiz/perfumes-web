import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#destacados", label: "Destacados" },
  { href: "#confianza", label: "Confianza" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-brand">
        <span className="site-brand-mark" aria-hidden="true">
          <Sparkles size={18} />
        </span>
        <div>
          <p className="site-brand-kicker">Perfumes</p>
          <p className="site-brand-name">Aromas con presencia</p>
        </div>
      </div>

      <nav className="site-nav" aria-label="Navegacion principal">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="site-nav-link">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-actions">
        <Button href="/carrito" variant="ghost" size="sm">
          <ShoppingBag size={16} />
          Carrito
        </Button>
        <Button href="/admin" variant="solid" size="sm">
          Admin
        </Button>
      </div>
    </header>
  );
}
