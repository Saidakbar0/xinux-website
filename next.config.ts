import type { NextConfig } from "next";
import nextra from "nextra";

const BASE_PATH = process.env.BASE_PATH;
const withNextra = nextra({});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH || "",
  },
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH || "",
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
};

export default withNextra(nextConfig);