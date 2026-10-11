import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The silver bar moved from Pendants to Bullion; keep the old link working.
  async redirects() {
    return [{ source: "/product/silver-bar-pendant", destination: "/product/silver-bar", permanent: true }];
  },
};

export default nextConfig;
