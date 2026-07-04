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
    <section className="page-panel">
      <div className="space-y-6 rounded-[24px] border border-[#e5ddd2] bg-[#fcf9f8] p-10 shadow-[0_18px_35px_rgba(81,95,120,0.06)]">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f0eded] text-[#735c00]">
            <ShieldCheck size={22} />
          </span>
          <div>
            <h1 className="m-0 text-3xl font-display font-semibold">Admin de la tienda</h1>
            <p className="m-0 mt-2 max-w-[54ch] text-[#44474d]">
              Gestiona productos, revisa el inventario y prepara el catálogo para la tienda pública.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4 rounded-[18px] border border-[#d8c39a] bg-[#fff8e7] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#735c00]">Acceso</p>
            <p className="mt-2 text-sm text-[#44474d]">
              Inicia sesión con correo para entrar al panel de administración y gestionar productos.
            </p>
            <AdminAuth />
          </div>

          <div className="space-y-4 rounded-[18px] border border-[#d8c39a] bg-[#fff8e7] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#735c00]">Enlaces</p>
            <div className="grid gap-3">
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
