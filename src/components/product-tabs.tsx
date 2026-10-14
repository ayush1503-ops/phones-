"use client";

import { useState } from "react";
import { ChevronDown, Package, ShieldCheck, MessageCircleWarning } from "lucide-react";
import type { Product } from "@/lib/types";
import { STORE, TRANSPARENCY_NOTE } from "@/lib/data";
import { Stars } from "@/components/stars";
import clsx from "clsx";

const TABS = ["Description", "Specifications", "FAQs", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Description");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="mt-16 border-t border-line">
      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "relative whitespace-nowrap px-5 py-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors",
              tab === t ? "text-royal" : "text-faint hover:text-ink",
            )}
          >
            {t}
            {t === "FAQs" && product.faqs.length > 0 && (
              <span className="ml-1.5 text-gold-deep">({product.faqs.length})</span>
            )}
            {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gold" />}
          </button>
        ))}
      </div>

      <div className="py-10">
        {tab === "Description" && (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              {product.description.map((para, i) => (
                <p key={i} className={clsx("leading-[1.9] text-[0.95rem]", i === 0 ? "font-medium text-ink" : "text-[#45413a]")}>
                  {para}
                </p>
              ))}
              <div className="mt-6 border-l-2 border-gold bg-gold-soft/20 p-5">
                <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-deep">
                  <ShieldCheck className="size-3.5" /> The {STORE.name} promise
                </p>
                <p className="mt-2.5 text-[0.85rem] leading-[1.8] text-[#45413a]">{TRANSPARENCY_NOTE}</p>
              </div>
            </div>
            <div>
              <p className="kicker mb-4">Key features</p>
              <ul className="space-y-0">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-baseline gap-3 border-b border-line/70 py-3 text-[0.9rem] text-[#45413a]">
                    <span className="font-mono text-[0.6rem] text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "Specifications" && (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <table className="w-full">
                <tbody>
                  {product.specs.map(([key, value], i) => (
                    <tr key={key} className={clsx("border-b border-line/70", i % 2 === 0 && "bg-cream/60")}>
                      <th className="w-44 px-4 py-3 text-left align-top font-mono text-[0.62rem] font-normal uppercase tracking-[0.12em] text-mute">
                        {key}
                      </th>
                      <td className="px-4 py-3 text-[0.88rem] text-[#45413a]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {product.inBox && (
              <div>
                <p className="kicker mb-4 flex items-center gap-2">
                  <Package className="size-3.5" /> What&apos;s in the box
                </p>
                <ul className="space-y-0">
                  {product.inBox.map((item) => (
                    <li key={item} className="border-b border-line/70 py-2.5 text-[0.88rem] text-[#45413a]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === "FAQs" && (
          <div className="max-w-3xl">
            {product.faqs.length === 0 ? (
              <p className="leading-relaxed text-mute">
                No product-specific questions yet. Ask us anything on{" "}
                <a
                  className="text-royal underline underline-offset-4"
                  href={`https://wa.me/${STORE.sales.phoneHref.replace(/\+/g, "")}?text=${encodeURIComponent(
                    `Question about the ${product.name}: `,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>{" "}
                or call {STORE.sales.phone} ({STORE.sales.hours}).
              </p>
            ) : (
              <div className="divide-y divide-line border-y border-line">
                {product.faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="font-display text-lg text-ink">{faq.q}</span>
                      <ChevronDown
                        className={clsx(
                          "size-4 shrink-0 text-gold-deep transition-transform duration-300",
                          openFaq === i && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={clsx(
                        "grid transition-all duration-300",
                        openFaq === i ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <p className="overflow-hidden text-[0.92rem] leading-[1.85] text-[#45413a]">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "Reviews" && (
          <div className="grid max-w-4xl gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="border border-line bg-cream p-6 text-center">
              <p className="font-display text-5xl text-ink">{STORE.googleRating}</p>
              <Stars rating={STORE.googleRating} className="mt-2 justify-center" />
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mute">
                {STORE.googleReviewCount} Google reviews
              </p>
            </div>
            <div>
              <p className="flex items-start gap-3 text-[0.92rem] leading-[1.85] text-[#45413a]">
                <MessageCircleWarning className="mt-1 size-4 shrink-0 text-gold-deep" />
                Product reviews on the original store are collected after verified purchase. Meanwhile,
                our {STORE.googleReviewCount} Google reviews are public — including phone-specific feedback
                for the {product.name.split("—")[0].trim()} from owners who visited our Mumbai office.
              </p>
              <a
                href="https://www.google.com/search?q=jasu+phones+minimalist+keypad+reviews"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline mt-6"
              >
                Read our Google reviews
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
