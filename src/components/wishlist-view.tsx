"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/store";
import { getProduct } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export function WishlistView() {
  const wishlist = useWishlist();

  if (!wishlist.hydrated) {
    return <div className="aspect-[4/1] animate-pulse border border-line bg-cream" />;
  }

  const products = wishlist.slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="grid place-items-center border border-dashed border-line-dark bg-cream px-6 py-24 text-center">
        <div>
          <Heart className="mx-auto size-8 text-faint" strokeWidth={1.4} />
          <p className="mt-5 font-display text-3xl text-ink">No wishlist yet.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mute">
            Tap the heart on any product to keep it here while you decide between models.
          </p>
          <Link href="/shop" className="btn btn-primary mt-7">
            Browse the collection <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
