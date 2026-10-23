/**
 * Shared types for everything in src/content.
 *
 * The content files only use `import type` from here, so they stay plain
 * data that both Next.js and `scripts/validate-content.ts` can load.
 */

/** Project categories used by the filters on /projects. Labels live in categories.ts. */
export type CategoryId = "software" | "ai-ml" | "data" | "mobile" | "iot";

/**
 * What a resource link points to. Use the kind that matches reality:
 * - "source": a repository the visitor can actually open
 * - "live":   a running application or API (never a video)
 * - "video":  a recorded demonstration
 * - "docs":   documentation, a report or a write-up
 */
export type ResourceKind = "source" | "live" | "video" | "docs";

export interface Resource {
  kind: ResourceKind;
  /** Button text, e.g. "Source code" or "Live app". */
  label: string;
  href: string;
  /** Short caveat shown next to the link, e.g. "free tier, may take a minute to wake". */
  note?: string;
}

/** A screenshot or figure stored in /public. Get width/height from `npm run image`. */
export interface ImageMedia {
  type: "image";
  src: string;
  width: number;
  height: number;
  /** Describe what the image shows, for screen readers. */
  alt: string;
  caption?: string;
}

/** A YouTube video, shown as a click-to-play thumbnail (nothing loads from YouTube until clicked). */
export interface YouTubeMedia {
  type: "youtube";
  /** The id after `watch?v=` in the YouTube URL. */
  videoId: string;
  title: string;
  /** Local thumbnail in /public shown before playback. */
  poster: string;
  caption?: string;
}

/** A video file stored in /public (keep it small: under ~25 MB, MP4/H.264). */
export interface FileVideoMedia {
  type: "video";
  src: string;
  title: string;
  poster?: string;
  caption?: string;
}

export type Media = ImageMedia | YouTubeMedia | FileVideoMedia;

/** A verified, sourced result. Only add numbers you can point to in a report, test run or notebook. */
export interface Metric {
  value: string;
  label: string;
}

/** One step of a pipeline/architecture diagram, rendered left-to-right. */
export interface FlowStep {
  title: string;
  detail: string;
}

/** A product or service inside a larger project (used by AURA's three products). */
export interface ProjectComponent {
  name: string;
  role: string;
  summary: string;
  points: string[];
  tech: string[];
  /** e.g. "Private repository — code not public". */
  access?: string;
  media?: ImageMedia[];
}

/**
 * Case-study content. If a project has `details`, it gets its own page at
 * /projects/<slug>. Every field is optional except `overview`; sections without
 * content are simply not rendered.
 */
export interface ProjectDetails {
  overview: string[];
  problem?: string[];
  solution?: string[];
  contribution?: string[];
  architecture?: { intro?: string; steps: FlowStep[] };
  components?: ProjectComponent[];
  decisions?: string[];
  results?: string[];
  limitations?: string[];
}

export interface Project {
  /** URL id: lowercase letters, numbers and dashes. Changing it changes the page URL. */
  slug: string;
  title: string;
  /** One sentence shown under the title. */
  tagline: string;
  /** Two or three sentences for cards and search. */
  summary: string;
  /** e.g. "2026" or "2024–2025". */
  year: string;
  /** Where the work happened, e.g. "Academic project" or "Internship · Company". */
  context: string;
  /** Your role, e.g. "Sole developer". Only state what is true. */
  role: string;
  /** Team composition if it was not solo work. */
  team?: string;
  /** Prizes or grades documented in the CV. */
  award?: string;
  categories: CategoryId[];
  tech: string[];
  /** Links the visitor can open. Leave empty if nothing is public. */
  resources: Resource[];
  /** Shown when some or all material is not public, e.g. "Source code is private". */
  availabilityNote?: string;
  /** Card image. Usually the first screenshot. */
  cover?: ImageMedia;
  media?: Media[];
  metrics?: Metric[];
  details?: ProjectDetails;
}
