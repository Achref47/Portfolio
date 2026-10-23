"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp } from "./icons";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One document-level pointer listener for all cursor effects: it writes the
 * pointer position (--mx/--my) on the hovered [data-spotlight] or
 * [data-pointer] element. Mouse only; nothing runs for touch.
 */
export function PointerEffects() {
  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = last.target as Element | null;
      const el = target?.closest?.<HTMLElement>("[data-spotlight], [data-pointer]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}

/**
 * Wrapper that tilts its `.tilt-target` child toward the cursor while the
 * pointer is anywhere over the wrapper (so stretched links don't block it).
 */
export function HoverTilt({ children, className = "", max = 4 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const wrap = ref.current;
    const target = wrap?.querySelector<HTMLElement>(".tilt-target");
    if (!wrap || !target || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = target.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
    target.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
    target.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
    target.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    target.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
    wrap.classList.add("tilt-active");
  };
  const onLeave = () => {
    const wrap = ref.current;
    const target = wrap?.querySelector<HTMLElement>(".tilt-target");
    target?.style.setProperty("--rx", "0deg");
    target?.style.setProperty("--ry", "0deg");
    wrap?.classList.remove("tilt-active");
  };

  return (
    <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
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
      className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-surface/90 text-ink shadow-card backdrop-blur transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:border-ink-3 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
