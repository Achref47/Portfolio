/**
 * Shared types for everything in src/content.
 *
 * The content files only use `import type` from here, so they stay plain
 * data that both Next.js and `scripts/validate-content.ts` can load.
 */

/** Project categories used by the filters on /projects. Labels live in categories.ts. */
export type CategoryId = "software" | "ai-ml" | "data" | "mobile" | "iot";

/** What kind of work it was. Labels live in categories.ts (`projectTypes`). */
export type ProjectType = "industry" | "internship" | "independent" | "assessment" | "academic" | "coursework";

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
  /**
   * How a cover fills its frame: "cover" crops, "contain" shows the whole image (use for charts).
   * Default: "cover" for landscape images, "contain" for portrait ones.
   */
  fit?: "cover" | "contain";
  /** Which part stays visible when the image is cropped (CSS object-position), e.g. "50% 40%". */
  position?: string;
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
  /** How it was measured, e.g. "held-out test set, 2,641 beats" or "pilot testing". Shown on case studies. */
  context?: string;
}

/** A short, verifiable code example (e.g. a real API request and an abridged real response). */
export interface CodeSample {
  title: string;
  language: string;
  code: string;
  caption?: string;
}

/** One step of a pipeline/architecture diagram, rendered left-to-right. */
export interface FlowStep {
  title: string;
  detail: string;
  /**
   * Optional evidence shown when the step is selected in the interactive
   * system view on the homepage: a real screenshot of what this step produces…
   */
  image?: ImageMedia;
  /** …or the index of one of the project's `metrics` that this step is responsible for. */
  metric?: number;
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
  /**
   * Three plain-language sentences shown at the top of the case study for
   * readers who will not scroll: the problem, what was built, the outcome.
   */
  glance?: { problem: string; built: string; outcome: string };
  overview: string[];
  problem?: string[];
  objectives?: string[];
  solution?: string[];
  contribution?: string[];
  architecture?: { intro?: string; steps: FlowStep[] };
  components?: ProjectComponent[];
  decisions?: string[];
  challenges?: string[];
  codeSample?: CodeSample;
  results?: string[];
  limitations?: string[];
  /** What you learned or would do differently. */
  learnings?: string[];
}

export interface Project {
  /** URL id: lowercase letters, numbers and dashes. Changing it changes the page URL. */
  slug: string;
  title: string;
  /** Optional short name for tight spaces (hero results, labels), e.g. "AURA". */
  shortTitle?: string;
  /** One sentence shown under the title. */
  tagline: string;
  /** Two or three sentences for cards and search. */
  summary: string;
  /** e.g. "2026" or "2024–2025". The last four-digit year is used for sorting. */
  year: string;
  /** Kind of work, used for labels and filtering. */
  type: ProjectType;
  /** Where the work happened, in words, e.g. "Academic project" or "Internship · Company". */
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
  /**
   * Slugs of related projects shown at the end of the case study. Optional:
   * without it, the three projects sharing the most categories and
   * technologies are picked automatically.
   */
  related?: string[];
}

/** An award or distinction shown in the homepage "Recognition" list. */
export interface Recognition {
  title: string;
  /** Who awarded it and the scope, e.g. "ESPRIT Bal des Projets · whole second-year cohort". */
  detail: string;
  /** Omit when the CV gives no date. */
  year?: string;
  /** Slug of the project it belongs to, if any. */
  project?: string;
  /** Optional evidence image in /public (certificate, award photo). Entries with an image are shown as large feature cards. */
  image?: { src: string; width: number; height: number; alt: string; position?: string };
}
