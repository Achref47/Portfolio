# Content & Maintenance Guide

How to add, edit, remove, feature and reorder projects, update your profile and CV, and ship
changes. For an overview of the project, see the [README](../README.md).

---

## Quick start

Requires **Node.js 24** (any version ≥ 22.18 works locally).

```bash
npm install
npm run dev          # http://localhost:3000, reloads on save
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run validate` | Checks the content (slugs, links, types, categories, images and their sizes, placeholders, featured/highlights/recognition references) |
| `npm test` | Tests for the content rules, including a "new project" fixture |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types and runs the TypeScript compiler |
| `npm run build` | Runs `validate` automatically, then builds the production site |
| `npm run start` | Serves the production build locally |
| `npm run check` | validate → test → lint → typecheck → build. **Run before pushing.** |
| `npm run image -- <file> <slug> [name] [options]` | Optimises a screenshot to WebP and prints the snippet to paste |
| `npm run og` | Regenerates `public/og.png` (link preview) from your name and role |

---

## Where everything lives

```
portfolio-site/
├── src/
│   ├── content/             ← EDIT THESE to change what the site says
│   │   ├── profile.ts       name, headline, intro, about, email, links, resume switch
│   │   ├── projects.ts      every project (order here = "Recommended" order on /projects)
│   │   ├── site.ts          title, navigation, featured projects, hero "Selected results"
│   │   ├── experience.ts    jobs, education, certifications, recognition (awards), languages
│   │   ├── skills.ts        skill groups
│   │   ├── categories.ts    filter areas and project-type labels
│   │   └── types.ts         the shape of all of the above, documented field by field
│   ├── app/                 pages, layout, sitemap, robots, favicon
│   ├── components/          UI building blocks (cards, catalogue, gallery, players, header…)
│   └── lib/content.ts       helpers that read the content (no project data here)
├── public/projects/<slug>/  screenshots and posters, one folder per project
└── scripts/                 validator, its tests, image optimiser, link-preview generator
```

**Rule of thumb:** to change *what* the site says, edit `src/content/`. To change *how* it looks,
edit `src/components/` or `src/app/`. No project information is hard-coded in components.

---

## Managing projects

All projects live in the `projects` array in `src/content/projects.ts`; `src/content/types.ts`
documents every field. Required: `slug`, `title`, `tagline`, `summary`, `year`, `type`, `context`,
`role`, `categories`, `tech`, `resources`. Everything else is optional — a project with only a
GitHub link, only a video, or nothing public at all is shown correctly.

### Add a project

1. **Optimise screenshots** (once per image):

   ```bash
   npm run image -- "C:\path\to\screenshot.png" my-new-project dashboard
   ```

   Writes `public/projects/my-new-project/dashboard.webp` and prints a line with the right width
   and height. Options: `--crop-top=80` (browser tabs), `--crop-bottom=48` (taskbar),
   `--max-width=500` (phone screenshots), `--rotate=90|180|270` (sideways photos).
   **Check every image for personal data** (e-mails, phone numbers, names, other people's photos)
   before publishing. Replace the printed `alt` placeholder — the validator rejects it.

2. **Add an entry** where it should appear in the catalogue:

   ```ts
   {
     slug: "my-new-project",                  // URL: /projects/my-new-project
     title: "My New Project",
     shortTitle: "My Project",                // optional, for tight spaces
     tagline: "One sentence that says what it does.",
     summary: "Two or three sentences for cards and search.",
     year: "2026",
     type: "independent",                     // industry | internship | independent | assessment | academic | coursework
     context: "Personal project",
     role: "Sole developer",
     team: "Two-person team: … ",             // optional — only if documented
     award: "…",                              // optional — only if documented
     categories: ["software", "ai-ml"],       // ids from categories.ts
     tech: ["React", "FastAPI", "PostgreSQL"],
     resources: [
       { kind: "source", label: "Source code", href: "https://github.com/Achref47/my-new-project" },
       { kind: "live",   label: "Live app",    href: "https://my-new-project.vercel.app" },
       { kind: "video",  label: "Demo video",  href: "https://www.youtube.com/watch?v=VIDEO_ID" },
     ],
     cover: { type: "image", src: "/projects/my-new-project/dashboard.webp", width: 1600, height: 900,
              alt: "Dashboard showing …" },   // add fit: "contain" for charts
     media: [
       { type: "youtube", videoId: "VIDEO_ID", title: "My New Project — demo",
         poster: "/projects/my-new-project/dashboard.webp" },
     ],
     metrics: [{ value: "120 ms", label: "median API latency", context: "load test, 1k requests" }],
     details: {                               // optional: remove to skip the case-study page
       glance: { problem: "…", built: "…", outcome: "…" },
       overview: ["What it is and why it exists."],
       problem: ["…"], objectives: ["…"], solution: ["…"], contribution: ["…"],
       architecture: { steps: [{ title: "Frontend", detail: "…" }, { title: "API", detail: "…" }] },
       decisions: ["…"], challenges: ["…"],
       codeSample: { title: "A real request", language: "bash", code: "curl …", caption: "…" },
       results: ["A measured, verifiable result."], limitations: ["…"], learnings: ["…"],
     },
     related: ["fuel-planner-api"],           // optional; otherwise picked automatically
   },
   ```

3. `npm run check`, look at it with `npm run dev`, commit and push. It appears automatically in
   the catalogue, filters, search, sitemap and related-project suggestions.

**Resource kinds — use the one that matches reality:**

| kind | Use for | Shown as |
|---|---|---|
| `source` | A repository a visitor can open | Source Code |
| `live` | A running app or API — **never a video** | Live Demo |
| `video` | A recorded demo | Video Demo |
| `docs` | Reports, write-ups, documentation | Documentation |

If nothing is public, leave `resources: []` and add an `availabilityNote` (for example
`"Company project: source code is not public."`). Put caveats in a resource's `note`
(e.g. "free tier — may take a minute to wake").

**Metrics:** only numbers you can point to in a report, test run or notebook. Use `context` to
say how it was measured (test set vs validation, pilot study, internship report…).

**Media types:** `image` (screenshots, figures), `youtube` (click-to-play; nothing loads from
YouTube until clicked), `video` (a small MP4 in `public/`, under ~25 MB — prefer YouTube for long
videos). The first video becomes the case-study hero; without a video the cover is used.

### Edit, remove, reorder, feature

| Task | How |
|---|---|
| Edit | Change the fields in `projects.ts`. Changing `slug` changes the URL. |
| Remove | Delete the object, remove its slug from `site.featured`, `site.highlights`, `recognition` and any `related` lists, delete `public/projects/<slug>/`. The validator lists anything still pointing at it. |
| Reorder the catalogue | Move the object in the array (card numbers 01, 02… follow it). |
| Feature on the homepage | Add the slug to `site.featured` in `site.ts`, in the order you want. The first is the large flagship card; the rest alternate left/right. Four to six reads best. |
| Change the hero numbers | Edit `site.highlights`: `{ project: "slug", metric: 0 }` points at a project's metric, so numbers are written once. |
| Add an award | Add an entry to `recognition` in `experience.ts` (link it with `project: "slug"`). |
| New filter area | Add it to `categories.ts` and its id to `CategoryId` in `types.ts`. Empty areas are hidden. |
| New project type | Add it to `projectTypes` in `categories.ts` and to `ProjectType` in `types.ts`. |

### Working with Claude

When you finish a project, give Claude the README, repository, screenshots, demo link and any
report, and ask it to add the project. The expected workflow is:

1. Inspect the material and separate verified facts from claims (README text is a claim; code,
   test output and reports are evidence).
2. Optimise screenshots with `npm run image` and check them for personal data.
3. Add a typed entry to `projects.ts` (and `details` if there is enough for a case study).
4. Use the correct resource kinds; add an `availabilityNote` for anything private.
5. Run `npm run check` and look at the page with `npm run dev`.
6. Feature it only if you ask — by adding the slug to `site.featured`.

---

## Updating your profile

| To change… | Edit |
|---|---|
| Name, headline, intro, location, availability, target roles | `src/content/profile.ts` |
| About paragraphs | `profile.about` |
| Email, GitHub, LinkedIn, YouTube | `profile.email`, `profile.links` |
| Jobs, education, certifications, languages, awards | `src/content/experience.ts` |
| Skills | `src/content/skills.ts` |
| Navigation, browser title, search description | `src/content/site.ts` |
| Hero status pill ("Open to work · …") | `profile.status` |
| Profile photo (hero avatar, About byline, link preview) | `profile.photo` → a square image in `public/profile/`; set `null` to hide. Run `npm run og` afterwards to refresh the link preview |
| Rotating hero headline | `profile.headlineRotation` (`lead`, `focus` phrases, `tail`) — keep `profile.headline` as the plain sentence for screen readers and search |
| Hero "terminal" numbers | `site.highlights` (points at project metrics) |
| Full-stack section | layers and their one-line `blurb` in `skills.ts`; side text in `stackIntro` |
| Award with an evidence image | `image` on a `recognition` entry (the first entry is shown large) |
| Link-preview image | `npm run og` after changing name/role |

### Resume download
Built in but **off** (the current CV contains a phone number). To enable it with a public version:

1. Save the CV as `public/Achref-Elarbi-Resume.pdf`.
2. Set `resume.enabled: true` in `src/content/profile.ts`.
3. `npm run check`, commit, push.

A "Resume (PDF)" button then appears in the hero. To update the CV later, replace the file (same
name). The validator fails the build if `enabled` is `true` and the file is missing.

---

## Deploying to Vercel

No environment variables or secrets are needed.

### First deployment
1. **Push this folder as its own repository** — only `portfolio-site/`, never the parent folder
   (it contains private AURA code, recordings with personal data and internal reports).
   ```bash
   git remote add origin https://github.com/Achref47/Portfolio.git
   git push -u origin main
   ```
2. On <https://vercel.com/new>, **Import** the repository. Keep the defaults (framework Next.js,
   build `npm run build`, **Root Directory `./`**) and deploy.
3. Every push to `main` deploys to production; other branches get preview URLs.

If the site ever lives in a subfolder of a larger repository, set *Project → Settings → General →
Root Directory* to that folder (e.g. `portfolio-site`).

### Custom domain (optional)
Add it under *Project → Settings → Domains* and set `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
so canonical links, the sitemap and robots.txt use it. Otherwise Vercel's production URL is used.

### Updating the live site
Edit content → `npm run check` → commit → push. The validator runs inside the Vercel build, so a
broken image path or link fails the deployment instead of going live.

---

## What updates automatically

Because every interface element reads from `src/content`, adding or editing a project updates —
with no UI work — the catalogue and its filter counts, search, the sitemap, related-project
suggestions, the command palette, the skill counts in the full-stack section (matched against
each project's `tech`), and, if featured, the homepage.

## Design notes

- "Engineer's notebook" identity: warm paper background with faint grain, ink text, one green
  accent; Instrument Serif for names and section titles, IBM Plex Sans for text, IBM Plex Mono for
  metadata and numbers (all self-hosted by `next/font`).
- Light and dark themes (light by default regardless of system setting; header toggle switches to dark, remembered per visitor, no flash).
- Motion system (CSS-first, no animation library): word-by-word name reveal, typed-in terminal
  lines, rotating focus phrase, scroll-reveal sections with staggering, count-up metrics, cursor
  spotlight on cards, 3D tilt and glare on featured screenshots, sliding nav underline, page-enter
  transition, sequential architecture diagrams. Everything is progressive enhancement: content is
  in the HTML and visible without JavaScript, and `prefers-reduced-motion` turns motion off.
- Interaction: command palette (Ctrl/⌘ + K), scroll-aware header with section highlighting, sticky
  "On this page" bar and reading progress on case studies, back-to-top button, URL-synced filters.
- Accessibility: landmarks, skip link, one `<h1>` per page, labelled controls, visible focus
  (including a ring around focused cards), keyboard-operable menu, filters and image viewer, alt
  text required by the validator.
- Performance: static HTML, WebP images through `next/image`, YouTube loaded on click.
