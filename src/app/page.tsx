import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Avatar } from "@/components/avatar";
import { CopyEmailButton } from "@/components/copy-email";
import { ScrollScene } from "@/components/effects";
import { Hero } from "@/components/hero";
import { ArrowUpRight, Award, GitHubMark, LinkedInMark, YouTubeMark } from "@/components/icons";
import { FlagshipSection, ProjectRow } from "@/components/project-card";
import { ScrollWords } from "@/components/scroll-words";
import { StackSection } from "@/components/stack-section";
import { ArrowLabel, button, Container, Kicker, Light, SectionHeading } from "@/components/ui";
import { certifications, education, experience, languages, recognition } from "@/content/experience";
import { profile } from "@/content/profile";
import type { Recognition } from "@/content/types";
import { allProjects, getFeaturedProjects, getProject, projectHref } from "@/lib/content";

const pill =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink";

export default function HomePage() {
  const [lead, ...featured] = getFeaturedProjects();
  const moreCount = allProjects.length - featured.length - (lead ? 1 : 0);
  const [firstAbout, ...restAbout] = profile.about;
  const [city] = profile.location.split(",");

  return (
    <>
      <Hero />

      {/* ── About: how I work ───────────────────────────── */}
      <section aria-labelledby="about" className="pb-28 pt-24 sm:pt-32">
        <Container>
          <div className="grid gap-x-8 gap-y-6 border-t-2 border-ink pt-5 md:grid-cols-12">
            <h2 id="about" className="text-[0.8125rem] font-medium text-ink-3 md:col-span-3">
              <span className="mr-2 tabular-nums text-accent">01</span>About — how I work
            </h2>
            <div className="md:col-span-9">
              <ScrollWords text={firstAbout} className="font-wide text-[clamp(1.65rem,3.3vw,2.85rem)] font-medium leading-[1.18] text-ink" />
              <div data-reveal className="mt-14 grid gap-x-10 gap-y-6 text-[1.0625rem] leading-relaxed text-ink-2 lg:grid-cols-2">
                {restAbout.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div data-reveal className="mt-10 flex items-center gap-4 border-t border-line pt-6">
                <Avatar size={56} />
                <p className="leading-snug">
                  <span className="block font-wide font-semibold text-ink">{profile.name}</span>
                  <span className="block text-[0.875rem] text-ink-3">
                    Software engineer · {profile.location} · {profile.availability.toLowerCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Work: the flagship as a system, then the index ─ */}
      <section aria-labelledby="work" className="pb-28">
        <Container>
          {lead && <FlagshipSection project={lead} index="02" />}

          <div className="mt-28 flex flex-wrap items-end justify-between gap-4 border-t-2 border-ink pt-5">
            <h3 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-none text-ink">
              More selected work
            </h3>
            <Link href="/projects" className="group text-[0.9375rem] font-medium text-ink">
              <ArrowLabel>All {allProjects.length} projects</ArrowLabel>
            </Link>
          </div>
          <div>
            {featured.map((project, i) => (
              <ProjectRow key={project.slug} project={project} position={i + 2} />
            ))}
          </div>
          <Link
            href="/projects"
            className="group flex flex-col items-start justify-between gap-5 border-y border-line py-10 transition-colors sm:flex-row sm:items-center"
          >
            <span>
              <span className="block font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-accent">
                {moreCount} more in the catalogue
              </span>
              <span className="mt-2 block text-ink-2">Mobile, IoT, data science and coursework — filter by area, technology and what you can open.</span>
            </span>
            <span className={button("primary")}>
              <ArrowLabel>Browse the catalogue</ArrowLabel>
            </span>
          </Link>
        </Container>
      </section>

      {/* ── Experience & education ───────────────────────── */}
      <section aria-labelledby="experience" className="pb-28">
        <Container>
          <SectionHeading
            id="experience"
            index="03"
            kicker="Experience & education"
            title={
              <>
                Where I&apos;ve <Light>built things.</Light>
              </>
            }
          />
          <ScrollScene as="ol" start={0.7} end={0.55} className="relative">
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line">
              <span className="timeline-fill absolute inset-0 bg-accent" />
            </span>
            {experience.map((job) => (
              <li key={job.organisation} data-reveal className="relative grid gap-3 pb-16 pl-9 md:grid-cols-12 md:gap-8 md:pl-0">
                <span aria-hidden="true" className="absolute left-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg" />
                <div className="md:col-span-3 md:pl-9">
                  <p className="font-wide text-[0.9375rem] font-semibold tabular-nums text-ink">{job.period}</p>
                  <p className="mt-1 text-[0.875rem] text-ink-3">{job.type}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-wide text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-snug text-ink">
                    {job.role}
                    <span className="block text-[1rem] font-normal text-ink-2 [font-stretch:100%] sm:inline">
                      <span className="hidden sm:inline"> — </span>
                      {job.organisation}, {job.location}
                    </span>
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-ink-3">{job.context}</p>
                  <ul className="mt-5 max-w-3xl space-y-3 text-[1rem] leading-relaxed text-ink-2">
                    {job.points.map((point) => (
                      <li key={point} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-[2px] before:w-2.5 before:bg-accent">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {job.projectHref && (
                    <Link href={job.projectHref} className="group mt-6 inline-flex text-[0.9375rem] font-medium text-ink">
                      <ArrowLabel>See the project</ArrowLabel>
                    </Link>
                  )}
                </div>
              </li>
            ))}
            <li data-reveal className="relative grid gap-3 pl-9 md:grid-cols-12 md:gap-8 md:pl-0">
              <span aria-hidden="true" className="absolute left-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border-2 border-ink bg-bg" />
              <div className="md:col-span-3 md:pl-9">
                <p className="font-wide text-[0.9375rem] font-semibold tabular-nums text-ink">{education.period}</p>
                <p className="mt-1 text-[0.875rem] text-ink-3">Education</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-wide text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-snug text-ink">
                  {education.degree}
                  <span className="ml-2 align-middle text-[0.875rem] font-normal text-ink-3 [font-stretch:100%]">({education.accreditation})</span>
                </h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">
                  {education.school} — {education.location}
                </p>
                <ul className="mt-5 space-y-2.5 text-[1rem] text-ink-2">
                  {education.details.map((detail) => (
                    <li key={detail} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-[2px] before:w-2.5 before:bg-ink-3">
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 grid gap-8 border-t border-line pt-6 sm:grid-cols-2">
                  <div>
                    <Kicker>Certifications</Kicker>
                    <ul className="mt-3 space-y-3">
                      {certifications.map((c) => (
                        <li key={c.name} className="text-[0.9375rem]">
                          <span className="font-medium text-ink">{c.name}</span>
                          <span className="block text-ink-3">
                            {c.issuer} · {c.year}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Kicker>Languages</Kicker>
                    <ul className="mt-3 space-y-3 text-[0.9375rem]">
                      {languages.map((l) => (
                        <li key={l.name}>
                          <span className="font-medium text-ink">{l.name}</span>
                          <span className="block text-ink-3">{l.level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ScrollScene>
        </Container>
      </section>

      {/* ── Recognition ──────────────────────────────────── */}
      <section aria-labelledby="recognition" className="pb-28">
        <Container>
          <SectionHeading
            id="recognition"
            index="04"
            kicker="Recognition"
            title={
              <>
                Awards <Light>and distinctions.</Light>
              </>
            }
          />
          <ol className="grid gap-8 md:grid-cols-2">
            {recognition
              .filter((r) => r.image)
              .map((r, i) => (
                <li key={r.title} data-reveal style={{ ["--reveal-i" as string]: i } as CSSProperties}>
                  <RecognitionFeature item={r} />
                </li>
              ))}
          </ol>
          <ol className="mt-14 border-t border-line">
            {recognition
              .filter((r) => !r.image)
              .map((r) => (
                <li key={r.title} data-reveal>
                  <RecognitionRow item={r} />
                </li>
              ))}
          </ol>
        </Container>
      </section>

      <StackSection index="05" />

      {/* ── Contact ──────────────────────────────────────── */}
      <section aria-labelledby="contact" className="pb-6">
        <Container>
          <div className="grid gap-x-8 gap-y-6 border-t-2 border-ink pt-5 md:grid-cols-12">
            <p className="text-[0.8125rem] font-medium text-ink-3 md:col-span-3">
              <span className="mr-2 tabular-nums text-accent">06</span>Contact
            </p>
            <div className="md:col-span-9">
              <h2 id="contact" data-reveal className="font-display text-[clamp(2.3rem,5vw,4.5rem)] font-bold leading-[0.98] text-ink">
                Hiring for software, ML or data roles? <Light>Let&apos;s talk.</Light>
              </h2>
              <p data-reveal className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
                I&apos;m based in {city} ({profile.timezone}) and open to relocation and remote work. Email is the fastest way to reach me.
              </p>
              <a
                href={`mailto:${profile.email}`}
                data-reveal
                className="link-rule mt-10 inline-block break-all pb-1 font-wide text-[clamp(1.35rem,3.4vw,2.6rem)] font-semibold text-ink transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
              <div data-reveal className="mt-8 flex flex-wrap gap-3">
                <CopyEmailButton email={profile.email} />
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" data-magnetic className={pill}>
                  <LinkedInMark className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5 text-ink-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" data-magnetic className={pill}>
                  <GitHubMark className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5 text-ink-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={profile.links.youtube} target="_blank" rel="noopener noreferrer" data-magnetic className={pill}>
                  <YouTubeMark className="h-4 w-4" /> Demo videos <ArrowUpRight className="h-3.5 w-3.5 text-ink-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
              <p className="mt-8 text-[0.8125rem] text-ink-3">
                Tip: press <kbd className="rounded border border-line-strong px-1 font-sans">Ctrl</kbd> <kbd className="rounded border border-line-strong px-1 font-sans">K</kbd> anywhere to jump to a project or section.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Where an award points: its case study, or the catalogue filtered to its project. */
function recognitionHref(item: Recognition) {
  const project = item.project ? getProject(item.project) : undefined;
  if (!project) return undefined;
  return project.details ? projectHref(project) : `/projects?q=${encodeURIComponent(project.shortTitle ?? project.title)}`;
}

/** An award with its evidence photo. */
function RecognitionFeature({ item }: { item: Recognition }) {
  const href = recognitionHref(item);
  const body = (
    <>
      {item.image && (
        <div data-reveal="clip" className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface-2">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 768px) 600px, 100vw"
            style={item.image.position ? { objectPosition: item.image.position } : undefined}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[0.8125rem] font-medium text-accent">
            <Award className="h-4 w-4" />
            {item.year}
          </p>
          <h3 className="mt-2 font-wide text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-snug text-ink">{item.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{item.detail}</p>
        </div>
      </div>
      {href && <ArrowLabel className="mt-4 text-[0.9375rem] font-medium text-ink">See the project</ArrowLabel>}
    </>
  );
  return href ? (
    <Link href={href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}

/** A compact award line: year, title, detail. */
function RecognitionRow({ item }: { item: Recognition }) {
  const href = recognitionHref(item);
  const body = (
    <span className="grid gap-1 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-8">
      <span className="text-[0.875rem] tabular-nums text-ink-3 sm:col-span-2">{item.year ?? "—"}</span>
      <span className="font-wide text-[1.15rem] font-semibold text-ink transition-colors duration-300 group-hover:text-accent sm:col-span-4">{item.title}</span>
      <span className="text-[0.9375rem] leading-relaxed text-ink-2 sm:col-span-5">{item.detail}</span>
      <span className="hidden justify-end sm:col-span-1 sm:flex">
        {href && (
          <span className="arrow-swap h-4 w-4" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4 text-ink-3" />
            <ArrowUpRight className="h-4 w-4 text-accent" />
          </span>
        )}
      </span>
    </span>
  );
  return href ? (
    <Link href={href} className="group block">
      {body}
    </Link>
  ) : (
    <div>{body}</div>
  );
}
