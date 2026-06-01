import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

const navItems = [
  { href: "#collections", label: "Collections" },
  { href: "#scent-stories", label: "Scent Stories" },
  { href: "#atelier", label: "Atelier" },
];

export function Header() {
  return (
    <header className="fixed left-1/2 top-0 z-50 w-full max-w-[1280px] -translate-x-1/2 border-b border-[#e5ddd233] bg-[#fcf9f8]/95 px-6 py-4 backdrop-blur-[10px]">
      <div className="flex items-center justify-between gap-6">
        <div className="shrink-0">
          <p className="m-0 font-display text-[1.6rem] font-medium leading-none tracking-[-0.02em] text-black">
            AURA NOIR
          </p>
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[0.8rem] uppercase tracking-[0.18em] text-[#7d7b78] transition-colors duration-200 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/carrito" aria-label="Carrito">
            <ShoppingBag size={18} className="text-black" />
          </Link>
          <Link href="/admin" aria-label="Admin">
            <User size={18} className="text-black" />
          </Link>
        </div>
      </div>
    </header>
  );
}
