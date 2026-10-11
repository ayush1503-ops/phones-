"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
// Relative import on purpose: the 21st CLI rewrites it to the published path (`@/components/ui/<slug>`)
// and to a temporary path during `21st render`. An absolute "@/…" import breaks the render build.
import { SonarGrid } from "@/components/ui/sonar-grid"

// Module-level `settings` + a default export that accepts them as props gives this
// demo a live controls panel on 21st.dev. Signature knobs first, then look, then copy.
const settings = {
  ringWidth: 90,
  speed: 260,
  amplitude: 2.2,
  pingEvery: 3.6,
  interactive: true,
  spacing: 28,
  baseOpacity: 0.24,
  useThemeColor: true,
  color: "#b04b31",
  primaryHref: "/shop",
  secondaryHref: "/shipping-policy",
  eyebrow: "Less noise, by design",
  headline: "Fewer pings.",
  headlineAccent: "Better signal.",
  subline:
    "Keypad phones and compact Androids that ask less of your attention, so the calls and messages you actually need get the spotlight. Tap anywhere on the grid to send a ping.",
  primaryCta: "Browse the phones",
  secondaryCta: "Shipping & COD",
}

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props }
  const reduce = useReducedMotion()
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <SonarGrid
      id="sonar-grid-demo"
      ringWidth={s.ringWidth}
      speed={s.speed}
      amplitude={s.amplitude}
      pingEvery={s.pingEvery}
      interactive={s.interactive}
      spacing={s.spacing}
      baseOpacity={s.baseOpacity}
      color={s.useThemeColor ? undefined : s.color}
      pingArea={[0.2, 0.2, 0.8, 0.8]}
      className="bg-paper flex min-h-[28rem] w-full flex-col sm:min-h-[34rem] lg:min-h-[36rem]"
    >
      {/* A soft wash behind the copy keeps it legible while rings pass underneath. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_44%_46%_at_50%_50%,var(--color-paper)_0%,transparent_100%)]"
      />
      <div className="container-x mx-auto flex w-full flex-1 flex-col items-center justify-center py-20 text-center sm:py-24">
        <div className="flex max-w-2xl flex-col items-center">
          <motion.p {...enter(0)} className="kicker inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {s.eyebrow}
          </motion.p>
          <motion.h2
            {...enter(0.08)}
            className="mt-5 font-display text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-ink text-balance sm:text-5xl md:text-6xl"
          >
            {s.headline} <em className="font-normal text-accent">{s.headlineAccent}</em>
          </motion.h2>
          <motion.p
            {...enter(0.16)}
            className="mx-auto mt-5 max-w-xl text-[0.97rem] leading-7 text-mute text-pretty md:text-base md:leading-8"
          >
            {s.subline}
          </motion.p>
          <motion.div {...enter(0.24)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={s.primaryHref} data-slot="cta-primary" className="btn btn-primary group">
              {s.primaryCta}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link href={s.secondaryHref} data-slot="cta-secondary" className="btn btn-outline">
              {s.secondaryCta}
            </Link>
          </motion.div>
        </div>
      </div>
    </SonarGrid>
  )
}
