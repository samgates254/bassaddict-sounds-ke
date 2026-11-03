import type { MetadataRoute } from "next";

import { FALLBACK_PRODUCT_LIST_ITEMS } from "../lib/fallback-catalog.ts";
import { CANONICAL_SITE_URL } from "../lib/seo.ts";

const PUBLIC_PATHS = [
  "/",
  "/products",
  "/services",
  "/build",
  "/gallery",
  "/about",
  "/contact",
] as const;

const EXCLUDED_PATH_PREFIXES = [
  "/account",
  "/admin",
  "/cart",
  "/checkout",
  "/login",
  "/register",
] as const;

const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidProductSlug(slug: unknown): slug is string {
  if (typeof slug !== "string") return false;
  const trimmed = slug.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  if (lower === "undefined" || lower === "null" || lower.includes("undefined") || lower.includes("null")) {
    return false;
  }
  return VALID_SLUG_PATTERN.test(trimmed);
}

export function isAllowedPublicUrl(rawUrl: unknown): rawUrl is string {
  if (typeof rawUrl !== "string") return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;
  if (trimmed.includes("undefined") || trimmed.includes("null")) return false;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return false;
    if (parsed.origin !== CANONICAL_SITE_URL) return false;
    if (parsed.hostname !== "bassaddict.co.ke") return false;
    const pathname = parsed.pathname;
    for (const prefix of EXCLUDED_PATH_PREFIXES) {
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function buildSitemapEntries(
  products: ReadonlyArray<{ slug?: unknown; name?: unknown } | null | undefined>
): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const addPath = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly") => {
    if (!path || !path.startsWith("/")) return;
    let fullUrl: string;
    try {
      const resolved = new URL(path, CANONICAL_SITE_URL);
      fullUrl = resolved.origin === CANONICAL_SITE_URL && resolved.pathname === "/"
        ? CANONICAL_SITE_URL
        : `${CANONICAL_SITE_URL}${resolved.pathname}`;
    } catch {
      return;
    }

    if (!isAllowedPublicUrl(fullUrl)) return;
    if (seen.has(fullUrl)) return;
    seen.add(fullUrl);

    entries.push({
      url: fullUrl,
      changeFrequency,
      priority,
    });
  };

  for (const path of PUBLIC_PATHS) {
    const priority = path === "/" ? 1.0 : path === "/products" ? 0.9 : 0.8;
    const changeFrequency = path === "/" || path === "/products" ? "daily" : "weekly";
    addPath(path, priority, changeFrequency);
  }

  for (const item of products) {
    if (!item || typeof item !== "object") continue;
    const name = typeof item.name === "string" ? item.name.trim() : "";
    if (!name) continue;
    if (!isValidProductSlug(item.slug)) continue;
    addPath(`/products/${encodeURIComponent(item.slug.trim())}`, 0.7, "weekly");
  }

  return entries;
}

export function serializeSitemapXml(entries: MetadataRoute.Sitemap): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];
  for (const item of entries) {
    if (!isAllowedPublicUrl(item.url)) continue;
    lines.push("<url>");
    lines.push(`<loc>${escapeXml(item.url)}</loc>`);
    if (item.lastModified) {
      const iso =
        item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : String(item.lastModified);
      lines.push(`<lastmod>${escapeXml(iso)}</lastmod>`);
    }
    if (item.changeFrequency) {
      lines.push(`<changefreq>${escapeXml(item.changeFrequency)}</changefreq>`);
    }
    if (typeof item.priority === "number") {
      lines.push(`<priority>${item.priority}</priority>`);
    }
    lines.push("</url>");
  }
  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(FALLBACK_PRODUCT_LIST_ITEMS);
}
