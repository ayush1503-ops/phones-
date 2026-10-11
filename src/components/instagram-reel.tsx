import { ArrowUpRight, Camera } from "lucide-react";

export function InstagramReel({
  id,
  creator,
}: {
  id: string;
  creator: string;
}) {
  return (
    <article className="group min-w-0">
      <div className="aspect-[4/5] overflow-hidden rounded-[0.4rem] border border-line bg-sand">
        <iframe
          src={`https://www.instagram.com/reel/${id}/embed/`}
          title={`Instagram Reel by ${creator}`}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <div className="flex items-center justify-between gap-3 border-b border-line py-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          <Camera className="size-4 text-accent" /> @{creator}
        </span>
        <a
          href={`https://www.instagram.com/reel/${id}/`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open reel by ${creator} on Instagram`}
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
        >
          Open reel <ArrowUpRight className="size-4" />
        </a>
      </div>
    </article>
  );
}
