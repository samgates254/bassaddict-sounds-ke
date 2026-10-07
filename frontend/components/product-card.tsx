import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductListItem } from "@/lib/api/types";
import { publicPriceLabel, stockLabel } from "@/lib/format";
import { displayImage } from "@/lib/product-assets";

export function ProductCard({ product, large = false }: { product: ProductListItem; large?: boolean }) {
  const image = displayImage(product);
  const title = product.name;

  return (
    <article className="group min-w-0">
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`overflow-hidden bg-[#101214] ${large ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5]"}`}>
          {image ? (
            <img
              src={image.image_url}
              alt={image.alt_text || title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              decoding="async"
            />
          ) : (
            <div className="flex h-full items-end p-6">
              <span className="font-display text-3xl tracking-[0.18em] text-steel">{product.brand || "BASS"}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="label">{product.brand || "Bassaddict"}</p>
          <h3 className={`mt-2 break-words font-display font-medium leading-none tracking-tight ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
            <Link href={`/products/${product.slug}`} className="inline-flex items-start gap-2 hover:text-ember">
              {title}
              <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-steel opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
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
    </article>
  );
}
