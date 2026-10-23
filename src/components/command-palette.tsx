"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { CommandItem } from "@/lib/command-items";
import { ArrowRight, ArrowUpRight, Command, Search } from "./icons";

const groups: CommandItem["group"][] = ["Navigate", "Projects", "Profiles", "Actions"];

/**
 * Keyboard-first command palette (Ctrl/⌘ + K, or "/"). Native <dialog> for
 * focus handling and Escape; listbox semantics with aria-activedescendant.
 */
export function CommandPalette({ items = [], email }: { items?: CommandItem[]; email: string }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");
  const listId = useId();

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = items
      .map((item) => {
        const label = item.label.toLowerCase();
        const hay = `${label} ${item.hint ?? ""} ${item.keywords ?? ""} ${item.group}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (label.startsWith(t) ? 3 : label.includes(t) ? 2 : 0), 0);
        return { item, score };
      })
      .filter((x): x is { item: CommandItem; score: number } => Boolean(x));
    if (terms.length) scored.sort((a, b) => b.score - a.score);
    // Keep group order when not searching; ranked order otherwise.
    return terms.length ? scored.map((s) => s.item) : groups.flatMap((g) => scored.filter((s) => s.item.group === g).map((s) => s.item));
  }, [items, query]);

  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    setNotice("");
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      } else if (e.key === "/" && !typing && !dialogRef.current?.open) {
        e.preventDefault();
        open();
      }
    };
    const onOpenRequest = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  async function run(item: CommandItem) {
    if (item.action === "copy-email") {
      try {
        await navigator.clipboard.writeText(email);
        setNotice("Email copied to clipboard");
        setTimeout(close, 700);
      } catch {
        setNotice("Copy failed — the address is " + email);
      }
      return;
    }
    if (item.action === "toggle-theme") {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      close();
      return;
    }
    close();
    if (!item.href) return;
    if (item.external) window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
    else router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="hidden items-center gap-2 rounded-lg border border-line bg-surface/70 py-1.5 pl-2.5 pr-1.5 text-sm text-ink-3 transition-colors hover:border-line-strong hover:text-ink lg:inline-flex"
        aria-label="Open command palette (Ctrl+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Jump to…</span>
        <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-2">Ctrl K</kbd>
      </button>
      <button
        type="button"
        onClick={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink lg:hidden"
        aria-label="Open command palette"
      >
        <Command className="h-[18px] w-[18px]" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        className="m-auto mt-[12vh] w-[min(640px,92vw)] max-w-none overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-drop-in"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-ink-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search projects, sections, technologies…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
            className="h-14 w-full bg-transparent text-[0.95rem] text-ink placeholder:text-ink-3 focus:outline-none"
          />
          <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-3">Esc</kbd>
        </div>

        <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-10 text-center text-sm text-ink-3">No matches for “{query}”.</li>}
          {results.map((item, i) => {
            const header = !query && item.group !== results[i - 1]?.group ? item.group : null;
            const selected = i === active;
            return (
              <li key={item.id} role="presentation">
                {header && <p className="px-3 pb-1 pt-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-3">{header}</p>}
                <div
                  id={`${listId}-${item.id}`}
                  role="option"
                  aria-selected={selected}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    selected ? "bg-accent-soft text-ink" : "text-ink-2"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-ink">{item.label}</span>
                    {item.hint && <span className="block truncate text-xs text-ink-3">{item.hint}</span>}
                  </span>
                  {item.external ? (
                    <ArrowUpRight className={`h-4 w-4 shrink-0 ${selected ? "text-accent" : "text-ink-3"}`} />
                  ) : (
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${selected ? "translate-x-0.5 text-accent" : "text-ink-3"}`} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2/60 px-4 py-2.5 font-mono text-[0.68rem] text-ink-3">
          <span aria-live="polite">{notice || `${results.length} result${results.length === 1 ? "" : "s"}`}</span>
          <span className="hidden sm:inline">↑↓ to move · Enter to open</span>
        </div>
      </dialog>
    </>
  );
}
