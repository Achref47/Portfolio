import { categories, projectTypes } from "@/content/categories";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { CategoryId, Metric, Project, ResourceKind } from "@/content/types";

/** Absolute site URL for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL once you have a custom domain. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const allProjects = projects;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects listed in site.featured, in that order. */
export function getFeaturedProjects(): Project[] {
  return site.featured.map((slug) => getProject(slug)).filter((p): p is Project => Boolean(p));
}

/** The hero's "Selected results": metrics picked in site.highlights. */
export function getHighlights(): { project: Project; metric: Metric }[] {
  return site.highlights.flatMap(({ project: slug, metric }) => {
    const project = getProject(slug);
    const m = project?.metrics?.[metric];
    return project && m ? [{ project, metric: m }] : [];
  });
}

export function hasDetailPage(project: Project): boolean {
  return Boolean(project.details);
}

export function projectHref(project: Project): string {
  return `/projects/${project.slug}`;
}

export function categoryLabel(id: CategoryId, variant: "label" | "short" = "short"): string {
  const category = categories.find((c) => c.id === id);
  return category ? category[variant] : id;
}

export function typeLabel(project: Project): string {
  return projectTypes[project.type];
}

/** Last four-digit year in `year` ("2024–2025" → 2025), for sorting. */
export function sortYear(project: Project): number {
  const years = project.year.match(/\d{4}/g);
  return years ? Number(years[years.length - 1]) : 0;
}

/** Kinds of public evidence a project has (live demo, video, source, docs). */
export function evidenceKinds(project: Project): ResourceKind[] {
  return [...new Set(project.resources.map((r) => r.kind))];
}

/** Categories that have at least one project, with counts, in display order. */
export function usedCategories() {
  return categories
    .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id)).length }))
    .filter((c) => c.count > 0);
}

/** Two-digit position of a project in the catalogue, e.g. "03". */
export function projectNumber(project: Project): string {
  return String(projects.indexOf(project) + 1).padStart(2, "0");
}

/** "React Native (Expo)" → ["react native"]; "NumPy / SciPy" → ["numpy", "scipy"]; "JWT auth" → ["jwt"]. */
function skillKeys(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .split("/")
    .map((s) => s.replace(/\bauth\b/, "").trim())
    .filter(Boolean);
}

/**
 * Projects whose technology list includes a skill from skills.ts, plus the
 * search term to use for /projects?q=… . Matching ignores case and anything
 * in parentheses, so "Ollama (Qwen)" matches "Ollama (Qwen)" and "PyTorch (FT-Transformer)" matches "PyTorch".
 */
export function projectsUsing(skill: string): { projects: Project[]; query: string } {
  const keys = skillKeys(skill);
  const matches = projects.filter((p) => p.tech.some((t) => skillKeys(t).some((k) => keys.includes(k))));
  return { projects: matches, query: keys[0] ?? skill };
}

/**
 * Related projects for the end of a case study: `project.related` if set,
 * otherwise the projects sharing the most categories and technologies.
 */
export function relatedProjects(project: Project, count = 3): Project[] {
  if (project.related?.length) {
    return project.related.map(getProject).filter((p): p is Project => Boolean(p)).slice(0, count);
  }
  const tech = new Set(project.tech.map((t) => t.toLowerCase()));
  return projects
    .filter((p) => p !== project)
    .map((p) => ({
      p,
      score:
        p.categories.filter((c) => project.categories.includes(c)).length * 2 +
        p.tech.filter((t) => tech.has(t.toLowerCase())).length +
        (p.details ? 0.5 : 0),
    }))
    .sort((a, b) => b.score - a.score || projects.indexOf(a.p) - projects.indexOf(b.p))
    .slice(0, count)
    .map(({ p }) => p);
}
