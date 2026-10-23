/**
 * Work experience, education, certifications, recognition and languages.
 * Source of truth: the CV (and the award certificates). Keep entries newest first.
 */
import type { Recognition } from "./types";

export interface ExperienceEntry {
  role: string;
  organisation: string;
  location: string;
  period: string;
  /** Employment type shown as a label, e.g. "Internship". */
  type: string;
  context: string;
  points: string[];
  /** Optional link to a related project page, e.g. "/projects/aura-ecosystem". */
  projectHref?: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Data Science Intern (Capstone)",
    organisation: "FAIRBANK",
    location: "Lisbon, Portugal",
    period: "Feb 2026 – Jul 2026",
    type: "Industry capstone internship",
    context: "Portuguese PropTech company. Sole engineer of AURA for its Rezerva platform.",
    points: [
      "Built the data pipeline (scraping, cleaning, integration) for 1.25M property records across 41 municipalities, joining listing, macroeconomic, geospatial, regulatory and tourism data; removed 44 leaking or redundant features.",
      "Trained LightGBM, CatBoost and FT-Transformer valuation models on time-based splits; the FT-Transformer reached R² 0.968 (MAPE 4.05%) on 360K held-out 2024–25 properties (rolling validation R² 0.94).",
      "Made valuations explainable and auditable with SHAP attributions, conformal (CQR) prediction intervals, model versioning with rollback and PSI drift monitoring in the FastAPI service.",
      "Engineered a multi-agent LLM assistant on local Qwen models (Ollama) with text-to-SQL, forecasting and comparison agents, RAG and guardrails; 355 tests pass, with 0% schema hallucination in validation.",
      "Developed the React/TypeScript interfaces for the valuation platform and the Intelligence Hub, and connected the assistant to the platform through a FastAPI gateway.",
    ],
    projectHref: "/projects/aura-ecosystem",
  },
  {
    role: "Full-Stack Software Developer Intern",
    organisation: "Privilege Travel",
    location: "Tunis, Tunisia",
    period: "Jan 2024 – Jul 2025",
    type: "Internship",
    context: "Only full-stack developer in a three-person team; Scrum Master for four two-week sprints; mentored two teammates.",
    points: [
      "Built a flight- and hotel-booking platform (React/Redux, Node.js/Express REST APIs, MySQL) with email vouchers, a Chart.js admin dashboard and a Google Gemini chatbot; in pilot testing the chatbot resolved 85% of requests without staff help.",
      "Secured accounts with JWT, bcrypt, login lockout and IP-geolocation alerts to administrators; reached 92% test coverage on critical backend paths and a 198 ms average API response time.",
    ],
    projectHref: "/projects/privilege-travel-platform",
  },
];

export const education = {
  degree: "Degree of Engineering, Major in Software Engineering",
  accreditation: "ABET-accredited",
  school: "Mediterranean Institute of Technology (MedTech), South Mediterranean University",
  location: "Tunis, Tunisia",
  period: "2023 – 2026",
  details: [
    "GPA 3.43 / 4.0 · Honours List · Dean's List (Fall 2024, Spring 2026)",
    "Capstone: AURA, industry capstone with FAIRBANK (30 ECTS) — grade A",
    "Distinction: Best University Project of the Year",
    "300 ECTS, including credits transferred from ESPRIT, Tunis (2020–2023)",
  ],
};

export const certifications = [
  { name: "IBM RAG and Agentic AI Professional Certificate", issuer: "IBM · Coursera", year: "2026" },
  { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services", year: "2025" },
  { name: "Meta Android Developer", issuer: "Meta · Coursera", year: "2024" },
];

/**
 * Awards and distinctions for the homepage "Recognition" list, in the order
 * they should appear (most significant first).
 * `project` links the entry to a case study (must be a slug from projects.ts).
 */
export const recognition: Recognition[] = [
  {
    title: "Best Project — entire 2A cohort",
    detail: "ESPRIT Bal des Projets · awarded across the whole second-year cohort (≈40 classes, 1,200+ students) · team MAYOC",
    year: "2022",
    project: "visse-a-vis-erp",
    image: {
      src: "/projects/visse-a-vis-erp/award-certificate.webp",
      width: 800,
      height: 503,
      alt: "ESPRIT Bal des Projets 2022 certificate: Meilleur Projet 2A, awarded to team MAYOC.",
    },
  },
  {
    title: "Best Student Project — Outstanding Performance",
    detail: "MedTech Project Day · awarded for our AI-powered detection tool for colorectal cancer",
    year: "2025",
    project: "microbiome-colorectal-cancer",
    image: {
      src: "/projects/microbiome-colorectal-cancer/best-student-project-award.webp",
      width: 800,
      height: 1189,
      alt: "Achref Elarbi and teammates holding Best Student Project certificates beside a 'Colorectal Cancer AI Detection' Project Day poster.",
      position: "50% 46%",
    },
  },
  {
    title: "Best University Project of the Year",
    detail: "Distinction · Mediterranean Institute of Technology (MedTech)",
  },
  {
    title: "Capstone graded A",
    detail: "AURA industry capstone with FAIRBANK, Lisbon (30 ECTS) · MedTech",
    year: "2026",
    project: "aura-ecosystem",
  },
  {
    title: "Second Prize",
    detail: "PawPaw pet-matchmaking app · academic project",
    year: "2024",
    project: "pawpaw",
  },
  {
    title: "Dean's List",
    detail: "Fall 2024 and Spring 2026 · MedTech",
    year: "2024–2026",
  },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Fluent" },
  { name: "English", level: "C1+ (English-taught degree)" },
];
