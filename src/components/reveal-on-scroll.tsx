"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades elements marked with `data-reveal` in as they enter the viewport.
 * Pure progressive enhancement: until this runs (or if it never does) every
 * element is visible. Re-scans after each client-side navigation.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    const show = (el: Element) => el.setAttribute("data-revealed", "");

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(show);
      return;
    }

    // Anything already on screen is shown immediately, so nothing above the fold flashes.
    const vh = window.innerHeight;
    const later = targets.filter((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) {
        show(el);
        return false;
      }
      return true;
    });
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    later.forEach((el) => observer.observe(el));

    // Never leave content hidden in printouts.
    const revealAll = () => later.forEach(show);
    window.addEventListener("beforeprint", revealAll);
    return () => {
      observer.disconnect();
      window.removeEventListener("beforeprint", revealAll);
    };
  }, [pathname]);

  return null;
}
