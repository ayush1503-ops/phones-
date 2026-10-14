import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { CATEGORIES, productsByCategory } from "@/lib/data";
import { ShopBrowser } from "@/components/shop-browser";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = productsByCategory(slug);

  return (
    <div className="container-x py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
        <Link href="/" className="transition-colors hover:text-royal">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/shop" className="transition-colors hover:text-royal">Shop</Link>
        <ChevronRight className="size-3" />
        <span className="text-ink">{category.name}</span>
      </nav>

      <header className="mb-10">
        <p className="kicker">Category</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          {category.name}
          <sup className="ml-3 font-mono text-sm uppercase tracking-[0.15em] text-faint">
            {products.length} {products.length === 1 ? "item" : "items"}
          </sup>
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mute">{category.blurb}</p>
      </header>

      <Suspense fallback={null}>
        <ShopBrowser products={products} initialCategory={slug} lockCategory />
      </Suspense>
    </div>
  );
}
