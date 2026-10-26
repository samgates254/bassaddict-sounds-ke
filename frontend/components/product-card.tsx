"use client";

import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { ArrowUpRight, MessageCircle, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import type { ProductListItem } from "@/lib/api/types";
import { publicPriceLabel, stockLabel } from "@/lib/format";
import { displayImage } from "@/lib/product-assets";
import { TiltCard } from "@/components/tilt-card";
import { useCart } from "@/context/cart-context";
import { whatsappHref, productEnquiryMessage } from "@/lib/whatsapp";

export function ProductCard({
  product,
  large = false,
  whatsappNumber = CANONICAL_WHATSAPP_NUMBER,
}: {
  product: ProductListItem;
  large?: boolean;
  whatsappNumber?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const image = displayImage(product);
  const title = product.name;

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      brand: product.brand || product.category.name,
      price: product.public_price,
      image_url: image ? image.image_url : null,
      model_number: product.model_number,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const enquiryLink = whatsappHref(
    whatsappNumber,
    productEnquiryMessage([product.brand, product.name].filter(Boolean).join(" "))
  );

  return (
    <TiltCard
      as="article"
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#A8FF00]/15 bg-black/40 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:border-[#A8FF00]/40 hover:shadow-[0_34px_90px_rgba(0,0,0,0.5),0_0_30px_rgba(168,255,0,0.1)] sm:p-3"
    >
      <div>
        {/* Image Container */}
        <Link
          href={`/products/${product.slug}`}
          className="relative block overflow-hidden rounded-[22px] [transform:translateZ(14px)]"
        >
          <div
            className={`relative overflow-hidden bg-[#10101a] ${
              large ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5]"
            }`}
          >
            {image ? (
              <img
                src={image.image_url}
                alt={image.alt_text || title}
                className="h-full w-full object-contain p-2 transition duration-700 group-hover:scale-[1.04]"
                decoding="async"
              />
            ) : (
              <div className="flex h-full items-end p-6">
                <span className="font-display text-3xl tracking-[0.18em] text-steel">
                  {product.brand || "BASS"}
                </span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08070e]/90 via-transparent to-black/20 opacity-80 transition-opacity group-hover:opacity-100" />

            {/* Equalizer Wave on Hover */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {Array.from({ length: 28 }, (_, bar) => (
                <span
                  key={bar}
                  className="h-[var(--wave-height)] w-1 origin-bottom scale-y-50 rounded-full bg-gradient-to-t from-[#8CFF00] to-[#d5ff8f] opacity-70 shadow-[0_0_12px_rgba(168,255,0,0.6)] transition-transform group-hover:animate-wave-bars"
                  style={
                    {
                      "--wave-height": `${18 + ((bar * 37 + 13) % 76)}%`,
                      animationDelay: `${(bar % 9) * 45}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            {/* Category / Brand Badge */}
            <span className="absolute left-3 top-3 rounded-full border border-[#A8FF00]/25 bg-black/60 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
              {product.featured ? "Featured" : product.category.name || product.brand || "Gear"}
            </span>

            {/* Stock Badge */}
            <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[0.6rem] font-medium tracking-wide text-stone-300 backdrop-blur-xl">
              {stockLabel(product.stock_status)}
            </span>
          </div>
        </Link>

        {/* Content Info */}
        <div className="mt-4 px-3 [transform:translateZ(24px)] sm:px-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="label">{product.brand || product.category.name}</p>
              <h3
                className={`mt-1.5 break-words font-display font-medium leading-snug tracking-tight text-white ${
                  large ? "text-2xl sm:text-3xl" : "text-xl"
                }`}
              >
                <Link href={`/products/${product.slug}`} className="hover:text-[#A8FF00] transition">
                  {title}
                </Link>
              </h3>
              {product.model_number && (
                <p className="mt-1 text-xs text-stone-400">{product.model_number}</p>
              )}
            </div>

            <div className="text-right shrink-0">
              <p className="font-display text-xl font-bold tracking-tight text-[#A8FF00]">
                {publicPriceLabel(product)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center gap-2 border-t border-[#A8FF00]/15 px-3 pt-3 pb-1 [transform:translateZ(24px)] sm:px-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition ${
            added
              ? "bg-[#c2ff52] text-[#070A07]"
              : "border border-[#A8FF00]/30 bg-black/40 text-white hover:border-[#A8FF00] hover:bg-[#A8FF00] hover:text-[#070A07]"
          }`}
        >
          {added ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" aria-hidden="true" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <a
          href={enquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${product.name} on WhatsApp`}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/40 text-stone-300 transition hover:border-[#A8FF00] hover:bg-[#A8FF00]/10 hover:text-[#A8FF00]"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
        </a>

        <Link
          href={`/products/${product.slug}`}
          aria-label={`View details for ${product.name}`}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/40 text-stone-300 transition hover:border-white/30 hover:text-white"
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </TiltCard>
  );
}
