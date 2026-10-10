import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Asterisk, ArrowUpRight } from "lucide-react";
import { STORE } from "@/lib/data";
import { NewsletterForm } from "@/components/newsletter-form";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact Us" },
  { href: "/journal", label: "Blogs" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/track-order", label: "Track Order" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/returns-refund-warranty-policy", label: "Returns, Refund & Warranty" },
];

const socials = [
  { href: STORE.socials.facebook, label: "Facebook", icon: FacebookIcon },
  { href: STORE.socials.twitter, label: "X (Twitter)", icon: XIcon },
  { href: STORE.socials.youtube, label: "YouTube", icon: YoutubeIcon },
  { href: STORE.socials.instagram, label: "Instagram", icon: InstagramIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      {/* Newsletter band */}
      <div className="border-b border-cream/10">
        <div className="container-x grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold">
              <Asterisk className="size-3.5" /> Newsletter
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
              Sign up &amp; get 10% off<span className="text-gold">.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/60">
              New models, restocks and deliberate-living notes from the Mumbai office. No spam — we
              sells phones that fight it.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer */}
      <div className="container-x grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Image
            src="/images/brand/logo.png"
            alt="Dumbphones India"
            width={150}
            height={56}
            className="h-12 w-auto rounded-sm bg-cream p-1"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">{STORE.blurb}</p>
          <div className="mt-6 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center border border-cream/15 text-cream/70 transition-all hover:border-gold hover:text-gold"
              >
                <s.icon className="size-4" />
              </a>
            ))}
            <a
              href={STORE.socials.indiamart}
              target="_blank"
              rel="noreferrer"
              className="ml-1 flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-cream/50 transition-colors hover:text-gold"
            >
              IndiaMART <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold">Quick Links</h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Policies">
          <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold">Our Policies</h3>
          <ul className="mt-5 space-y-2.5">
            {policyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream/70 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold">Contact Us</h3>
          <a
            href={STORE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-cream/70 transition-colors hover:text-gold"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.8} />
            {STORE.address}
          </a>

          <div className="mt-6 space-y-5 border-t border-cream/10 pt-6">
            {[
              { dept: STORE.sales, accent: true },
              { dept: STORE.support, accent: false },
            ].map(({ dept }) => (
              <div key={dept.label}>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream/50">
                  {dept.label}
                </p>
                <div className="mt-2 space-y-1.5">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    <Mail className="size-3.5 text-gold/70" /> {dept.email}
                  </a>
                  <a
                    href={`tel:${dept.phoneHref}`}
                    className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    <Phone className="size-3.5 text-gold/70" /> {dept.phone}
                  </a>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cream/40">
                    {dept.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/40">
            © Copyright 2026, Dumbphones India
          </p>
          <div className="flex items-center gap-2" aria-label="Accepted payment methods">
            {["VISA", "Mastercard", "AMEX", "PayPal", "Apple Pay", "UPI / COD"].map((p) => (
              <span
                key={p}
                className="border border-cream/15 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-cream/50"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
