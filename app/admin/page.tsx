import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { ShieldCheck } from "lucide-react";
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

type AdminPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await redirectIfAuthenticated();
  const { error } = await searchParams;

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[480px] flex-col justify-center px-6 py-16 lg:px-8">
      <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-[#735c00]">
        Acceso privado
      </p>
      <h1 className="mb-8 font-display text-[clamp(2.2rem,4vw,3rem)] font-bold leading-[0.95] tracking-[-0.05em] text-black">
        Admin de la tienda
      </h1>

      <div className="border border-[#e5ddd2] bg-[#fcf9f8] p-6 shadow-[0_18px_35px_rgba(81,95,120,0.06)] sm:p-8">
        <div className="mb-6 flex items-center gap-4 border-b border-[#e5ddd2] pb-5">
          <span className="inline-flex h-12 w-12 items-center justify-center border border-[#e5ddd2] bg-[#f6f3f2] text-[#735c00]">
            <ShieldCheck size={22} />
          </span>
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#735c00]">
              Google
            </p>
            <p className="text-sm text-[#44474d]">
              Acceso controlado al panel privado.
            </p>
          </div>
        </div>

        {error === "unauthorized" ? (
          <p className="mb-4 text-sm text-red-600">
            Esa cuenta de Google no está autorizada para acceder al admin.
          </p>
        ) : null}

        <AdminAuth />
      </div>
    </section>
  );
}
