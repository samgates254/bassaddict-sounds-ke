/**
 * Official social media configuration for BASSADICT SOUNDS KE.
 * All URLs are preserved exactly as provided.
 */

export interface SocialPlatform {
  id: "instagram" | "tiktok" | "youtube" | "facebook";
  platform: string;
  headline: string;
  callToAction: string;
  handle: string;
  url: string;
  tagline: string;
  description: string;
  brandColor: string;
  accentClass: string;
}

export const OFFICIAL_SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/bastenthiongo?exln=MWVmMWdiMHByNDV6bQ==",
  tiktok: "https://www.tiktok.com/@bassaddictsounds1?_r=1&_t=ZS-9AsI5qvfBvI",
  youtube: "https://youtube.com/@bassaddictsounds?si=m601wzLdqxFSiqpJ",
  facebook: "https://www.facebook.com/share/1LFDK2r76A/",
} as const;

export const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  {
    id: "instagram",
    platform: "Instagram",
    headline: "INSTAGRAM",
    callToAction: "Follow Our Journey",
    handle: "@bastenthiongo",
    url: OFFICIAL_SOCIAL_LINKS.instagram,
    tagline: "Workshop Reels & Sound Demos",
    description:
      "Daily behind-the-scenes car audio builds, custom subwoofer enclosures, speaker fitments, and workshop updates.",
    brandColor: "#E1306C",
    accentClass: "group-hover:text-[#ff4e88]",
  },
  {
    id: "tiktok",
    platform: "TikTok",
    headline: "TIKTOK",
    callToAction: "Watch Our Latest Videos",
    handle: "@bassaddictsounds1",
    url: OFFICIAL_SOCIAL_LINKS.tiktok,
    tagline: "Bass Drops & Live Testing",
    description:
      "High-energy bass drops, frequency sweeps, SPL sound pressure demos, and customer vehicle walkarounds.",
    brandColor: "#00F2FE",
    accentClass: "group-hover:text-[#00F2FE]",
  },
  {
    id: "youtube",
    platform: "YouTube",
    headline: "YOUTUBE",
    callToAction: "Explore Our Videos",
    handle: "@bassaddictsounds",
    url: OFFICIAL_SOCIAL_LINKS.youtube,
    tagline: "In-Depth Reviews & Guides",
    description:
      "Full audio installation guides, Pioneer and Skar product reviews, tuning tutorials, and complete car builds.",
    brandColor: "#FF0000",
    accentClass: "group-hover:text-[#ff4242]",
  },
  {
    id: "facebook",
    platform: "Facebook",
    headline: "FACEBOOK",
    callToAction: "Connect With Us",
    handle: "Bassaddict Sounds KE",
    url: OFFICIAL_SOCIAL_LINKS.facebook,
    tagline: "Community & Customer Stories",
    description:
      "Showroom announcements, customer testimonials, project galleries, and direct community support.",
    brandColor: "#1877F2",
    accentClass: "group-hover:text-[#4d97ff]",
  },
] as const;
