import { ArrowUpRight } from "lucide-react";

import { TiltCard } from "@/components/tilt-card";
import { SocialIcon } from "@/components/social-icons";
import { getBusiness } from "@/lib/api/business";
import { telHref } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { SOCIAL_PLATFORMS } from "@/lib/social";
import { generalEnquiryMessage, whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Call, WhatsApp, or email Bassaddict Sounds KE. Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi.",
});

export default async function ContactPage() {
  const { business } = await getBusiness();
  const whatsapp = whatsappHref(business.whatsapp_number, generalEnquiryMessage());
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

  const actions = [
    { kicker: "Call", title: business.phone, href: telHref(business.phone), external: false },
    { kicker: "WhatsApp", title: business.whatsapp_number, href: whatsapp, external: true },
    { kicker: "Email", title: business.email, href: `mailto:${business.email}`, external: false },
    { kicker: "Directions", title: "Luthuli Avenue", href: maps, external: true },
  ];

  return (
    <div className="site py-16 md:py-24">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label">Nairobi</p>
          <h1 className="poster mt-4 font-display text-6xl sm:text-7xl lg:text-[5.5rem]">Come in.<br />Or call.</h1>
          <address className="mt-10 not-italic">
            <p className="font-display text-2xl font-medium tracking-tight">Ground Floor, New Loitoktok House</p>
            <p className="mt-2 text-mute">Luthuli Avenue</p>
            <p className="text-mute">Nairobi, Kenya</p>
            <p className="mt-6 max-w-xs text-sm leading-6 text-steel">{business.address}</p>
          </address>
          <p className="mt-8 max-w-xs text-sm text-mute">
            Ask about a product, an install, or a custom system. There is no checkout on this site.
          </p>
        </div>
        <ul className="grid gap-3 md:col-span-7">
          {actions.map((action) => (
            <TiltCard as="li" key={action.kicker} className="glass-panel glass-panel-hover group">
              <a
                className="grid grid-cols-[1fr_auto] items-end gap-4 p-6 sm:p-8"
                href={action.href}
                {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="min-w-0">
                  <span className="label">{action.kicker}</span>
                  <span className="mt-3 block break-all font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
                    {action.title}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="mb-2 size-6 text-[#A8FF00] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c2ff52]" />
              </a>
            </TiltCard>
          ))}
        </ul>
      </div>

      {/* Dedicated Official Social Media Section */}
      <div className="mt-20 border-t border-[#A8FF00]/15 pt-16">
        <div className="max-w-2xl">
          <p className="label text-[#A8FF00]">FOLLOW BASSADICT</p>
          <h2 className="poster mt-3 font-display text-3xl sm:text-5xl text-white">
            Official Social Media Channels
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            Connect directly with BASSADICT SOUNDS KE across our verified social profiles for live installation demos, behind-the-scenes shop footage, and new equipment arrivals.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_PLATFORMS.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${platform.headline} — ${platform.callToAction} (${platform.handle})`}
              className="glass-panel group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c120c]/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#A8FF00]/50 hover:bg-[#121c12]/90 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] motion-reduce:transition-none motion-reduce:transform-none"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-xl border border-white/10 bg-black/60 shadow-inner transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    style={{ color: platform.brandColor }}
                  >
                    <SocialIcon id={platform.id} className="size-6" />
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-black/40 text-stone-400 transition group-hover:border-[#A8FF00]/60 group-hover:text-[#A8FF00]">
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <div className="mt-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#A8FF00]">
                    {platform.headline}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white transition-colors group-hover:text-[#c2ff52]">
                    {platform.callToAction}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-stone-400">
                    {platform.handle}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">
                    {platform.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-semibold text-[#A8FF00]">
                <span>{platform.tagline}</span>
                <span>&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
