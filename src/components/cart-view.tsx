"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, Banknote } from "lucide-react";
import { useCart } from "@/lib/store";
import { inr, COD_FEE } from "@/lib/format";

export function CartView() {
  const cart = useCart();

  if (!cart.hydrated) {
    return <div className="aspect-[4/1] animate-pulse border border-line bg-cream" />;
  }

  if (cart.items.length === 0) {
    return (
      <div className="grid place-items-center border border-dashed border-line-dark bg-cream px-6 py-24 text-center">
        <div>
          <ShoppingBag className="mx-auto size-8 text-faint" strokeWidth={1.4} />
          <p className="mt-5 font-display text-3xl text-ink">Your cart is empty.</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mute">
            Your future, less-distracted self is waiting. Start with a keypad phone that still does
            WhatsApp and UPI.
          </p>
          <Link href="/shop" className="btn btn-primary mt-7">
            Browse the collection <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      {/* Lines */}
      <div className="divide-y divide-line border-y border-line">
        {cart.items.map((item) => (
          <div key={`${item.slug}-${item.variant}`} className="grid grid-cols-[6rem_1fr] gap-5 py-6 sm:grid-cols-[7rem_1fr_auto]">
            <Link
              href={`/product/${item.slug}`}
              className="relative aspect-square overflow-hidden border border-line bg-white"
            >
              <Image src={item.image} alt={item.name} fill sizes="7rem" className="object-contain p-2.5" />
            </Link>
            <div className="flex flex-col">
              <Link href={`/product/${item.slug}`} className="text-[0.95rem] font-medium leading-snug text-ink hover:text-royal">
                {item.name}
              </Link>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                Variant: {item.variant}
              </p>
              <div className="mt-auto flex items-center gap-4 pt-3">
                <div className="flex items-center border border-line bg-cream">
                  <button
                    onClick={() => cart.setQty(item.slug, item.variant, item.qty - 1)}
                    className="grid size-9 place-items-center text-ink hover:text-royal"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-7 text-center font-mono text-sm">{item.qty}</span>
                  <button
                    onClick={() => cart.setQty(item.slug, item.variant, item.qty + 1)}
                    className="grid size-9 place-items-center text-ink hover:text-royal"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => cart.remove(item.slug, item.variant)}
                  className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint transition-colors hover:text-danger"
                >
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </div>
            </div>
            <div className="col-span-2 flex items-baseline justify-between sm:col-span-1 sm:flex-col sm:items-end">
              <p className="font-mono text-sm font-medium text-ink">{inr(item.price * item.qty)}</p>
              {item.mrp && (
                <p className="font-mono text-[0.65rem] text-faint line-through">
                  {inr(item.mrp * item.qty)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <aside className="h-fit border border-line bg-cream p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl text-ink">Order summary</h2>
        <dl className="mt-5 space-y-3 border-b border-line pb-5">
          <div className="flex justify-between text-sm">
            <dt className="text-mute">Subtotal ({cart.count} {cart.count === 1 ? "item" : "items"})</dt>
            <dd className="font-mono text-ink">{inr(cart.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-mute">Shipping — prepaid</dt>
            <dd className="font-mono text-success">Free</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-mute">Shipping — COD</dt>
            <dd className="font-mono text-ink">{inr(COD_FEE)} <span className="text-faint">handling</span></dd>
          </div>
        </dl>
        <div className="flex items-baseline justify-between py-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">Total (prepaid)</p>
          <p className="font-mono text-2xl font-medium text-ink">{inr(cart.subtotal)}</p>
        </div>
        <Link href="/checkout" className="btn btn-primary w-full">
          Proceed to checkout <ArrowRight className="size-3.5" />
        </Link>
        <div className="mt-6 space-y-2.5 border-t border-line pt-5">
          <p className="flex items-center gap-2.5 text-[0.78rem] text-mute">
            <Truck className="size-4 shrink-0 text-royal" /> Free shipping on prepaid orders, pan-India.
          </p>
          <p className="flex items-center gap-2.5 text-[0.78rem] text-mute">
            <Banknote className="size-4 shrink-0 text-royal" /> COD available — {inr(COD_FEE)} non-refundable
            confirmation &amp; handling fee.
          </p>
        </div>
      </aside>
    </div>
  );
}
