#!/usr/bin/env node
/**
 * Optimise a screenshot for the portfolio and print the snippet to paste into
 * src/content/projects.ts.
 *
 *   npm run image -- <input-file> <project-slug> [output-name] [options]
 *
 * Options
 *   --crop-top=N      remove N pixels from the top (e.g. browser tabs)
 *   --crop-bottom=N   remove N pixels from the bottom
 *   --max-width=N     resize so the width is at most N pixels (default 1600)
 *   --quality=N       WebP quality, 1-100 (default 80)
 *
 * The result is written to public/projects/<project-slug>/<output-name>.webp.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [key, value] = a.slice(2).split("=");
      return [key, Number(value)];
    }),
);
const [input, slug, name] = args.filter((a) => !a.startsWith("--"));

if (!input || !slug) {
  console.error(
    "Usage: npm run image -- <input-file> <project-slug> [output-name] [--crop-top=N] [--crop-bottom=N] [--max-width=N]",
  );
  process.exit(1);
}

const outName =
  (name ?? path.parse(input).name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "image";
const outDir = path.join("public", "projects", slug);
const outFile = path.join(outDir, `${outName}.webp`);

const cropTop = flags["crop-top"] || 0;
const cropBottom = flags["crop-bottom"] || 0;
const maxWidth = flags["max-width"] || 1600;
const quality = flags.quality || 80;

const meta = await sharp(input).metadata();
let pipeline = sharp(input);
if (cropTop || cropBottom) {
  pipeline = pipeline.extract({
    left: 0,
    top: cropTop,
    width: meta.width,
    height: meta.height - cropTop - cropBottom,
  });
}
await mkdir(outDir, { recursive: true });
const info = await pipeline
  .resize({ width: maxWidth, withoutEnlargement: true })
  .webp({ quality })
  .toFile(outFile);

const src = `/projects/${slug}/${outName}.webp`;
console.log(`Saved ${outFile} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)\n`);
console.log("Paste into the project's `media` array:\n");
console.log(`{ type: "image", src: "${src}", width: ${info.width}, height: ${info.height}, alt: "DESCRIBE WHAT THE SCREENSHOT SHOWS" },`);
