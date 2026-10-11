"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Stars } from "@/components/stars";

const sequence: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.12, staggerChildren: 0.11 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HomeHeroIntro({
  shopHref,
  whatsappHref,
  rating,
  reviewCount,
}: {
  shopHref: string;
  whatsappHref: string;
  rating: number;
  reviewCount: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="max-w-[38rem] text-center lg:text-left"
      variants={sequence}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
    >
      <motion.p variants={line} className="kicker inline-flex items-center gap-2">
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        Compact phones · Mumbai, India
      </motion.p>

      <motion.h1
        variants={line}
        className="mt-5 font-display text-[clamp(3.2rem,7vw,5.75rem)] font-medium leading-[0.94] tracking-[-0.055em] text-ink"
      >
        A simpler phone.
        <br />
        <em className="font-normal text-accent">For what you need.</em>
      </motion.h1>

      <motion.p variants={line} className="mx-auto mt-6 max-w-[34rem] text-base leading-7 text-mute md:text-[1.08rem] md:leading-8 lg:mx-0">
        Keypad phones and compact Androids for calls, WhatsApp, UPI and a bit less time spent
        scrolling. We’re a small team in Mumbai—ask us anything before you choose.
      </motion.p>

      <motion.div variants={line} className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <Link href={shopHref} className="btn btn-primary group">
          Find your phone
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
        >
          <MessageCircle className="size-[1.05rem]" strokeWidth={1.8} />
          Talk to us
          <ArrowUpRight className="size-3.5 text-mute" />
        </a>
      </motion.div>

      <motion.div variants={line} className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-mute lg:justify-start">
        <Stars rating={rating} size="size-3.5" />
        <span className="font-medium text-ink">{rating}/5</span>
        <span>from {reviewCount} Google reviews</span>
      </motion.div>

      <motion.p variants={line} className="mt-4 text-xs leading-5 text-mute">
        Free prepaid delivery · COD available across India; fee shown before checkout
      </motion.p>
    </motion.div>
  );
}
