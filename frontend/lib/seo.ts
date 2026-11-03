import type { Metadata } from "next";

/** Canonical production site origin for Bassaddict Sounds KE. */
export const CANONICAL_SITE_URL = "https://bassaddict.co.ke";

/** Absolute site origin for canonical, Open Graph, and sitemap URLs. */
export function siteOrigin(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const url = new URL(raw);
      if (url.protocol === "https:" && url.hostname === "bassaddict.co.ke") {
        return new URL(CANONICAL_SITE_URL);
      }
      if (url.protocol === "https:") {
        return new URL(url.origin);
      }
    } catch {
      /* fall through to canonical default */
    }
  }
  return new URL(CANONICAL_SITE_URL);
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: { url: string; alt: string } | null;
  index?: boolean;
}): Metadata {
  const origin = siteOrigin();
  const socialTitle = input.title.includes("Bassaddict")
    ? input.title
    : `${input.title} | Bassaddict Sounds KE`;
  const image = input.image?.url
    ? [{ url: input.image.url, alt: input.image.alt || input.title }]
    : undefined;

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical: input.path },
    robots: input.index === false ? { index: false, follow: false } : undefined,
    openGraph: {
      title: socialTitle,
      description: input.description,
      url: origin ? input.path : undefined,
      siteName: "Bassaddict Sounds KE",
      type: "website",
      locale: "en_KE",
      images: image,
    },
  };
}
