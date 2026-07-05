import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminAuth } from "@/components/admin/admin-auth";

export const metadata = {
  title: "Admin - Aura Noir",
  robots: {
    index: false,
    follow: false,
  },
};

async function redirectIfAuthenticated() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return;
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: async () =>
        (await cookieStore.getAll()).map((cookie) => ({ name: cookie.name, value: cookie.value })),
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/admin/productos");
  }
}

export default async function AdminPage() {
  await redirectIfAuthenticated();

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
            Acceso privado
          </p>
          <h1 className="max-w-[10ch] font-display text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-black">
            Admin de la tienda
          </h1>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-8 text-[#44474d]">
            Gestiona productos, revisa el inventario y prepara el catálogo para la tienda pública.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6">
              <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
                Acceso
              </p>
              <p className="text-sm leading-7 text-[#44474d]">
                Inicia sesión con correo para entrar al panel de administración y gestionar productos.
              </p>
            </div>
            <div className="border border-[#e5ddd2] bg-[#f6f3f2] p-6">
              <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
                Enlaces
              </p>
              <p className="text-sm leading-7 text-[#44474d]">
                Abre el catálogo, crea nuevos perfumes o vuelve al inicio público.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_18px_35px_rgba(81,95,120,0.06)] sm:p-8">
            <div className="mb-6 flex items-center gap-4 border-b border-[#e5ddd2] pb-5">
              <span className="inline-flex h-12 w-12 items-center justify-center border border-[#e5ddd2] bg-[#f6f3f2] text-[#735c00]">
                <ShieldCheck size={22} />
              </span>
              <div>
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
                  Correo OTP
                </p>
                <p className="text-sm text-[#44474d]">
                  Acceso controlado al panel privado.
                </p>
              </div>
            </div>

            <AdminAuth />

            <div className="mt-6 grid gap-3">
              <Link href="/admin/productos" className="block">
                <Button className="w-full">Ver productos</Button>
              </Link>
              <Link href="/admin/productos/nuevo" className="block">
                <Button variant="ghost" className="w-full">Crear nuevo producto</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
