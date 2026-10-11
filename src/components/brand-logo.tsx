import Image from "next/image";
import clsx from "clsx";
import { STORE } from "@/lib/data";

export function BrandLogo({
  inverted = false,
  priority = false,
  compact = false,
  mobileCompact = false,
}: {
  inverted?: boolean;
  priority?: boolean;
  compact?: boolean;
  mobileCompact?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={STORE.logoUrl}
        alt="Dumbphones India"
        width={44}
        height={44}
        priority={priority}
        className="size-10 shrink-0 object-contain md:size-11"
      />
      {!compact && (
        <span className={clsx("flex flex-col", mobileCompact && "hidden sm:flex")}>
          <span
            className={clsx(
              "font-display text-[1.1rem] font-semibold leading-none tracking-[-0.04em] md:text-[1.2rem]",
              inverted ? "text-cream" : "text-ink",
            )}
          >
            Dumbphones
          </span>
          <span className="mt-1 text-[0.63rem] font-semibold tracking-[0.16em] text-accent">
            INDIA
          </span>
        </span>
      )}
    </span>
  );
}
