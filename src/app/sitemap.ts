import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.silversphinxnyc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/about", "/contact"].map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));
  const products = PRODUCTS.map((p) => ({ url: `${base}/product/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...pages, ...products];
}
