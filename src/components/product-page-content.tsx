import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PRODUCTS, getProduct } from "@/lib/data";
import { inr } from "@/lib/format";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductTabs } from "@/components/product-tabs";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export function ProductPageContent({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) return null;

  const related = PRODUCTS.filter((item) => item.category === product.category && item.slug !== slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand,
    description: product.tagline,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container-x py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
        <Link href="/" className="transition-colors hover:text-royal">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/shop" className="transition-colors hover:text-royal">Shop</Link>
        <ChevronRight className="size-3" />
        <Link href={`/category/${product.category}`} className="capitalize transition-colors hover:text-royal">
          {product.category}
        </Link>
        <ChevronRight className="size-3" />
        <span className="max-w-56 truncate text-ink sm:max-w-none">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ProductGallery images={product.images} name={product.name} />
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <p className="kicker">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl font-medium leading-[1.1] text-ink md:text-[2.6rem]">
              {product.name}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{product.tagline}</p>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
              MRP {product.mrp ? `${inr(product.mrp)} · ` : ""}inclusive of all taxes
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ProductPurchase product={product} />
          </Reveal>
        </div>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Keep browsing</p>
              <h2 className="mt-2 font-display text-3xl font-medium text-ink md:text-4xl">
                Pairs well with deliberate living.
              </h2>
            </div>
            <Link href={`/category/${product.category}`} className="btn btn-outline">
              More {product.category}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.slug} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
