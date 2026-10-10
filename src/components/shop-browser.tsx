"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, X, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { inr } from "@/lib/format";
import clsx from "clsx";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
];

export function ShopBrowser({
  products,
  initialCategory = "all",
  lockCategory = false,
}: {
  products: Product[];
  initialCategory?: string;
  lockCategory?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(56000);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceCeiling = useMemo(() => Math.max(...products.map((p) => p.price)), [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (inStockOnly && !p.inStock) return false;
      if (p.price > maxPrice) return false;
      if (q && ![p.name, p.brand, p.tagline, p.category].join(" ").toLowerCase().includes(q))
        return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.bestSeller) - Number(a.bestSeller) || Number(b.newArrival) - Number(a.newArrival),
        );
    }
    return list;
  }, [products, category, inStockOnly, maxPrice, query, sort]);

  function updateQueryParam(value: string) {
    setQuery(value);
    const params = new URLSearchParams(window.location.search);
    if (value) params.set("q", value);
    else params.delete("q");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="kicker mb-4">Category</p>
        <div className="space-y-1.5">
          {[
            { id: "all", label: "Everything" },
            { id: "phones", label: "Phones" },
            { id: "accessories", label: "Accessories" },
          ]
            .filter((c) => !lockCategory || c.id === "all")
            .map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id === category && lockCategory ? category : c.id)}
                className={clsx(
                  "flex w-full items-center justify-between border px-4 py-2.5 text-sm transition-all",
                  category === c.id
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-cream text-mute hover:border-ink hover:text-ink",
                )}
              >
                {c.label}
                {category === c.id && <Check className="size-3.5" />}
              </button>
            ))}
        </div>
      </div>

      <div>
        <p className="kicker mb-4">Availability</p>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={clsx(
            "flex w-full items-center justify-between border px-4 py-2.5 text-sm transition-all",
            inStockOnly
              ? "border-ink bg-ink text-cream"
              : "border-line bg-cream text-mute hover:border-ink hover:text-ink",
          )}
        >
          In stock only
          <span
            className={clsx(
              "relative h-4.5 w-8 rounded-full transition-colors",
              inStockOnly ? "bg-gold" : "bg-line",
            )}
          >
            <span
              className={clsx(
                "absolute top-0.5 size-3.5 rounded-full bg-cream transition-all",
                inStockOnly ? "left-4" : "left-0.5",
              )}
            />
          </span>
        </button>
      </div>

      <div>
        <p className="kicker mb-4">Max price</p>
        <input
          type="range"
          min={499}
          max={priceCeiling}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#2b3e97]"
          aria-label="Maximum price"
        />
        <div className="mt-2 flex justify-between font-mono text-[0.62rem] text-mute">
          <span>{inr(499)}</span>
          <span className="text-ink">up to {inr(maxPrice)}</span>
          <span>{inr(priceCeiling)}</span>
        </div>
      </div>

      <div>
        <p className="kicker mb-4">Sort by</p>
        <div className="space-y-1.5">
          {SORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSort(s.id)}
              className={clsx(
                "flex w-full items-center justify-between border px-4 py-2.5 text-sm transition-all",
                sort === s.id
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-cream text-mute hover:border-ink hover:text-ink",
              )}
            >
              {s.label}
              {sort === s.id && <Check className="size-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">{filters}</aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => updateQueryParam(e.target.value)}
              placeholder="Search within the store…"
              className="field pl-10"
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={() => updateQueryParam("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-ink"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-mute">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={clsx(
              "btn lg:hidden",
              filtersOpen ? "btn-primary" : "btn-outline",
            )}
          >
            <SlidersHorizontal className="size-3.5" /> Filters
          </button>
        </div>

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="mb-8 border border-line bg-cream p-5 lg:hidden">{filters}</div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="grid place-items-center border border-dashed border-line-dark bg-cream px-6 py-24 text-center">
            <div>
              <p className="font-display text-2xl text-ink">Nothing matches those filters.</p>
              <p className="mt-2 text-sm text-mute">
                Try a higher price ceiling or clear the search.
              </p>
              <button
                onClick={() => {
                  setCategory(lockCategory ? initialCategory : "all");
                  setInStockOnly(false);
                  setMaxPrice(priceCeiling);
                  updateQueryParam("");
                }}
                className="btn btn-primary mt-6"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
