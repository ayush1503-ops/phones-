"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  PackageSearch,
  Phone,
  ArrowRight,
  Asterisk,
} from "lucide-react";
import { useCart, useWishlist } from "@/lib/store";
import { NAV_LINKS, PRODUCTS, STORE, searchProducts } from "@/lib/data";
import { inr } from "@/lib/format";
import clsx from "clsx";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-cream">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/80">
            <Asterisk className="size-3 text-gold" strokeWidth={2.5} />
            <span className="hidden sm:inline">Free shipping on prepaid orders across India</span>
            <span className="sm:hidden">Free prepaid shipping</span>
            <span className="text-cream/30">·</span>
            <span>COD available — ₹599 handling fee</span>
          </p>
          <div className="flex items-center gap-4 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
            <Link href="/track-order" className="hidden text-cream/80 transition-colors hover:text-gold md:block">
              Track order
            </Link>
            <a href={`tel:${STORE.sales.phoneHref}`} className="flex items-center gap-1.5 text-cream/80 transition-colors hover:text-gold">
              <Phone className="size-3" />
              <span className="hidden sm:inline">{STORE.sales.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={clsx(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-line bg-paper/90 shadow-[0_1px_24px_rgba(20,28,51,0.07)] backdrop-blur-xl"
            : "border-transparent bg-paper",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
          <div className="flex items-center gap-2">
            <button
              className="grid size-10 place-items-center text-ink transition-colors hover:text-royal lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <Link href="/" className="flex items-center gap-3" aria-label="Dumbphones India — home">
              <Image
                src="/images/brand/logo.png"
                alt="Dumbphones India"
                width={150}
                height={56}
                priority
                className="h-10 w-auto md:h-12"
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "group relative font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors",
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-royal"
                    : "text-ink/70 hover:text-ink",
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    "absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300",
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                      ? "w-full"
                      : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center text-ink transition-colors hover:text-royal"
              aria-label="Search (Ctrl+K)"
            >
              <Search className="size-[1.15rem]" strokeWidth={1.8} />
            </button>
            <Link
              href="/track-order"
              className="hidden size-10 place-items-center text-ink transition-colors hover:text-royal sm:grid"
              aria-label="Track your order"
            >
              <PackageSearch className="size-[1.15rem]" strokeWidth={1.8} />
            </Link>
            <Link
              href="/wishlist"
              className="relative grid size-10 place-items-center text-ink transition-colors hover:text-royal"
              aria-label="Wishlist"
            >
              <Heart className="size-[1.15rem]" strokeWidth={1.8} />
              {wishlist.hydrated && wishlist.slugs.length > 0 && (
                <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-gold font-mono text-[0.55rem] font-medium text-ink">
                  {wishlist.slugs.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative grid size-10 place-items-center text-ink transition-colors hover:text-royal"
              aria-label="Cart"
            >
              <ShoppingBag className="size-[1.15rem]" strokeWidth={1.8} />
              {cart.hydrated && cart.count > 0 && (
                <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-royal font-mono text-[0.55rem] font-medium text-cream">
                  {cart.count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <aside
          className={clsx(
            "absolute left-0 top-0 flex h-full w-[19rem] max-w-[85vw] flex-col bg-paper transition-transform duration-300",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line p-4">
            <Image src="/images/brand/logo.png" alt="Dumbphones India" width={120} height={44} className="h-9 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="grid size-10 place-items-center text-ink"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col p-4" aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between border-b border-line/70 py-4 font-display text-xl text-ink"
              >
                <span>{link.label}</span>
                <span className="font-mono text-[0.6rem] text-faint">0{i + 1}</span>
              </Link>
            ))}
            <Link
              href="/track-order"
              className="flex items-center justify-between border-b border-line/70 py-4 font-display text-xl text-ink"
            >
              <span>Track order</span>
              <PackageSearch className="size-4 text-faint" />
            </Link>
          </nav>
          <div className="mt-auto space-y-2 p-4">
            <a href={`tel:${STORE.sales.phoneHref}`} className="btn btn-primary w-full">
              <Phone className="size-3.5" /> Call sales
            </a>
            <p className="pt-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.15em] text-faint">
              COD available across India
            </p>
          </div>
        </aside>
      </div>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = searchProducts(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex flex-col bg-paper transition-all duration-300",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
        <span className="kicker">Search the store</span>
        <button onClick={onClose} className="grid size-10 place-items-center text-ink" aria-label="Close search">
          <X className="size-5" />
        </button>
      </div>

      <div className="container-x flex-1 overflow-y-auto pb-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
              onClose();
            }
          }}
          className="border-b-2 border-ink pb-4"
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Qin, Unihertz, Duoqin…"
            className="w-full bg-transparent font-display text-3xl text-ink outline-none placeholder:text-ink/25 md:text-5xl"
            aria-label="Search products"
          />
        </form>

        {query.trim() === "" ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="kicker mb-4">Popular right now</p>
              <ul className="space-y-1">
                {PRODUCTS.slice(0, 5).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between py-2.5"
                    >
                      <span className="font-display text-lg text-ink transition-colors group-hover:text-royal">
                        {p.name}
                      </span>
                      <ArrowRight className="size-4 text-faint transition-transform group-hover:translate-x-1 group-hover:text-royal" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker mb-4">Browse</p>
              <ul className="space-y-1">
                {[
                  { href: "/shop", label: "All products" },
                  { href: "/category/phones", label: "Phones" },
                  { href: "/category/accessories", label: "Accessories" },
                  { href: "/track-order", label: "Track an order" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-line/70 py-2.5"
                    >
                      <span className="font-display text-lg text-ink transition-colors group-hover:text-royal">
                        {l.label}
                      </span>
                      <ArrowRight className="size-4 text-faint transition-transform group-hover:translate-x-1 group-hover:text-royal" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="mt-10 font-display text-xl text-mute">
            Nothing found for “{query}”. Try “Qin”, “Unihertz”, “battery”…
          </p>
        ) : (
          <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.slice(0, 8).map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                onClick={onClose}
                className="group border border-line bg-cream p-4 transition-all hover:-translate-y-0.5 hover:border-royal hover:shadow-[0_12px_32px_rgba(20,28,51,0.08)]"
              >
                <div className="relative mb-3 aspect-square overflow-hidden bg-white">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-faint">{p.brand}</p>
                <p className="mt-1 line-clamp-2 text-sm font-medium text-ink">{p.name}</p>
                <p className="mt-1 font-mono text-xs text-royal">{inr(p.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
