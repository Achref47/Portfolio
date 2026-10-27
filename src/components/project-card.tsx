import Image from "next/image";
import Link from "next/link";
import type { ImageMedia, Project } from "@/content/types";
import { hasDetailPage, projectHref, projectNumber, typeLabel } from "@/lib/content";
import { CountUp } from "./effects";
import { Award, Lock } from "./icons";
import { AvailabilityNote, ResourceLabels, ResourceLinks } from "./resources";
import { SystemDiagram } from "./system-diagram";
import { ArrowLabel, button, Light, SectionHeading, TechLine } from "./ui";

const focusRing =
  "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent has-[a:focus-visible]:ring-offset-4 has-[a:focus-visible]:ring-offset-bg";

/** A screenshot, cropped from the top-left so UI chrome and titles stay visible. */
export function Cover({ image, sizes, className = "", preload = false }: { image: ImageMedia; sizes: string; className?: string; preload?: boolean }) {
  const contain = image.fit === "contain" || (image.fit !== "cover" && image.height > image.width);
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        style={image.position && !contain ? { objectPosition: image.position } : undefined}
        className={
          contain
            ? "object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            : "object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        }
      />
    </div>
  );
}

/** Typographic stand-in for projects without screenshots, so card rows stay aligned. */
function TextCover({ project }: { project: Project }) {
  return (
    <div aria-hidden="true" className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden border-b border-line bg-surface-2 p-6">
      <span className="text-[0.8125rem] font-medium text-ink-2">{typeLabel(project)}</span>
      <span className="font-display text-[5.5rem] font-bold leading-none text-transparent transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1.25px_var(--line-strong)] group-hover:[-webkit-text-stroke-color:var(--accent)]">
        {projectNumber(project)}
      </span>
    </div>
  );
}

function Meta({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <p className={`text-[0.8125rem] text-ink-3 ${className}`}>
      {typeLabel(project)}
      <span aria-hidden="true"> · </span>
      {project.year}
    </p>
  );
}

function AwardLine({ award }: { award: string }) {
  return (
    <p className="mt-3 flex items-start gap-1.5 text-[0.875rem] font-medium leading-snug text-accent">
      <Award className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{award}</span>
    </p>
  );
}

/**
 * Catalogue card. If the project has a case study, the whole card is one
 * link; otherwise it shows its external links (or why there are none).
 */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const linked = hasDetailPage(project);
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-ink ${focusRing}`}
    >
      {project.cover ? (
        <Cover image={project.cover} sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/9] border-b border-line" />
      ) : (
        <TextCover project={project} />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta project={project} />
        <Heading className="mt-2 font-wide text-[1.3rem] font-semibold leading-snug text-ink">
          {linked ? (
            <Link href={projectHref(project)} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Heading>
        <p className="mt-2 text-[0.96875rem] leading-relaxed text-ink-2">{project.tagline}</p>
        {project.award && <AwardLine award={project.award} />}
        <TechLine tech={project.tech} limit={5} className="mt-4" />
        <div className="mt-auto pt-5">
          {linked ? (
            <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
              <ResourceLabels project={project} />
              <ArrowLabel className="shrink-0 text-[0.875rem] font-medium text-ink">Case study</ArrowLabel>
            </div>
          ) : project.resources.length > 0 ? (
            <div className="relative z-20 border-t border-line pt-4">
              <ResourceLinks project={project} compact />
            </div>
          ) : (
            project.availabilityNote && <AvailabilityNote note={project.availabilityNote} />
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * The flagship project as a system: its architecture as an interactive
 * diagram backed by real screenshots and measured results, then its products
 * and the numbers that matter. Falls back gracefully for projects without
 * an architecture or components.
 */
export function FlagshipSection({ project, index }: { project: Project; index: string }) {
  const d = project.details;
  const products = d?.components ?? [];
  const short = project.shortTitle ?? project.title;
  return (
    <div>
      <SectionHeading
        id="work"
        index={index}
        kicker={`Flagship · ${typeLabel(project)}, ${project.year}`}
        title={
          <>
            {short}
            <Light> — {d?.architecture?.intro?.split(".")[0].toLowerCase() ?? project.tagline}.</Light>
          </>
        }
        intro={project.summary}
      />

      {d?.architecture && (
        <div data-reveal>
          <SystemDiagram steps={d.architecture.steps} metrics={project.metrics} label={`${short} architecture`} />
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-20">
          <p className="text-[0.8125rem] font-medium text-ink-3">The {products.length} products</p>
          <ol className="mt-4 grid gap-10 border-t border-line pt-8 md:grid-cols-3 md:gap-8">
            {products.map((c, i) => {
              const shot = c.media?.[0];
              return (
                <li key={c.name} data-reveal style={{ ["--reveal-i" as string]: i }} className="flex flex-col">
                  {shot && (
                    <div data-reveal="clip" className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface-2">
                      <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover object-left-top" />
                    </div>
                  )}
                  <p className="mt-5 text-[0.8125rem] text-ink-3">{c.role}</p>
                  <h3 className="mt-1 font-wide text-[1.35rem] font-semibold leading-snug text-ink">{c.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{c.summary}</p>
                  {c.access && (
                    <p className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8125rem] text-ink-3">
                      <Lock className="h-3.5 w-3.5" /> {c.access}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {project.metrics && (
        <dl className="mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} data-reveal className="flex flex-col bg-bg p-6">
              <dt className="order-2 mt-3 text-[0.9375rem] leading-snug text-ink-2">
                {m.label}
                {m.context && <span className="mt-1.5 block text-[0.8125rem] text-ink-3">{m.context}</span>}
              </dt>
              <dd className="order-1 font-display text-[2.4rem] font-semibold leading-none text-ink">
                <CountUp value={m.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <ResourceLabels project={project} />
          {project.availabilityNote && <p className="max-w-2xl text-[0.875rem] text-ink-3">{project.availabilityNote}</p>}
        </div>
        <Link href={projectHref(project)} data-magnetic className={`shrink-0 ${button("primary")}`}>
          <ArrowLabel>Read the {short} case study</ArrowLabel>
        </Link>
      </div>
    </div>
  );
}

/**
 * Editorial index row for the other selected projects: number, story and
 * evidence on the left, the real screenshot on the right.
 */
export function ProjectRow({ project, position }: { project: Project; position: number }) {
  const linked = hasDetailPage(project);
  const glance = project.details?.glance;
  const proof = project.metrics?.slice(0, 2) ?? [];
  return (
    <article className={`group relative grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14 ${focusRing}`}>
      <p aria-hidden="true" className="font-display text-[1.1rem] font-semibold tabular-nums text-ink-3 transition-colors duration-300 group-hover:text-accent md:col-span-1">
        {String(position).padStart(2, "0")}
      </p>
      <div className="md:col-span-5">
        <Meta project={project} />
        <h3 className="mt-2 font-wide text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.12] text-ink">
          {linked ? (
            <Link href={projectHref(project)} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-2">{project.tagline}</p>
        {project.award && <AwardLine award={project.award} />}
        {glance && <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{glance.outcome}</p>}
        {proof.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-line pt-5">
            {proof.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-[0.8125rem] leading-snug text-ink-3">{m.label}</dt>
                <dd className="order-1 font-display text-[1.75rem] font-semibold leading-none text-ink">
                  <CountUp value={m.value} />
                </dd>
              </div>
            ))}
          </dl>
        )}
        <TechLine tech={project.tech} limit={6} className="mt-6" />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ResourceLabels project={project} />
          {linked && <ArrowLabel className="text-[0.9375rem] font-medium text-ink">Case study</ArrowLabel>}
        </div>
      </div>
      <div className="md:col-span-6">
        {project.cover ? (
          <div data-reveal="clip" className="overflow-hidden rounded-lg border border-line">
            <Cover image={project.cover} sizes="(min-width: 1240px) 580px, (min-width: 768px) 50vw, 100vw" className="aspect-[16/10]" />
          </div>
        ) : (
          <div className="aspect-[16/10] rounded-lg border border-line bg-surface" />
        )}
      </div>
    </article>
  );
}
