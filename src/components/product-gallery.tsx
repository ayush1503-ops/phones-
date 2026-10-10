"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden border border-line bg-white">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? name : `${name} — view ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={clsx(
              "object-contain p-8 transition-all duration-500 md:p-12",
              i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            )}
          />
        ))}
        <span className="absolute bottom-4 right-4 font-mono text-[0.6rem] tracking-[0.15em] text-faint">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={clsx(
                "relative aspect-square overflow-hidden border bg-white transition-all",
                i === active ? "border-royal" : "border-line opacity-60 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="12vw" className="object-contain p-2.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
