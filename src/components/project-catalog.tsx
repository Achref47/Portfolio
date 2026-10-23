"use client";

import { useId, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { CategoryId, ResourceKind } from "@/content/types";
import { Close, Search } from "./icons";

export interface CatalogItem {
  slug: string;
  categories: CategoryId[];
  evidence: ResourceKind[];
  /** Position in projects.ts (the recommended order). */
  order: number;
  /** Year used for "newest first". */
  year: number;
  /** Lower-cased text used for search (title, tagline, summary, tech, context, type). */
  searchText: string;
  /** The rendered card, built on the server. */
  card: ReactNode;
}

const evidenceFilters: { id: ResourceKind; label: string }[] = [
  { id: "live", label: "Live demo" },
  { id: "video", label: "Video" },
  { id: "source", label: "Source code" },
  { id: "docs", label: "Documentation" },
];

const chip =
  "rounded-full border px-3.5 py-1.5 text-sm transition-colors aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink";

// ── Filter state lives in the URL (?q=&area=&has=&sort=), so every view is shareable
//    and links such as /projects?q=react (from the homepage stack) open pre-filtered.
const URL_EVENT = "catalog-url-change";
const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
};
const readSearch = () => window.location.search;
const serverSearch = () => "";

function writeParams(update: Record<string, string | null>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(update)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const qs = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  window.dispatchEvent(new Event(URL_EVENT));
}

/**
 * Filters, search and sorting over server-rendered project cards. Every card
 * is in the HTML, so the page works (unfiltered) before JavaScript loads.
 * Filters combine: category AND every selected evidence type AND the search.
 */
export function ProjectCatalog({
  items,
  categories,
}: {
  items: CatalogItem[];
  categories: { id: CategoryId; label: string; count: number }[];
}) {
  const search = useSyncExternalStore(subscribe, readSearch, serverSearch);
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const query = params.get("q") ?? "";
  const areaParam = params.get("area");
  const category: CategoryId | "all" = categories.some((c) => c.id === areaParam) ? (areaParam as CategoryId) : "all";
  const evidence = useMemo(
    () => (params.get("has") ?? "").split(",").filter((e): e is ResourceKind => evidenceFilters.some((f) => f.id === e)),
    [params],
  );
  const sort: "recommended" | "newest" = params.get("sort") === "newest" ? "newest" : "recommended";
  const searchId = useId();
  const sortId = useId();

  const setQuery = (q: string) => writeParams({ q: q || null });
  const setCategory = (c: CategoryId | "all") => writeParams({ area: c === "all" ? null : c });
  const setSort = (v: "recommended" | "newest") => writeParams({ sort: v === "newest" ? v : null });

  const visible = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = items.filter(
      (item) =>
        (category === "all" || item.categories.includes(category)) &&
        evidence.every((e) => item.evidence.includes(e)) &&
        terms.every((t) => item.searchText.includes(t)),
    );
    return sort === "newest" ? [...list].sort((a, b) => b.year - a.year || a.order - b.order) : list;
  }, [items, category, evidence, query, sort]);

  const filtered = category !== "all" || evidence.length > 0 || query.trim() !== "";
  const reset = () => writeParams({ q: null, area: null, has: null });
  const toggleEvidence = (id: ResourceKind) => {
    const next = evidence.includes(id) ? evidence.filter((e) => e !== id) : [...evidence, id];
    writeParams({ has: next.length ? next.join(",") : null });
  };
  const evidenceCount = (id: ResourceKind) => items.filter((i) => i.evidence.includes(id)).length;

  return (
    <div>
      <div className="grid gap-5 rounded-2xl border border-line bg-surface/70 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative lg:w-80">
            <label htmlFor={searchId} className="sr-only">
              Search projects
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: React, PyTorch, Django, RFID…"
              className="w-full rounded-lg border border-line bg-bg py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor={sortId} className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">
              Sort
            </label>
            <select
              id={sortId}
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[120px_1fr] md:items-baseline">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">Area</p>
          <div role="group" aria-label="Filter by area" className="flex flex-wrap gap-2">
            {[{ id: "all" as const, label: "All", count: items.length }, ...categories].map((f) => (
              <button key={f.id} type="button" aria-pressed={category === f.id} onClick={() => setCategory(f.id)} className={chip}>
                {f.label}
                <span className="ml-1.5 font-mono text-[0.72rem] opacity-70">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[120px_1fr] md:items-baseline">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">Can open</p>
          <div role="group" aria-label="Filter by what is publicly available" className="flex flex-wrap gap-2">
            {evidenceFilters
              .filter((f) => evidenceCount(f.id) > 0)
              .map((f) => (
                <button key={f.id} type="button" aria-pressed={evidence.includes(f.id)} onClick={() => toggleEvidence(f.id)} className={chip}>
                  {f.label}
                  <span className="ml-1.5 font-mono text-[0.72rem] opacity-70">{evidenceCount(f.id)}</span>
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex min-h-8 flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3" aria-live="polite">
          Showing {visible.length} of {items.length} projects
        </p>
        {filtered && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-ink-2 hover:bg-surface-2 hover:text-ink">
            <Close className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-6 md:grid-cols-2">
          {visible.map((item, i) => (
            <li key={item.slug} className="animate-fade-in" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
              {item.card}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 animate-fade-in rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-display text-2xl text-ink">Nothing matches those filters.</p>
          <p className="mt-2 text-sm text-ink-3">Try a broader technology, another area, or fewer “Can open” filters.</p>
          <button type="button" onClick={reset} className="mt-6 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:opacity-90 active:scale-[0.98]">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
