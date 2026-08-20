import { NextResponse } from "next/server";
import { getActiveProducts } from "@/lib/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const baseUrl = siteUrl.replace(/\/$/, "");

export async function GET() {
  const { products } = await getActiveProducts();

  const urls = [
    { loc: `${baseUrl}/`, changefreq: "yearly", priority: "1.0" },
    { loc: `${baseUrl}/productos`, changefreq: "weekly", priority: "0.8" },
    { loc: `${baseUrl}/carrito`, changefreq: "monthly", priority: "0.4" },
    { loc: `${baseUrl}/contacto`, changefreq: "monthly", priority: "0.5" },
    { loc: `${baseUrl}/envios-y-devoluciones`, changefreq: "monthly", priority: "0.5" },
    { loc: `${baseUrl}/politica-de-privacidad`, changefreq: "monthly", priority: "0.5" },
    ...products.map(
      (product) => ({
        loc: `${baseUrl}/productos/${product.slug}`,
        changefreq: "weekly",
        priority: "0.6",
      }),
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
