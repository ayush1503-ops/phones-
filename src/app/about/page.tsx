import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Asterisk, BadgeCheck, Banknote, Truck, Video } from "lucide-react";
import { STORE } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Jasu Phones began in 2022 with a single Cats22 flip phone. Today we're a movement for digital minimalism — curated keypad and compact phones, tested in Mumbai, shipped across India.",
};

const FACTS = [
  { value: "2022", label: "The first Cats22 flip phone listed", sub: "where it all began" },
  { value: "4.5★", label: `${STORE.googleReviewCount} Google reviews`, sub: "and counting" },
  { value: "48h", label: "Dispatch aim", sub: "orders placed before 6 PM" },
  { value: "100%", label: "In-hand stock", sub: "no pre-orders, no dropshipping" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="container-x py-14 md:py-20">
        <Reveal>
          <p className="kicker">About us</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
            We sell phones that give you your <em className="italic text-royal">life back</em>.
          </h1>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden border border-line">
              <Image
                src="/images/about/story-1.avif"
                alt="A minimalist keypad phone, up close"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="relative aspect-[16/10] overflow-hidden border border-line">
              <Image
                src="/images/about/phones-banner.webp"
                alt="The Jasu Phones collection"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our story */}
      <section className="border-y border-line bg-sand/40">
        <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="kicker flex items-center gap-2">
                <Asterisk className="size-3.5" /> Our story
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
                It all began with a flip phone.
              </h2>
              <div className="relative mt-8 aspect-[4/3.4] overflow-hidden rounded-t-[8rem] border border-line-dark">
                <Image
                  src="/images/about/vintage-nokia.png"
                  alt="The classic era of phones that inspired Jasu Phones"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[0.98rem] leading-[1.9] text-[#45413a] lg:pt-2">
              <p className="font-display text-xl leading-[1.6] text-ink">
                It all began in 2022, when we casually listed the Cats22 flip phone on online
                marketplaces—just aiming to resell a few units for a small profit. To our surprise,
                the response was overwhelming.
              </p>
              <p>
                People weren&apos;t just buying the phone—they were searching for something more.
                They were looking for an escape from the endless scrolling, constant notifications,
                and the addictive cycle of social media.
              </p>
              <p>
                That&apos;s when we realized: the problem wasn&apos;t just about phones—it was about
                lifestyle. Our customers didn&apos;t want fancy features. They wanted{" "}
                <strong className="text-ink">freedom</strong>. They wanted to reclaim their time,
                focus on what matters, and live with intention.
              </p>
              <p>
                This insight led to the birth of <strong className="text-ink">Jasu Phones</strong>—a
                brand dedicated to helping people disconnect from digital chaos without giving up
                essential functionality. We&apos;re not just selling devices; we&apos;re part of a
                growing <strong className="text-ink">movement for digital minimalism</strong>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="kicker">What we do</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
            Essentials kept. Distractions cut.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-[0.98rem] leading-[1.9] text-[#45413a]">
            <p>
              At Jasu Phones, we provide a curated selection of modern keypad and flip phones that
              help people break free from digital overload while still staying connected. Our
              devices are designed for those who want to reduce screen time without sacrificing
              essentials like WhatsApp, UPI, banking apps, or authenticator access.
            </p>
            <p>
              These phones strip away the unnecessary distractions—no social media, no endless
              scrolling—just the core functionalities that matter. We test every device ourselves
              before dispatch, offer cash on delivery across India, and even provide live video
              call support so customers can see the product in-hand before buying.
            </p>
            <p>
              Our mission is simple: to offer genuine, distraction-free phones that promote
              intentional living and help people reconnect with life beyond the screen.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
            {[
              { icon: BadgeCheck, label: "Genuine, tested devices" },
              { icon: Banknote, label: "Cash on delivery, India-wide" },
              { icon: Truck, label: "Free prepaid shipping" },
              { icon: Video, label: "Live video-call support" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 bg-cream px-5 py-4">
                <f.icon className="size-4.5 shrink-0 text-royal" strokeWidth={1.7} />
                <span className="text-[0.82rem] font-medium text-ink">{f.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Facts */}
      <section className="bg-ink py-16 text-cream md:py-20">
        <div className="container-x">
          <Reveal>
            <p className="kicker">A few facts about us</p>
          </Reveal>
          <div className="mt-8 grid gap-px border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.06}>
                <div className="flex h-full flex-col bg-ink px-6 py-8">
                  <span className="font-display text-5xl text-gold">{fact.value}</span>
                  <span className="mt-3 text-sm font-medium text-cream">{fact.label}</span>
                  <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-cream/45">
                    {fact.sub}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-gold">
                Shop the collection <ArrowRight className="size-3.5" />
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Talk to us first
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
