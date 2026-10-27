import type { CSSProperties } from "react";
import type { FlowStep } from "@/content/types";

/**
 * Numbered pipeline diagram for case studies. Steps rise in sequence as the
 * diagram scrolls into view and each connector draws towards the next step
 * (see .flow-line).
 */
export function FlowDiagram({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} data-reveal style={{ ["--reveal-i" as string]: i } as CSSProperties} className="group relative">
          <div className="flex items-center gap-3">
            <span className="font-display text-[0.9375rem] font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className="relative h-px flex-1 bg-line">
              {i < steps.length - 1 && <span className="flow-line absolute inset-0 bg-ink-3" />}
            </span>
          </div>
          <p className="mt-3 font-wide text-[1.1rem] font-semibold text-ink">{step.title}</p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
