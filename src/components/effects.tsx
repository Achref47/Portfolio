"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp } from "./icons";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One document-level pointer listener for the magnetic effect: an element
 * marked [data-magnetic] leans a few pixels toward the cursor while it is
 * hovered (it writes --tx/--ty, read by globals.css). Mouse only.
 */
export function PointerEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    let current: HTMLElement | null = null;
    const release = (el: HTMLElement | null) => {
      el?.style.setProperty("--tx", "0px");
      el?.style.setProperty("--ty", "0px");
    };
    const apply = () => {
      frame = 0;
      if (!last) return;
      const el = (last.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (el !== current) {
        release(current);
        current = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = last.clientX - (r.left + r.width / 2);
      const dy = last.clientY - (r.top + r.height / 2);
      const pull = Number(el.dataset.magnetic) || 0.3;
      el.style.setProperty("--tx", `${Math.max(-10, Math.min(10, dx * pull)).toFixed(1)}px`);
      el.style.setProperty("--ty", `${Math.max(-8, Math.min(8, dy * pull)).toFixed(1)}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      release(current);
      current = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

/**
 * Writes --p (0 → 1) on its element as the element scrolls through the
 * viewport: 0 when its top reaches `start` (fraction of the viewport height),
 * 1 when its bottom reaches `end`. CSS decides what --p drives (lit words,
 * a filling line). Without JavaScript or with reduced motion --p is unset,
 * which the CSS treats as "finished".
 */
export function ScrollScene({
  children,
  className = "",
  start = 0.85,
  end = 0.4,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  start?: number;
  end?: number;
  as?: "div" | "p" | "ol";
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height + vh * (start - end);
      const p = span > 0 ? Math.max(0, Math.min(1, (vh * start - r.top) / span)) : 1;
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const revealAll = () => el.style.removeProperty("--p");
    window.addEventListener("beforeprint", revealAll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("beforeprint", revealAll);
      cancelAnimationFrame(frame);
    };
  }, [start, end]);
  return (
    <Tag ref={ref as React.Ref<never>} className={className} style={style}>
      {children}
    </Tag>
  );
}

/**
 * Counts a metric up from zero the first time it scrolls into view. The
 * server renders the final text, so it is correct without JavaScript; only
 * values with exactly one number (e.g. "97.5%", "R² 0.968", "1.25M") animate.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const matches = value.match(/\d[\d,]*(?:\.\d+)?/g);
    if (!matches || matches.length !== 1) return;
    const raw = matches[0];
    const target = Number(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const [before, after] = value.split(raw);
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return before + (raw.includes(",") ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed) + after;
    };
    // Only animate numbers that are not already on screen, so nothing visibly resets.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = format(0);

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t < 1 ? format(target * eased) : value;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}

/** Thin reading-progress bar under the header. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ref.current?.style.setProperty("transform", `scaleX(${p})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[2px]">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}

/** Floating "back to top" button that appears after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink text-bg shadow-card transition-[opacity,transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-ink ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
