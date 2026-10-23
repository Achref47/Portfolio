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

export function SectionHeading({
  id,
  kicker,
  title,
  intro,
  action,
}: {
  id?: string;
  kicker: string;
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Kicker>{kicker}</Kicker>
        <h2 id={id} className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function TechTags({ tech, limit, className = "" }: { tech: string[]; limit?: number; className?: string }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const hidden = tech.length - shown.length;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {shown.map((t) => (
        <li
          key={t}
          className="rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[0.72rem] text-ink-2"
        >
          {t}
        </li>
      ))}
      {hidden > 0 && (
        <li className="px-1 py-0.5 font-mono text-[0.72rem] text-ink-3">+{hidden} more</li>
      )}
    </ul>
  );
}
