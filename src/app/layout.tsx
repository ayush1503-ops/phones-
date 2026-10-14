import type { Metadata } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider, WishlistProvider } from "@/lib/store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jasuphones.com"),
  title: {
    default: "Jasu Phones — Minimalist Keypad & Compact Phones",
    template: "%s — Jasu Phones",
  },
  description:
    "India's home for minimalist keypad and compact phones. Cash on Delivery across India, in-hand Mumbai stock, every device tested before dispatch. Qin, Duoqin, Unihertz, BLUEFOX & CAT.",
  keywords: [
    "jasu phones",
    "jasu dumbphones",
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
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${plex.variable}`}>
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
