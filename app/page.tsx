export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6 py-16 text-stone-950">
      <section className="w-full max-w-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
          Fase 1
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Base tecnica lista para la tienda de perfumes
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          Next.js, TypeScript y Tailwind ya estan activos. La siguiente fase
          conectara Supabase con el modelo de productos.
        </p>
        <div className="mt-8 grid gap-3 text-sm font-medium text-stone-700 sm:grid-cols-3">
          <div className="border border-stone-200 bg-stone-50 p-4">
            TypeScript
          </div>
          <div className="border border-stone-200 bg-stone-50 p-4">
            Tailwind CSS
          </div>
          <div className="border border-stone-200 bg-stone-50 p-4">
            Supabase client
          </div>
        </div>
      </section>
      </main>
  );
}
