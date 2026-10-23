/**
 * Site-wide settings that are not about a single project.
 */
export const site = {
  title: "Achref Elarbi — Software Engineer",
  description:
    "Portfolio of Achref Elarbi, a software engineer building full-stack applications, machine-learning systems and data products. Case studies with source code, live demos and verified results.",

  /** Header and footer navigation. `href` can be a page or a homepage section (/#id). */
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/#experience", label: "Experience" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ],

  /**
   * Homepage "Selected work", in display order. Use project slugs from
   * projects.ts. The first one is shown large. Four to six works best.
   */
  featured: [
    "aura-ecosystem",
    "fuel-planner-api",
    "spotter-weather-routing",
    "ecg-arrhythmia-analysis",
    "taskflow-ai",
    "privilege-travel-platform",
  ],

  /**
   * The three numbers in the hero's "Selected results" panel. Each points at a
   * metric of a project (index in its `metrics` array), so the number is
   * written only once, in projects.ts.
   */
  highlights: [
    { project: "aura-ecosystem", metric: 1 },
    { project: "fuel-planner-api", metric: 0 },
    { project: "ecg-arrhythmia-analysis", metric: 0 },
  ],
};
