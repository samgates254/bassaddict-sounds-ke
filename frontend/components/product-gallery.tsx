"use client";

import { useState } from "react";

import { EmptyState } from "@/components/empty-state";
import type { ProductImage } from "@/lib/api/types";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) {
    return (
      <EmptyState title="No photo">
        <p>The shop has not added a photograph for this product.</p>
      </EmptyState>
    );
  }
  const index = Math.min(active, images.length - 1);
  const image = images[index];
  if (!image) {
    return (
      <EmptyState title="No photo">
        <p>The shop has not added a photograph for this product.</p>
      </EmptyState>
    );
  }

  function show(next: number) {
    const count = images.length;
    setActive((next + count) % count);
  }

  return (
    <div
      tabIndex={images.length > 1 ? 0 : undefined}
      aria-label={images.length > 1 ? "Product photos" : undefined}
      className="min-w-0"
      onKeyDown={(event) => {
        if (images.length < 2) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          show(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          show(index - 1);
        }
      }}
    >
      <img
        key={image.image_url}
        src={image.image_url}
        alt={image.alt_text || name}
        className="photo-in aspect-[4/3] w-full border border-line object-cover"
        decoding="async"
      />
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Product photos">
          {images.map((item, itemIndex) => {
            const selected = itemIndex === index;
            return (
              <button
                key={`${item.image_url}-${itemIndex}`}
                type="button"
                onClick={() => show(itemIndex)}
                aria-pressed={selected}
                aria-current={selected ? "true" : undefined}
                className={`h-16 w-20 shrink-0 border-2 ${selected ? "border-paper" : "border-line"}`}
                aria-label={selected ? `Photo ${itemIndex + 1}, selected` : `Show photo ${itemIndex + 1}`}
              >
                <img src={item.image_url} alt="" className="h-full w-full object-cover" decoding="async" />
              </button>
            );
          })}
        </div>
      ) : null}
      {images.length > 1 ? (
        <p className="mt-2 text-xs text-steel">
          Photo {index + 1} of {images.length}. Use the arrow keys while this gallery is focused.
        </p>
      ) : null}
    </div>
  );
}
