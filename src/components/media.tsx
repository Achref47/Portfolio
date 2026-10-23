"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FileVideoMedia, ImageMedia, YouTubeMedia } from "@/content/types";
import { ArrowUpRight, ChevronLeft, ChevronRight, Close, Play } from "./icons";

/**
 * YouTube player that loads nothing from YouTube until the visitor clicks
 * play (faster pages, no third-party cookies before consent).
 */
export function YouTubeEmbed({ media }: { media: YouTubeMedia }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${media.videoId}`;
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-ink shadow-card">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${media.videoId}?autoplay=1&rel=0`}
            title={media.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${media.title}`}
          >
            <Image
              src={media.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover opacity-80 transition-opacity group-hover:opacity-60"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-black shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-1 h-6 w-6" />
            </span>
            <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium text-white">
              {media.title}
              <span className="ml-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/70">Video demo</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-3">
        <span>{media.caption}</span>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] hover:text-ink"
        >
          Watch on YouTube <ArrowUpRight className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}

/** Self-hosted video file with native, keyboard-accessible controls. */
export function VideoFile({ media }: { media: FileVideoMedia }) {
  return (
    <figure>
      <video
        className="aspect-video w-full rounded-xl border border-line bg-ink"
        controls
        preload="none"
        poster={media.poster}
        aria-label={media.title}
      >
        <source src={media.src} type="video/mp4" />
        Your browser cannot play this video. <a href={media.src}>Download it instead</a>.
      </video>
      {media.caption && <figcaption className="mt-2 text-sm text-ink-3">{media.caption}</figcaption>}
    </figure>
  );
}

const isPortrait = (img: ImageMedia) => img.height > img.width;

/**
 * Screenshot grid. Each image opens in a full-size viewer (native <dialog>:
 * Escape closes, arrow keys move between images, focus returns afterwards).
 */
export function Gallery({ images, columns = 2 }: { images: ImageMedia[]; columns?: 2 | 3 }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = images[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [step]);

  if (images.length === 0) return null;
  const allPortrait = images.every(isPortrait);
  const grid = allPortrait
    ? "grid-cols-2 sm:grid-cols-3"
    : columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2";

  return (
    <>
      <ul className={`grid gap-5 ${grid}`}>
        {images.map((img, i) => (
          <li key={img.src}>
            <figure>
              <button
                type="button"
                onClick={() => open(i)}
                className="group block w-full overflow-hidden rounded-lg border border-line bg-surface-2 text-left"
                aria-label={`Enlarge image: ${img.caption ?? img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={allPortrait ? "(min-width: 640px) 30vw, 50vw" : "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"}
                  className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </button>
              {img.caption && <figcaption className="mt-2 text-sm leading-snug text-ink-3">{img.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Image viewer"
        className="m-auto max-h-[94vh] w-[min(1200px,94vw)] max-w-none overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        {current && (
          <figure className="flex flex-col items-center">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="94vw"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 flex w-full items-center justify-between gap-4 text-sm">
              <span className="text-white/85">{current.caption ?? current.alt}</span>
              <span className="shrink-0 font-mono text-xs text-white/60">
                {index + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        )}
        <div className="mt-3 flex justify-center gap-2">
          {images.length > 1 && (
            <button type="button" onClick={() => step(-1)} className="rounded-md bg-white/10 p-2 hover:bg-white/20" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-md bg-white/10 p-2 hover:bg-white/20" aria-label="Close image viewer" autoFocus>
            <Close className="h-5 w-5" />
          </button>
          {images.length > 1 && (
            <button type="button" onClick={() => step(1)} className="rounded-md bg-white/10 p-2 hover:bg-white/20" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </dialog>
    </>
  );
}
