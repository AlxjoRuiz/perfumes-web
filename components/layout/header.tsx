import Link from "next/link";
import { User } from "lucide-react";
import { CartCount } from "@/components/cart/CartCount";

const navItems = [
  { href: "/#collections", label: "Collections" },
  { href: "/#scent-stories", label: "Scent Stories" },
  { href: "/#atelier", label: "Atelier" },
];

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e5ddd233] bg-[#fcf9f8]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-8">
        <div className="shrink-0">
          <p className="m-0 font-display text-[1.2rem] font-semibold leading-none tracking-[-0.02em] text-black md:text-[1.6rem]">
            <Link href="/#page-hero" className="inline-block">
              AURA NOIR
            </Link>
          </p>
        </div>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Main Navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-transparent pb-1 font-body text-[0.8rem] uppercase tracking-[0.28em] text-[#7d7b78] transition-colors duration-200 hover:border-[#735c00] hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <CartCount />
          <Link href="/admin" aria-label="Admin" className="inline-flex items-center text-black">
            <User size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
