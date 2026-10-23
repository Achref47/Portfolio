"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through short phrases with a soft rise. Purely visual (aria-hidden):
 * the full headline is provided to assistive technology separately.
 * Stays on the first phrase when the visitor prefers reduced motion.
 */
export function HeroRotator({ words, interval = 2600 }: { words: readonly string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span aria-hidden="true" key={index} className="rotate-in whitespace-nowrap text-accent">
      {words[index]}
    </span>
  );
}
