import type { Metadata } from "next";

/** Absolute site origin for canonical and Open Graph URLs. Unset until deploy. */
export function siteOrigin(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url;
  } catch {
    return undefined;
  }
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
    alternates: origin ? { canonical: input.path } : undefined,
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
