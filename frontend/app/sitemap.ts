import type { MetadataRoute } from "next";

import { siteOrigin } from "@/lib/seo";

const PATHS = ["/", "/products", "/services", "/build", "/gallery", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return PATHS.map((path) => ({
    url: new URL(path, origin).toString(),
  }));
}
