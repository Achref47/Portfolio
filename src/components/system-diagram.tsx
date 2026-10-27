"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { FlowStep, Metric } from "@/content/types";

const AUTO_MS = 5200;

/**
 * Interactive view of a project's architecture: the stages on the left, the
 * selected stage's real evidence (a screenshot or a measured result) on the
 * right. It is an ARIA tab interface — click, hover or use the arrow keys to
 * inspect a stage. While it is on screen and untouched it steps through the
 * stages by itself; any interaction (or reduced motion) stops that.
 */
export function SystemDiagram({ steps, metrics = [], label }: { steps: FlowStep[]; metrics?: Metric[]; label: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  // Only advance while the diagram is actually on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % steps.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [auto, visible, active, steps.length]);

  const select = (i: number, focus = false) => {
    setAuto(false);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: steps.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select((keys[e.key] + steps.length) % steps.length, true);
  };

  return (
    <div ref={rootRef} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={onKeyDown} className="relative lg:col-span-5">
        {steps.map((step, i) => {
          const selected = i === active;
          return (
            <button
              key={step.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
              className="group relative grid w-full grid-cols-[2.75rem_1fr] items-baseline gap-x-3 border-t border-line py-4 text-left last:border-b"
            >
              <span className={`font-display text-sm font-semibold tabular-nums transition-colors duration-300 ${selected ? "text-accent" : "text-ink-3"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className={`block font-wide text-[1.15rem] font-semibold transition-colors duration-300 sm:text-[1.3rem] ${selected ? "text-ink" : "text-ink-3 group-hover:text-ink-2"}`}>
                  {step.title}
                </span>
                {/* On small screens the detail sits under the stage name, so nothing depends on the panel. */}
                <span className={`mt-1 block text-[0.9375rem] leading-relaxed text-ink-2 lg:hidden ${selected ? "" : "hidden"}`}>{step.detail}</span>
              </span>
              {/* Timer for the automatic tour, drawn along the stage's top rule. */}
              <span aria-hidden="true" className="absolute -top-px left-0 h-[2px] w-full overflow-hidden">
                <span
                  key={`${active}-${auto && visible}`}
                  className={`block h-full origin-left bg-accent ${selected ? "" : "scale-x-0"}`}
                  style={
                    selected && auto && visible
                      ? { animation: `stage-timer ${AUTO_MS}ms linear both` }
                      : { transform: selected ? "none" : undefined }
                  }
                />
              </span>
            </button>
          );
        })}
        <p className="mt-4 hidden text-[0.8125rem] text-ink-3 lg:block">Hover or use the arrow keys to inspect a stage.</p>
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="lg:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
          {steps.map((step, i) => {
            const metric = step.metric !== undefined ? metrics[step.metric] : undefined;
            const shown = i === active;
            return (
              <div
                key={step.title}
                aria-hidden={!shown}
                inert={!shown}
                className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${shown ? "opacity-100" : "pointer-events-none scale-[1.015] opacity-0"}`}
              >
                {step.image ? (
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="object-cover object-left-top"
                  />
                ) : metric ? (
                  <div className="flex h-full flex-col justify-between p-6 sm:p-10">
                    <span className="text-[0.8125rem] font-medium text-ink-3">Measured result</span>
                    <span>
                      <span className="block font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-none text-ink">{metric.value}</span>
                      <span className="mt-4 block max-w-md text-[1.0625rem] leading-snug text-ink-2">{metric.label}</span>
                      {metric.context && <span className="mt-2 block text-[0.8125rem] text-ink-3">{metric.context}</span>}
                    </span>
                  </div>
                ) : (
                  <div className="flex h-full items-end p-6 sm:p-10">
                    <span className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-ink">{step.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-6">
          <p className="font-wide text-[1.05rem] font-semibold text-ink">
            <span className="mr-2 tabular-nums text-accent">{String(active + 1).padStart(2, "0")}</span>
            {steps[active].title}
          </p>
          <p className="hidden text-[0.9375rem] leading-relaxed text-ink-2 lg:block">{steps[active].detail}</p>
        </div>
        {steps[active].image?.caption && <p className="mt-2 text-[0.8125rem] text-ink-3">{steps[active].image?.caption}</p>}
      </div>
    </div>
  );
}
