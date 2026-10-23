import type { CategoryId } from "./types";

/**
 * Filter categories for /projects, in display order. A category with no
 * projects is hidden automatically, so it is safe to keep "iot" here.
 */
export const categories: { id: CategoryId; label: string; short: string }[] = [
  { id: "software", label: "Software Engineering & Full-Stack", short: "Full-Stack" },
  { id: "ai-ml", label: "AI & Machine Learning", short: "AI / ML" },
  { id: "data", label: "Data Science & Analytics", short: "Data" },
  { id: "mobile", label: "Mobile Development", short: "Mobile" },
  { id: "iot", label: "IoT & Other Engineering", short: "IoT" },
];
