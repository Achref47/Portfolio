/**
 * Skill groups for the homepage. List only skills backed by the CV or a real
 * project. No percentages or bars — the projects are the evidence.
 */
export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Programming languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "R"],
  },
  {
    title: "Frontend & Mobile",
    skills: ["React", "Redux", "React Native (Expo)", "Tailwind CSS", "Vite", "React Query", "MapLibre GL"],
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "Express", "FastAPI", "Django REST Framework", "REST API design", "JWT auth", "Socket.IO"],
  },
  {
    title: "Machine Learning & Data Science",
    skills: ["pandas", "Polars", "NumPy / SciPy", "scikit-learn", "LightGBM", "CatBoost", "PyTorch", "SHAP", "Conformal prediction"],
  },
  {
    title: "Generative AI",
    skills: ["LLM applications", "RAG", "Text-to-SQL", "AI agents", "Ollama (Qwen)", "Google Gemini API", "LangChain", "ChromaDB", "Model Context Protocol"],
  },
  {
    title: "Data, Cloud & Tooling",
    skills: ["MySQL", "DuckDB", "SQLite", "Firebase", "AWS S3", "Render", "GitHub Actions", "Git / GitHub", "pytest", "Agile / Scrum"],
  },
];
