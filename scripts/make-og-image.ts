/**
 * Regenerates public/og.png (the 1200×630 preview shown when the site is
 * shared on LinkedIn, Slack, etc.) from profile.ts. Run after changing your
 * name or role:  npm run og
 */
import sharp from "sharp";
import { profile } from "../src/content/profile.ts";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#22272e" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0d0f12"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.6"/>
  <rect x="80" y="80" width="64" height="64" rx="12" fill="#ecebe6"/>
  <text x="112" y="122" text-anchor="middle" font-family="Consolas, Menlo, monospace" font-size="24" font-weight="700" fill="#0d0f12">AE</text>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="92" fill="#ecebe6">${escape(profile.name)}</text>
  <text x="82" y="370" font-family="Consolas, Menlo, monospace" font-size="28" fill="#4fd1ae">${escape(profile.role)}</text>
  <text x="82" y="520" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="26" fill="#9a9ea5">Full-stack applications · Machine learning · Data products</text>
  <rect x="80" y="545" width="120" height="4" rx="2" fill="#4fd1ae"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("Wrote public/og.png");
