import Link from "next/link";
import type { CSSProperties } from "react";
import { skillGroups, stackIntro } from "@/content/skills";
import { projectsUsing } from "@/lib/content";
import { Container, Light, SectionHeading } from "./ui";

/**
 * Skills as the layers of a system, one row per layer. Every skill used by a
 * project links to the catalogue filtered to those projects, with a count —
 * so "I work across the stack" is backed by the catalogue and stays in sync.
 */
export function StackSection({ index }: { index: string }) {
  return (
    <section aria-labelledby="skills" className="pb-28">
      <Container>
        <SectionHeading
          id="skills"
          index={index}
          kicker="Skills, layer by layer"
          title={
            <>
              {stackIntro.title.replace(/\.$/, "")}
              <Light>.</Light>
            </>
          }
          intro={stackIntro.body}
        />
        <ol className="border-t border-line">
          {skillGroups.map((group, i) => (
            <li
              key={group.title}
              data-reveal
              style={{ ["--reveal-i" as string]: i % 3 } as CSSProperties}
              className="group grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="font-wide text-[1.25rem] font-semibold text-ink">
                  <span className="mr-3 text-[0.875rem] tabular-nums text-ink-3 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3 md:pl-[2.1rem]">{group.blurb}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2 md:col-span-8">
                {group.skills.map((skill) => {
                  const { projects, query } = projectsUsing(skill);
                  if (projects.length === 0) {
                    return (
                      <li key={skill} className="rounded-full border border-line px-3.5 py-1.5 text-[0.9375rem] text-ink-2">
                        {skill}
                      </li>
                    );
                  }
                  return (
                    <li key={skill}>
                      <Link
                        href={`/projects?q=${encodeURIComponent(query)}`}
                        title={projects.map((p) => p.shortTitle ?? p.title).join(" · ")}
                        className="group/chip inline-flex items-center gap-2 rounded-full border border-line-strong py-1.5 pl-3.5 pr-2 text-[0.9375rem] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-bg"
                      >
                        {skill}
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-surface-2 px-1 text-[0.6875rem] font-semibold tabular-nums text-ink-2 transition-colors group-hover/chip:bg-accent group-hover/chip:text-accent-ink">
                          {projects.length}
                          <span className="sr-only"> {projects.length === 1 ? "project" : "projects"}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[0.8125rem] text-ink-3">The number on a skill is how many projects in this portfolio use it — select one to see them.</p>
      </Container>
    </section>
  );
}
