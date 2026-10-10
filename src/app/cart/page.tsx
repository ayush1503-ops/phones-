import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <div className="container-x py-12 md:py-16">
      <header className="mb-10">
        <p className="kicker">Cart</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          Almost unplugged.
        </h1>
      </header>
      <CartView />
    </div>
  );
}
