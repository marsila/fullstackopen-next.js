import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Your other existing config options...
};

const withMDX = createMDX({
  // Add markdown plugins here, as needed
});

export default withMDX(nextConfig);