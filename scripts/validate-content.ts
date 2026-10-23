/**
 * Content checks for src/content. Runs automatically before `npm run build`
 * (and therefore on every Vercel deployment) and on demand with
 * `npm run validate`. It exits with an error message instead of letting a
 * broken link, a missing image or a typo in a slug reach production.
 *
 * Runs with Node's built-in TypeScript support (Node 22.18+ / 24).
 */
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { categories } from "../src/content/categories.ts";
import { profile } from "../src/content/profile.ts";
import { projects } from "../src/content/projects.ts";
import { site } from "../src/content/site.ts";
import type { ImageMedia, Media, Project } from "../src/content/types.ts";

const errors: string[] = [];
const warnings: string[] = [];
const publicDir = path.join(process.cwd(), "public");

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER = /DESCRIBE WHAT|TODO|lorem ipsum|placeholder/i;
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const isVideoHost = (href: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(href);

function publicFile(src: string, where: string): boolean {
  if (!src.startsWith("/")) {
    errors.push(`${where}: "${src}" must start with "/" (a path inside public/)`);
    return false;
  }
  if (!existsSync(path.join(publicDir, src))) {
    errors.push(`${where}: file public${src} does not exist`);
    return false;
  }
  return true;
}

async function checkImage(img: ImageMedia, where: string) {
  if (!img.alt || img.alt.length < 10) errors.push(`${where}: image needs a descriptive alt text`);
  if (!publicFile(img.src, where)) return;
  const meta = await sharp(path.join(publicDir, img.src)).metadata();
  if (meta.width !== img.width || meta.height !== img.height) {
    errors.push(
      `${where}: ${img.src} is ${meta.width}x${meta.height} but the content says ${img.width}x${img.height}`,
    );
  }
}

async function checkMedia(media: Media, where: string) {
  if (media.type === "image") return checkImage(media, where);
  if (media.type === "youtube") {
    if (!YOUTUBE_ID.test(media.videoId)) errors.push(`${where}: "${media.videoId}" is not a YouTube video id`);
    publicFile(media.poster, `${where} (poster)`);
    return;
  }
  publicFile(media.src, where);
  if (media.poster) publicFile(media.poster, `${where} (poster)`);
}

function textFields(p: Project): string[] {
  const d = p.details;
  return [
    p.title,
    p.tagline,
    p.summary,
    ...(d
      ? [
          ...d.overview,
          ...(d.problem ?? []),
          ...(d.solution ?? []),
          ...(d.contribution ?? []),
          ...(d.decisions ?? []),
          ...(d.results ?? []),
          ...(d.limitations ?? []),
        ]
      : []),
  ];
}

async function main() {
  const categoryIds = new Set(categories.map((c) => c.id));
  const slugs = new Set<string>();

  for (const p of projects) {
    const where = `project "${p.slug}"`;
    if (!SLUG.test(p.slug)) errors.push(`${where}: slug must be lowercase-words-with-dashes`);
    if (slugs.has(p.slug)) errors.push(`${where}: duplicate slug`);
    slugs.add(p.slug);

    for (const field of ["title", "tagline", "summary", "year", "context", "role"] as const) {
      if (!p[field]?.trim()) errors.push(`${where}: "${field}" is empty`);
    }
    if (p.categories.length === 0) errors.push(`${where}: needs at least one category`);
    for (const c of p.categories) if (!categoryIds.has(c)) errors.push(`${where}: unknown category "${c}"`);
    if (p.tech.length === 0) warnings.push(`${where}: no technologies listed`);

    for (const r of p.resources) {
      if (!/^https:\/\//.test(r.href)) errors.push(`${where}: link "${r.href}" must start with https://`);
      if (r.kind === "live" && isVideoHost(r.href)) {
        errors.push(`${where}: "${r.label}" points to a video — use kind "video", not "live"`);
      }
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

    for (const text of textFields(p)) {
      if (PLACEHOLDER.test(text)) errors.push(`${where}: placeholder text found: "${text.slice(0, 60)}…"`);
    }
  }

  const featured = new Set<string>();
  for (const slug of site.featured) {
    if (!slugs.has(slug)) errors.push(`site.featured: "${slug}" is not a project slug`);
    if (featured.has(slug)) errors.push(`site.featured: "${slug}" is listed twice`);
    featured.add(slug);
  }
  if (site.featured.length < 3 || site.featured.length > 7) {
    warnings.push(`site.featured has ${site.featured.length} projects; 4–6 reads best`);
  }

  if (profile.resume.enabled) publicFile(profile.resume.href, "profile.resume");

  for (const w of warnings) console.warn(`warning  ${w}`);
  if (errors.length) {
    for (const e of errors) console.error(`error    ${e}`);
    console.error(`\nContent check failed with ${errors.length} error(s).`);
    process.exit(1);
  }
  console.log(`Content OK: ${projects.length} projects, ${site.featured.length} featured.`);
}

await main();
