import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Renamed or merged listings; keep old links working.
  async redirects() {
    return [
      { source: "/product/silver-bar-pendant", destination: "/product/silver-bar", permanent: true },
      { source: "/product/libertad-coin-pendant", destination: "/product/mexican-libertad-1992-1oz", permanent: true },
      { source: "/product/link-bracelet-buckle-clasp", destination: "/product/harp-link-bracelet", permanent: true },
      { source: "/product/rolo-chain-bracelet", destination: "/product/harp-link-bracelet", permanent: true },
      { source: "/product/peacock-charm", destination: "/product/grapevine-pendant", permanent: true },
    ];
  },
};

export default nextConfig;
