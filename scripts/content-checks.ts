/**
 * The content rules, as a pure-ish function so they can be run by the CLI
 * (validate-content.ts) and by tests (content-checks.test.ts) with fixtures.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { CategoryId, ImageMedia, Media, Project, ProjectType, Recognition } from "../src/content/types.ts";

export interface ContentInput {
  projects: Project[];
  categories: { id: CategoryId }[];
  projectTypes: Record<ProjectType, string>;
  site: { featured: string[]; highlights: { project: string; metric: number }[]; nav: { href: string; label: string }[] };
  recognition: Recognition[];
  resume: { enabled: boolean; href: string };
  photo?: { src: string; width: number; height: number; alt: string } | null;
  /** Folder that "/..." media paths resolve to. */
  publicDir: string;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER = /DESCRIBE WHAT|TODO|TBD|lorem ipsum|placeholder|\?\?\?/i;
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const HOME_SECTIONS = ["work", "recognition", "experience", "skills", "about", "contact"];
const isVideoHost = (href: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(href);

export async function checkContent(input: ContentInput): Promise<{ errors: string[]; warnings: string[] }> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { projects, publicDir } = input;

  const publicFile = (src: string, where: string) => {
    if (!src.startsWith("/")) {
      errors.push(`${where}: "${src}" must start with "/" (a path inside public/)`);
      return false;
    }
    if (!existsSync(path.join(publicDir, src))) {
      errors.push(`${where}: file public${src} does not exist`);
      return false;
    }
    return true;
  };

  const checkImage = async (img: ImageMedia, where: string) => {
    if (!img.alt || img.alt.length < 10) errors.push(`${where}: image needs a descriptive alt text`);
    if (PLACEHOLDER.test(img.alt)) errors.push(`${where}: alt text is still a placeholder`);
    if (!publicFile(img.src, where)) return;
    const meta = await sharp(path.join(publicDir, img.src)).metadata();
    if (meta.width !== img.width || meta.height !== img.height) {
      errors.push(`${where}: ${img.src} is ${meta.width}x${meta.height} but the content says ${img.width}x${img.height}`);
    }
  };

  const checkMedia = async (media: Media, where: string) => {
    if (media.type === "image") return checkImage(media, where);
    if (media.type === "youtube") {
      if (!YOUTUBE_ID.test(media.videoId)) errors.push(`${where}: "${media.videoId}" is not a YouTube video id`);
      publicFile(media.poster, `${where} (poster)`);
      return;
    }
    publicFile(media.src, where);
    if (media.poster) publicFile(media.poster, `${where} (poster)`);
  };

  const categoryIds = new Set(input.categories.map((c) => c.id));
  const slugs = new Set<string>();

  for (const p of projects) {
    const where = `project "${p.slug}"`;
    if (!SLUG.test(p.slug)) errors.push(`${where}: slug must be lowercase-words-with-dashes`);
    if (slugs.has(p.slug)) errors.push(`${where}: duplicate slug`);
    slugs.add(p.slug);

    for (const field of ["title", "tagline", "summary", "year", "context", "role"] as const) {
      if (!p[field]?.trim()) errors.push(`${where}: "${field}" is empty`);
    }
    if (!/\d{4}/.test(p.year ?? "")) errors.push(`${where}: "year" needs a four-digit year`);
    if (!(p.type in input.projectTypes)) errors.push(`${where}: unknown type "${p.type}"`);
    if (p.categories.length === 0) errors.push(`${where}: needs at least one category`);
    for (const c of p.categories) if (!categoryIds.has(c)) errors.push(`${where}: unknown category "${c}"`);
    if (p.tech.length === 0) warnings.push(`${where}: no technologies listed`);

    for (const r of p.resources) {
      if (!/^https:\/\//.test(r.href)) errors.push(`${where}: link "${r.href}" must start with https://`);
      if (r.kind === "live" && isVideoHost(r.href)) errors.push(`${where}: "${r.label}" points to a video — use kind "video", not "live"`);
      if (r.kind === "source" && !/github\.com|gitlab\.com|bitbucket\.org/.test(r.href)) {
        warnings.push(`${where}: source link "${r.href}" is not a known code host`);
      }
    }
    if (p.resources.length === 0 && !p.availabilityNote) {
      errors.push(`${where}: no public links — add an "availabilityNote" explaining why`);
    }

    if (p.cover) await checkImage(p.cover, `${where} cover`);
    for (const [i, m] of (p.media ?? []).entries()) await checkMedia(m, `${where} media[${i}]`);
    for (const comp of p.details?.components ?? []) {
      for (const [i, m] of (comp.media ?? []).entries()) await checkImage(m, `${where} ${comp.name} media[${i}]`);
    }

    const d = p.details;
    if (d) {
      if (d.overview.length === 0) errors.push(`${where}: details.overview needs at least one paragraph`);
      if (d.glance && !(d.glance.problem && d.glance.built && d.glance.outcome)) {
        errors.push(`${where}: details.glance needs problem, built and outcome`);
      }
    }
    const texts = [
      p.title,
      p.tagline,
      p.summary,
      p.role,
      p.award ?? "",
      p.availabilityNote ?? "",
      ...(p.metrics ?? []).flatMap((m) => [m.value, m.label, m.context ?? ""]),
      ...(d
        ? [
            ...Object.values(d.glance ?? {}),
            ...d.overview,
            ...(d.problem ?? []),
            ...(d.objectives ?? []),
            ...(d.solution ?? []),
            ...(d.contribution ?? []),
            ...(d.decisions ?? []),
            ...(d.challenges ?? []),
            ...(d.results ?? []),
            ...(d.limitations ?? []),
            ...(d.learnings ?? []),
          ]
        : []),
    ];
    for (const text of texts) {
      if (PLACEHOLDER.test(text)) errors.push(`${where}: placeholder text found: "${text.slice(0, 60)}…"`);
    }
  }

  for (const p of projects) {
    for (const r of p.related ?? []) {
      if (!slugs.has(r)) errors.push(`project "${p.slug}": related "${r}" is not a project slug`);
      if (r === p.slug) errors.push(`project "${p.slug}": cannot be related to itself`);
    }
  }

  const featured = new Set<string>();
  for (const slug of input.site.featured) {
    if (!slugs.has(slug)) errors.push(`site.featured: "${slug}" is not a project slug`);
    if (featured.has(slug)) errors.push(`site.featured: "${slug}" is listed twice`);
    featured.add(slug);
  }
  if (input.site.featured.length < 3 || input.site.featured.length > 7) {
    warnings.push(`site.featured has ${input.site.featured.length} projects; 4–6 reads best`);
  }

  for (const h of input.site.highlights) {
    const project = projects.find((p) => p.slug === h.project);
    if (!project) errors.push(`site.highlights: "${h.project}" is not a project slug`);
    else if (!project.metrics?.[h.metric]) errors.push(`site.highlights: "${h.project}" has no metric at index ${h.metric}`);
  }

  for (const item of input.site.nav) {
    const hash = item.href.split("#")[1];
    if (item.href.startsWith("/#") && !HOME_SECTIONS.includes(hash)) {
      errors.push(`site.nav: "${item.href}" does not match a homepage section (${HOME_SECTIONS.join(", ")})`);
    }
    if (!item.href.startsWith("/")) errors.push(`site.nav: "${item.href}" must be a site path`);
  }

  for (const r of input.recognition) {
    if (!r.title.trim() || !r.detail.trim()) errors.push(`recognition "${r.title}": title and detail are required`);
    if (r.project && !slugs.has(r.project)) errors.push(`recognition "${r.title}": project "${r.project}" is not a project slug`);
    if (r.image) await checkImage({ type: "image", ...r.image }, `recognition "${r.title}" image`);
  }

  if (input.resume.enabled) publicFile(input.resume.href, "profile.resume");
  if (input.photo) await checkImage({ type: "image", ...input.photo }, "profile.photo");

  return { errors, warnings };
}
