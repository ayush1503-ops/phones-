import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Plus,
} from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HomeHeroIntro } from "@/components/home-hero-intro";
import { InstagramReel } from "@/components/instagram-reel";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import SonarGridDemo from "@/components/ui/sonar-grid-demo";
import { Stars } from "@/components/stars";
import { VideoCard, type CollaborationVideo } from "@/components/video-card";
import { CATEGORIES, PRODUCTS, REVIEWS, STORE, getProduct } from "@/lib/data";
import { inr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Compact phones for a quieter day",
  description:
    "Keypad phones and compact Androids from Dumbphones India. Shop online, get free prepaid shipping, or talk to the Mumbai team before you choose.",
};

export const dynamic = "force-static";

const HERO_IMAGE = "https://dumbphones.co.in/wp-content/uploads/2026/10/Duqin-F25-Pro.webp";
const WHATSAPP_SALES = "https://wa.me/919136112273?text=Hi%20Dumbphones%20India%2C%20I%20have%20a%20question.";

const COLLABORATION_VIDEOS: CollaborationVideo[] = [
  {
    videoId: "uhiajqOI43o",
    title: "Qin F22 Pro — unboxing, set-up & how to buy",
    description: "A first look at the phone, from unboxing to getting it set up.",
    poster:
      "https://dumbphones.co.in/wp-content/uploads/2026/01/Xiaomi-Qin-F22-Pro-Unboxing-Set-up-How-To-Buy-Youtube-video.webp",
  },
  {
    videoId: "xr7gIccSI-A",
    title: "Qin F22 Pro — touch-and-type review",
    description: "A closer look at the small touchscreen and physical keypad.",
    poster:
      "https://dumbphones.co.in/wp-content/uploads/2026/01/Xiaomis-Touch-Type-Phone-Qin-F22-Pro-Youtube-video.webp",
  },
  {
    videoId: "1-U54olXRQ0",
    title: "Duoqin F22 Pro — review & unboxing",
    description: "An independent unboxing and review of the Qin F22 Pro.",
    poster:
      "https://dumbphones.co.in/wp-content/uploads/2026/01/Xiaomi-Duoqin-F22-Pro-Review-Unboxing-Youtube-video.webp",
  },
];

const INSTAGRAM_REELS = [
  { id: "DP9Efeyj1dq", creator: "dumbphones_india" },
  { id: "DTu8h1ykkun", creator: "shakeuptech" },
  { id: "DTSceqek0_7", creator: "gadgetgig" },
  { id: "DS7Y-cLE1OE", creator: "punjabiiitech_" },
  { id: "DWoBVLyTYNT", creator: "tech.ticks" },
  { id: "DWQSX27EyaD", creator: "gadgetgig" },
];

const BUYING_POINTS = [
  {
    title: "Stock in Mumbai",
    text: "The phones listed here are kept at our Opera House office.",
  },
  {
    title: "Free prepaid delivery",
    text: "There’s no delivery charge on prepaid orders across India.",
  },
  {
    title: "Cash on delivery",
    text: "COD is available across India; its handling fee is shown at checkout.",
  },
  {
    title: "See it before you decide",
    text: "Ask us for a video call and we’ll show you the phone in-hand.",
  },
];

const FAQS = [
  {
    question: "Will WhatsApp, UPI and banking apps work?",
    answer:
      "Many of our compact Android phones support WhatsApp, UPI, banking and other Android apps. Compatibility varies by model, so check the specifications and FAQs on that product’s page before ordering.",
  },
  {
    question: "How does Cash on Delivery work?",
    answer:
      "COD is available for almost all Indian PIN codes. A non-refundable confirmation and handling fee—normally ₹599, or the amount shown for a specific product—is payable in advance. The remaining amount is collected on delivery.",
  },
  {
    question: "How much is delivery, and how long does it take?",
    answer:
      "Prepaid delivery is free. Orders placed by 5 PM are aimed to dispatch within 48 hours; courier transit times can vary. Orders are delivered within India only.",
  },
  {
    question: "Can I see a phone before I order?",
    answer:
      "Yes. Message the sales team to arrange a live video call from the Mumbai office. You can see the phone in-hand and ask about setup or app compatibility before buying.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="kicker">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-[0.97rem] leading-7 text-mute md:text-base md:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const hero = getProduct("duoqin-f25-pro")!;

  return (
    <>
      <div className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="hero-orbit" />
        <ContainerScroll
          titleComponent={
            <HomeHeroIntro
              shopHref="/shop"
              whatsappHref={WHATSAPP_SALES}
              rating={STORE.googleRating}
              reviewCount={STORE.googleReviewCount}
            />
          }
        >
          <div className="hero-product-art relative h-full w-full">
            <div aria-hidden="true" className="hero-product-sun" />
            <Image
              src={HERO_IMAGE}
              alt="Duoqin F25 Pro compact Android phone"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 94vw"
              className="z-[1] object-contain p-5 sm:p-8 lg:p-7"
              draggable={false}
            />
            <div className="hero-product-caption absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-3 p-3 sm:inset-x-5 sm:bottom-5 sm:p-4">
              <div>
                <p className="text-xs font-medium text-accent">Featured phone</p>
                <h2 className="mt-1 font-display text-xl font-medium leading-tight text-ink sm:text-2xl">
                  {hero.name}
                </h2>
                <p className="mt-1 text-xs text-mute">Android 14 · 6GB RAM · 128GB</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-sans text-sm font-semibold text-ink sm:text-base">{inr(hero.price)}</p>
                <Link
                  href={`/product/${hero.slug}`}
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-ink"
                >
                  View phone <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      <section className="border-b border-line bg-[#ebe6db]" aria-label="Buying with Dumbphones India">
        <div className="container-x grid gap-x-8 py-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {BUYING_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.04}>
              <article className="border-t border-ink/15 py-5 sm:py-6">
                <p className="font-display text-lg font-medium text-accent">0{index + 1}</p>
                <h2 className="mt-2 font-sans text-sm font-semibold text-ink">{point.title}</h2>
                <p className="mt-1.5 max-w-xs text-sm leading-6 text-mute">{point.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="collection" className="container-x scroll-mt-24 py-20 sm:py-24 md:py-28">
        <Reveal>
          <div className="grid gap-5 border-b border-line pb-8 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-12 md:pb-10">
            <SectionHeading
              eyebrow="The shop"
              title={<>Find the one that <em className="font-normal text-accent">fits.</em></>}
            />
            <div className="max-w-xl md:justify-self-end">
              <p className="text-[0.96rem] leading-7 text-mute">
                Some people want real keys. Others want WhatsApp and UPI on a smaller screen. Here’s
                the full range—open a phone for its photos, specs and current availability.
              </p>
              <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 pt-2 text-sm font-semibold text-accent transition-colors hover:text-ink">
                Browse all {PRODUCTS.length} products <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 0.05} y={14}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-y border-line py-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="max-w-3xl text-sm leading-6 text-mute">
            The price shown is the product price, with no customs-clearance charge. Prepaid shipping
            is free; if you choose COD, the product-specific non-refundable confirmation fee is shown
            before checkout.
          </p>
          <Link href="/shipping-policy" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent">
            Shipping details <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <p className="mt-4 text-xs leading-5 text-mute">
          Prices and stock can change. This catalogue is a snapshot, so please confirm availability
          with the team before paying.
        </p>
      </section>

      <section aria-label="Not sure which phone to pick?" className="relative overflow-hidden border-t border-line">
        <SonarGridDemo />
      </section>

      <section className="border-y border-line bg-[#eeeae1]">
        <div className="container-x py-20 sm:py-24 md:py-28">
          <Reveal>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
              <SectionHeading
                eyebrow="From the creators"
                title={<>See one before you <em className="font-normal text-accent">choose.</em></>}
                description="A few unboxings and reviews of the Qin F22 Pro. Tap a thumbnail to play; the video won’t load until you ask it to."
              />
              <a
                href={STORE.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="mb-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                More on YouTube <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {COLLABORATION_VIDEOS.map((video, index) => (
              <Reveal key={video.videoId} delay={index * 0.06} y={14}>
                <VideoCard video={video} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-24 md:py-28" aria-labelledby="instagram-heading">
        <Reveal>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
            <SectionHeading
              eyebrow="Out in the world"
              title={<>A little inspiration from <em className="font-normal text-accent">Instagram.</em></>}
              description="Short demos and reviews from Dumbphones India and the creators we work with."
            />
            <a href={STORE.socials.instagram} target="_blank" rel="noreferrer" className="mb-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent">
              Follow along <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {INSTAGRAM_REELS.map((reel, index) => (
            <Reveal key={reel.id} delay={(index % 3) * 0.05} y={12}>
              <InstagramReel id={reel.id} creator={reel.creator} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#26352d] text-cream">
        <div className="container-x grid items-center gap-10 py-20 sm:py-24 md:py-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal y={14}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[0.45rem] bg-[#39473f]">
              <Image
                src="https://dumbphones.co.in/wp-content/uploads/2025/05/phones_banner.webp"
                alt="Keypad and compact phones from Dumbphones India"
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1c2922]/75 to-transparent px-5 pb-5 pt-16">
                <p className="text-sm font-medium text-white/90">The team and phones, in Mumbai.</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:py-8">
            <Reveal>
              <p className="kicker text-[#e59a74]">A little backstory</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-cream sm:text-5xl md:text-6xl">
                It started with one flip phone.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 max-w-xl space-y-4 text-[0.96rem] leading-7 text-cream/75">
                <p>
                  In 2022, we listed a Cats22 flip phone online, expecting to resell a few. The
                  response surprised us. People were looking for a way to step back from the noise,
                  without giving up the things they still use every day.
                </p>
                <p>
                  Today, we’re a small team in Mumbai with a considered range of keypad and compact
                  Android phones. We keep stock in-hand, check devices before dispatch, and will show
                  you a phone over video if you’d like a closer look.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-cream/20 py-4">
                <div className="pr-3">
                  <p className="font-display text-2xl text-cream">2022</p>
                  <p className="mt-1 text-xs leading-5 text-cream/55">first phone listed</p>
                </div>
                <div className="border-x border-cream/20 px-3">
                  <p className="font-display text-2xl text-cream">Mumbai</p>
                  <p className="mt-1 text-xs leading-5 text-cream/55">our home base</p>
                </div>
                <div className="pl-3">
                  <p className="font-display text-2xl text-cream">In-hand</p>
                  <p className="mt-1 text-xs leading-5 text-cream/55">not drop-shipped</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/about" className="btn btn-light mt-7">
                More about us <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-24 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="From our customers"
                title={<>Good to hear <em className="font-normal text-accent">first-hand.</em></>}
                description="A few recent notes from people who bought from us."
              />
              <div className="mt-7 flex items-center gap-4 border-y border-line py-4">
                <span className="font-display text-5xl leading-none tracking-tight text-ink">{STORE.googleRating}</span>
                <span>
                  <Stars rating={STORE.googleRating} size="size-4" />
                  <span className="mt-1 block text-sm text-mute">{STORE.googleReviewCount} Google reviews</span>
                </span>
              </div>
              <a
                href="https://www.google.com/search?q=dumbphones+india+mumbai+reviews"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-ink"
              >
                Read more reviews <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
          <div className="grid gap-x-7 md:grid-cols-2">
            {REVIEWS.slice(0, 4).map((review, index) => (
              <Reveal key={review.author} delay={(index % 2) * 0.06} y={12}>
                <figure className="flex h-full flex-col border-t border-line py-6 md:py-7">
                  <Stars rating={review.rating} size="size-3.5" />
                  <blockquote className="mt-4 flex-1 font-display text-xl leading-[1.45] tracking-[-0.015em] text-ink md:text-2xl">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-line/70 pt-3">
                    <span className="text-sm font-semibold text-ink">{review.author}</span>
                    {review.purchasedModel && <span className="text-right text-xs text-mute">{review.purchasedModel}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-[#eeeae1]">
        <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Before you order"
              title={<>A few practical <em className="font-normal text-accent">answers.</em></>}
              description="If your question isn’t here, send us a message. We’d rather help you choose well than have you guess."
            />
            <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-mute">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-accent" />
              <p>Monday–Saturday, 11:30 AM–8:00 PM IST. Closed Sundays; we aim to reply within 24 hours on working days.</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/shipping-policy" className="text-accent hover:text-ink">Shipping policy</Link>
              <Link href="/returns-refund-warranty-policy" className="text-accent hover:text-ink">Returns &amp; warranty</Link>
            </div>
          </Reveal>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04} y={10}>
                <details className="group py-4 open:pb-5">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-5 text-left text-[0.96rem] font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center text-accent transition-transform duration-200 group-open:rotate-45">
                      <Plus className="size-5" strokeWidth={1.6} />
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-1 pr-8 text-sm leading-7 text-mute">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-24 md:py-28">
        <div className="grid gap-10 rounded-[0.65rem] bg-[#dfe4d8] p-6 sm:p-8 md:grid-cols-[0.88fr_1.12fr] md:items-center md:p-10 lg:p-12">
          <Reveal>
            <p className="kicker">Real people, in Mumbai</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl">
              Want a closer look?
            </h2>
            <p className="mt-4 max-w-lg text-[0.96rem] leading-7 text-mute">
              Not sure which model is right? Send us a WhatsApp message. We’ll talk it through and, if
              you like, show you the phone on a video call. No pressure to order.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={WHATSAPP_SALES} target="_blank" rel="noreferrer" className="btn btn-primary">
                <MessageCircle className="size-4" /> WhatsApp the team
              </a>
              <Link href="/contact" className="btn btn-outline">All contact details</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2 md:border-l md:border-ink/15 md:pl-8 lg:pl-10">
              <a href={STORE.mapsUrl} target="_blank" rel="noreferrer" className="group sm:col-span-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <MapPin className="size-4 text-accent" /> Find us in Mumbai
                  <ArrowUpRight className="size-3.5 text-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <p className="mt-2 max-w-xl text-sm leading-6 text-mute">{STORE.address}</p>
              </a>
              <div>
                <h3 className="text-sm font-semibold text-ink">Sales</h3>
                <a href={`tel:${STORE.sales.phoneHref}`} className="mt-2 block text-sm text-mute hover:text-accent">{STORE.sales.phone}</a>
                <a href={`mailto:${STORE.sales.email}`} className="mt-1 block text-sm text-mute hover:text-accent">{STORE.sales.email}</a>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink">Customer support</h3>
                <a href={`tel:${STORE.support.phoneHref}`} className="mt-2 block text-sm text-mute hover:text-accent">{STORE.support.phone}</a>
                <a href={`mailto:${STORE.support.email}`} className="mt-1 block text-sm text-mute hover:text-accent">{STORE.support.email}</a>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs leading-5 text-mute">
                  Prices and availability can change. We’ll confirm current stock and the applicable
                  COD fee before you pay.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-sm font-medium text-ink">Looking for something specific?</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="inline-flex min-h-10 items-center gap-1.5 text-sm text-mute transition-colors hover:text-accent">
                {category.name} <ArrowUpRight className="size-3.5" />
              </Link>
            ))}
            <a href={STORE.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1.5 text-sm text-mute transition-colors hover:text-accent">
              Instagram <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
