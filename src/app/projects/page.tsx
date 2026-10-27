import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ProjectCatalog, type CatalogItem } from "@/components/project-catalog";
import { resourceKinds } from "@/components/resources";
import { Container, Kicker, Light } from "@/components/ui";
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
    <Container className="pb-8 pt-12 sm:pt-20">
      <Kicker>All projects · {allProjects.length}</Kicker>
      <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-bold leading-[0.95] text-ink">
        Everything I can show you<Light>, and how.</Light>
      </h1>
      <div className="mt-8 grid gap-8 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
        <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-6">
          {allProjects.length} projects, from an industry capstone and professional work to academic research, technical assessments and coursework.
          Every card says what is publicly available — and what is not.
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[0.9375rem] text-ink-2 lg:col-span-6">
          {Object.entries(resourceKinds).map(([kind, { label, Icon, tone }]) => (
            <li key={kind} className="flex items-start gap-2">
              <Icon className={`mt-1 h-4 w-4 shrink-0 ${tone}`} />
              <span>
                <span className="font-medium text-ink">{label}</span>
                <span className="block text-[0.8125rem] text-ink-3">{kindHelp[kind]}</span>
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
