import { NextResponse } from "next/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;

export function GET() {
  const content = `User-agent: *
Disallow: /admin
Disallow: /api
Disallow: /admin/productos
Disallow: /admin/productos/nuevo

Sitemap: ${sitemapUrl}`;
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
