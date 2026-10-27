"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import type { CommandItem } from "@/lib/command-items";
import { CommandPalette } from "./command-palette";
import { Close, GitHubMark, Menu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const nav = site.nav;
const sectionIds = nav.map((n) => n.href.split("#")[1]).filter((id): id is string => Boolean(id));

export function SiteHeader({ commands = [] }: { commands?: CommandItem[] }) {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  // The menu closes itself on navigation because it is tied to the current path.
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenFor(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy for homepage sections: the section crossing the upper third of the screen is "current".
  useEffect(() => {
    if (pathname !== "/") return;
    const els = sectionIds.map((id) => document.getElementById(id)?.closest("section")).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const inView = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        // Last section (in document order) crossing the band wins; none means we're above them.
        const currentEl = els.filter((el) => inView.has(el)).pop();
        setSection(currentEl?.querySelector("h2")?.id ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const current = (href: string): "page" | "location" | undefined => {
    if (href === "/projects" && pathname.startsWith("/projects")) return "page";
    const id = href.split("#")[1];
    if (pathname === "/" && id && id === section) return "location";
    return undefined;
  };

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 border-b border-transparent bg-bg/80 backdrop-blur-md transition-[border-color,background-color] duration-300 data-[scrolled]:border-line data-[scrolled]:bg-bg/90"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-baseline font-display text-[1.05rem] font-bold text-ink" aria-label={`${profile.name}, home`}>
          {profile.name}
          <span aria-hidden="true" className="ml-0.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5">
            .
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => {
            const state = current(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={state}
                data-active={state ? "" : undefined}
                className="group relative rounded-md px-3 py-2 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink data-[active]:text-ink"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-50 group-data-[active]:scale-x-100"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <CommandPalette items={commands} email={profile.email} />
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden h-9 w-9 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink md:inline-flex"
            aria-label="GitHub profile (opens in a new tab)"
          >
            <GitHubMark className="h-[18px] w-[18px]" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenFor(open ? null : pathname)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-2 md:hidden"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="animate-drop-in border-t border-line bg-bg shadow-card md:hidden">
          <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-3">
            {nav.map((item, i) => (
              <li key={item.href} className="animate-drop-in" style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  href={item.href}
                  onClick={() => setOpenFor(null)}
                  aria-current={current(item.href)}
                  data-active={current(item.href) ? "" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 font-wide text-[1.15rem] font-semibold text-ink data-[active]:text-accent"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[0.8125rem] font-normal tabular-nums text-ink-3">
                    0{i + 1}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-3.5 text-base text-ink">
                <GitHubMark className="h-4 w-4" /> GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
