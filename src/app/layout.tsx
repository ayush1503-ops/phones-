import type { Metadata } from "next";
import "@fontsource-variable/fraunces/index.css";
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import { CartProvider, WishlistProvider } from "@/lib/store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: "Dumbphones India — Keypad and Compact Android Phones",
    template: "%s — Dumbphones India",
  },
  description:
    "Shop keypad phones and compact Androids from a small team in Mumbai. Prepaid delivery is free, COD is available across India, and our team can help you choose over WhatsApp.",
  keywords: [
    "dumbphone india",
    "keypad phone",
    "minimalist phone",
    "Qin F22 Pro",
    "Qin F21 Pro",
    "Duoqin F25 Pro",
    "Unihertz Jelly Star",
    "Unihertz Titan 2",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <WishlistProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <WhatsAppFloat />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
