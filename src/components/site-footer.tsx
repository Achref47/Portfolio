import Link from "next/link";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { GitHubMark, LinkedInMark, Mail, YouTubeMark } from "./icons";
import { Container } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const elsewhere = [
    { href: profile.links.github, label: "GitHub", Icon: GitHubMark },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedInMark },
    { href: profile.links.youtube, label: "YouTube demos", Icon: YouTubeMark },
  ];
  return (
    <footer className="mt-28 border-t border-line">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight text-ink">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-3">
            {profile.role}. {profile.location} · {profile.availability.toLowerCase()}.
          </p>
          <a href={`mailto:${profile.email}`} className="link-underline mt-4 inline-flex items-center gap-2 text-sm text-ink">
            <Mail className="h-4 w-4" /> {profile.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="link-underline text-ink-2 hover:text-ink">
                Home
              </Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-ink-2 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            {elsewhere.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 text-ink-2 hover:text-ink">
                  <Icon className="h-3.5 w-3.5" /> {label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container>
        <p className="border-t border-line py-5 font-mono text-[0.7rem] text-ink-3">
          © {year} {profile.name} · Built with Next.js · Every project claim is sourced from code, reports or the CV.
        </p>
      </Container>
    </footer>
  );
}
