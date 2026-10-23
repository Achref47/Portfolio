import Image from "next/image";
import Link from "next/link";
import type { ImageMedia, Project } from "@/content/types";
import { hasDetailPage, projectHref, projectNumber, typeLabel } from "@/lib/content";
import { CountUp, HoverTilt } from "./effects";
import { ArrowRight, Award } from "./icons";
import { AvailabilityNote, ResourceLabels, ResourceLinks } from "./resources";
import { TechLine } from "./ui";

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
            : "object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        }
      />
    </div>
  );
}

/** Pill that slides up over an image on hover: tells the visitor where the click goes. */
function HoverPill({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-ink/90 px-3.5 py-1.5 text-xs font-medium text-bg opacity-0 shadow-lg backdrop-blur transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
    >
      {label} <ArrowRight className="h-3.5 w-3.5" />
    </span>
  );
}

/** Typographic stand-in for projects without screenshots, so card rows stay aligned. */
function TextCover({ project }: { project: Project }) {
  return (
    <div aria-hidden="true" className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden border-b border-line bg-surface-2 p-6">
      <div className="bg-grid absolute inset-0 opacity-50 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom_right,black,transparent_75%)] group-hover:opacity-90" />
      <span className="relative font-display text-6xl leading-none text-ink-3/50 transition-colors duration-500 group-hover:text-accent/60">
        {projectNumber(project)}
      </span>
      <span className="relative font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">{typeLabel(project)}</span>
    </div>
  );
}

function Meta({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <p className={`font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3 ${className}`}>
      <span className="text-accent">{projectNumber(project)}</span>
      <span aria-hidden="true"> · </span>
      {typeLabel(project)}
      <span aria-hidden="true"> · </span>
      {project.year}
    </p>
  );
}

function AwardLine({ award }: { award: string }) {
  return (
    <p className="mt-3 flex items-start gap-1.5 text-sm leading-snug text-ink-2">
      <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <span>{award}</span>
    </p>
  );
}

function CaseStudyCue({ label = "Case study" }: { label?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink">
      {label}
      <span className="relative inline-flex h-4 w-4 overflow-hidden">
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-4" />
        <ArrowRight className="absolute h-4 w-4 -translate-x-4 text-accent transition-transform duration-300 group-hover:translate-x-0" />
      </span>
    </span>
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
      data-spotlight
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card ${focusRing}`}
    >
      {project.cover ? (
        <div className="relative">
          <Cover image={project.cover} sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/9] border-b border-line" />
          {linked && <HoverPill label="Read case study" />}
        </div>
      ) : (
        <TextCover project={project} />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta project={project} />
        <Heading className="mt-3 text-[1.2rem] font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
          {linked ? (
            <Link href={projectHref(project)} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Heading>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{project.tagline}</p>
        {project.award && <AwardLine award={project.award} />}
        <TechLine tech={project.tech} limit={5} className="mt-4" />
        <div className="mt-auto pt-5">
          {linked ? (
            <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
              <ResourceLabels project={project} />
              <CaseStudyCue />
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

/** Large opener for the flagship project at the top of "Selected work". */
export function LeadProjectCard({ project }: { project: Project }) {
  const products = project.details?.components ?? [];
  return (
    <HoverTilt className="block">
      <article
        data-reveal
        data-spotlight
        className={`group relative grid overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_30px_70px_-35px_rgb(0_0_0/0.35)] lg:grid-cols-[1fr_1.08fr] ${focusRing}`}
      >
        {project.cover && (
          <div className="relative overflow-hidden border-b border-line bg-surface-2 lg:order-2 lg:border-b-0 lg:border-l">
            <div className="h-full p-4 sm:p-6 lg:p-8">
              <div className="tilt-target relative h-full overflow-hidden rounded-xl border border-line shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)]">
                <Cover image={project.cover} sizes="(min-width: 1024px) 620px, 100vw" className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[440px]" />
                <span className="tilt-glare" aria-hidden="true" />
              </div>
            </div>
            <HoverPill label="Read the case study" />
          </div>
        )}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent">
            Flagship · {typeLabel(project)} · {project.year}
          </p>
          <h3 className="mt-4 font-display text-[2rem] leading-[1.06] tracking-tight text-ink sm:text-[2.8rem]">
            <Link href={projectHref(project)} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">{project.summary}</p>

          {products.length > 0 && (
            <ol className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {products.map((c, i) => (
                <li key={c.name} className="bg-surface px-3.5 py-3 transition-colors duration-300 group-hover:bg-bg/60">
                  <span className="font-mono text-[0.68rem] text-accent">0{i + 1}</span>
                  <span className="mt-1 block text-sm font-medium leading-snug text-ink">{c.name.replace(/^AURA\s+/, "")}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-3">{c.role.replace(/^Product \d+ · /, "")}</span>
                </li>
              ))}
            </ol>
          )}

          {project.metrics && (
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              {project.metrics.slice(0, 4).map((m) => (
                <div key={m.label} className="flex flex-col">
                  <dt className="order-2 mt-0.5 text-xs leading-snug text-ink-3">{m.label}</dt>
                  <dd className="order-1 font-mono text-xl font-medium text-ink">
                    <CountUp value={m.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <ResourceLabels project={project} />
              <CaseStudyCue label="Read the case study" />
            </div>
          </div>
        </div>
      </article>
    </HoverTilt>
  );
}

/**
 * Editorial row for the other featured projects: framed screenshot on one
 * side, the story on the other. `flip` alternates the sides.
 */
export function ProjectRow({ project, flip = false }: { project: Project; flip?: boolean }) {
  const linked = hasDetailPage(project);
  const glance = project.details?.glance;
  const proof = project.metrics?.slice(0, 2) ?? [];
  return (
    <HoverTilt>
      <article data-reveal className={`group relative grid items-center gap-8 rounded-3xl md:grid-cols-12 md:gap-12 ${focusRing}`}>
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <div className="relative rounded-[1.4rem] border border-line bg-surface-2/70 p-2.5 transition-[border-color,box-shadow] duration-300 group-hover:border-line-strong group-hover:shadow-[0_30px_70px_-35px_rgb(0_0_0/0.4)] sm:p-3">
            <div className="tilt-target relative overflow-hidden rounded-xl border border-line">
              {project.cover ? (
                <Cover image={project.cover} sizes="(min-width: 1024px) 640px, (min-width: 768px) 58vw, 100vw" className="aspect-[16/10]" />
              ) : (
                <div className="aspect-[16/10] bg-surface" />
              )}
              <span className="tilt-glare" aria-hidden="true" />
            </div>
            {linked && <HoverPill label="Read case study" />}
          </div>
        </div>
        <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <Meta project={project} />
          <h3 className="mt-3 text-[1.55rem] font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
            {linked ? (
              <Link href={projectHref(project)} className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-2.5 leading-relaxed text-ink-2">{project.tagline}</p>
          {glance && (
            <p className="mt-4 border-l-2 border-accent/60 pl-3 text-sm leading-relaxed text-ink-2 transition-colors duration-300 group-hover:border-accent">
              <span className="font-medium text-ink">Outcome · </span>
              {glance.outcome}
            </p>
          )}
          {proof.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-4">
              {proof.map((m) => (
                <div key={m.label} className="flex flex-col rounded-xl border border-line bg-surface px-3.5 py-3">
                  <dt className="order-2 mt-0.5 text-xs leading-snug text-ink-3">{m.label}</dt>
                  <dd className="order-1 font-mono text-lg font-medium text-ink">
                    <CountUp value={m.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <TechLine tech={project.tech} limit={6} className="mt-5" />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <ResourceLabels project={project} />
            {linked && <CaseStudyCue />}
          </div>
        </div>
      </article>
    </HoverTilt>
  );
}
