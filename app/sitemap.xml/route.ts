import { NextResponse } from "next/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const baseUrl = siteUrl.replace(/\/$/, "");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
  <url>
    <loc>${baseUrl}/productos</loc>
  </url>
  <url>
    <loc>${baseUrl}/carrito</loc>
  </url>
</urlset>`;

export function GET() {
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
