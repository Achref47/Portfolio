import type { FlowStep } from "@/content/types";

/**
 * Numbered pipeline diagram. Steps rise in sequence as the diagram scrolls
 * into view and each connector draws towards the next step (see .flow-line).
 */
export function FlowDiagram({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal
          data-spotlight
          style={{ ["--reveal-i" as string]: i }}
          className="group relative rounded-xl border border-line bg-surface p-4 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card"
        >
          <div className="flex items-center gap-2 font-mono text-[0.72rem] text-ink-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-soft font-medium text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="relative h-px flex-1 bg-line">
                <span className="flow-line absolute inset-0 bg-accent/60" />
              </span>
            )}
          </div>
          <p className="mt-3 font-medium text-ink">{step.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
