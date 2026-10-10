import type { Metadata } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/archivo/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
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
    default: "Dumbphones India — Minimalist Keypad & Compact Phones",
    template: "%s — Dumbphones India",
  },
  description:
    "India's home for minimalist keypad and compact phones. Cash on Delivery across India, in-hand Mumbai stock, every device tested before dispatch. Qin, Duoqin, Unihertz, BLUEFOX & CAT.",
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
