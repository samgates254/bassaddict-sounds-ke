import Image from "next/image";

import { Container } from "@/components/container";
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
    <Container className="py-10">
      <p className="label">Workshop</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">Gallery</h1>
      <p className="mt-3 max-w-2xl text-mute">
        Supplied shop photographs of equipment. These are not the priced catalog, and they
        are not claimed as Bassaddict installations.
      </p>
      {SHOP_PHOTOS.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No photographs yet">
            <p>The shop has not added photographs.</p>
          </EmptyState>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHOP_PHOTOS.map((photo) => (
            <li key={photo.src} className="min-w-0 border border-line bg-panel">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="p-4 text-sm text-mute">{photo.caption}</p>
            </li>
          ))}
        </ul>
      )}
      <WhatsAppButton className="mt-8" number={business.whatsapp_number} message={ASK}>
        Ask for recent install photos
      </WhatsAppButton>
    </Container>
  );
}
