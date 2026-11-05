import type { IConfig } from "next-sitemap";

const config = {
  siteUrl: process.env.SITE_URL || "https://saidakbar0.github.io/xinux-website/",
  output: "export",
  outDir: "out",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",

  transform: async (config, path) => {
    return {
      loc: path.replace(".uz-UZ", ""),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
} satisfies IConfig;

module.exports = config;