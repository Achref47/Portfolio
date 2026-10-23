/**
 * Who you are: hero text, about section, contact links and resume.
 * Source of truth: the CV (Achref Elarbi Resume, October 2026).
 */
export const profile = {
  name: "Achref Elarbi",
  role: "Software Engineer · Full-Stack, Machine Learning & Data",
  /** Big headline on the homepage. */
  headline: "I build complete software products — from data pipelines and models to the APIs and interfaces people use.",
  intro:
    "Software engineering graduate based in Tunis. I combine full-stack development (React, TypeScript, Node.js, FastAPI, Django) with data science and machine learning (Python, PyTorch, LightGBM, LLMs). Most recently I was the sole engineer of AURA, an industry capstone with FAIRBANK in Lisbon that turned 1.25M property records into validated valuation models, an LLM analytics assistant and an executive intelligence hub.",
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
