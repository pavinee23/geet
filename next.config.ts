import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // disable Turbopack so we use standard webpack (avoids UTF-8 rope issue)
  experimental: {},
};

export default nextConfig;
