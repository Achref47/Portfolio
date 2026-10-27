/**
 * Regenerates public/og.png (the 1200×630 preview shown when the site is
 * shared on LinkedIn, Slack, etc.) from profile.ts, including the profile
 * photo when one is set. Run after changing your name, role or photo:
 *   npm run og
 * Colours follow the site's light theme (globals.css).
 */
import path from "node:path";
import sharp, { type OverlayOptions } from "sharp";
import { profile } from "../src/content/profile.ts";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const C = { bg: "#f6f6f7", ink: "#111215", ink2: "#3e4249", ink3: "#61666f", line: "#dfe1e5", accent: "#d0281b" };

// Photo placement (top right), inside a thin accent ring.
const PHOTO = { size: 200, x: 920, y: 80 };
const cx = PHOTO.x + PHOTO.size / 2;
const cy = PHOTO.y + PHOTO.size / 2;
const [first, ...rest] = profile.name.split(" ");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect x="80" y="80" width="1040" height="4" fill="${C.ink}"/>
  <text x="80" y="140" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" fill="${C.ink3}">Software engineer · ${escape(profile.location)}</text>
  ${profile.photo ? `<circle cx="${cx}" cy="${cy}" r="${PHOTO.size / 2 + 8}" fill="none" stroke="${C.accent}" stroke-width="3"/>` : ""}
  <text x="76" y="330" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="112" font-weight="800" letter-spacing="-3" fill="${C.ink}">${escape(first)}</text>
  <text x="76" y="440" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="112" font-weight="800" letter-spacing="-3" fill="${C.ink}">${escape(rest.join(" "))}<tspan fill="${C.accent}">.</tspan></text>
  <rect x="80" y="500" width="1040" height="1.5" fill="${C.line}"/>
  <text x="80" y="550" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" fill="${C.ink2}">Machine learning · LLM applications · Data science · <tspan fill="${C.accent}" font-weight="600">Full-stack</tspan></text>
</svg>`;

const layers: OverlayOptions[] = [];
if (profile.photo) {
  const photo = await sharp(path.join("public", profile.photo.src)).resize(PHOTO.size, PHOTO.size).png().toBuffer();
  layers.push({ input: photo, left: PHOTO.x, top: PHOTO.y });
}

await sharp(Buffer.from(svg)).composite(layers).png().toFile("public/og.png");
console.log("Wrote public/og.png");
