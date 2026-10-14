import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Feather } from "lucide-react";
import { STORE } from "@/lib/data";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Journal (Blogs)",
  description:
    "Notes on digital minimalism from Jasu Phones — essays, guides and phone comparisons, coming soon.",
};

export default function JournalPage() {
  return (
    <div className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Feather className="mx-auto size-9 text-gold-deep" strokeWidth={1.3} />
          <p className="kicker mt-6">Journal — Blogs</p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
            Slow words for fast times.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-[1.8] text-mute">
            Our journal on digital minimalism — quitting-scroll field notes, model comparisons and
            guides for living with a simpler phone — is being written between packing orders. The
            first essays land soon.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-10 max-w-md text-left">
            <p className="mb-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute">
              Get the first essay in your inbox
            </p>
            <div className="[&_input]:!border-line [&_input]:!bg-cream [&_input]:!text-ink">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <a
              href={STORE.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Watch us on YouTube <ArrowUpRight className="size-3.5" />
            </a>
            <Link href="/shop" className="btn btn-primary">
              Browse the phones
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Placeholder entries, clearly marked as forthcoming */}
      <div className="mx-auto mt-20 grid max-w-4xl gap-px border border-line bg-line md:grid-cols-3">
        {[
          {
            tag: "Guide",
            title: "Digital minimalism: a starter kit for busy Indians",
          },
          {
            tag: "Comparison",
            title: "Qin F22 Pro vs Qin F21 Pro — which keypad phone fits you?",
          },
          {
            tag: "Field notes",
            title: "What 30 days with a dumbphone actually feels like",
          },
        ].map((post, i) => (
          <Reveal key={post.title} delay={i * 0.07}>
            <article className="flex h-full flex-col bg-cream p-7">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold-deep">
                {post.tag} · coming soon
              </p>
              <h2 className="mt-3 flex-1 font-display text-xl leading-snug text-ink">{post.title}</h2>
              <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                From the Mumbai office
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
