import { Suspense } from "react";
import type { Metadata } from "next";
import { OrderSuccess } from "@/components/order-success";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container-x py-16 md:py-24">
      <Suspense fallback={<div className="mx-auto aspect-[4/2] max-w-2xl animate-pulse border border-line bg-cream" />}>
        <OrderSuccess />
      </Suspense>
    </div>
  );
}
