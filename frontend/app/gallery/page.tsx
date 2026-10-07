import Image from "next/image";

import { EmptyState } from "@/components/empty-state";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { SHOP_PHOTOS } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";

const ASK =
  "Hello Bassaddict Sounds KE,\nCould you send photos of a recent installation?\nThank you.";

export const metadata = pageMetadata({
  title: "Gallery",
  path: "/gallery",
  description:
    "Supplied shop photographs from Bassaddict Sounds KE. These are equipment photos, not a priced catalog.",
});

export default async function GalleryPage() {
  const { business } = await getBusiness();

  return (
    <div className="pb-8">
      <div className="site grid items-end gap-8 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="label">Lookbook</p>
          <h1 className="poster mt-4 font-display text-6xl sm:text-8xl">Gallery</h1>
        </div>
        <p className="max-w-sm text-mute md:col-span-4 md:col-start-9 md:pb-2">
          Supplied shop photographs of equipment. Not the priced catalog, and not claimed as Bassaddict installations.
        </p>
      </div>
      {SHOP_PHOTOS.length === 0 ? (
        <div className="site">
          <EmptyState title="No photographs yet">
            <p>The shop has not added photographs.</p>
          </EmptyState>
        </div>
      ) : (
        <ul className="lookbook px-2 sm:px-3">
          {SHOP_PHOTOS.map((photo) => (
            <li key={photo.src} className={`frame-${photo.frame} group relative min-w-0 overflow-hidden bg-panel`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/55 to-transparent p-4 pt-16 sm:p-5">
                <p className="line-clamp-3 max-w-lg text-sm leading-5 text-paper" title={photo.caption}>
                  {photo.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="site pt-12">
        <WhatsAppButton number={business.whatsapp_number} message={ASK}>
          Ask for recent install photos
        </WhatsAppButton>
      </div>
    </div>
  );
}
