import Link from "next/link";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "573000000000";

export function Footer() {
  return (
    <footer className="border-t border-[#2d2a241a] bg-[#171613] px-6 py-[96px] text-[#e5e2dc] lg:px-8">
      <div className="mx-auto mb-16 grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <span className="m-0 font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-[#e5e2dc]">
            AURA NOIR
          </span>
          <p className="m-0 max-w-[24ch] text-sm leading-7 text-[#e5e2dccc]">
            Crafting sensory memories through the ancient art of high perfumery. Each drop is a story, every bottle a legacy.
          </p>
          <div className="flex gap-4 text-[11px] uppercase tracking-[0.16em] text-[#e5e2dccc]">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="cursor-pointer no-underline transition-colors duration-300 hover:text-white">
              IG
            </a>
            <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" className="cursor-pointer no-underline transition-colors duration-300 hover:text-white">
              WA
            </a>
            <a href="mailto:hola@perfumes.com" className="cursor-pointer no-underline transition-colors duration-300 hover:text-white">
              Mail
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5e2dc66]">The Maison</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li><Link href="/#collections" className="text-[13px] text-[#e5e2dccc] no-underline hover:text-white">Collections</Link></li>
            <li><Link href="/#atelier" className="text-[13px] text-[#e5e2dccc] no-underline hover:text-white">Artisanship</Link></li>
            <li><Link href="/admin" className="text-[13px] text-[#e5e2dccc] no-underline hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5e2dc66]">Assistance</span>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li><Link href="/#scent-stories" className="text-[13px] text-[#e5e2dccc] no-underline hover:text-white">Shipping & Returns</Link></li>
            <li><Link href="/carrito" className="text-[13px] text-[#e5e2dccc] no-underline hover:text-white">Contact Us</Link></li>
            <li><a href="mailto:hola@perfumes.com" className="text-[13px] text-[#e5e2dccc] no-underline hover:text-white">FAQs</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5e2dc66]">Journal</span>
          <p className="m-0 max-w-[26ch] text-[11px] leading-5 text-[#e5e2dccc]">
            Receive curated scent stories and atelier updates.
          </p>
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
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
