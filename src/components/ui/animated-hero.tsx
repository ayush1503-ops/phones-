"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  /** Small pill above the headline. */
  badge?: string;
  badgeHref?: string;
  /** Fixed first part of the headline. */
  headline?: string;
  /** Words that cycle in the second part of the headline. */
  titles?: string[];
  /** Milliseconds each word stays on screen. */
  interval?: number;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const DEFAULT_TITLES = ["amazing", "new", "wonderful", "beautiful", "smart"];

/** Internal paths use next/link; external URLs open as plain anchors. */
function renderLink(href: string, children: React.ReactNode) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

function Hero({
  badge = "Read our launch article",
  badgeHref = "#",
  headline = "This is something",
  titles = DEFAULT_TITLES,
  interval = 2000,
  description = "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.",
  primaryLabel = "Sign up here",
  primaryHref = "#",
  secondaryLabel = "Jump on a call",
  secondaryHref = "#",
}: HeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  // Auto-cycling is switched off for reduced-motion users; the first word stays put.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || titles.length === 0) return;
    const timeoutId = setTimeout(() => {
      setTitleNumber((n) => (n + 1) % titles.length);
    }, interval);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles, interval, reduceMotion]);

  return (
    <div className="w-full">
      <div className="container-x">
        <div className="flex gap-8 py-16 md:py-24 lg:py-28 items-center justify-center flex-col">
          <div>
            <Button asChild variant="secondary" size="sm" className="gap-4">
              {renderLink(
                badgeHref,
                <>
                  {badge} <MoveRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="font-display text-5xl md:text-7xl max-w-2xl tracking-[-0.045em] leading-[1.04] text-center font-medium text-ink">
              <span>{headline}</span>
              <span
                aria-hidden="true"
                className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1"
              >
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute font-normal italic text-accent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="sr-only"> {titles[titleNumber]}</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              {description}
            </p>
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-4" variant="outline">
              {renderLink(
                secondaryHref,
                <>
                  {secondaryLabel} <PhoneCall className="w-4 h-4" />
                </>
              )}
            </Button>
            <Button asChild size="lg" className="gap-4">
              {renderLink(
                primaryHref,
                <>
                  {primaryLabel} <MoveRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
