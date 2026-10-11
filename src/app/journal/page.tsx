import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { STORE } from "@/lib/data";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";
import { HeroDemo } from "@/components/ui/animated-hero-demo";

export const metadata: Metadata = {
  title: "Journal (Blogs)",
  description:
    "Notes on digital minimalism from Dumbphones India — essays, guides and phone comparisons, coming soon.",
};

const WHATSAPP_VIDEO_CALL =
  "https://wa.me/919136112273?text=Hi%20Dumbphones%20India%2C%20I%27d%20like%20to%20arrange%20a%20video%20call.";

export default function JournalPage() {
  return (
    <>
      <HeroDemo
        badge="Notify me at launch"
        badgeHref="#newsletter"
        headline="Notes for a"
        titles={["quieter life", "simpler days", "calmer mind", "fewer pings", "slower days"]}
        description="Essays and guides on digital minimalism from our Mumbai team: quitting the scroll, comparing keypad phones and living well with a simpler one. The first pieces are being written between packing orders."
        primaryLabel="Browse the phones"
        primaryHref="/shop"
        secondaryLabel="Arrange a video call"
        secondaryHref={WHATSAPP_VIDEO_CALL}
      />

      <div className="container-x pb-16 md:pb-24">
        <Reveal delay={0.12}>
          <div id="newsletter" className="mx-auto max-w-md scroll-mt-28 text-left">
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
          </div>
        </Reveal>

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
    </>
  );
}
