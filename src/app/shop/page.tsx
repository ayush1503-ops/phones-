import { Suspense } from "react";
import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/data";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse the full Jasu Phones catalogue — minimalist keypad phones, compact smartphones and genuine accessories. COD across India, free prepaid shipping.",
};

export default function ShopPage() {
  return (
    <div className="container-x py-12 md:py-16">
      <header className="mb-10">
        <p className="kicker">Shop</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          The full collection.
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mute">
          Easy-to-use, long-lasting keypad and compact phones — perfect for those who value
          simplicity and strong battery life. Every unit is in-hand at our Mumbai office.
        </p>
      </header>
      <Suspense fallback={<ShopFallback />}>
        <ShopBrowser products={PRODUCTS} />
      </Suspense>
    </div>
  );
}

function ShopFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[4/5.6] animate-pulse border border-line bg-cream" />
      ))}
    </div>
  );
}
