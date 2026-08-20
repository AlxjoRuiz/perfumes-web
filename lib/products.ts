import type { Product, ProductDetail, ProductPreview } from "@/types/product";

type ProductListSource = "supabase" | "fallback" | "empty";

type ProductListResult = {
  products: ProductPreview[];
  source: ProductListSource;
  error?: string;
};

const fallbackProducts: ProductDetail[] = [
  {
    id: "demo-1",
    name: "Sauvage Intense",
    slug: "sauvage-intense",
    description:
      "Una salida fresca y especiada con fondo ambarado, pensada para dejar huella.",
    detail:
      "Ideal para quien busca presencia, proyeccion y un estilo moderno que funcione en cualquier momento del dia.",
    price: 385000,
    image_url: "/perfume-nocturnal-bloom.svg",
    imageUrl: "/perfume-nocturnal-bloom.svg",
    stock: 12,
    is_active: true,
    created_at: "2026-05-01T00:00:00.000Z",
    updated_at: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "demo-2",
    name: "Bleu Signature",
    slug: "bleu-signature",
    description:
      "Perfil elegante y limpio con un aire versatil, ideal para uso diario o eventos.",
    detail:
      "Su equilibrio entre frescura y elegancia lo convierte en una fragancia facil de llevar y muy comercial.",
    price: 420000,
    image_url: "/perfume-solaris-oud.svg",
    imageUrl: "/perfume-solaris-oud.svg",
    stock: 7,
    is_active: true,
    created_at: "2026-05-02T00:00:00.000Z",
    updated_at: "2026-05-02T00:00:00.000Z",
  },
  {
    id: "demo-3",
    name: "Velvet Rose",
    slug: "velvet-rose",
    description:
      "Un floral suave con sensacion cremosa y presencia sofisticada en la piel.",
    detail:
      "Pensado para quienes buscan una firma olfativa mas delicada, con un acabado femenino y memorable.",
    price: 365000,
    image_url: "/perfume-silver-rain.svg",
    imageUrl: "/perfume-silver-rain.svg",
    stock: 0,
    is_active: true,
    created_at: "2026-05-03T00:00:00.000Z",
    updated_at: "2026-05-03T00:00:00.000Z",
  },
];

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return { supabaseUrl, supabaseAnonKey };
}

function toPreview(product: Product): ProductPreview {
  return {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    stock: Number(product.stock),
    imageUrl: product.image_url,
    badge: product.stock > 0 ? "Disponible" : "Agotado",
  };
}

function toDetail(product: Product): ProductDetail {
  return {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    imageUrl: product.image_url,
  };
}

function getFallbackList() {
  return fallbackProducts.map(toPreview);
}

async function fetchSupabaseProducts(query: string) {
  const config = getSupabaseConfig();

  if (!config) {
    return { data: null, error: "missing-config" as const };
  }

  const requestUrl = new URL(`${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/products`);
  requestUrl.search = query;

  const response = await fetch(requestUrl, {
    cache: "no-store",
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    return { data: null, error: `http-${response.status}` as const };
  }

  return { data: (await response.json()) as Product[], error: null };
}

export async function getActiveProducts(): Promise<ProductListResult> {
  const { data, error } = await fetchSupabaseProducts(
    new URLSearchParams({
      select: "*",
      is_active: "eq.true",
      order: "created_at.desc",
    }).toString(),
  );

  if (error === "missing-config") {
    return {
      products: getFallbackList(),
      source: "fallback",
      error:
        "Faltan las variables de entorno de Supabase, asi que estamos mostrando un catalogo de ejemplo.",
    };
  }

  if (error) {
    return {
      products: getFallbackList(),
      source: "fallback",
      error:
        "No fue posible leer los productos desde Supabase, asi que mostramos un catalogo de ejemplo.",
    };
  }

  const products = (data ?? []).map(toPreview);

  if (products.length === 0) {
    return {
      products: [],
      source: "empty",
    };
  }

  return {
    products,
    source: "supabase",
  };
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const query = new URLSearchParams({
    select: "*",
    slug: `eq.${slug}`,
    is_active: "eq.true",
    limit: "1",
  }).toString();

  const { data, error } = await fetchSupabaseProducts(query);

  if (error === "missing-config") {
    return fallbackProducts.find((product) => product.slug === slug && product.is_active) ?? null;
  }

  if (error || !data?.[0]) {
    return fallbackProducts.find((product) => product.slug === slug && product.is_active) ?? null;
  }

  return toDetail(data[0]);
}

export async function getAllProducts(): Promise<Product[]> {
  const query = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
  }).toString();

  const { data, error } = await fetchSupabaseProducts(query);

  if (error === "missing-config") {
    return fallbackProducts;
  }

  if (error) {
    return fallbackProducts;
  }

  return data ?? [];
}
