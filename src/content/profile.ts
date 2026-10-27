/**
 * Who you are: hero text, about section, contact links and resume.
 * Source of truth: the CV (Achref Elarbi Resume, October 2026).
 */
export const profile = {
  name: "Achref Elarbi",
  role: "Software Engineer · Full-Stack, Machine Learning & Data",
  /** One line under the name in the hero. */
  headline: "Software engineering graduate building full-stack products, machine-learning systems and data tools — and checking that they work.",
  /**
   * Animated version of the headline: `lead` + one rotating `focus` phrase,
   * then `tail` on its own line. Screen readers and search engines get
   * `headline` above instead.
   */
  headlineRotation: {
    lead: "I build, end to end,",
    focus: ["full-stack products.", "machine-learning systems.", "LLM applications.", "data tools."],
    tail: "And I check that they work.",
  },
  /**
   * Profile photo (square; shown as a circle). Use a square image of at least
   * ~300 px — it is displayed small (hero avatar, about byline, link preview).
   * Set to null to hide it everywhere.
   */
  photo: {
    src: "/profile/achref-elarbi.webp",
    width: 468,
    height: 468,
    alt: "Portrait of Achref Elarbi",
  } as { src: string; width: number; height: number; alt: string } | null,
  /** Short status shown at the top of the hero. */
  status: "Open to work · 2026 graduate",
  /** Two or three sentences under the headline. */
  intro:
    "I finished my engineering degree at MedTech in Tunis in 2026. For my capstone I was the sole engineer of AURA, an industry project with FAIRBANK in Lisbon: a property-valuation platform, a local LLM assistant and an executive dashboard built on 1.25M property records.",
  location: "Tunis, Tunisia",
  timezone: "UTC+1",
  availability: "Open to relocation and remote work",
  targetRoles: ["Junior Software Engineer", "Full-Stack Engineer", "Data Scientist", "AI / ML Engineer"],

  email: "achreff.elarbi@gmail.com",
  links: {
    github: "https://github.com/Achref47",
    linkedin: "https://www.linkedin.com/in/achref-elarbi-9a44b9298/",
    youtube: "https://www.youtube.com/@AchrefElarbi-d7i",
  },

  /**
   * Resume download. To enable it:
   * 1. copy the PDF to public/Achref-Elarbi-Resume.pdf
   * 2. set `enabled: true`
   * The content check (`npm run validate`) fails if enabled without the file.
   */
  resume: {
    enabled: false,
    href: "/Achref-Elarbi-Resume.pdf",
  },

  about: [
    "I like owning a problem end to end: understanding the data, choosing and validating the model, designing the API, and shipping an interface that explains its answers honestly.",
    "At FAIRBANK, a Portuguese PropTech company, I was the only engineer on AURA for its Rezerva platform — the data pipeline, the valuation models, the FastAPI services, a multi-agent LLM assistant and the React/TypeScript interfaces. Before that I was the only full-stack developer in a three-person team at Privilege Travel, where I also ran Scrum for four sprints and mentored two teammates.",
    "I care about verification: time-based validation, tests that cover failure modes, and documentation that states its limitations. I'm looking for a team where I can keep building products that combine software engineering with data and AI.",
  ],
} as const;
