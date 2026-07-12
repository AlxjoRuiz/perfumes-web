import Link from "next/link";

const navItems = [
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/mensajes", label: "Mensajes" },
];

export function AdminNav() {
  return (
    <nav className="flex flex-wrap gap-6 border-b border-[#e5ddd2] pb-4" aria-label="Admin Navigation">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[#44474d] transition-colors hover:text-black"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
