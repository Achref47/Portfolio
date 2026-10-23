"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky "On this page" bar for case studies. Highlights the section being
 * read and keeps the active pill scrolled into view on small screens.
 */
export function SectionNav({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const inView = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        const current = els.filter((el) => inView.has(el)).pop();
        if (current) setActive(current.id);
        // Above the first section (back at the page header): nothing is current.
        else if (els[0] && els[0].getBoundingClientRect().top > window.innerHeight * 0.25) setActive(null);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!active) return;
    const pill = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (pill && list) list.scrollTo({ left: pill.offsetLeft - list.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="On this page" className="sticky top-16 z-30 -mx-5 border-y border-line bg-bg/85 px-5 backdrop-blur-md sm:-mx-8 sm:px-8">
      <ul ref={listRef} className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li className="flex shrink-0 items-center pr-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-3">On this page</li>
        {sections.map((s) => (
          <li key={s.id} data-id={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
              data-active={active === s.id ? "" : undefined}
              className="block rounded-full px-3 py-1.5 text-[0.82rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink data-[active]:bg-ink data-[active]:text-bg"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
