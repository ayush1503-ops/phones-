import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="container-x py-12 md:py-16">
      <header className="mb-10">
        <p className="kicker">Wishlist</p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
          Saved for later.
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mute">
          Your shortlist lives on this device. Prices and stock update live — just like the
          original store.
        </p>
      </header>
      <WishlistView />
    </div>
  );
}
