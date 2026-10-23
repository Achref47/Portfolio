import Image from "next/image";
import Link from "next/link";
import type { ImageMedia, Project } from "@/content/types";
import { categoryLabel, hasDetailPage, projectHref, projectNumber } from "@/lib/content";
import { ArrowRight, Award } from "./icons";
import { AvailabilityNote, ResourceLabels, ResourceLinks } from "./resources";
import { TechTags } from "./ui";

function Cover({ image, sizes, className = "" }: { image: ImageMedia; sizes: string; className?: string }) {
  const portrait = image.height > image.width;
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className={
          portrait
            ? "object-contain py-4 transition-transform duration-500 group-hover:scale-[1.03]"
            : "object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
        }
      />
    </div>
  );
}

/** Typographic stand-in for projects without screenshots, so card rows stay aligned. */
function TextCover({ project }: { project: Project }) {
  return (
    <div aria-hidden="true" className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden border-b border-line bg-surface-2 p-6">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom_right,black,transparent_75%)]" />
      <span className="relative font-mono text-5xl font-medium text-ink-3/60">{projectNumber(project)}</span>
      <span className="relative font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
        {project.tech.slice(0, 4).join(" · ")}
      </span>
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">
      <span className="text-accent">{projectNumber(project)}</span>
      <span aria-hidden="true"> · </span>
      {project.year}
      <span aria-hidden="true"> · </span>
      {project.categories.map((c) => categoryLabel(c)).join(" / ")}
    </p>
  );
}

/**
 * Standard project card. If the project has a detail page the whole card is
 * one link; otherwise it shows its external resource links directly.
 */
export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const linked = hasDetailPage(project);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-colors hover:border-line-strong">
      {project.cover ? (
        <Cover image={project.cover} sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/9] border-b border-line" />
      ) : (
        <TextCover project={project} />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Meta project={project} />
        <Heading className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink">
          {linked ? (
            <Link href={projectHref(project)} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </Heading>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{project.tagline}</p>
        <p className="mt-3 text-sm text-ink-3">{project.context}</p>
        {project.award && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-2">
            <Award className="h-4 w-4 text-accent" /> {project.award}
          </p>
        )}
        <TechTags tech={project.tech} limit={6} className="mt-4" />
        <div className="mt-auto pt-5">
          {linked ? (
            <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
              <ResourceLabels project={project} />
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink">
                Case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          ) : project.resources.length > 0 ? (
            <div className="border-t border-line pt-4">
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

/** Large card for the flagship project at the top of "Selected work". */
export function LeadProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-colors hover:border-line-strong lg:grid-cols-[1.05fr_1fr]">
      {project.cover && (
        <Cover
          image={project.cover}
          sizes="(min-width: 1024px) 620px, 100vw"
          className="aspect-[16/10] border-b border-line lg:order-2 lg:aspect-auto lg:min-h-[460px] lg:border-b-0 lg:border-l"
        />
      )}
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent">Flagship · {project.context}</p>
        <h3 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-ink sm:text-[2.6rem]">
          <Link href={projectHref(project)} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">{project.summary}</p>
        {project.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-0.5 text-xs leading-snug text-ink-3">{m.label}</dt>
                <dd className="order-1 font-mono text-lg font-medium text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <ResourceLabels project={project} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
            Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
