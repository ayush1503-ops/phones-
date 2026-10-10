import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { STORE } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-20">
      <div className="max-w-lg text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold-deep">
          Error 404 — Signal lost
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] text-ink md:text-6xl">
          This page went off the grid.
        </h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
          Fitting, for a store about disconnecting. The page you&apos;re after doesn&apos;t exist —
          but the phones do.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="size-3.5" /> Back home
          </Link>
          <Link href="/shop" className="btn btn-outline">
            Browse the shop
          </Link>
          <a href={`tel:${STORE.sales.phoneHref}`} className="btn btn-outline">
            <Phone className="size-3.5" /> Call us
          </a>
        </div>
      </div>
    </div>
  );
}
