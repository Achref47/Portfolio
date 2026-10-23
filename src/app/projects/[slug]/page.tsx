import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/copy-button";
import { CountUp, ScrollProgress } from "@/components/effects";
import { FlowDiagram } from "@/components/flow-diagram";
import { ArrowLeft, ArrowRight, Award, Lock } from "@/components/icons";
import { Gallery, VideoFile, YouTubeEmbed } from "@/components/media";
import { ProjectCard } from "@/components/project-card";
import { SectionNav } from "@/components/section-nav";
import { AvailabilityNote, ResourceLinks } from "@/components/resources";
import { Container, Kicker, TechLine, TechTags } from "@/components/ui";
import type { ImageMedia, Project } from "@/content/types";
import {
  allProjects,
  categoryLabel,
  getProject,
  hasDetailPage,
  projectHref,
  relatedProjects,
  typeLabel,
} from "@/lib/content";

// Only projects with `details` have a page; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.filter(hasDetailPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const image = project.cover
    ? { url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }
    : { url: "/og.png", width: 1200, height: 630 };
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: projectHref(project) },
    openGraph: { type: "article", title: project.title, description: project.tagline, url: projectHref(project), images: [image] },
    twitter: { card: "summary_large_image", title: project.title, description: project.tagline, images: [image.url] },
  };
}

/** One row of the case study: a sticky label on the left, content on the right. */
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid scroll-mt-32 gap-4 border-t border-line py-12 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 id={`${id}-title`} className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-3 md:sticky md:top-36 md:self-start">
        {title}
      </h2>
      <div data-reveal className="min-w-0">
        {children}
      </div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="prose-body max-w-3xl text-[1.05rem] leading-relaxed text-ink-2">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-3xl space-y-3 text-[1rem] leading-relaxed text-ink-2">
      {items.map((item) => (
        <li key={item} className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3 before:bg-accent">
          {item}
        </li>
      ))}
    </ul>
  );
}

function neighbours(project: Project) {
  const pages = allProjects.filter(hasDetailPage);
  const i = pages.indexOf(project);
  return { prev: pages[(i - 1 + pages.length) % pages.length], next: pages[(i + 1) % pages.length] };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.details) notFound();
  const d = project.details;

  const videos = (project.media ?? []).filter((m) => m.type !== "image");
  const hero = videos[0];
  // Without a video the cover is shown at the top, so it is not repeated in the gallery.
  const images = (project.media ?? []).filter(
    (m): m is ImageMedia => m.type === "image" && (Boolean(hero) || m.src !== project.cover?.src),
  );
  const { prev, next } = neighbours(project);
  const related = relatedProjects(project);

  const facts = [
    { label: "Role", value: project.role },
    project.team && { label: "Team", value: project.team },
    { label: "Context", value: project.context },
    { label: "Type · year", value: `${typeLabel(project)} · ${project.year}` },
    { label: "Area", value: project.categories.map((c) => categoryLabel(c, "label")).join(", ") },
  ].filter((f): f is { label: string; value: string } => Boolean(f));

  // Sections in reading order; only those with content are rendered and indexed.
  const sections: { id: string; title: string; show: boolean }[] = [
    { id: "overview", title: "Overview", show: true },
    { id: "problem", title: "Problem", show: Boolean(d.problem) },
    { id: "objectives", title: "Objectives", show: Boolean(d.objectives) },
    { id: "solution", title: "What it does", show: Boolean(d.solution) },
    { id: "architecture", title: "Architecture", show: Boolean(d.architecture) },
    { id: "products", title: `The ${d.components?.length ?? 0} products`, show: Boolean(d.components) },
    { id: "contribution", title: "My contribution", show: Boolean(d.contribution) },
    { id: "decisions", title: "Engineering decisions", show: Boolean(d.decisions) },
    { id: "challenges", title: "Challenges", show: Boolean(d.challenges) },
    { id: "try-it", title: "Try it", show: Boolean(d.codeSample) },
    { id: "results", title: "Results", show: Boolean(d.results) },
    { id: "limitations", title: "Limitations", show: Boolean(d.limitations) },
    { id: "learnings", title: "What I learned", show: Boolean(d.learnings) },
    { id: "gallery", title: "Screens & figures", show: images.length > 0 || videos.length > 1 },
    { id: "stack", title: "Technology", show: true },
  ];
  const title = (id: string) => sections.find((s) => s.id === id)?.title ?? id;

  return (
    <article>
      <ScrollProgress />
      <Container className="pt-10 sm:pt-14">
        <Link href="/projects" className="link-underline inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Kicker>
              {typeLabel(project)} · {project.year}
            </Kicker>
            <h1 className="mt-4 font-display text-[2.5rem] leading-[1.02] tracking-tight text-ink sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">{project.tagline}</p>
            {project.award && (
              <p className="mt-5 inline-flex items-start gap-2 rounded-lg bg-accent-soft px-3.5 py-2 text-sm font-medium text-accent">
                <Award className="mt-0.5 h-4 w-4 shrink-0" /> {project.award}
              </p>
            )}
          </div>
          <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-line bg-surface p-5 text-sm lg:grid-cols-1">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">{f.label}</dt>
                <dd className="mt-1 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-10 space-y-4">
          <ResourceLinks project={project} />
          {project.availabilityNote && <AvailabilityNote note={project.availabilityNote} />}
        </div>

        {d.glance && (
          <section aria-label="At a glance" className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {[
              { label: "The problem", text: d.glance.problem },
              { label: "What I built", text: d.glance.built },
              { label: "Outcome", text: d.glance.outcome },
            ].map((g, i) => (
              <div key={g.label} data-spotlight className="group relative bg-surface p-6 transition-colors duration-300 hover:bg-bg">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                  0{i + 1} · {g.label}
                </p>
                <p className="mt-3 leading-relaxed text-ink">{g.text}</p>
              </div>
            ))}
          </section>
        )}

        {project.metrics && (
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col bg-surface p-5 transition-colors duration-300 hover:bg-bg">
                <dt className="order-2 mt-1 text-sm leading-snug text-ink-2">
                  {m.label}
                  {m.context && <span className="mt-1 block font-mono text-[0.68rem] leading-snug text-ink-3">{m.context}</span>}
                </dt>
                <dd className="order-1 font-mono text-2xl font-medium tracking-tight text-ink">
                  <CountUp value={m.value} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10">
          {hero?.type === "youtube" && <YouTubeEmbed media={hero} />}
          {hero?.type === "video" && <VideoFile media={hero} />}
          {!hero && project.cover && (
            <figure className="rounded-2xl border border-line bg-surface-2/70 p-2.5 sm:p-3">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1180px) 1120px, 100vw"
                preload
                className={`rounded-xl border border-line bg-surface ${
                  project.cover.height > project.cover.width ? "mx-auto max-h-[640px] w-auto" : "w-full"
                }`}
              />
            </figure>
          )}
        </div>

      </Container>

      <Container className="mt-12">
        <SectionNav sections={sections.filter((s) => s.show).map(({ id, title: t }) => ({ id, title: t }))} />
        <Section id="overview" title={title("overview")}>
          <Paragraphs items={d.overview} />
        </Section>
        {d.problem && (
          <Section id="problem" title={title("problem")}>
            <Paragraphs items={d.problem} />
          </Section>
        )}
        {d.objectives && (
          <Section id="objectives" title={title("objectives")}>
            <Bullets items={d.objectives} />
          </Section>
        )}
        {d.solution && (
          <Section id="solution" title={title("solution")}>
            <Bullets items={d.solution} />
          </Section>
        )}
        {d.architecture && (
          <Section id="architecture" title={title("architecture")}>
            {d.architecture.intro && <p className="mb-6 max-w-3xl leading-relaxed text-ink-2">{d.architecture.intro}</p>}
            <FlowDiagram steps={d.architecture.steps} label={`${project.title} architecture`} />
          </Section>
        )}
        {d.components && (
          <Section id="products" title={title("products")}>
            <div className="space-y-16">
              {d.components.map((c) => (
                <div key={c.name}>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-accent">{c.role}</p>
                  <h3 className="mt-2 font-display text-3xl tracking-tight text-ink">{c.name}</h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-ink-2">{c.summary}</p>
                  <div className="mt-5">
                    <Bullets items={c.points} />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <TechLine tech={c.tech} />
                    {c.access && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-ink-3">
                        <Lock className="h-3.5 w-3.5" /> {c.access}
                      </span>
                    )}
                  </div>
                  {c.media && (
                    <div className="mt-6">
                      <Gallery images={c.media} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
        {d.contribution && (
          <Section id="contribution" title={title("contribution")}>
            <Bullets items={d.contribution} />
          </Section>
        )}
        {d.decisions && (
          <Section id="decisions" title={title("decisions")}>
            <Bullets items={d.decisions} />
          </Section>
        )}
        {d.challenges && (
          <Section id="challenges" title={title("challenges")}>
            <Bullets items={d.challenges} />
          </Section>
        )}
        {d.codeSample && (
          <Section id="try-it" title={title("try-it")}>
            <figure className="max-w-3xl overflow-hidden rounded-xl border border-line bg-[#0f1216] text-[#e6e6e3]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                <span className="font-mono text-[0.72rem] text-white/70">{d.codeSample.title}</span>
                <CopyButton text={d.codeSample.code} />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed">
                <code>{d.codeSample.code}</code>
              </pre>
            </figure>
            {d.codeSample.caption && <p className="mt-3 max-w-3xl text-sm text-ink-3">{d.codeSample.caption}</p>}
          </Section>
        )}
        {d.results && (
          <Section id="results" title={title("results")}>
            <Bullets items={d.results} />
          </Section>
        )}
        {d.limitations && (
          <Section id="limitations" title={title("limitations")}>
            <Bullets items={d.limitations} />
          </Section>
        )}
        {d.learnings && (
          <Section id="learnings" title={title("learnings")}>
            <Bullets items={d.learnings} />
          </Section>
        )}
        {(images.length > 0 || videos.length > 1) && (
          <Section id="gallery" title={title("gallery")}>
            <div className="space-y-8">
              {videos.slice(1).map((v) =>
                v.type === "youtube" ? <YouTubeEmbed key={v.videoId} media={v} /> : v.type === "video" ? <VideoFile key={v.src} media={v} /> : null,
              )}
              <Gallery images={images} />
            </div>
          </Section>
        )}
        <Section id="stack" title={title("stack")}>
          <TechTags tech={project.tech} />
        </Section>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-10">
          <Container>
            <div className="border-t border-line pt-10">
              <Kicker>Keep exploring</Kicker>
              <h2 id="related-title" className="mt-3 font-display text-4xl tracking-tight text-ink">
                Related projects
              </h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <Container className="mt-12">
        <nav aria-label="Previous and next case studies" className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {[
            { p: prev, label: "Previous", Icon: ArrowLeft },
            { p: next, label: "Next", Icon: ArrowRight },
          ].map(({ p, label, Icon }) => (
            <Link
              key={label}
              href={projectHref(p)}
              className={`group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong ${label === "Next" ? "sm:text-right" : ""}`}
            >
              <span className={`inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3 ${label === "Next" ? "sm:flex-row-reverse" : ""}`}>
                <Icon className="h-3.5 w-3.5" /> {label} case study
              </span>
              <span className="mt-2 block font-medium text-ink group-hover:text-accent">{p.title}</span>
            </Link>
          ))}
        </nav>
      </Container>
    </article>
  );
}
