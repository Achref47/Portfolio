# Portfolio Audit

Audit of the site at commit `9ec4ebf` (first version), reviewed in the browser at 1440, 1280, 768 and
375 px in light and dark themes, plus the source, content files and assets. Findings are ranked by
impact on a recruiter or engineering reviewer (**H** high, **M** medium, **L** low) and urgency.
The status column is updated after the improvement pass.

## Summary

The first version is accurate, fast and maintainable: every page is static, content lives in typed
files, a validator runs before each build, and project claims were checked against code and reports.
Its weaknesses are presentational and structural: the hero leads with a slogan instead of the
person, almost everything is a bordered card with a wall of technology pills, achievements are
buried, case studies have no quick summary, and the catalogue only filters by category. Two
projects were missing (a 2022 award-winning ERP/IoT project and a 2025 forecasting project).

## Findings

| # | Area | Finding | Impact | Status |
|---|---|---|---|---|
| 1 | Content | **Missing project with a major award**: the 2022 "Visse à Vis" ERP + RFID/Arduino project (ESPRIT *Bal des Projets 2022*, **Meilleur Projet 2A**) was not in the catalogue. The GitHub repo `Smart-Home-Project` is empty, but the presentation, two demo videos and the certificate exist locally. | H | Fixed — new case study, IoT category, award shown on homepage |
| 2 | Recruiter experience | Awards and distinctions (capstone grade A, Best University Project of the Year, Best Student Project Award, Best Project 2A, Second Prize) are scattered in small text. Recruiters scan for exactly these signals. | H | Fixed — "Recognition" section built from project and education data |
| 3 | First impression | The hero `<h1>` is a 20-word slogan; the name only appears in a small label; "Software Engineering graduate" is not visible above the fold on mobile. | H | Fixed — name-first hero, one-line positioning, evidence panel with three verified results |
| 4 | Visual design | Nearly every element is a bordered card; technology is shown as 40+ pills on the homepage. This reads as a template and slows scanning. | H | Fixed — editorial project rows, text-based tech lines, typographic skills list, lighter experience timeline |
| 5 | Featured work | Secondary featured projects were identical cards; at 768 px the last row held a single orphaned card. Cards showed context, award, 6 pills, resources and a CTA, with no "problem → result" story. | H | Fixed — alternating project rows with problem, what was built and key proof points |
| 6 | Case studies | No quick summary for non-technical readers, no "what I learned / would improve", no related projects, no in-page navigation on long pages (AURA ≈ 9,000 px). | H | Fixed — "At a glance" block, learnings section, related projects, section index |
| 7 | ML accuracy | ECG metrics did not distinguish validation-curve values from the held-out evaluation; metric cards had no context field. | M | Fixed — metrics accept a context note; ECG states validation vs held-out evaluation |
| 8 | Content accuracy | The newly found NYC weather project reports MAE 0.16 °C / R² 0.999 for a "60-day forecast", but several engineered features (`TMAX_change`, `daily_temp_range`, unshifted rolling means) contain the same-day target. The numbers reflect target leakage, not forecasting skill. | H | Handled — project added **without** those metrics; leakage stated as a limitation and as next step |
| 9 | Catalogue | Only category filters; no way to find "projects I can run now" (live demo) or "with source code"; no sort. | M | Fixed — evidence filters, category filters, sort, combined with search, result count and clear-all |
| 10 | Imagery | Spotter's cover is a low-detail video thumbnail; ECG cover is a dense chart cropped at card size. | M | Improved — real screenshot of the live Spotter app; chart covers use `contain` framing |
| 11 | Schema | `context` is free text, so project type cannot be filtered or labelled consistently; navigation links lived inside a component. | M | Fixed — typed `type` field with labels; navigation moved to `site.ts` |
| 12 | Motion | No motion at all after the first pass (the hero animation was removed because it delayed LCP). | L | Fixed — progressive-enhancement reveal (content visible without JS), hover/press states, menu transition; all disabled by `prefers-reduced-motion` |
| 13 | SEO | No structured data. | L | Fixed — `Person` JSON-LD on the homepage |
| 14 | Footer | Footer had only icons; no text navigation. | L | Fixed — compact link columns |
| 15 | Accessibility | Good baseline (skip link, landmarks, labelled controls, focus rings, dialog viewer). Gaps: stretched-link cards suppressed the link outline, so keyboard focus on a card was barely visible; tech lists were announced as lists of single words. | M | Fixed — focus ring around the focused card (keyboard only, verified with Tab); tech shown as one text line |
| 16 | Privacy | Privilege Travel video and local source/database contain personal data; PatientPathway shows a real organisation's branding; Visse à Vis slides show team members' photos. | H | Kept out — only cropped, data-free stills; no team photos or names published |
| 17 | Resume | Download is built but disabled (CV contains a phone number). | M | Unchanged — needs your decision and a public CV version |
| 18 | Live demos | Spotter's hosted app loads, but on 23 Oct 2026 every route analysis (including the simulated storm demo) returned "The geocoding service is unavailable" — confirmed by calling the API directly. Fuel Planner's live API worked end to end. | H | Labelled honestly — the Spotter link note says analysis is failing and points to the video; fix needed in the Spotter repo |
| 19 | Performance | Static pages, WebP images, fonts self-hosted, YouTube loaded on click. No issues found. | — | Kept |

## Design direction

"Engineer's notebook": warm paper background, ink text, one green accent, serif display type for
names and section titles, monospace for metadata. The improvement pass keeps that identity and adds
editorial structure — rules and whitespace instead of boxes, alternating image/text rows, numbers
and results set in mono — so the content (projects and evidence) carries the page.

## Second pass — interaction and visual polish

Feedback: content good, UI still too basic. What changed:

| Area | Before | After |
|---|---|---|
| Hero | Static name and text, plain results list | Word-by-word name reveal, "Open to work" status, rotating focus phrase, dark "terminal" of verified results whose lines type in, cursor-lit grid backdrop, technology marquee |
| Navigation | Static links | Scroll-aware header, scrollspy underline for homepage sections, command palette (Ctrl/⌘+K, "/") built from the content, back-to-top button, page-enter transition |
| Featured work | Static rows | 3D tilt + glare on screenshots, cursor spotlight, "Read case study" hover pill, animated arrows, count-up metrics |
| Recognition | Uniform grid | Bento layout with the certificate for the cohort-wide award, hover lift |
| Skills | Text lists | Interactive layered stack; each tool shows how many projects use it and links to the filtered catalogue |
| Catalogue | Local state | Filters in the URL (shareable, linkable from the homepage), staggered results |
| Case studies | Static index | Sticky "On this page" bar with section highlighting, reading progress, sequential architecture diagram |

Bugs found and fixed during this pass: a fill-mode issue that pinned the progress bar to the
content instead of the viewport; command palette crash during hot reload (defaults added); JSON-LD
moved to the layout with the `<` escaping recommended by the Next.js guide; stale section highlight
when scrolling back to the top.

## Verification performed

- `npm run check`: content validation, 9 content-rule tests (including a "new project" fixture),
  ESLint, TypeScript and the production build — all passing.
- End-to-end workflow test: a temporary project was added to `projects.ts` and `site.featured`;
  it appeared on the homepage, in the catalogue (Mobile count 1 → 2), in the sitemap and on its own
  case-study page with no UI change; it was then removed.
- Browser checks (dev server): every route returns 200; unknown slugs and text-only entries 404;
  no console errors on a fresh load; all images load; catalogue filters, evidence filters, search,
  sorting, empty state and "Clear filters"; mobile menu (open, links, Escape); YouTube click-to-load
  (no YouTube request before the click); image viewer (focus, arrow keys, close); theme toggle and
  persistence; keyboard focus ring on cards; `prefers-reduced-motion` (all 29 reveal elements
  visible immediately).
- Layout: full-page captures at 1440, 1280, 768 and 375 px and in dark mode; no horizontal
  overflow at 375 px on any of the 12 pages checked (including a filtered catalogue URL); one
  `<h1>` per page.
- Second pass: command palette opened with Ctrl+K, filtered and navigated with the keyboard; no
  console errors through client-side navigation; sticky section nav pinned at 64 px and tracking
  the current section; progress bar fixed to the viewport; reduced motion verified (hero visible
  at once, marquee and rotation stopped, no hidden content).
- Privacy sweep of `src`, `public` and docs for phone numbers, personal e-mails, team members'
  names, private repository links and private documents — none found.
- Not run: Lighthouse/axe (not installed). No scores are claimed.

## Remaining limitations

- Resume download disabled until a public CV (without phone number) is supplied.
- Visse à Vis: the presentation lists you as responsible for the *Projects* module, while your own
  notes describe your task as the *Finance* module. The site says "module owner" until you confirm.
- The award scope (about 40 classes, 1,200+ students) comes from you; the certificate itself states
  "Meilleur Projet 2A". Keep a source for the number if a recruiter asks.
- NYC weather project: a leakage-free re-evaluation would turn it into a strong ML case study.
- Spotter: fix the hosted geocoding failure (or make the storm demo independent of geocoding),
  then update the resource note.
- ECG repository README still contains placeholder metrics that contradict the real results.
- No automated Lighthouse/axe run (tools not installed); checks were manual plus scripted DOM checks.

## Third pass — visual identity (October 2026)

Feedback from people with UI/UX experience: content and UX are strong, but the typography, sizes
and colours read as AI-generated.

### Diagnosis

| Problem | Why it read as a template |
|---|---|
| Instrument Serif + IBM Plex Sans + Plex Mono | The default pairing of generated portfolios; three voices competing |
| Small uppercase mono labels everywhere | Kickers, meta lines, dates, tech lists and buttons all used the same "terminal" voice |
| Fake terminal with traffic-light dots | Real results presented as a costume |
| Grid backdrop, status ping, badge pill, marquee of tools, cursor spotlight, 3D tilt + glare, grain | Seven decorative motifs, none specific to the owner |
| Warm paper + teal-green accent | Colour with no meaning, the accent every tool picks |
| Small avatar beside a badge | The person was the least visible element of the first screen |

References studied: DAQ Consulting (weight contrast in headlines, scroll-lit manifesto, numbered
"hover a stage to inspect" pipeline). The two personal references turned out to be the same 3D
template (aabu-sayed-portfolio.vercel.app serves Redoyanul Haque's content); in headless capture
both stayed on their loading screen, so only their hero, text and motion ideas (blur-in lines,
career timeline that fills) were used.

### Direction implemented

- One variable typeface, Archivo, in three widths (125 % display, 112 % titles, 100 % text);
  light/bold contrast inside display headings; no mono outside code.
- Palette: near-black ink and one signal colour — cool white with signal red (light), warm
  charcoal with coral (dark). The first light version (cream + terracotta) was replaced because it
  read as Claude's own palette. Text colours pass WCAG AA on both themes.
- Hero: greeting with the portrait set inside the headline (kept small because the source photo
  is low resolution), very large name, rotating focus line, intro and calls to action, then three
  verified results linking to their case studies. Terminal, grid, ping and tool marquee removed.
- About as a scroll-lit paragraph; AURA as an interactive system (six real architecture stages,
  each backed by a real screenshot or a measured metric; ARIA tabs, automatic tour that stops on
  interaction or reduced motion), its three products with real screenshots, all four metrics with
  context; other projects as an editorial index; experience as a timeline that fills on scroll;
  awards as evidence photos plus a ruled list; skills as rows; contact as a large statement.
- Catalogue, case studies, header, footer, palette and 404 restyled with the same tokens.
- Content model: `FlowStep` gained optional `image` and `metric`; the validator checks both.
