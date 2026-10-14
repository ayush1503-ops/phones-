"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";
import { getProduct } from "./data";

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (slug: string, variant?: string, qty?: number) => void;
  remove: (slug: string, variant: string) => void;
  setQty: (slug: string, variant: string, qty: number) => void;
  clear: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "dpi-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* corrupted cart — start fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((slug: string, variantName?: string, qty = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    const variant =
      product.variants.find((v) => v.name === variantName) ?? product.variants[0];
    if (!variant.inStock) return;
    setItems((prev) => {
      const key = (i: CartItem) => `${i.slug}::${i.variant}`;
      const existing = prev.find((i) => key(i) === `${slug}::${variant.name}`);
      if (existing) {
        return prev.map((i) =>
          key(i) === key(existing) ? { ...i, qty: Math.min(i.qty + qty, 10) } : i,
        );
      }
      return [
        ...prev,
        {
          slug,
          variant: variant.name,
          qty,
          price: variant.price,
          mrp: variant.mrp ?? product.mrp,
          name: product.name,
          image: product.images[0],
        },
      ];
    });
  }, []);

  const remove = useCallback((slug: string, variant: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.variant === variant)));
  }, []);

  const setQty = useCallback((slug: string, variant: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.variant === variant))
        : prev.map((i) =>
            i.slug === slug && i.variant === variant
              ? { ...i, qty: Math.min(qty, 10) }
              : i,
          ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return { items, count, subtotal, add, remove, setQty, clear, hydrated };
  }, [items, add, remove, setQty, clear, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Wishlist                                                            */
/* ------------------------------------------------------------------ */

type WishlistContextValue = {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  hydrated: boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const WISH_KEY = "dpi-wishlist-v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const value = useMemo(
    () => ({ slugs, toggle, has, hydrated }),
    [slugs, toggle, has, hydrated],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
