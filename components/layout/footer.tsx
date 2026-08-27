import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#2d2a241a] bg-[#171613] px-6 pt-24 pb-12 text-[#e5e2dc] lg:px-8">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-5">
          <span className="m-0 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-[#e5e2dc]">
            THEONYS PARFUM
          </span>
          <p className="m-0 max-w-[23ch] text-[13px] leading-7 text-[#e5e2dccc]">
            Creando memorias olfativas desde 1924. Un testimonio de lujo invisible y elegancia eterna.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5e2dc]">
            Experiencia
          </span>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li><Link href="/#collections" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Colecciones</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5e2dc]">
            Atención al cliente
          </span>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li><Link href="/envios-y-devoluciones" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Envíos y devoluciones</Link></li>
            <li><Link href="/politica-de-privacidad" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Política de privacidad</Link></li>
            <li><Link href="/contacto" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Contáctanos</Link></li>
          </ul>
        </div>

      </div>

      <div className="mx-auto mt-20 max-w-[1280px] border-t border-[#e5e2dc14] pt-8 text-center">
        <p className="m-0 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e5e2dc66]">
          © 2024 THEONYS PARFUM PARFUMERIE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
