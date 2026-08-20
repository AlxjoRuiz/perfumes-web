import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AURA NOIR",
    template: "%s | AURA NOIR",
  },
  description: "Tienda web de perfumes con landing comercial, carrito y checkout por WhatsApp.",
   metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-0 px-0 pt-[80px]">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
