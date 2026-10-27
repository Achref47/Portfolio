import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/** Small sentence-case label above headings and for metadata keys. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.8125rem] font-medium text-ink-3 ${className}`}>{children}</p>;
}

/**
 * Section opener on a 12-column grid: a heavy rule, a quiet label in the left
 * columns and a wide display title on the right. `title` may mix a light lead
 * with a bold ending, e.g. <><Light>One foundation,</Light> three products.</>
 */
export function SectionHeading({
  id,
  index,
  kicker,
  title,
  intro,
  action,
}: {
  id?: string;
  index?: string;
  kicker: string;
  title: ReactNode;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div data-reveal className="mb-12 grid gap-x-8 gap-y-5 border-t-2 border-ink pt-5 md:mb-16 md:grid-cols-12">
      <p className="text-[0.8125rem] font-medium text-ink-3 md:col-span-3">
        {index && <span className="mr-2 tabular-nums text-accent">{index}</span>}
        {kicker}
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-semibold leading-[0.98] text-ink">
          {title}
        </h2>
        {(intro || action) && (
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            {intro && <p className="max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink-2">{intro}</p>}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/** Light-weight part of a display heading (the DAQ-style contrast of weights). */
export function Light({ children }: { children: ReactNode }) {
  return <span className="font-light text-ink-2">{children}</span>;
}

/** Technologies as one quiet line of text ("React · FastAPI · DuckDB"), instead of a wall of pills. */
export function TechLine({ tech, limit, className = "" }: { tech: string[]; limit?: number; className?: string }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const hidden = tech.length - shown.length;
  return (
    <p className={`text-[0.8125rem] leading-relaxed text-ink-3 ${className}`}>
      <span className="sr-only">Technologies: </span>
      {shown.join(" · ")}
      {hidden > 0 && <span> · +{hidden}</span>}
    </p>
  );
}

/** Technologies as tags — used where the full stack is the point (case-study "Technology" section). */
export function TechTags({ tech, className = "" }: { tech: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies">
      {tech.map((t) => (
        <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-2">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** "Label →" where the arrow slides out and back in when its .group parent is hovered. */
export function ArrowLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {children}
      <span className="arrow-swap h-4 w-4" aria-hidden="true">
        <ArrowRight className="h-4 w-4" />
        <ArrowRight className="h-4 w-4 text-accent" />
      </span>
    </span>
  );
}

/** Shared button styles so every call to action looks and behaves the same. */
export const buttonStyles = {
  base: "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.9375rem] font-medium transition-[background-color,border-color,color] duration-200",
  primary: "bg-ink text-bg hover:bg-accent hover:text-accent-ink",
  secondary: "border border-line-strong text-ink hover:border-ink",
  quiet: "text-ink-2 hover:text-ink",
};
export const button = (variant: "primary" | "secondary" | "quiet") => `${buttonStyles.base} ${buttonStyles[variant]}`;
