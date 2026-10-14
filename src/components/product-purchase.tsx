"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  Truck,
  BadgeCheck,
  Video,
  Banknote,
  MessageCircle,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { STORE } from "@/lib/data";
import { discountPct, inr, COD_FEE } from "@/lib/format";
import { useCart } from "@/lib/store";
import clsx from "clsx";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const cart = useCart();
  const [variantName, setVariantName] = useState(product.variants[0].name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = useMemo(
    () => product.variants.find((v) => v.name === variantName) ?? product.variants[0],
    [product, variantName],
  );
  const available = product.inStock && variant.inStock;
  const pct = discountPct(variant.price, variant.mrp ?? product.mrp);
  const isPack = product.category === "accessories";

  return (
    <div>
      {/* Variant selector */}
      {product.variants.length > 1 && (
        <div className="mt-7">
          <p className="field-label">
            {isPack ? "Pack" : "Colour"} — <span className="text-ink">{variant.name}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setVariantName(v.name)}
                className={clsx(
                  "flex items-center gap-2.5 border px-4 py-2.5 text-sm transition-all",
                  v.name === variantName
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-cream text-ink hover:border-ink",
                )}
              >
                {v.swatch && (
                  <span
                    className="size-4 rounded-full border border-line-dark"
                    style={{ background: v.swatch }}
                  />
                )}
                <span>{v.name}</span>
                {v.price !== product.price && (
                  <span className="font-mono text-[0.65rem] opacity-70">{inr(v.price)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-mono text-3xl font-medium text-ink">{inr(variant.price)}</p>
        {variant.mrp && (
          <p className="font-mono text-base text-faint line-through">{inr(variant.mrp)}</p>
        )}
        {pct && (
          <span className="bg-gold px-2 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink">
            You save {inr((variant.mrp ?? 0) - variant.price)} ({pct}%)
          </span>
        )}
      </div>
      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
        Final net price — no customs duty, no hidden charges
      </p>

      {/* Qty + actions */}
      <div className="mt-6 flex flex-wrap items-stretch gap-3">
        <div className="flex items-center border border-line bg-cream">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-12 place-items-center text-ink transition-colors hover:text-royal disabled:opacity-30"
            disabled={!available || qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center font-mono text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="grid size-12 place-items-center text-ink transition-colors hover:text-royal disabled:opacity-30"
            disabled={!available || qty >= 10}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {available ? (
          <>
            <button
              onClick={() => {
                cart.add(product.slug, variant.name, qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 1600);
              }}
              className={clsx("btn flex-1", added ? "btn-gold" : "btn-primary")}
            >
              <ShoppingBag className="size-4" />
              {added ? "Added to cart" : "Add to cart"}
            </button>
            <button
              onClick={() => {
                cart.add(product.slug, variant.name, qty);
                router.push("/checkout");
              }}
              className="btn btn-outline flex-1"
            >
              <Zap className="size-4" /> Buy now
            </button>
          </>
        ) : (
          <a
            href={`https://wa.me/${STORE.sales.phoneHref.replace(/\+/g, "")}?text=${encodeURIComponent(
              `Hi! Please notify me when the ${product.name} is back in stock.`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline flex-1"
          >
            <MessageCircle className="size-4" /> Notify me on WhatsApp
          </a>
        )}
      </div>

      {/* Stock + COD line */}
      <p className="mt-4 flex items-center gap-2 text-sm">
        <span className={clsx("size-2 rounded-full", available ? "bg-success" : "bg-danger")} />
        {available ? (
          <span className="text-mute">
            In stock at the Mumbai office — ready to dispatch.{" "}
            <span className="text-ink">COD available for 99.9% of Indian PIN codes.</span>
          </span>
        ) : (
          <span className="text-mute">Currently out of stock — restock alerts via WhatsApp.</span>
        )}
      </p>

      {/* Trust rows */}
      <div className="mt-7 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {[
          { icon: Truck, title: "Free shipping — prepaid", sub: `COD: ₹${COD_FEE} handling fee` },
          { icon: BadgeCheck, title: "Verified original only", sub: "Brand-new, never refurbished" },
          { icon: Video, title: "Live video-call support", sub: "See the phone in-hand before you buy" },
          { icon: Banknote, title: "Tested before dispatch", sub: "Unboxing photo shared on WhatsApp" },
        ].map((t) => (
          <div key={t.title} className="flex items-start gap-3 bg-cream p-4">
            <t.icon className="mt-0.5 size-4.5 shrink-0 text-royal" strokeWidth={1.7} />
            <div>
              <p className="text-[0.82rem] font-medium text-ink">{t.title}</p>
              <p className="mt-0.5 text-[0.72rem] text-mute">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
