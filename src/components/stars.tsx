import { Star, StarHalf } from "lucide-react";
import clsx from "clsx";

export function Stars({
  rating,
  className,
  size = "size-3.5",
}: {
  rating: number;
  className?: string;
  size?: string;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25;
  return (
    <span className={clsx("inline-flex items-center gap-0.5 text-gold", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className={`${size} fill-current`} strokeWidth={0} />
      ))}
      {half && <StarHalf className={`${size} fill-current`} strokeWidth={0} />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} className={`${size} text-gold/30`} strokeWidth={1.5} />
      ))}
    </span>
  );
}
