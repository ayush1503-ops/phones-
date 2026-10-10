import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-x py-12 md:py-16">
      <header className="mb-10">
        <p className="kicker">Secure checkout</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          Checkout.
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mute">
          India-wide delivery from our Mumbai office. Orders placed before 6 PM are aimed to be
          delivered within 48 hours of dispatch, per our Shipping Policy.
        </p>
      </header>
      <CheckoutForm />
    </div>
  );
}
