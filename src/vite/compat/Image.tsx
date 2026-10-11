import type { ImgHTMLAttributes } from "react";

/* Vite serves the original WordPress media URLs directly instead of using Next's optimizer. */
/* eslint-disable @next/next/no-img-element */
type CompatibleImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
};

export default function Image({
  src,
  alt,
  fill = false,
  priority = false,
  quality: _quality,
  className,
  style,
  loading,
  ...props
}: CompatibleImageProps) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
      loading={priority ? "eager" : loading ?? "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
