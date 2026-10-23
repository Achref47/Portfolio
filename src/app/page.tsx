import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { CopyEmailButton } from "@/components/copy-email";
import { Hero } from "@/components/hero";
import { ArrowRight, ArrowUpRight, Award, GitHubMark, LinkedInMark, Mail, YouTubeMark } from "@/components/icons";
import { LeadProjectCard, ProjectRow } from "@/components/project-card";
import { StackSection } from "@/components/stack-section";
import { button, Container, Kicker, SectionHeading } from "@/components/ui";
import { certifications, education, experience, languages, recognition } from "@/content/experience";
import type { Recognition } from "@/content/types";
import { profile } from "@/content/profile";
import { allProjects, getFeaturedProjects, getProject, projectHref } from "@/lib/content";

export default function HomePage() {
  const [lead, ...featured] = getFeaturedProjects();
  const moreCount = allProjects.length - featured.length - (lead ? 1 : 0);


  const [firstAbout, ...restAbout] = profile.about;

  return (
    <>
      <Hero />

      {/* ── Selected work ────────────────────────────────── */}
      <section aria-labelledby="work" className="pb-28 pt-20 sm:pt-24">
        <Container>
          <SectionHeading
            id="work"
            index="01"
            kicker="Selected work"
            title="Projects with evidence behind them"
            intro="Each project says what you can open — source code, a live demo, a video or documentation — and says so when something is private."
            action={
              <Link href="/projects" className="group link-underline inline-flex items-center gap-1 text-sm font-medium text-ink">
                All {allProjects.length} projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            }
          />
          {lead && <LeadProjectCard project={lead} />}
          <div className="mt-24 space-y-24 md:space-y-28">
            {featured.map((project, i) => (
              <ProjectRow key={project.slug} project={project} flip={i % 2 === 1} />
            ))}
          </div>
          <div
            data-reveal
            data-spotlight
            className="relative mt-24 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl border border-line bg-surface px-6 py-7 sm:flex-row sm:items-center sm:px-8"
          >
            <div>
              <p className="font-display text-3xl tracking-tight text-ink">
                {moreCount} more projects in the catalogue
              </p>
              <p className="mt-1.5 text-ink-2">Mobile, IoT, data science and coursework — filter by area, technology and what you can open.</p>
            </div>
            <Link href="/projects" className={`group shrink-0 whitespace-nowrap ${button("primary")}`}>
              Browse the catalogue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Recognition ──────────────────────────────────── */}
      <section aria-labelledby="recognition" className="pb-28">
        <Container>
          <SectionHeading id="recognition" index="02" kicker="Recognition" title="Awards and distinctions" />
          {/* Awards with an evidence image become feature cards; the rest form a compact row. */}
          <div className="grid gap-4">
            <ol className="grid gap-4 md:grid-cols-2">
                {recognition
                  .filter((r) => r.image)
                  .map((r, i) => (
                    <li key={r.title} data-reveal style={{ ["--reveal-i" as string]: i }}>
                      <RecognitionCard item={r} feature />
                    </li>
                  ))}
            </ol>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recognition
                  .filter((r) => !r.image)
                  .map((r, i) => (
                    <li key={r.title} data-reveal style={{ ["--reveal-i" as string]: i % 4 }}>
                      <RecognitionCard item={r} />
                    </li>
                  ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── Experience & education ───────────────────────── */}
      <section aria-labelledby="experience" className="pb-28">
        <Container>
          <SectionHeading id="experience" index="03" kicker="Experience & education" title="Where I have built things" />
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-gradient-to-b from-accent via-line-strong to-transparent md:block" />
            {experience.map((job) => (
              <li key={job.organisation} data-reveal className="group relative grid gap-4 pb-14 md:grid-cols-[250px_1fr] md:gap-10 md:pl-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg transition-colors duration-300 group-hover:bg-accent md:block"
                />
                <div>
                  <p className="font-mono text-[0.8rem] text-ink-2">{job.period}</p>
                  <p className="mt-2 inline-block rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">{job.type}</p>
                </div>
                <div className="rounded-2xl border border-transparent p-0 transition-[border-color,background-color] duration-300 md:-m-5 md:p-5 md:group-hover:border-line md:group-hover:bg-surface">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {job.role} <span className="font-normal text-ink-3">· {job.organisation}, {job.location}</span>
                  </h3>
                  <p className="mt-1 text-sm text-ink-3">{job.context}</p>
                  <ul className="mt-4 max-w-3xl space-y-2.5 text-[0.97rem] leading-relaxed text-ink-2">
                    {job.points.map((point) => (
                      <li key={point} className="relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-accent">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {job.projectHref && (
                    <Link href={job.projectHref} className="group/link link-underline mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink">
                      See the project <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
            <li data-reveal className="group relative grid gap-4 md:grid-cols-[250px_1fr] md:gap-10 md:pl-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 hidden h-[15px] w-[15px] rounded-full border-2 border-line-strong bg-bg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent md:block"
              />
              <div>
                <p className="font-mono text-[0.8rem] text-ink-2">{education.period}</p>
                <p className="mt-2 inline-block rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-2">Education</p>
              </div>
              <div className="rounded-2xl border border-transparent transition-[border-color,background-color] duration-300 md:-m-5 md:p-5 md:group-hover:border-line md:group-hover:bg-surface">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {education.degree} <span className="font-normal text-ink-3">({education.accreditation})</span>
                </h3>
                <p className="mt-1 text-sm text-ink-3">
                  {education.school} — {education.location}
                </p>
                <ul className="mt-4 space-y-2 text-[0.97rem] text-ink-2">
                  {education.details.map((d) => (
                    <li key={d} className="relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-ink-3">
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <Kicker>Certifications</Kicker>
                    <ul className="mt-3 space-y-2.5">
                      {certifications.map((c) => (
                        <li key={c.name} className="text-sm">
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
                    <ul className="mt-3 space-y-2.5 text-sm">
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
          </ol>
        </Container>
      </section>

      <StackSection index="04" />

      {/* ── About ────────────────────────────────────────── */}
      <section aria-labelledby="about" className="pb-28">
        <Container>
          <SectionHeading id="about" index="05" kicker="About" title="How I like to work" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <figure data-reveal>
              <blockquote className="font-display text-[1.9rem] leading-[1.2] tracking-tight text-ink sm:text-[2.3rem]">
                <p>{firstAbout}</p>
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <Avatar size={56} />
                <span>
                  <span className="block font-medium text-ink">{profile.name}</span>
                  <span className="block text-sm text-ink-3">
                    Software Engineer · {profile.location}
                  </span>
                </span>
              </figcaption>
            </figure>
            <div data-reveal style={{ ["--reveal-i" as string]: 1 }} className="prose-body text-[1.04rem] leading-relaxed text-ink-2">
              {restAbout.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section aria-labelledby="contact">
        <Container>
          <div data-reveal data-pointer className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-bg sm:px-12 sm:py-20">
            <div className="bg-grid absolute inset-0 opacity-[0.08]" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(500px circle at var(--mx, 80%) var(--my, 20%), color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)" }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] opacity-70">
                  <span className="mr-3">06</span>Contact
                </p>
                <h2 id="contact" className="mt-4 font-display text-4xl leading-[1.04] tracking-tight sm:text-6xl">
                  Hiring for software, ML or data roles? Let&apos;s talk.
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed opacity-80">
                  I&apos;m based in {profile.location} ({profile.timezone}) and open to relocation and remote work. Email is the fastest way to reach me.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-bg px-5 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" /> {profile.email}
                </a>
                <CopyEmailButton email={profile.email} variant="inverse" className="w-full" />
                <div className="flex flex-wrap gap-3 [&>a:last-child]:flex-none [&>a]:flex-1">
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-bg/25 px-4 py-2.5 text-sm transition-colors hover:bg-bg/10">
                    <LinkedInMark className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-bg/25 px-4 py-2.5 text-sm transition-colors hover:bg-bg/10">
                    <GitHubMark className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a href={profile.links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg border border-bg/25 px-3 py-2.5 transition-colors hover:bg-bg/10" aria-label="YouTube channel with project demos (opens in a new tab)">
                    <YouTubeMark className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-center font-mono text-[0.68rem] opacity-60">
                  Tip: press <kbd className="rounded border border-bg/30 px-1">Ctrl</kbd> <kbd className="rounded border border-bg/30 px-1">K</kbd> anywhere to jump around the site.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** One award. Links to its case study when the project has one; `feature` shows its evidence image. */
function RecognitionCard({ item, feature = false }: { item: Recognition; feature?: boolean }) {
  const project = item.project ? getProject(item.project) : undefined;
  const linked = Boolean(project?.details);
  const className = `group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card ${
    feature ? "border-accent/40 bg-accent-soft/40 hover:border-accent" : "border-line bg-surface p-6 hover:border-line-strong"
  }`;
  const body = (
    <>
      {feature && item.image && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-accent/20 bg-surface-2">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            style={item.image.position ? { objectPosition: item.image.position } : undefined}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className={feature ? "flex flex-1 flex-col p-6" : "flex flex-1 flex-col"}>
        <span className="flex items-center justify-between gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110">
            <Award className="h-[18px] w-[18px]" />
          </span>
          {item.year && <span className="font-mono text-[0.72rem] text-ink-3">{item.year}</span>}
        </span>
        <span className={`mt-4 block leading-snug text-ink ${feature ? "font-display text-[1.9rem] tracking-tight" : "text-[1.02rem] font-semibold"}`}>
          {item.title}
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-ink-2">{item.detail}</span>
        {project && (
          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-ink">
            {linked ? "See the project" : "In the catalogue"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </>
  );
  if (!project) {
    return (
      <div data-spotlight className={className}>
        {body}
      </div>
    );
  }
  const href = linked ? projectHref(project) : `/projects?q=${encodeURIComponent(project.shortTitle ?? project.title)}`;
  return (
    <Link href={href} data-spotlight className={className}>
      {body}
    </Link>
  );
}
