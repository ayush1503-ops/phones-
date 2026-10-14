import { Suspense } from "react";
import type { Metadata } from "next";
import { TrackOrderView } from "@/components/track-order-view";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Track your Jasu Phones order with your order number and registered mobile number. Live tracking links are also shared on WhatsApp after dispatch.",
};

export default function TrackOrderPage() {
  return (
    <div className="container-x py-12 md:py-16">
      <header className="mb-10">
        <p className="kicker">Order tracking</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          Where&apos;s my phone?
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mute">
          Enter your order number and the mobile number you ordered with. After dispatch, a live
          courier tracking link is also sent to your registered WhatsApp number.
        </p>
      </header>
      <Suspense fallback={null}>
        <TrackOrderView />
      </Suspense>
    </div>
  );
}
