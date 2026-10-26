import { ArrowUpRight } from "lucide-react";
import { SOCIAL_PLATFORMS, type SocialPlatform } from "@/lib/social";
import { SocialIcon } from "@/components/social-icons";

export function SocialSection() {
  return (
    <section
      id="social-channels"
      aria-labelledby="social-heading"
      className="relative overflow-hidden border-t border-[#A8FF00]/15 bg-gradient-to-b from-[#070A07] via-[#090E09] to-[#070A07] py-20 sm:py-28"
    >
      {/* Background ambient lighting effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[#A8FF00]/[0.06] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-[400px] rounded-full bg-[#00F2FE]/[0.04] blur-[120px]"
      />

      <div className="site relative z-10">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/30 bg-[#A8FF00]/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#A8FF00] backdrop-blur-md">
            Official Channels
          </div>
          <h2
            id="social-heading"
            className="poster mt-4 font-display text-4xl sm:text-6xl text-white tracking-tight"
          >
            STAY CONNECTED WITH BASSADICT
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-300">
            Discover our latest car audio installations, powerful bass setups, new products,
            demonstrations, and automotive sound experiences. Follow BASSADICT SOUNDS KE and stay
            connected.
          </p>
        </div>

        <div className="lime-rule mt-10 mb-12" />

        {/* 4 Large Interactive Social Media Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_PLATFORMS.map((item) => (
            <SocialCard key={item.id} platform={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialCard({ platform }: { platform: SocialPlatform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${platform.headline} — ${platform.callToAction} (${platform.handle})`}
      className="group glass-panel relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-[#0c120c]/70 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A8FF00]/50 hover:bg-[#121c12]/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8FF00] motion-reduce:transition-none motion-reduce:transform-none"
    >
      {/* Platform subtle top glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
        style={{ backgroundColor: platform.brandColor }}
      />

      {/* Top Bar: Icon + Handle Badge + External Arrow */}
      <div>
        <div className="flex items-center justify-between gap-3">
          {/* Large recognisable platform icon */}
          <div
            className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-black/60 shadow-inner transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
            style={{ color: platform.brandColor }}
          >
            <SocialIcon id={platform.id} className="size-7" />
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.68rem] font-medium text-stone-300 group-hover:border-white/20">
              {platform.handle}
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-black/40 text-stone-400 transition-colors group-hover:border-[#A8FF00]/60 group-hover:text-[#A8FF00]">
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              />
            </span>
          </div>
        </div>

        {/* Platform Names & Action Title */}
        <div className="mt-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#A8FF00]">
            {platform.headline}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-[#c2ff52]">
            {platform.callToAction}
          </h3>
          <p className="mt-2 text-xs font-semibold text-stone-300">
            {platform.tagline}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-stone-400">
            {platform.description}
          </p>
        </div>
      </div>

      {/* Bottom CTA Button / Indicator */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs font-semibold text-stone-200 transition-colors group-hover:border-[#A8FF00]/40 group-hover:bg-[#A8FF00]/15 group-hover:text-[#A8FF00]">
          <span>{platform.callToAction}</span>
          <span className="text-[0.68rem] uppercase tracking-wider text-stone-400 group-hover:text-[#A8FF00]">
            Official &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}
