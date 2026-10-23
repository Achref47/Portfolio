"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import type { CategoryId } from "@/content/types";
import { Search } from "./icons";

export interface CatalogItem {
  slug: string;
  categories: CategoryId[];
  /** Lower-cased text used for search (title, tagline, summary, tech, context). */
  searchText: string;
  /** The rendered card, built on the server. */
  card: ReactNode;
}

/**
 * Filter + search over server-rendered project cards. All cards are in the
 * HTML, so the page works (unfiltered) even before JavaScript loads.
 */
export function ProjectCatalog({
  items,
  categories,
}: {
  items: CatalogItem[];
  categories: { id: CategoryId; label: string; count: number }[];
}) {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const visible = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter(
      (item) =>
        (category === "all" || item.categories.includes(category)) &&
        terms.every((t) => item.searchText.includes(t)),
    );
  }, [items, category, query]);

  const reset = () => {
    setCategory("all");
    setQuery("");
  };

  const filters = [{ id: "all" as const, label: "All projects", count: items.length }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={category === f.id}
              onClick={() => setCategory(f.id)}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg"
            >
              {f.label}
              <span className="ml-1.5 font-mono text-[0.72rem] opacity-70">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <label htmlFor={searchId} className="sr-only">
            Search projects
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: React, PyTorch, Django…"
            className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3" aria-live="polite">
        Showing {visible.length} of {items.length} projects
      </p>

      {visible.length > 0 ? (
        <ul className="mt-5 grid gap-6 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.slug}>{item.card}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-line-strong px-6 py-14 text-center">
          <p className="font-medium text-ink">No projects match these filters.</p>
          <p className="mt-1 text-sm text-ink-3">Try another technology or category.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-bg hover:opacity-90"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
