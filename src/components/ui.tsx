import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Small monospace label used above headings and for metadata keys. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3 ${className}`}>{children}</p>
  );
}

/**
 * Section opener: a numbered mono label, a serif title and an optional intro,
 * separated from the previous section by a hairline.
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
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div data-reveal className="mb-12 grid gap-4 border-t border-line pt-6 md:grid-cols-[1fr_auto] md:items-end">
      <div className="max-w-2xl">
        <Kicker>
          {index && <span className="mr-3 text-accent">{index}</span>}
          {kicker}
        </Kicker>
        <h2 id={id} className="mt-3 font-display text-[2.3rem] leading-[1.04] tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

/** Technologies as one quiet line of text ("React · FastAPI · DuckDB"), instead of a wall of pills. */
export function TechLine({ tech, limit, className = "" }: { tech: string[]; limit?: number; className?: string }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const hidden = tech.length - shown.length;
  return (
    <p className={`font-mono text-[0.75rem] leading-relaxed text-ink-3 ${className}`}>
      <span className="sr-only">Technologies: </span>
      {shown.join(" · ")}
      {hidden > 0 && <span> · +{hidden}</span>}
    </p>
  );
}

/** Technologies as tags — used where the full stack is the point (case-study "Technology" section). */
export function TechTags({ tech, className = "" }: { tech: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {tech.map((t) => (
        <li key={t} className="rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[0.72rem] text-ink-2">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Shared button styles so every call to action looks and behaves the same. */
export const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98]",
  primary: "bg-ink text-bg hover:bg-ink/85",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink-3 hover:bg-surface-2",
  quiet: "text-ink-2 hover:text-ink",
};
export const button = (variant: "primary" | "secondary" | "quiet") => `${buttonStyles.base} ${buttonStyles[variant]}`;
