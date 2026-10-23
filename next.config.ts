import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is generated at build time from src/content; no server data.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
