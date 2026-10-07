import fs from "node:fs";
import path from "node:path";

import { DEVELOPER } from "@/lib/brand";
import { whatsappHref } from "@/lib/whatsapp";

const AD_NAMES = [
  "developer-courtesy.webp",
  "developer-courtesy.png",
  "developer-courtesy.jpg",
  "developer-courtesy.jpeg",
];

function developerAdSrc() {
  const dir = path.join(process.cwd(), "public", "images", "ads");
  for (const name of AD_NAMES) {
    if (fs.existsSync(path.join(dir, name))) return `/images/ads/${name}`;
  }
  return null;
}

/** Small developer line. The shop brand and shop WhatsApp stay above this. */
export function DeveloperCredit() {
  const ad = developerAdSrc();
  const devWhatsapp = whatsappHref(DEVELOPER.whatsappDigits, "Hello Sam,");

  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {ad ? (
          <img
            src={ad}
            alt=""
            width={120}
            height={36}
            className="h-8 w-auto max-w-[7.5rem] object-contain opacity-80"
          />
        ) : (
          <span
            className="grid size-8 shrink-0 place-items-center border border-line font-display text-[0.65rem] tracking-widest text-steel"
            aria-hidden="true"
          >
            SG
          </span>
        )}
        <p>
          <span className="text-paper">{DEVELOPER.credit}</span>
          <span className="mx-2 text-line">/</span>
          {DEVELOPER.courtesy}
        </p>
      </div>
      <p className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
        <a className="hover:text-paper" href={devWhatsapp} target="_blank" rel="noreferrer">
          {DEVELOPER.whatsappDisplay}
        </a>
        <a className="break-all hover:text-paper" href={`mailto:${DEVELOPER.email}`}>
          {DEVELOPER.email}
        </a>
        <a className="break-all hover:text-paper" href={`mailto:${DEVELOPER.emailAlt}`}>
          {DEVELOPER.emailAlt}
        </a>
      </p>
    </div>
  );
}
