/**
 * Skill groups for the homepage. List only skills backed by the CV or a real
 * project. No percentages or bars — the projects are the evidence.
 */
export const skillGroups: { title: string; blurb: string; skills: string[] }[] = [
  {
    title: "Programming languages",
    blurb: "The languages behind every layer.",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "R"],
  },
  {
    title: "Frontend & Mobile",
    blurb: "Interfaces people actually use — web and mobile.",
    skills: ["React", "Redux", "React Native (Expo)", "Tailwind CSS", "Vite", "React Query", "MapLibre GL"],
  },
  {
    title: "Backend & APIs",
    blurb: "Services, auth and contracts between the layers.",
    skills: ["Node.js", "Express", "FastAPI", "Django REST Framework", "REST API design", "JWT auth", "Socket.IO"],
  },
  {
    title: "Machine Learning & Data Science",
    blurb: "Models that are validated before they are trusted.",
    skills: ["pandas", "Polars", "NumPy / SciPy", "scikit-learn", "LightGBM", "CatBoost", "PyTorch", "SHAP", "Conformal prediction"],
  },
  {
    title: "Generative AI",
    blurb: "LLM features with guardrails, retrieval and honest refusals.",
    skills: ["LLM applications", "RAG", "Text-to-SQL", "AI agents", "Ollama (Qwen)", "Google Gemini API", "LangChain", "ChromaDB", "Model Context Protocol"],
  },
  {
    title: "Data, Cloud & Tooling",
    blurb: "Storage, deployment, testing and the process around it.",
    skills: ["MySQL", "DuckDB", "SQLite", "Firebase", "AWS S3", "Render", "GitHub Actions", "Git / GitHub", "pytest", "Agile / Scrum"],
  },
];

/** Text beside the layered stack on the homepage. */
export const stackIntro = {
  title: "From data pipelines to the interface.",
  body: "AURA alone touches every layer: scraping and data fusion, model training, FastAPI services, an LLM assistant and React front ends. The other projects fill in web, mobile, IoT and research work.",
};
