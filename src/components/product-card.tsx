"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { discountPct, inr } from "@/lib/format";
import { useCart, useWishlist } from "@/lib/store";
import { useState } from "react";
import clsx from "clsx";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wishlist = useWishlist();
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const pct = discountPct(product.price, product.mrp);
  const wished = wishlist.has(product.slug);
  const secondImage = product.images[1];

  return (
    <div className="group relative flex flex-col border border-line bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-line-dark hover:shadow-[0_20px_50px_rgba(20,28,51,0.09)]">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {pct && (
          <span className="bg-gold px-2 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.12em] text-ink">
            Save {pct}%
          </span>
        )}
        {!product.inStock && (
          <span className="bg-ink px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cream">
            Out of stock
          </span>
        )}
        {product.inStock && product.newArrival && (
          <span className="border border-royal/40 bg-cream px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-royal">
            New arrival
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => wishlist.toggle(product.slug)}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className={clsx(
          "absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border transition-all",
          wished
            ? "border-gold bg-gold text-ink"
            : "border-line bg-cream/90 text-ink/60 hover:border-gold hover:text-ink",
        )}
      >
        <Heart className={clsx("size-4", wished && "fill-current")} strokeWidth={1.8} />
      </button>

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[5/5.4] overflow-hidden bg-white">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={clsx(
            "object-contain p-6 transition-all duration-700 ease-out group-hover:scale-[1.045]",
            secondImage && "group-hover:opacity-0",
          )}
          priority={index < 2}
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="scale-[1.045] object-contain p-6 opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col border-t border-line/70 p-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">{product.brand}</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-faint">{product.category}</p>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-1.5">
          <h3 className="line-clamp-2 text-[0.95rem] font-medium leading-snug text-ink transition-colors group-hover:text-royal">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="font-mono text-[0.95rem] font-medium text-ink">{inr(product.price)}</p>
            {product.mrp && (
              <p className="font-mono text-[0.68rem] text-faint line-through">{inr(product.mrp)}</p>
            )}
          </div>
          {product.inStock ? (
            <button
              onClick={() => {
                cart.add(product.slug);
                setAdded(true);
                setTimeout(() => setAdded(false), 1400);
              }}
              className={clsx(
                "flex items-center gap-1.5 border px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] transition-all",
                added
                  ? "border-success bg-success text-cream"
                  : "border-ink text-ink hover:bg-ink hover:text-cream",
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="size-3" />
              {added ? "Added" : "Add"}
            </button>
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center gap-1.5 border border-line px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-mute transition-colors hover:border-ink hover:text-ink"
            >
              <Eye className="size-3" /> View
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
