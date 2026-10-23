import type { FlowStep } from "@/content/types";

/** Numbered pipeline diagram: a vertical list on phones, a grid with arrows on wider screens. */
export function FlowDiagram({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-lg border border-line bg-surface p-4">
          <div className="flex items-center gap-2 font-mono text-[0.72rem] text-ink-3">
            <span className="grid h-6 w-6 place-items-center rounded bg-accent-soft font-medium text-accent">
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            )}
          </div>
          <p className="mt-3 font-medium text-ink">{step.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
