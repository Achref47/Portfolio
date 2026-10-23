import Link from "next/link";
import { CopyEmailButton } from "@/components/copy-email";
import { ArrowRight, ArrowUpRight, Download, GitHubMark, LinkedInMark, Mail, YouTubeMark } from "@/components/icons";
import { LeadProjectCard, ProjectCard } from "@/components/project-card";
import { Container, Kicker, SectionHeading } from "@/components/ui";
import { certifications, education, experience, languages } from "@/content/experience";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { allProjects, getFeaturedProjects } from "@/lib/content";

const buttonBase =
  "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors";
const primaryButton = `${buttonBase} bg-ink text-bg hover:opacity-90`;
const secondaryButton = `${buttonBase} border border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-2`;

export default function HomePage() {
  const [lead, ...featured] = getFeaturedProjects();
  const latest = experience[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <Container className="grid gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.35fr_0.85fr] lg:items-end lg:gap-16 lg:pb-28">
        <div>
          <Kicker>
            {profile.name} <span aria-hidden="true">—</span> {profile.role}
          </Kicker>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
            {profile.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-[1.06rem] leading-relaxed text-ink-2">{profile.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className={primaryButton}>
              Explore my projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
              <GitHubMark className="h-4 w-4" /> View GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {profile.resume.enabled && (
              <a href={profile.resume.href} download className={secondaryButton}>
                <Download className="h-4 w-4" /> Download resume
              </a>
            )}
            <Link href="/#contact" className={`${buttonBase} text-ink-2 hover:text-ink`}>
              Contact me
            </Link>
          </div>
        </div>

        <aside aria-label="Profile summary" className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-card">
          <div className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
          <dl className="relative divide-y divide-line text-sm">
            <div className="px-5 py-4">
              <dt><Kicker>Looking for</Kicker></dt>
              <dd className="mt-1.5 text-ink">{profile.targetRoles.join(" · ")}</dd>
            </div>
            <div className="px-5 py-4">
              <dt><Kicker>Most recent</Kicker></dt>
              <dd className="mt-1.5 text-ink">
                {latest.role}, {latest.organisation} ({latest.location})
                <span className="block text-ink-3">{latest.period}</span>
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt><Kicker>Education</Kicker></dt>
              <dd className="mt-1.5 text-ink">
                Software Engineering degree, MedTech <span className="text-ink-3">({education.accreditation})</span>
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt><Kicker>Based in</Kicker></dt>
              <dd className="mt-1.5 text-ink">
                {profile.location} · {profile.timezone}
                <span className="block text-ink-3">{profile.availability}</span>
              </dd>
            </div>
          </dl>
        </aside>
      </Container>

      {/* ── Selected work ────────────────────────────────── */}
      <section aria-labelledby="work" className="pb-24">
        <Container>
          <SectionHeading
            id="work"
            kicker="Selected work"
            title="Projects with evidence behind them"
            intro="Each project shows what you can actually open — source code, a live demo, a video or documentation — and says so when something is private."
            action={
              <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent">
                All {allProjects.length} projects <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          {lead && <LeadProjectCard project={lead} />}
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section aria-labelledby="about" className="pb-24">
        <Container>
          <SectionHeading id="about" kicker="About" title="One engineer across software, machine learning and data" />
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="prose-body max-w-2xl text-[1.04rem] leading-relaxed text-ink-2">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <Kicker>Languages</Kicker>
              <ul className="mt-3 space-y-2 text-sm">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 border-b border-line pb-2">
                    <span className="text-ink">{l.name}</span>
                    <span className="text-ink-3">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Skills ───────────────────────────────────────── */}
      <section aria-labelledby="skills" className="pb-24">
        <Container>
          <SectionHeading
            id="skills"
            kicker="Technical skills"
            title="Tools I have shipped with"
            intro="Grouped by area and limited to what my experience and projects back up."
          />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-ink">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <li key={s} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm text-ink-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Experience & education ───────────────────────── */}
      <section aria-labelledby="experience" className="pb-24">
        <Container>
          <SectionHeading id="experience" kicker="Experience & education" title="Where I have built things" />
          <ol className="space-y-6">
            {experience.map((job) => (
              <li key={job.organisation} className="grid gap-4 rounded-xl border border-line bg-surface p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-8">
                <div>
                  <p className="font-mono text-[0.78rem] text-ink-2">{job.period}</p>
                  <p className="mt-2 inline-block rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">
                    {job.type}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">
                    {job.role} <span className="font-normal text-ink-3">· {job.organisation}, {job.location}</span>
                  </h3>
                  <p className="mt-1 text-sm text-ink-3">{job.context}</p>
                  <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-2">
                    {job.points.map((point) => (
                      <li key={point} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink-3">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {job.projectHref && (
                    <Link href={job.projectHref} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent">
                      See the project <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
              <Kicker>Education · {education.period}</Kicker>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {education.degree} <span className="font-normal text-ink-3">({education.accreditation})</span>
              </h3>
              <p className="mt-1 text-sm text-ink-3">
                {education.school} — {education.location}
              </p>
              <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-2">
                {education.details.map((d) => (
                  <li key={d} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink-3">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
              <Kicker>Certifications</Kicker>
              <ul className="mt-4 space-y-4">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p className="text-[0.95rem] font-medium text-ink">{c.name}</p>
                    <p className="text-sm text-ink-3">
                      {c.issuer} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section aria-labelledby="contact">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-bg sm:px-10 sm:py-16">
            <div className="bg-grid absolute inset-0 opacity-[0.07]" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] opacity-70">Contact</p>
                <h2 id="contact" className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                  Hiring for software, ML or data roles? Let&apos;s talk.
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed opacity-80">
                  I&apos;m based in {profile.location} ({profile.timezone}) and open to relocation and remote work. Email is the fastest way to reach me.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-bg px-5 py-3 text-sm font-medium text-ink hover:opacity-90"
                >
                  <Mail className="h-4 w-4" /> {profile.email}
                </a>
                <CopyEmailButton email={profile.email} variant="inverse" className="w-full" />
                <div className="flex gap-3">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-bg/25 px-4 py-2.5 text-sm hover:bg-bg/10"
                  >
                    <LinkedInMark className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-bg/25 px-4 py-2.5 text-sm hover:bg-bg/10"
                  >
                    <GitHubMark className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a
                    href={profile.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-bg/25 px-3 py-2.5 hover:bg-bg/10"
                    aria-label="YouTube channel with project demos (opens in a new tab)"
                  >
                    <YouTubeMark className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
