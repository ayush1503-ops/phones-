"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  Truck,
  Video,
  Camera,
  ArrowRight,
} from "lucide-react";
import { STORE } from "@/lib/data";

const NEXT_STEPS = [
  {
    icon: MessageCircle,
    title: "Confirmation on WhatsApp",
    text: "You'll receive an order confirmation by email / SMS / WhatsApp on your registered contact details.",
  },
  {
    icon: PackageCheck,
    title: "Quality check & packing",
    text: "Your phone is quality-checked and sealed in tamper-evident packaging at the Mumbai office.",
  },
  {
    icon: Camera,
    title: "Parcel photo before dispatch",
    text: "Before dispatch we share a photo/video of your packed parcel on WhatsApp, along with tracking details.",
  },
  {
    icon: Truck,
    title: "Tracking on WhatsApp",
    text: "Once dispatched, a live tracking link is sent to your registered WhatsApp number until delivery.",
  },
];

export function OrderSuccess() {
  const params = useSearchParams();
  const order = params.get("order");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="border border-line bg-cream p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto size-12 text-success" strokeWidth={1.4} />
        <p className="kicker mt-6">Thank you for choosing deliberate living</p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink md:text-5xl">
          Order confirmed.
        </h1>
        {order ? (
          <p className="mt-4 font-mono text-sm text-ink">
            Order number: <span className="bg-sand px-2 py-1 font-medium text-royal">{order}</span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-mute">Your order has been received.</p>
        )}
        <p className="mx-auto mt-4 max-w-lg text-[0.92rem] leading-relaxed text-mute">
          Keep your order number safe — you'll need it (with your registered mobile number) to track
          your shipment. As per our Shipping Policy, please photograph the sealed box on arrival and
          record a continuous unboxing video; both are required for any return or replacement claim.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/track-order?order=${order ?? ""}`} className="btn btn-primary">
            Track this order <ArrowRight className="size-3.5" />
          </Link>
          <Link href="/shop" className="btn btn-outline">
            Keep browsing
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
        {NEXT_STEPS.map((step, i) => (
          <div key={step.title} className="bg-cream p-6">
            <div className="flex items-center justify-between">
              <step.icon className="size-5 text-royal" strokeWidth={1.6} />
              <span className="font-mono text-[0.6rem] text-faint">Step {i + 1}</span>
            </div>
            <h2 className="mt-4 text-[0.95rem] font-medium text-ink">{step.title}</h2>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-mute">{step.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-gold/40 bg-gold-soft/20 p-6">
        <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold-deep">
          <Video className="size-3.5" /> Need help with your order?
        </p>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-[#45413a]">
          Customer Support: <a className="text-royal underline underline-offset-2" href={`mailto:${STORE.support.email}`}>{STORE.support.email}</a>{" "}
          · <a className="text-royal underline underline-offset-2" href={`tel:${STORE.support.phoneHref}`}>{STORE.support.phone}</a>{" "}
          ({STORE.support.hours}). For order updates, cancellations, delivery issues or replacements.
        </p>
      </div>
    </div>
  );
}
