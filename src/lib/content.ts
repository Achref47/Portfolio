import { categories } from "@/content/categories";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { CategoryId, Project } from "@/content/types";

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
