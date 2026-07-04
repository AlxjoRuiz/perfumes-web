import Link from "next/link";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "573000000000";

export function Footer() {
  return (
    <footer className="border-t border-[#2d2a241a] bg-[#171613] px-6 py-[80px] text-[#e5e2dc] lg:px-8">
      <div className="mx-auto mb-14 grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <span className="m-0 font-display text-[1rem] font-medium tracking-[-0.02em] text-[#e5e2dc]">
            AURA NOIR
          </span>
          <p className="m-0 max-w-[22ch] text-[11px] leading-5 text-[#e5e2dccc]">
            Crafting olfactory poetry since 1924. Located in the heart of Paris, shipping worldwide.
          </p>
          <div className="flex gap-3 text-[11px] uppercase tracking-[0.16em] text-[#e5e2dccc]">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="cursor-pointer no-underline transition-colors duration-300 hover:text-white">
              Instagram
            </a>
            <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="cursor-pointer no-underline transition-colors duration-300 hover:text-white">
              WhatsApp
            </a>
            <a href="mailto:hola@perfumes.com" className="cursor-pointer no-underline transition-colors duration-300 hover:text-white">
              Email
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5e2dc66]">Boutique</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li><Link href="/#collections" className="text-[11px] text-[#e5e2dccc] no-underline hover:text-white">Collections</Link></li>
            <li><Link href="/admin" className="text-[11px] text-[#e5e2dccc] no-underline hover:text-white">Gift Sets</Link></li>
            <li><Link href="/#atelier" className="text-[11px] text-[#e5e2dccc] no-underline hover:text-white">Home Fragrance</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5e2dc66]">Information</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li><Link href="/#scent-stories" className="text-[11px] text-[#e5e2dccc] no-underline hover:text-white">Sustainability</Link></li>
            <li><Link href="/carrito" className="text-[11px] text-[#e5e2dccc] no-underline hover:text-white">Shipping & Returns</Link></li>
            <li><a href="mailto:hola@perfumes.com" className="text-[11px] text-[#e5e2dccc] no-underline hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5e2dc66]">Newsletter</span>
          <p className="m-0 max-w-[26ch] text-[11px] leading-5 text-[#e5e2dccc]">
            Subscribe to receive exclusive invitations and scent releases.
          </p>
          <input
            type="email"
            placeholder="YOUR EMAIL"
            className="w-full border-0 border-b border-[#e5e2dc33] bg-transparent py-2 font-body text-[10px] font-medium uppercase tracking-[0.14em] text-[#e5e2dc] outline-none placeholder:text-[#e5e2dca6]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] border-t border-[#e5e2dc14] pt-5">
        <p className="m-0 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e5e2dc66]">
          © 2024 AURA NOIR PARFUMERIE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
