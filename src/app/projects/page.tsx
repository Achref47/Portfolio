import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ProjectCatalog, type CatalogItem } from "@/components/project-catalog";
import { resourceKinds } from "@/components/resources";
import { Container, Kicker } from "@/components/ui";
import { allProjects, evidenceKinds, sortYear, typeLabel, usedCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every verified project by Achref Elarbi — full-stack applications, machine learning, data science, mobile and IoT — with source code, live demos, videos and documentation where available.",
  alternates: { canonical: "/projects" },
};

const kindHelp: Record<string, string> = {
  source: "a repository you can open",
  live: "a running app or API",
  video: "a recorded demonstration",
  docs: "reports and write-ups",
};

export default function ProjectsPage() {
  const items: CatalogItem[] = allProjects.map((project, order) => ({
    slug: project.slug,
    categories: project.categories,
    evidence: evidenceKinds(project),
    order,
    year: sortYear(project),
    searchText: [project.title, project.tagline, project.summary, project.context, typeLabel(project), project.award ?? "", ...project.tech]
      .join(" ")
      .toLowerCase(),
    card: <ProjectCard project={project} headingLevel="h2" />,
  }));

  return (
    <Container className="pb-8 pt-14 sm:pt-20">
      <Kicker>Project catalogue</Kicker>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">
        Everything I can show you, and how
      </h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <p className="max-w-2xl text-[1.04rem] leading-relaxed text-ink-2">
          {allProjects.length} projects, from an industry capstone and an internship to academic research, technical assessments and coursework.
          Every card says what is publicly available — and what is not.
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-2">
          {Object.entries(resourceKinds).map(([kind, { label, Icon, tone }]) => (
            <li key={kind} className="flex items-start gap-2">
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} />
              <span>
                <span className="font-medium text-ink">{label}</span>
                <span className="block text-xs text-ink-3">{kindHelp[kind]}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <ProjectCatalog items={items} categories={usedCategories()} />
      </div>
    </Container>
  );
}
