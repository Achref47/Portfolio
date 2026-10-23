import type { ComponentType, SVGProps } from "react";
import type { Project, ResourceKind } from "@/content/types";
import { ArrowUpRight, Code, Doc, Globe, Lock, Play } from "./icons";

/** How each kind of link is labelled everywhere on the site. */
export const resourceKinds: Record<
  ResourceKind,
  { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string }
> = {
  source: { label: "Source Code", Icon: Code, tone: "text-source" },
  live: { label: "Live Demo", Icon: Globe, tone: "text-live" },
  video: { label: "Video Demo", Icon: Play, tone: "text-video" },
  docs: { label: "Documentation", Icon: Doc, tone: "text-docs" },
};

const order: ResourceKind[] = ["live", "video", "source", "docs"];

/** Non-interactive summary of what is available, used on cards. */
export function ResourceLabels({ project }: { project: Project }) {
  const kinds = order.filter((k) => project.resources.some((r) => r.kind === k));
  if (kinds.length === 0) {
    return (
      <p className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-ink-3">
        <Lock className="h-3.5 w-3.5" /> Not publicly available
      </p>
    );
  }
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Available resources">
      {kinds.map((k) => {
        const { label, Icon, tone } = resourceKinds[k];
        return (
          <li key={k} className={`inline-flex items-center gap-1.5 font-mono text-[0.72rem] ${tone}`}>
            <Icon className="h-3.5 w-3.5" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}

/** Clickable resource buttons for detail pages and link-only cards. */
export function ResourceLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.resources.length === 0) return null;
  return (
    <ul className={`flex flex-wrap ${compact ? "gap-2" : "gap-3"}`}>
      {order.flatMap((kind) =>
        project.resources
          .filter((r) => r.kind === kind)
          .map((r) => {
            const { label: kindLabel, Icon, tone } = resourceKinds[r.kind];
            return (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex flex-col rounded-lg border border-line bg-surface transition-colors hover:border-line-strong hover:bg-surface-2 ${
                    compact ? "px-3 py-2" : "px-4 py-3"
                  }`}
                >
                  <span className={`inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] ${tone}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {kindLabel}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-ink">
                    {r.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                  {r.note && !compact && <span className="mt-0.5 text-xs text-ink-3">{r.note}</span>}
                </a>
              </li>
            );
          }),
      )}
    </ul>
  );
}

export function AvailabilityNote({ note }: { note: string }) {
  return (
    <p className="flex items-start gap-2.5 rounded-lg border border-dashed border-line-strong bg-surface-2/50 px-4 py-3 text-sm leading-relaxed text-ink-2">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />
      <span>{note}</span>
    </p>
  );
}
