import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ProjectCatalog, type CatalogItem } from "@/components/project-catalog";
import { resourceKinds } from "@/components/resources";
import { Container, Kicker } from "@/components/ui";
import { allProjects, usedCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every verified project by Achref Elarbi — full-stack applications, machine learning, data science and mobile — with source code, live demos, videos and documentation where available.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const items: CatalogItem[] = allProjects.map((project) => ({
    slug: project.slug,
    categories: project.categories,
    searchText: [project.title, project.tagline, project.summary, project.context, ...project.tech]
      .join(" ")
      .toLowerCase(),
    card: <ProjectCard project={project} headingLevel="h2" />,
  }));

  return (
    <Container className="pb-8 pt-14 sm:pt-20">
      <Kicker>Project catalogue</Kicker>
      <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.03] tracking-tight text-ink sm:text-6xl">
        Everything I can show you, and how
      </h1>
      <p className="mt-6 max-w-2xl text-[1.04rem] leading-relaxed text-ink-2">
        {allProjects.length} projects, from an industry capstone to academic research and technical assessments. Every card
        states what is publicly available:
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
        {Object.entries(resourceKinds).map(([kind, { label, Icon, tone }]) => (
          <li key={kind} className="inline-flex items-center gap-2">
            <Icon className={`h-4 w-4 ${tone}`} />
            <span>
              <span className="font-medium text-ink">{label}</span>
              {kind === "source" && " — a repository you can open"}
              {kind === "live" && " — a running app or API"}
              {kind === "video" && " — a recorded demonstration"}
              {kind === "docs" && " — reports and write-ups"}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-12 border-t border-line pt-8">
        <ProjectCatalog items={items} categories={usedCategories()} />
      </div>
    </Container>
  );
}
