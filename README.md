# Achref Elarbi — Portfolio

Personal portfolio and project catalogue, built with **Next.js 16 (App Router)**, **TypeScript** and
**Tailwind CSS 4**. Every page is generated at build time from a few typed content files — there is
no database, no API key and no environment variable to configure.

- `/` — hero, selected work, about, skills, experience and education, contact
- `/projects` — the full catalogue with category filters and search
- `/projects/<slug>` — a case-study page for every project that has `details`

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
| `npm run validate` | Checks the content files (slugs, links, categories, images, placeholders) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types and runs the TypeScript compiler |
| `npm run build` | Runs `validate` automatically, then builds the production site |
| `npm run start` | Serves the production build locally |
| `npm run check` | All of the above in order — **run this before pushing** |
| `npm run image -- <file> <slug> [name]` | Converts a screenshot to optimised WebP and prints the snippet to paste |
| `npm run og` | Regenerates `public/og.png` (the link-preview image) from your name and role |

---

## Where everything lives

```
portfolio-site/
├── src/
│   ├── content/            ← EDIT THESE to change what the site says
│   │   ├── profile.ts      name, headline, intro, about, email, links, resume switch
│   │   ├── projects.ts     every project (order here = order on /projects)
│   │   ├── site.ts         page title/description and the homepage "featured" list
│   │   ├── experience.ts   jobs, education, certifications, languages
│   │   ├── skills.ts       skill groups
│   │   ├── categories.ts   filter categories for /projects
│   │   └── types.ts        the shape of all of the above (documented field by field)
│   ├── app/                pages, layout, sitemap, robots, favicon
│   ├── components/         UI building blocks (cards, gallery, video player, header…)
│   └── lib/content.ts      helpers that read the content (no project data here)
├── public/
│   ├── projects/<slug>/    screenshots and posters, one folder per project
│   └── og.png              link-preview image
└── scripts/
    ├── validate-content.ts content checks (runs before every build)
    ├── add-image.mjs       screenshot optimiser
    └── make-og-image.ts    link-preview generator
```

**Rule of thumb:** to change *what* the site says, edit `src/content/`. To change *how* it looks,
edit `src/components/` or `src/app/`. No project information is hard-coded in components.

---

## Managing projects

All projects live in the `projects` array in `src/content/projects.ts`. Each entry is a plain object;
`src/content/types.ts` documents every field.

### Add a project

1. **Optimise any screenshots** (repeat per image):

   ```bash
   npm run image -- "C:\path\to\screenshot.png" my-new-project dashboard
   ```

   This writes `public/projects/my-new-project/dashboard.webp` and prints a ready-to-paste line
   with the correct width and height. Useful options: `--crop-top=80` to remove browser tabs,
   `--crop-bottom=48` to remove the Windows taskbar, `--max-width=500` for phone screenshots.
   Check screenshots for personal data (e-mails, phone numbers, names) before publishing.

2. **Add an entry** to the `projects` array where you want it to appear:

   ```ts
   {
     slug: "my-new-project",                     // becomes /projects/my-new-project
     title: "My New Project",
     tagline: "One sentence that says what it does.",
     summary: "Two or three sentences for the card and for search.",
     year: "2026",
     context: "Personal project",                // or "Academic project", "Internship · Company"…
     role: "Sole developer",
     categories: ["software", "ai-ml"],          // ids from categories.ts
     tech: ["React", "FastAPI", "PostgreSQL"],
     resources: [
       { kind: "source", label: "Source code", href: "https://github.com/Achref47/my-new-project" },
       { kind: "live",   label: "Live app",    href: "https://my-new-project.vercel.app" },
       { kind: "video",  label: "Demo video",  href: "https://www.youtube.com/watch?v=VIDEO_ID" },
     ],
     cover: { type: "image", src: "/projects/my-new-project/dashboard.webp", width: 1600, height: 900,
              alt: "Dashboard showing …" },
     media: [
       { type: "youtube", videoId: "VIDEO_ID", title: "My New Project — demo",
         poster: "/projects/my-new-project/dashboard.webp" },
     ],
     metrics: [{ value: "120 ms", label: "median API latency (load test, 1k requests)" }],
     details: {                                   // optional: remove to skip the detail page
       overview: ["What it is and why it exists."],
       problem: ["The problem it solves."],
       solution: ["Feature one.", "Feature two."],
       contribution: ["What you personally did."],
       architecture: { steps: [{ title: "Frontend", detail: "React SPA…" }, { title: "API", detail: "FastAPI…" }] },
       decisions: ["A design decision and why."],
       results: ["A measured, verifiable result."],
       limitations: ["What it does not do yet."],
     },
   },
   ```

3. Run `npm run check`, look at it with `npm run dev`, then commit and push. Vercel deploys it.

**Resource kinds — use the one that matches reality:**

| kind | Use for | Shown as |
|---|---|---|
| `source` | A repository a visitor can open | Source Code |
| `live` | A running app or API — **never a video** | Live Demo |
| `video` | A recorded demo (YouTube etc.) | Video Demo |
| `docs` | Reports, write-ups, documentation | Documentation |

If nothing is public, leave `resources: []` and add an `availabilityNote` (for example
`"Company project: source code is not public."`). The validator refuses an empty `resources` list
without a note, a "live" link that points to a video, and non-HTTPS links.

**Media types** (`media` array):

- `{ type: "image", src, width, height, alt, caption? }` — screenshots and figures
- `{ type: "youtube", videoId, title, poster, caption? }` — click-to-play; nothing loads from YouTube until clicked
- `{ type: "video", src, title, poster?, caption? }` — a small MP4 in `public/` (keep it under ~25 MB;
  prefer YouTube for longer videos so the repository stays small)

The first video becomes the hero of the case-study page; without a video the cover image is used.

### Edit a project
Change its fields in `projects.ts`. Changing `slug` changes its URL.

### Remove a project
Delete its object from `projects.ts`, remove its slug from `site.featured` if present, and delete
`public/projects/<slug>/`. The validator tells you if anything still points to it.

### Reorder projects
- **Catalogue order:** move the object up or down in the `projects` array. Card numbers (01, 02…)
  follow this order.
- **Homepage order:** reorder the `featured` list in `src/content/site.ts`. The first slug gets the
  large flagship card. Four to six projects reads best.

### Feature / un-feature a project
Add or remove its slug in `site.featured`.

### Categories
Edit `src/content/categories.ts`. To add a new category, also add its id to the `CategoryId` type in
`types.ts`. Categories without projects are hidden automatically.

---

## Updating your profile

| To change… | Edit |
|---|---|
| Name, role, headline, intro, location, availability, target roles | `src/content/profile.ts` |
| About paragraphs | `profile.about` |
| Email, GitHub, LinkedIn, YouTube | `profile.email`, `profile.links` |
| Jobs, education, certifications, languages | `src/content/experience.ts` |
| Skills | `src/content/skills.ts` |
| Browser title and search description | `src/content/site.ts` |
| Link-preview image | run `npm run og` after changing name/role |

### Resume download
The button is built in but **off by default** (the CV contains a phone number). To enable it:

1. Copy the PDF to `public/Achref-Elarbi-Resume.pdf`.
2. In `src/content/profile.ts` set `resume.enabled: true`.
3. `npm run check`, commit, push.

To update the CV later, replace the PDF with a file of the same name. The validator fails the build if
`enabled` is `true` but the file is missing.

---

## Deploying to Vercel

The site needs no environment variables or secrets.

### First deployment
1. **Push this folder as its own repository.** Push only `portfolio-site/`, never the parent
   `portfolio/` folder: that one contains private AURA source code, a recording with personal data
   and internal reports.
   ```bash
   cd portfolio-site
   git remote add origin https://github.com/Achref47/portfolio.git   # create the empty repo on GitHub first
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, **Import** the repository. Vercel detects Next.js; keep the defaults
   (Build command `npm run build`, Output handled automatically, **Root Directory `./`**).
3. Click **Deploy**. Every later push to `main` deploys to production automatically; pushes to other
   branches get preview URLs.

**If the site lives in a subfolder of a larger repository**, set *Project → Settings → General →
Root Directory* to that folder (for example `portfolio-site`).

### Custom domain (optional)
Add it under *Project → Settings → Domains*, then add an environment variable
`NEXT_PUBLIC_SITE_URL=https://your-domain.com` so canonical links, the sitemap and robots.txt use it.
Without it, the site uses Vercel's production URL automatically.

### Updating the live site
Edit content → `npm run check` → `git commit` → `git push`. That's all: Vercel rebuilds and the content
validator runs as part of the build, so a broken image path or link fails the deployment instead of
going live.

---

## Design notes

- Light and dark themes (system preference by default, toggle in the header, remembered per visitor).
- Fonts: Instrument Serif (display), IBM Plex Sans (text), IBM Plex Mono (labels), self-hosted by
  `next/font`.
- Accessible: semantic landmarks, skip link, keyboard-operable menu, filters and image viewer,
  visible focus, `prefers-reduced-motion` respected, alt text required by the validator.
- Performance: static HTML, optimised WebP screenshots served through `next/image`, YouTube loaded
  only on click.
