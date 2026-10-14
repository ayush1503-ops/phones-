import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { STORE } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach Jasu Phones — sales and customer support, Monday to Saturday 11:30 AM–8:00 PM IST. Charni Road, Mumbai. WhatsApp, phone and email.",
};

const CHANNELS = [
  {
    dept: STORE.sales,
    icon: Phone,
    accent: true,
  },
  {
    dept: STORE.support,
    icon: MessageCircle,
    accent: false,
  },
];

export default function ContactPage() {
  return (
    <div className="container-x py-14 md:py-20">
      <Reveal>
        <p className="kicker">Contact us</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          Talk to a human. We have those.
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mute">
          Real people at our office in Mumbai — the same people who test and pack
          your phone.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* Channels */}
        <div className="space-y-4">
          {CHANNELS.map(({ dept, icon: Icon, accent }) => (
            <Reveal key={dept.label}>
              <div className={accent ? "border border-royal/30 bg-royal/[0.04] p-7" : "border border-line bg-cream p-7"}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold-deep">
                    {dept.label}
                  </p>
                  <Icon className="size-4.5 text-royal" strokeWidth={1.7} />
                </div>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-mute">{dept.note}</p>
                <div className="mt-5 space-y-2.5">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2.5 text-[0.95rem] font-medium text-ink transition-colors hover:text-royal"
                  >
                    <Mail className="size-4 text-royal/70" /> {dept.email}
                  </a>
                  <a
                    href={`tel:${dept.phoneHref}`}
                    className="flex items-center gap-2.5 text-[0.95rem] font-medium text-ink transition-colors hover:text-royal"
                  >
                    <Phone className="size-4 text-royal/70" /> {dept.phone}
                  </a>
                  <p className="flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                    <Clock className="size-3.5" /> {dept.hours}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <a
              href={STORE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group block border border-line bg-cream p-7 transition-colors hover:border-royal"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold-deep">
                  Visit the office
                </p>
                <MapPin className="size-4.5 text-royal" strokeWidth={1.7} />
              </div>
              <p className="mt-3 max-w-sm text-[0.92rem] leading-[1.75] text-ink">{STORE.address}</p>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-royal">
                Open in Google Maps →
              </p>
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border border-gold/40 bg-gold-soft/20 p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gold-deep">
                Grievance officer
              </p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-[#45413a]">
                {STORE.grievance.officer} — {STORE.grievance.email}, {STORE.grievance.phone}.{" "}
                {STORE.grievance.promise}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <div className="border border-line bg-cream p-7 md:p-9">
            <h2 className="font-display text-3xl text-ink">Write to us</h2>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-mute">
              We reply within one working day (Mon–Sat). For anything urgent, WhatsApp is fastest.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
