import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#2d2a241a] bg-[#171613] px-6 pt-24 pb-12 text-[#e5e2dc] lg:px-8">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <span className="m-0 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-[#e5e2dc]">
            AURA NOIR
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
            <li><Link href="/#atelier" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Servicios de atelier</Link></li>
            <li><Link href="/admin" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Sostenibilidad</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5e2dc]">
            Atención al cliente
          </span>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li><Link href="/#scent-stories" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Envíos y devoluciones</Link></li>
            <li><Link href="/carrito" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Política de privacidad</Link></li>
            <li><a href="mailto:hola@perfumes.com" className="text-[13px] text-[#e5e2dccc] no-underline transition-colors hover:text-white">Contáctanos</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5e2dc]">
            Mantente al tanto
          </span>
          <p className="m-0 max-w-[26ch] text-[13px] leading-7 text-[#e5e2dccc]">
            Recibe historias de aroma seleccionadas y novedades del atelier.
          </p>
          <div className="flex items-center gap-3 border-b border-[#e5e2dc33] pb-3">
            <input
              type="email"
              placeholder="TU CORREO"
              className="w-full border-0 bg-transparent font-body text-[12px] uppercase tracking-[0.14em] text-[#e5e2dc] outline-none placeholder:text-[#e5e2dca6]"
            />
            <span className="text-lg text-[#e5e2dc]">→</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1280px] border-t border-[#e5e2dc14] pt-8 text-center">
        <p className="m-0 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e5e2dc66]">
          © 2024 AURA NOIR PARFUMERIE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
