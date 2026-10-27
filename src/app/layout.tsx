import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { BackToTop, PointerEffects } from "@/components/effects";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { education } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { getCommandItems } from "@/lib/command-items";
import { siteUrl } from "@/lib/content";
import { themeInitScript } from "@/lib/theme-script";
import "./globals.css";

/**
 * One variable family for the whole site. The width axis does the work a
 * second typeface usually does: wide and heavy for names and titles, normal
 * width for reading. Code uses the system monospace (see globals.css).
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f7",
};

/** Structured data describing the site owner (schema.org Person), sanitised as the Next.js JSON-LD guide recommends. */
const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  ...(profile.photo ? { image: new URL(profile.photo.src, siteUrl).toString() } : {}),
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.location.split(",")[0], addressCountry: "TN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.youtube],
  knowsAbout: ["Software engineering", "Full-stack development", "Machine learning", "Data science", "LLM applications"],
}).replace(/</g, "\\u003c");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteHeader commands={getCommandItems()} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealOnScroll />
        <PointerEffects />
        <BackToTop />
      </body>
    </html>
  );
}
