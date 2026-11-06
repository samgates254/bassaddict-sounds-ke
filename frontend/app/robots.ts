import type { MetadataRoute } from "next";

import { CANONICAL_SITE_URL } from "../lib/seo.ts";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/admin", "/cart", "/checkout", "/login", "/register", "/preview", "/preview/*"],
    },
    sitemap: `${CANONICAL_SITE_URL}/sitemap.xml`,
  };
}
