import Link from "next/link";
import { profile } from "@/content/profile";
import { GitHubMark, LinkedInMark, Mail, YouTubeMark } from "./icons";
import { Container } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = [
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, external: false },
    { href: profile.links.github, label: "GitHub", Icon: GitHubMark, external: true },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInMark, external: true },
    { href: profile.links.youtube, label: "YouTube", Icon: YouTubeMark, external: true },
  ];
  return (
    <footer className="mt-24 border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-ink-3">
            {profile.role} · {profile.location}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex gap-1">
            {links.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[0.72rem] text-ink-3">
            © {year} · <Link href="/projects" className="hover:text-ink">All projects</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
