/**
 * Tests for the content rules, using the real content plus temporary
 * fixtures (nothing is written to src/content). Run with `npm test`.
 */
import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import { categories, projectTypes } from "../src/content/categories.ts";
import { recognition } from "../src/content/experience.ts";
import { profile } from "../src/content/profile.ts";
import { projects } from "../src/content/projects.ts";
import { site } from "../src/content/site.ts";
import type { Project } from "../src/content/types.ts";
import { checkContent, type ContentInput } from "./content-checks.ts";

const base: ContentInput = {
  projects,
  categories,
  projectTypes,
  site,
  recognition,
  resume: profile.resume,
  publicDir: path.join(process.cwd(), "public"),
};

/** A complete, valid new project — what "adding a project" should look like. */
const fixture: Project = {
  slug: "test-fixture-project",
  title: "Test Fixture Project",
  tagline: "A temporary project used only by the test suite.",
  summary: "Checks that a new, correctly filled entry passes validation without any UI change.",
  year: "2026",
  type: "independent",
  context: "Test fixture",
  role: "Sole developer",
  categories: ["software"],
  tech: ["TypeScript"],
  resources: [{ kind: "source", label: "Source code", href: "https://github.com/Achref47/example" }],
  cover: {
    type: "image",
    src: "/projects/fuel-planner-api/architecture.webp",
    width: 1600,
    height: 800,
    alt: "Architecture diagram reused as a fixture cover image.",
  },
  details: {
    glance: { problem: "A problem.", built: "Something built.", outcome: "An outcome." },
    overview: ["One paragraph."],
  },
};

const withProject = (p: Project, extra: Partial<ContentInput> = {}): ContentInput => ({
  ...base,
  projects: [...projects, p],
  ...extra,
});

test("the real content passes", async () => {
  const { errors } = await checkContent(base);
  assert.deepEqual(errors, []);
});

test("a correctly filled new project passes and can be featured by slug only", async () => {
  const { errors } = await checkContent(
    withProject(fixture, { site: { ...site, featured: [...site.featured.slice(0, 5), fixture.slug] } }),
  );
  assert.deepEqual(errors, []);
});

test("a duplicate slug is rejected", async () => {
  const { errors } = await checkContent(withProject({ ...fixture, slug: "aura-ecosystem" }));
  assert.ok(errors.some((e) => e.includes("duplicate slug")));
});

test("a video link labelled as a live demo is rejected", async () => {
  const { errors } = await checkContent(
    withProject({ ...fixture, resources: [{ kind: "live", label: "Demo", href: "https://youtu.be/abcdefghijk" }] }),
  );
  assert.ok(errors.some((e) => e.includes('use kind "video"')));
});

test("a missing image and wrong image size are reported", async () => {
  const missing = await checkContent(withProject({ ...fixture, cover: { ...fixture.cover!, src: "/projects/nope.webp" } }));
  assert.ok(missing.errors.some((e) => e.includes("does not exist")));
  const wrongSize = await checkContent(withProject({ ...fixture, cover: { ...fixture.cover!, width: 10 } }));
  assert.ok(wrongSize.errors.some((e) => e.includes("but the content says")));
});

test("placeholder text from the image script is caught", async () => {
  const { errors } = await checkContent(
    withProject({ ...fixture, cover: { ...fixture.cover!, alt: "DESCRIBE WHAT THE SCREENSHOT SHOWS" } }),
  );
  assert.ok(errors.some((e) => e.includes("placeholder")));
});

test("no public links requires an availability note", async () => {
  const { errors } = await checkContent(withProject({ ...fixture, resources: [] }));
  assert.ok(errors.some((e) => e.includes("availabilityNote")));
});

test("unknown category, type and featured slug are rejected", async () => {
  const { errors } = await checkContent(
    withProject(
      { ...fixture, categories: ["robotics" as never], type: "hackathon" as never },
      { site: { ...site, featured: [...site.featured, "not-a-project"] } },
    ),
  );
  assert.ok(errors.some((e) => e.includes('unknown category "robotics"')));
  assert.ok(errors.some((e) => e.includes('unknown type "hackathon"')));
  assert.ok(errors.some((e) => e.includes('"not-a-project" is not a project slug')));
});

test("hero highlights and recognition must point at real data", async () => {
  const { errors } = await checkContent({
    ...base,
    site: { ...site, highlights: [{ project: "aura-ecosystem", metric: 99 }] },
    recognition: [{ title: "Award", detail: "Somewhere", project: "missing-project" }],
  });
  assert.ok(errors.some((e) => e.includes("no metric at index 99")));
  assert.ok(errors.some((e) => e.includes('project "missing-project"')));
});
