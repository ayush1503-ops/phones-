"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Heart, Plus } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/lib/types";
import { discountPct, inr } from "@/lib/format";
import { useCart, useWishlist } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wishlist = useWishlist();
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const reducedMotion = useReducedMotion();
  const pct = discountPct(product.price, product.mrp);
  const wished = wishlist.has(product.slug);
  const secondImage = product.images[1];

  return (
    <motion.article
      className="group flex h-full flex-col"
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="relative mb-4 aspect-[4/4.6] overflow-hidden rounded-[0.35rem] bg-[#ece8df]">
        <Link href={`/product/${product.slug}`} className="absolute inset-0" aria-label={`View ${product.name}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={clsx(
              "object-contain p-5 transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.035]",
              secondImage && "group-hover:opacity-0",
            )}
            priority={index < 2}
          />
          {secondImage && (
            <Image
              src={secondImage}
              alt=""
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-5 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.035] group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {pct && <span className="bg-accent px-2.5 py-1 text-[0.68rem] font-semibold text-cream">Save {pct}%</span>}
          {!product.inStock && <span className="bg-ink px-2.5 py-1 text-[0.68rem] font-medium text-cream">Out of stock</span>}
          {product.inStock && product.newArrival && <span className="bg-cream px-2.5 py-1 text-[0.68rem] font-medium text-ink">New</span>}
        </div>

        <motion.button
          type="button"
          whileTap={reducedMotion ? undefined : { scale: 0.88 }}
          onClick={() => wishlist.toggle(product.slug)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className={clsx(
            "absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-cream/95 text-ink shadow-sm transition-colors hover:text-accent",
            wished && "text-accent",
          )}
        >
          <Heart className={clsx("size-[1.05rem]", wished && "fill-current")} strokeWidth={1.8} />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-xs font-medium text-mute">{product.brand} <span className="px-1 text-accent">·</span> {product.category}</p>
        <Link href={`/product/${product.slug}`} className="mt-1.5 w-fit">
          <h3 className="font-display text-[1.35rem] font-medium leading-[1.12] tracking-[-0.025em] text-ink transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-mute">{product.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3">
          <div>
            <p className="text-[0.96rem] font-semibold text-ink">{inr(product.price)}</p>
            {product.mrp && <p className="mt-0.5 text-xs text-mute line-through">{inr(product.mrp)}</p>}
          </div>
          {product.inStock ? (
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              onClick={() => {
                cart.add(product.slug);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1400);
              }}
              className={clsx(
                "inline-flex min-h-10 items-center gap-1.5 rounded-[0.35rem] border px-3 text-sm font-semibold transition-colors",
                added
                  ? "border-success bg-success text-white"
                  : "border-line-dark text-ink hover:border-ink hover:bg-ink hover:text-cream",
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? "Added" : "Add"}
              {!added && <Plus className="size-4" />}
            </motion.button>
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-[0.35rem] border border-line-dark px-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              Details <Eye className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
