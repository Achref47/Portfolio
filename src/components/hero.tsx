import Link from "next/link";
import { education } from "@/content/experience";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { getHighlights, projectHref } from "@/lib/content";
import { Avatar } from "./avatar";
import { HeroRotator } from "./hero-rotator";
import { ArrowRight, ArrowUpRight, Download, GitHubMark, LinkedInMark } from "./icons";
import { button, Container } from "./ui";

/** Splits text into words wrapped for the .word-reveal animation. */
function RevealWords({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="word-reveal">
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span style={{ ["--w" as string]: i + offset }}>{word}</span>
          {" "}
        </span>
      ))}
    </span>
  );
}

const iconLink =
  "inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-2 transition-[color,background-color,transform] hover:-translate-y-0.5 hover:bg-surface-2 hover:text-ink";

export function Hero() {
  const highlights = getHighlights();
  const rotation = profile.headlineRotation;
  const graduation = education.period.split("–").pop()?.trim();

  return (
    <section aria-label="Introduction" data-pointer className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <Container className="relative grid gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 lg:pb-24">
        <div>
          <div className="line-in flex items-center gap-4" style={{ ["--l" as string]: -2 }}>
            {profile.photo ? (
              <Avatar size={68} status preload className="transition-transform duration-500 hover:-rotate-3 hover:scale-105" />
            ) : null}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-[0.8rem] text-ink-2 shadow-sm backdrop-blur">
                {!profile.photo && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
                {profile.status}
              </p>
              <p className="mt-1.5 pl-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-3">
                Software Engineer · {profile.location.split(",")[0]}
                <span className="hidden sm:inline">,{profile.location.split(",").slice(1).join(",")}</span>
              </p>
            </div>
          </div>

          <h1 className="mt-6 font-display text-[3.5rem] leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-[6rem]">
            <RevealWords text={profile.name} />
          </h1>

          <p className="mt-6 max-w-2xl text-[1.2rem] leading-snug text-ink sm:text-[1.55rem]">
            <span className="sr-only">{profile.headline}</span>
            <span aria-hidden="true" className="line-in" style={{ ["--l" as string]: 0 }}>
              {rotation.lead} <HeroRotator words={rotation.focus} />
              <span className="mt-1 block text-ink-2">{rotation.tail}</span>
            </span>
          </p>
          <p className="line-in mt-5 max-w-xl leading-relaxed text-ink-2" style={{ ["--l" as string]: 1 }}>
            {profile.intro}
          </p>

          <div className="line-in mt-8 flex flex-wrap items-center gap-3" style={{ ["--l" as string]: 2 }}>
            <Link href="/projects" className={`group ${button("primary")}`}>
              Explore my projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/#contact" className={button("secondary")}>
              Contact me
            </Link>
            {profile.resume.enabled && (
              <a href={profile.resume.href} download className={button("secondary")}>
                <Download className="h-4 w-4" /> Resume (PDF)
              </a>
            )}
            <span className="flex items-center gap-1">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub profile (opens in a new tab)">
                <GitHubMark className="h-5 w-5" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn profile (opens in a new tab)">
                <LinkedInMark className="h-5 w-5" />
              </a>
            </span>
          </div>

          <dl className="line-in mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3 border-t border-line pt-5 text-sm" style={{ ["--l" as string]: 3 }}>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">Degree</dt>
              <dd className="mt-1 text-ink">Software Engineering · MedTech · {graduation}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">Based in</dt>
              <dd className="mt-1 text-ink">
                {profile.location.split(",")[0]} · {profile.timezone} · relocation or remote
              </dd>
            </div>
          </dl>
        </div>

        {/* "Terminal" with verified results; every line links to its case study. */}
        <aside aria-labelledby="results-title" className="line-in" style={{ ["--l" as string]: 1 }}>
          <div className="overflow-hidden rounded-2xl border border-[#2a2f36] bg-[#0f1216] text-[#e6e6e3] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.55)] transition-transform duration-500 hover:-translate-y-1">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
              <p id="results-title" className="ml-2 font-mono text-[0.72rem] text-white/55">
                ~/achref — selected results
              </p>
            </div>
            <div className="px-4 pb-4 pt-3 font-mono text-[0.8rem] leading-relaxed">
              <p className="line-in text-white/60" style={{ ["--l" as string]: 1 }}>
                <span className="text-[#4fd1ae]">$</span> portfolio --highlights --verified
              </p>
              <ul className="mt-2 space-y-1">
                {highlights.map(({ project, metric }, i) => (
                  <li key={project.slug} className="line-in" style={{ ["--l" as string]: i + 2 }}>
                    <Link
                      href={projectHref(project)}
                      className="group -mx-2 flex items-start justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                    >
                      <span className="min-w-0">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[#4fd1ae]">✓</span>
                          <span className="text-[1.35rem] font-medium tracking-tight text-white">{metric.value}</span>
                        </span>
                        <span className="mt-0.5 block pl-5 font-sans text-[0.82rem] leading-snug text-white/70">{metric.label}</span>
                        <span className="mt-1 block pl-5 text-[0.7rem] uppercase tracking-[0.12em] text-[#4fd1ae]/90">
                          {project.shortTitle ?? project.title}
                        </span>
                      </span>
                      <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="line-in mt-3 border-t border-white/10 pt-3 text-white/60" style={{ ["--l" as string]: highlights.length + 2 }}>
                <span className="text-[#4fd1ae]">$</span> open-to --roles
              </p>
              <p className="line-in mt-1 font-sans text-[0.85rem] text-white/85" style={{ ["--l" as string]: highlights.length + 3 }}>
                {profile.targetRoles.join(" · ")}
              </p>
              <p className="line-in caret mt-3 text-[#4fd1ae]" style={{ ["--l" as string]: highlights.length + 4 }}>
                $
              </p>
            </div>
          </div>
        </aside>
      </Container>

      <TechMarquee />
    </section>
  );
}

/** Slow, pausable strip of every skill from skills.ts. Decorative copy is hidden from screen readers. */
function TechMarquee() {
  const skills = skillGroups.flatMap((g) => g.skills);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {skills.map((s) => (
        <li key={s} className="flex items-center gap-10 whitespace-nowrap font-mono text-[0.8rem] uppercase tracking-[0.12em] text-ink-3">
          {s}
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line-strong" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative border-y border-line bg-surface/40 py-4">
      <p className="sr-only">Technologies I work with:</p>
      <div className="marquee overflow-hidden">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
