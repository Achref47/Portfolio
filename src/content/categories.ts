import type { CategoryId, ProjectType } from "./types";

/**
 * Filter categories for /projects, in display order. A category with no
 * projects is hidden automatically.
 */
export const categories: { id: CategoryId; label: string; short: string }[] = [
  { id: "software", label: "Software Engineering & Full-Stack", short: "Full-Stack" },
  { id: "ai-ml", label: "AI & Machine Learning", short: "AI / ML" },
  { id: "data", label: "Data Science & Analytics", short: "Data" },
  { id: "mobile", label: "Mobile Development", short: "Mobile" },
  { id: "iot", label: "IoT & Embedded", short: "IoT" },
];

/** Labels for the kind of work. To add one, also add its id to `ProjectType` in types.ts. */
export const projectTypes: Record<ProjectType, string> = {
  industry: "Industry capstone",
  professional: "Professional work",
  internship: "Internship",
  independent: "Independent project",
  assessment: "Technical assessment",
  academic: "Academic project",
  coursework: "Coursework",
};
