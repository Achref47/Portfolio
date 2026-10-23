import Link from "next/link";
import { skillGroups, stackIntro } from "@/content/skills";
import { projectsUsing } from "@/lib/content";
import { Layers } from "./icons";
import { Container, SectionHeading } from "./ui";

/**
 * Skills drawn as the layers of a system. Every skill used by a project links
 * to the catalogue filtered to those projects, with a count — so the claim
 * "I work across the stack" is backed by the catalogue, and stays in sync with it.
 */
export function StackSection({ index }: { index: string }) {
  const layers = [...skillGroups];
  return (
    <section aria-labelledby="skills" className="pb-28">
      <Container>
        <SectionHeading
          id="skills"
          index={index}
          kicker="Full-stack, end to end"
          title="The stack, layer by layer"
          intro="Each layer lists the tools I have shipped with. The number shows how many projects in this portfolio use it — select one to see them."
        />
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <Layers className="h-6 w-6 text-accent" />
              <p className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink">{stackIntro.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{stackIntro.body}</p>
              <p className="mt-5 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-3">
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.65rem] text-accent-ink">3</span>
                = projects using it
              </p>
            </div>
          </div>

          <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[1.15rem] before:top-6 before:w-px before:bg-line-strong">
            {layers.map((group, i) => (
              <li
                key={group.title}
                data-reveal
                data-spotlight
                style={{ ["--reveal-i" as string]: i % 3 }}
                className="group relative rounded-2xl border border-line bg-surface p-5 pl-14 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-5 grid h-[1.4rem] w-[1.4rem] place-items-center rounded-full border border-line-strong bg-bg font-mono text-[0.62rem] text-ink-3 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                <p className="mt-0.5 text-sm text-ink-3">{group.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const { projects, query } = projectsUsing(skill);
                    if (projects.length === 0) {
                      return (
                        <li key={skill} className="rounded-lg border border-line bg-bg/60 px-2.5 py-1 text-sm text-ink-2">
                          {skill}
                        </li>
                      );
                    }
                    return (
                      <li key={skill}>
                        <Link
                          href={`/projects?q=${encodeURIComponent(query)}`}
                          title={projects.map((p) => p.shortTitle ?? p.title).join(" · ")}
                          className="group/chip inline-flex items-center gap-2 rounded-lg border border-line bg-bg/60 py-1 pl-2.5 pr-1.5 text-sm text-ink transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft"
                        >
                          {skill}
                          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-surface-2 px-1 font-mono text-[0.65rem] text-ink-2 transition-colors group-hover/chip:bg-accent group-hover/chip:text-accent-ink">
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
        </div>
      </Container>
    </section>
  );
}
