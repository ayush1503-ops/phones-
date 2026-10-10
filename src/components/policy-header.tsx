import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function PolicyHeader({
  title,
  kicker,
  intro,
  facts,
}: {
  title: string;
  kicker: string;
  intro: string;
  facts?: { label: string; value: string }[];
}) {
  return (
    <header className="border-b border-line bg-sand/40">
      <div className="container-x py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
          <Link href="/" className="transition-colors hover:text-royal">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-ink">{title}</span>
        </nav>
        <Reveal>
          <p className="kicker flex items-center gap-2">
            <FileText className="size-3.5" /> {kicker}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.8] text-mute">{intro}</p>
        </Reveal>
        {facts && (
          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-cream px-5 py-4">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-faint">{f.label}</p>
                  <p className="mt-1 font-display text-lg leading-snug text-ink">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
