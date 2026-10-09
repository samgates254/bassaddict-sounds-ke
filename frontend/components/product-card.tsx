import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import type { ProductListItem } from "@/lib/api/types";
import { publicPriceLabel, stockLabel } from "@/lib/format";
import { displayImage } from "@/lib/product-assets";
import { TiltCard } from "@/components/tilt-card";

export function ProductCard({ product, large = false }: { product: ProductListItem; large?: boolean }) {
  const image = displayImage(product);
  const title = product.name;

  return (
    <TiltCard
      as="article"
      className="group min-w-0 overflow-hidden rounded-[28px] border border-[#A8FF00]/15 bg-black/40 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:border-[#A8FF00]/35 hover:shadow-[0_34px_90px_rgba(0,0,0,0.42),0_0_30px_rgba(168,255,0,0.08)] sm:p-3"
    >
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden rounded-[22px] [transform:translateZ(14px)]">
        <div className={`relative overflow-hidden bg-[#10101a] ${large ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5]"}`}>
          {image ? (
            <img
              src={image.image_url}
              alt={image.alt_text || title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
              decoding="async"
            />
          ) : (
            <div className="flex h-full items-end p-6">
              <span className="font-display text-3xl tracking-[0.18em] text-steel">{product.brand || "BASS"}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08070e]/90 via-transparent to-black/20 opacity-80 transition-opacity group-hover:opacity-100" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            {Array.from({ length: 28 }, (_, bar) => (
              <span
                key={bar}
                className="h-[var(--wave-height)] w-1 origin-bottom scale-y-50 rounded-full bg-gradient-to-t from-[#8CFF00] to-[#d5ff8f] opacity-70 shadow-[0_0_12px_rgba(168,255,0,0.6)] transition-transform group-hover:animate-wave-bars"
                style={{ "--wave-height": `${18 + ((bar * 37 + 13) % 76)}%`, animationDelay: `${(bar % 9) * 45}ms` } as CSSProperties}
              />
            ))}
          </div>
          <span className="absolute left-4 top-4 rounded-full border border-[#A8FF00]/15 bg-black/40 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-xl">
            {product.featured ? "Featured" : product.brand || "Bassaddict"}
          </span>
          <span className="absolute bottom-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full border border-[#A8FF00]/15 bg-black/40 text-[#A8FF00] opacity-0 shadow-[0_0_30px_rgba(168,255,0,0.12)] backdrop-blur-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <MoveUpRight aria-hidden="true" className="size-5" />
          </span>
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-6 px-3 pb-3 [transform:translateZ(24px)] sm:px-4">
        <div className="min-w-0">
          <p className="label">{product.category.name || product.brand || "Bassaddict"}</p>
          <h3 className={`mt-2 break-words font-display font-medium leading-none tracking-tight ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
            <Link href={`/products/${product.slug}`} className="inline-flex items-start gap-2 hover:text-ember">
              {title}
              <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#A8FF00] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </h3>
          {product.model_number ? <p className="mt-2 text-sm text-mute">{product.model_number}</p> : null}
          <p className="mt-2 text-xs tracking-[0.12em] text-steel">
            {stockLabel(product.stock_status)}
            {product.featured ? " · Featured" : ""}
          </p>
        </div>
        <p className="num shrink-0 font-display text-xl font-medium text-paper">{publicPriceLabel(product)}</p>
      </div>
    </TiltCard>
  );
}
