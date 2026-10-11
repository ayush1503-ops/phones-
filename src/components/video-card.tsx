"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export type CollaborationVideo = {
  videoId: string;
  title: string;
  description: string;
  poster: string;
};

export function VideoCard({ video }: { video: CollaborationVideo }) {
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group"
      whileHover={reducedMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-[0.4rem] bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={video.poster}
              alt={`${video.title} video thumbnail`}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            <motion.button
              type="button"
              whileHover={reducedMotion ? undefined : { scale: 1.07 }}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              onClick={() => setPlaying(true)}
              className="absolute inset-0 grid place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-white"
              aria-label={`Play video: ${video.title}`}
            >
              <span className="grid size-14 place-items-center rounded-full bg-cream text-accent shadow-lg">
                <Play className="ml-0.5 size-5 fill-current" />
              </span>
            </motion.button>
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90">Watch the video</span>
          </>
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display text-[1.45rem] font-medium leading-tight tracking-[-0.02em] text-ink">{video.title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-mute">{video.description}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
        >
          Open on YouTube <ArrowUpRight className="size-4" />
        </a>
      </div>
    </motion.article>
  );
}
