import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import { profile } from "@/content/profile";
import { getHighlights, projectHref } from "@/lib/content";
import { Avatar } from "./avatar";
import { HeroRotator } from "./hero-rotator";
import { Download, GitHubMark, LinkedInMark } from "./icons";
import { ArrowLabel, button, Container } from "./ui";

const d = (n: number) => ({ ["--d" as string]: n }) as CSSProperties;

/** Splits text into words wrapped for the .word-reveal animation. */
function RevealWords({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="word-reveal">
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 && " "}
          <span>
            <span style={{ ["--w" as string]: i + offset } as CSSProperties}>{word}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

const iconLink =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink-2 hover:border-ink hover:text-ink";

/**
 * Opening screen: a personal introduction set in one wide typeface, the
 * portrait inside the greeting, then three verified results that each lead to
 * the case study they come from.
 */
export function Hero() {
  const highlights = getHighlights();
  const rotation = profile.headlineRotation;
  const [city, ...country] = profile.location.split(",");

  return (
    <section aria-label="Introduction">
      <Container className="pb-14 pt-8 sm:pt-12 lg:pb-20 lg:pt-14">
        <div className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.875rem] text-ink-2" style={d(0)}>
          <p>
            Software engineer — {city}
            <span className="hidden sm:inline">,{country.join(",")}</span>
          </p>
          <p className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {profile.status}
          </p>
        </div>

        <h1 className="mt-10 font-display text-ink sm:mt-12">
          <span className="rise flex items-center gap-[0.35em] text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-none text-ink-2" style={d(1)}>
            Hello, I&apos;m
            {profile.photo && <Avatar size="1.45em" decorative preload className="ring-1 ring-line-strong" />}
          </span>
          <span className="mt-3 block text-[clamp(3.1rem,8.6vw,7.75rem)] font-bold leading-[0.92] sm:mt-4">
            <RevealWords text={profile.name} offset={1} />
          </span>
        </h1>

        <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:mt-12 lg:grid-cols-12 lg:gap-8">
          <p className="rise font-wide text-[clamp(1.4rem,2.5vw,2.05rem)] leading-[1.18] text-ink lg:col-span-7" style={d(4)}>
            <span className="sr-only">{profile.headline}</span>
            <span aria-hidden="true">
              {rotation.lead}{" "}
              <span className="font-semibold">
                <HeroRotator words={rotation.focus} />
              </span>
              <span className="mt-1 block font-light text-ink-3">{rotation.tail}</span>
            </span>
          </p>

          <div className="rise lg:col-span-5" style={d(5)}>
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-2">{profile.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/#work" data-magnetic className={button("primary")}>
                <ArrowLabel>See my work</ArrowLabel>
              </Link>
              <Link href="/#contact" data-magnetic className={button("secondary")}>
                Get in touch
              </Link>
              {profile.resume.enabled && (
                <a href={profile.resume.href} download data-magnetic className={button("secondary")}>
                  <Download className="h-4 w-4" /> Resume (PDF)
                </a>
              )}
              <span className="flex items-center gap-2">
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" data-magnetic className={iconLink} aria-label="GitHub profile (opens in a new tab)">
                  <GitHubMark className="h-[18px] w-[18px]" />
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" data-magnetic className={iconLink} aria-label="LinkedIn profile (opens in a new tab)">
                  <LinkedInMark className="h-[18px] w-[18px]" />
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Verified results — each number links to the case study it comes from. */}
        <section aria-labelledby="results-title" className="rise mt-14 sm:mt-16" style={d(6)}>
          <h2 id="results-title" className="text-[0.8125rem] font-medium text-ink-3">
            A few verified results
          </h2>
          <ul className="mt-4 grid border-t border-line sm:grid-cols-3">
            {highlights.map(({ project, metric }, i) => (
              <li key={project.slug} className={`border-b border-line sm:border-b-0 ${i > 0 ? "sm:border-l sm:pl-6 lg:pl-8" : ""} ${i < highlights.length - 1 ? "sm:pr-6 lg:pr-8" : ""}`}>
                <Link href={projectHref(project)} className="group flex h-full flex-col py-6">
                  <span className="font-display text-[clamp(2.2rem,3.6vw,3.1rem)] font-semibold leading-none text-ink transition-colors duration-300 group-hover:text-accent">
                    {metric.value}
                  </span>
                  <span className="mt-3 text-[0.9375rem] leading-snug text-ink-2">{metric.label}</span>
                  {metric.context && <span className="mt-1.5 text-[0.8125rem] leading-snug text-ink-3">{metric.context}</span>}
                  <ArrowLabel className="mt-auto pt-5 text-[0.875rem] font-medium text-ink">{project.shortTitle ?? project.title}</ArrowLabel>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <RoleBand />
    </section>
  );
}

/**
 * A slow band of very large type naming what I build (from
 * profile.headlineRotation). Decorative; the same words are in the headline.
 */
function RoleBand() {
  const words = profile.headlineRotation.focus.map((w) => w.replace(/\.$/, ""));
  const row = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <li key={w} className="flex items-center whitespace-nowrap">
          <span
            className={`font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-none ${
              i % 2 === 1 ? "text-transparent [-webkit-text-stroke:1.25px_var(--ink)]" : "text-ink"
            }`}
          >
            {w}
          </span>
          <span aria-hidden="true" className="mx-[0.45em] text-[clamp(2rem,4.5vw,4rem)] leading-none text-accent">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line py-6 sm:py-8" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

