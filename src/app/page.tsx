import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  BadgeCheck,
  Banknote,
  MapPin,
  Phone,
  Star,
  Truck,
  Video,
} from "lucide-react";
import { PRODUCTS, REVIEWS, CATEGORIES, STORE, getProduct } from "@/lib/data";
import { discountPct, inr } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Stars } from "@/components/stars";

export const dynamic = "force-static";

const MARQUEE_ITEMS = [
  "Tested before dispatch",
  "In-hand Mumbai stock",
  "COD across India",
  "Live video-call support",
  "No hidden charges",
  "4.5★ · 86 Google reviews",
];

export default function HomePage() {
  const hero = getProduct("duoqin-f25-pro")!;
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);
  const newArrivals = PRODUCTS.filter((p) => p.newArrival);
  const heroPct = discountPct(hero.price, hero.mrp);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <Reveal>
              <p className="kicker flex flex-wrap items-center gap-x-3 gap-y-2">
                <span>Mumbai · Est. 2022</span>
                <span className="text-line-dark">/</span>
                <span>COD across India</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display text-[2.9rem] font-medium leading-[1.02] tracking-[-0.01em] text-ink sm:text-6xl lg:text-[4.4rem]">
                Dumb phones.
                <br />
                <em className="font-light italic text-royal">Deliberate</em> living.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-[1.75] text-mute">
                India&apos;s home for minimalist keypad and compact phones — WhatsApp, UPI,
                banking and calls, minus the infinite scroll. Every device is held, tested and
                dispatched from our office at Opera House, Mumbai.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-primary">
                Shop the collection <ArrowRight className="size-3.5" />
              </Link>
              <Link href="/about" className="btn btn-outline">
                Our story
              </Link>
            </Reveal>
            <Reveal delay={0.32}>
              <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line">
                {[
                  { k: "Google rating", v: `${STORE.googleRating}★`, s: `${STORE.googleReviewCount} reviews` },
                  { k: "Dispatch aim", v: "48 hrs", s: "orders before 6 PM" },
                  { k: "Catalogue", v: "8 devices", s: "7 phones · 1 accessory" },
                ].map((stat) => (
                  <div key={stat.k} className="px-4 py-4 first:pl-0">
                    <dt className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-faint">
                      {stat.k}
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-ink">{stat.v}</dd>
                    <dd className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-mute">
                      {stat.s}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Hero product frame */}
          <Reveal delay={0.15} y={30}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-6 top-8 hidden select-none font-display text-[7rem] font-medium italic leading-none text-ink/[0.05] lg:block">
                F25
              </div>
              <Link href={`/product/${hero.slug}`} className="group relative block">
                <div className="relative aspect-[4/4.6] overflow-hidden rounded-t-[11rem] border border-line-dark bg-white">
                  <Image
                    src={hero.images[0]}
                    alt={hero.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 90vw"
                    className="object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap border border-ink/15 bg-cream/90 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink backdrop-blur">
                    Best keypad phone — 2026
                  </span>
                </div>
                <div className="absolute -bottom-5 left-1/2 flex w-[88%] -translate-x-1/2 items-center justify-between border border-line bg-cream px-5 py-4 shadow-[0_18px_40px_rgba(20,28,51,0.12)]">
                  <div>
                    <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-faint">
                      {hero.brand}
                    </p>
                    <p className="font-display text-lg text-ink">{hero.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-medium text-royal">{inr(hero.price)}</p>
                    {heroPct && (
                      <p className="font-mono text-[0.6rem] text-faint">
                        <span className="line-through">{inr(hero.mrp!)}</span> −{heroPct}%
                      </p>
                    )}
                  </div>
                </div>
              </Link>
              <div className="absolute -right-3 top-14 hidden rotate-90 items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-faint md:flex">
                <span className="h-px w-8 bg-line-dark" /> Android 14 · Dual SIM
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* MARQUEE                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div className="overflow-hidden border-b border-line bg-ink py-3.5" aria-hidden>
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${half}-${item}`}
                  className="flex items-center gap-6 pr-6 font-mono text-[0.64rem] uppercase tracking-[0.22em] text-cream/75"
                >
                  {item}
                  <Asterisk className="size-3.5 text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* BEST SELLERS                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker">01 — Best selling products</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
                The phones India is switching <em className="italic text-royal">down</em> to.
              </h2>
            </div>
            <Link href="/shop" className="btn btn-outline">
              View all products <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FEATURE BAND — Best keypad phones                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x pb-20 md:pb-28">
        <Reveal>
          <Link
            href={`/product/${hero.slug}`}
            className="group relative block overflow-hidden border border-line"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/7] lg:aspect-[16/6]">
              <Image
                src="/images/products/f25-pro-banner.webp"
                alt="Duoqin F25 Pro — Android 14 smart touchscreen phone"
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:justify-center sm:p-12">
              <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold">
                <Asterisk className="size-3.5" /> Best keypad phones
              </p>
              <h3 className="mt-3 max-w-md font-display text-3xl font-medium leading-[1.08] text-cream sm:text-5xl">
                Duoqin F25 Pro — Android 14 in a body your thumb remembers.
              </h3>
              <span className="btn btn-gold mt-6 w-fit">
                Shop the F25 Pro <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* NEW ARRIVALS                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-line bg-sand/40">
        <div className="container-x py-20 md:py-28">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker">02 — New arrivals</p>
                <h2 className="mt-3 max-w-xl font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
                  Fresh into the Opera House stockroom.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-mute">
                No pre-orders, no waiting lists. If it&apos;s listed and in stock, it&apos;s physically on
                our shelf — ready to ship today.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {newArrivals.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CATEGORIES                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <p className="kicker">03 — Browse the store</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
            Two shelves. Zero clutter.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            const img =
              cat.slug === "phones"
                ? "/images/products/f25-pro-2.webp"
                : "/images/products/cats22-battery-1.jpeg";
            return (
              <Reveal key={cat.slug} delay={i * 0.08}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="group relative block overflow-hidden border border-line bg-cream"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={img}
                      alt={cat.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream/70">
                        {count} {count === 1 ? "product" : "products"}
                      </p>
                      <h3 className="mt-1 font-display text-3xl text-cream">{cat.name}</h3>
                    </div>
                    <span className="grid size-11 place-items-center border border-cream/30 text-cream transition-all group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight className="size-4.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PHILOSOPHY                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-ink text-cream">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <Reveal y={30}>
              <div className="relative mx-auto aspect-[4/4.8] max-w-sm overflow-hidden rounded-t-[9rem] border border-cream/20">
                <Image
                  src="/images/about/vintage-nokia.png"
                  alt="A vintage keypad phone — the spirit of deliberate technology"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center font-mono text-[0.58rem] uppercase tracking-[0.24em] text-cream/40">
                Freedom, circa 2003 — updated for UPI
              </p>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="kicker">04 — Why we exist</p>
              <h2 className="mt-3 font-display text-4xl font-medium leading-[1.06] md:text-5xl">
                It began with one <em className="italic text-gold">flip phone</em> in 2022.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 max-w-xl space-y-4 text-[0.98rem] leading-[1.85] text-cream/70">
                <p>
                  We casually listed a Cats22 flip phone on online marketplaces — just aiming to
                  resell a few units. The response was overwhelming. People weren&apos;t buying a
                  phone; they were looking for an escape from endless scrolling, constant
                  notifications and the addictive cycle of social media.
                </p>
                <p>
                  That insight became Dumb Phones India — a curated store for people who want to
                  reclaim their time without giving up essentials like WhatsApp, UPI and banking
                  apps. We test every device ourselves before dispatch, offer cash on delivery
                  across India, and even show you your exact unit over a live video call.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 grid grid-cols-2 gap-px border border-cream/15 bg-cream/15 sm:grid-cols-4">
                {[
                  { icon: BadgeCheck, label: "Verified originals" },
                  { icon: Truck, label: "Pan-India delivery" },
                  { icon: Banknote, label: "Cash on delivery" },
                  { icon: Video, label: "Video-call support" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-2.5 bg-ink px-3 py-6 text-center">
                    <f.icon className="size-5 text-gold" strokeWidth={1.6} />
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-cream/70">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <Link href="/about" className="btn btn-ghost-light mt-9">
                Read our full story <ArrowRight className="size-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* REVIEWS                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
          <Reveal>
            <div>
              <p className="kicker">05 — Our happy customers</p>
              <h2 className="mt-3 font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
                Reviewed on Google, verified at our door.
              </h2>
              <div className="mt-7 inline-flex flex-col border border-line bg-cream p-6">
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl text-ink">{STORE.googleRating}</span>
                  <div>
                    <Stars rating={STORE.googleRating} />
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mute">
                      {STORE.googleReviewCount} Google reviews
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/search?q=dumbphones+india+mumbai+reviews"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-royal hover:text-royal-bright"
                >
                  Read all reviews <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </Reveal>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar lg:grid lg:grid-cols-2 lg:overflow-visible">
            {REVIEWS.slice(0, 4).map((review, i) => (
              <Reveal key={review.author} delay={i * 0.07} className="w-80 shrink-0 snap-start lg:w-auto">
                <figure className="flex h-full flex-col border border-line bg-cream p-6">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-4 flex-1 text-[0.9rem] leading-[1.75] text-[#45413a]">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-between border-t border-line/70 pt-4">
                    <div>
                      <p className="text-sm font-medium text-ink">{review.author}</p>
                      {review.purchasedModel && (
                        <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-faint">
                          Bought: {review.purchasedModel}
                        </p>
                      )}
                    </div>
                    <span className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-faint">
                      <Star className="size-2.5 fill-gold text-gold" /> Google
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* VISIT / CONTACT BAND                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-line bg-sand/40">
        <div className="container-x grid gap-8 py-16 md:grid-cols-3 md:py-20">
          {[
            {
              icon: MapPin,
              title: "Visit the office",
              text: "1st floor, Regal Diamond Centre, Office 114/115, Charni Road, Opera House, Mumbai 400004.",
              action: { href: STORE.mapsUrl, label: "Open in Google Maps", external: true },
            },
            {
              icon: Phone,
              title: "Call before you buy",
              text: `Sales: ${STORE.sales.phone} · Support: ${STORE.support.phone}. ${STORE.sales.hours}.`,
              action: { href: `tel:${STORE.sales.phoneHref}`, label: "Call sales now", external: false },
            },
            {
              icon: Video,
              title: "See it over video call",
              text: "We show you the exact unit in-hand before you pay — a Dumbphones India signature.",
              action: { href: "/contact", label: "Book a video call", external: false },
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="flex h-full flex-col border border-line bg-cream p-7">
                <card.icon className="size-5 text-royal" strokeWidth={1.6} />
                <h3 className="mt-4 font-display text-2xl text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-[0.88rem] leading-[1.7] text-mute">{card.text}</p>
                <a
                  href={card.action.href}
                  {...(card.action.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="mt-5 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-royal transition-colors hover:text-royal-bright"
                >
                  {card.action.label} <ArrowUpRight className="size-3" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
