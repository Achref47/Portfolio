import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { allProjects, hasDetailPage, projectHref, typeLabel } from "./content";

/** One entry of the command palette. Built from the content files, so it never needs manual updates. */
export interface CommandItem {
  id: string;
  group: "Navigate" | "Projects" | "Profiles" | "Actions";
  label: string;
  hint?: string;
  /** Internal path or external URL. */
  href?: string;
  external?: boolean;
  action?: "copy-email" | "toggle-theme";
  /** Extra words that should match the search. */
  keywords?: string;
}

export function getCommandItems(): CommandItem[] {
  const navigate: CommandItem[] = [
    { id: "home", group: "Navigate", label: "Home", href: "/" },
    ...site.nav.map((n) => ({ id: `nav-${n.href}`, group: "Navigate" as const, label: n.label, href: n.href })),
  ];

  const projects: CommandItem[] = allProjects.map((p) => ({
    id: `project-${p.slug}`,
    group: "Projects",
    label: p.title,
    hint: `${typeLabel(p)} · ${p.year}`,
    href: hasDetailPage(p) ? projectHref(p) : `/projects?q=${encodeURIComponent(p.shortTitle ?? p.title)}`,
    keywords: [p.shortTitle ?? "", p.tech.join(" "), p.categories.join(" ")].join(" "),
  }));

  const profiles: CommandItem[] = [
    { id: "github", group: "Profiles", label: "GitHub", hint: "github.com/Achref47", href: profile.links.github, external: true },
    { id: "linkedin", group: "Profiles", label: "LinkedIn", href: profile.links.linkedin, external: true },
    { id: "youtube", group: "Profiles", label: "YouTube demos", href: profile.links.youtube, external: true },
    { id: "email", group: "Profiles", label: "Send an email", hint: profile.email, href: `mailto:${profile.email}`, external: true },
  ];

  const actions: CommandItem[] = [
    { id: "copy-email", group: "Actions", label: "Copy email address", hint: profile.email, action: "copy-email" },
    { id: "toggle-theme", group: "Actions", label: "Toggle light / dark theme", action: "toggle-theme", keywords: "dark mode light mode" },
  ];
  if (profile.resume.enabled) {
    actions.unshift({ id: "resume", group: "Actions", label: "Download resume (PDF)", href: profile.resume.href, external: true });
  }

  return [...navigate, ...projects, ...profiles, ...actions];
}
