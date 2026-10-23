/**
 * Content checks for src/content. Runs automatically before `npm run build`
 * (and therefore on every Vercel deployment) and on demand with
 * `npm run validate`. It exits with an error message instead of letting a
 * broken link, a missing image or a typo in a slug reach production.
 *
 * The rules themselves live in content-checks.ts.
 */
import path from "node:path";
import { categories, projectTypes } from "../src/content/categories.ts";
import { recognition } from "../src/content/experience.ts";
import { profile } from "../src/content/profile.ts";
import { projects } from "../src/content/projects.ts";
import { site } from "../src/content/site.ts";
import { checkContent } from "./content-checks.ts";

const { errors, warnings } = await checkContent({
  projects,
  categories,
  projectTypes,
  site,
  recognition,
  resume: profile.resume,
  photo: profile.photo,
  publicDir: path.join(process.cwd(), "public"),
});

for (const w of warnings) console.warn(`warning  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error    ${e}`);
  console.error(`\nContent check failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`Content OK: ${projects.length} projects, ${site.featured.length} featured, ${recognition.length} recognition entries.`);
