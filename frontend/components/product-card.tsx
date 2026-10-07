import { Button } from "@/components/button";
import type { ProductListItem } from "@/lib/api/types";
import { publicPriceLabel, stockLabel } from "@/lib/format";
import { displayImage } from "@/lib/product-assets";

export function ProductCard({ product }: { product: ProductListItem }) {
  const image = displayImage(product);
  const title = product.name;

  return (
    <article className="flex h-full min-w-0 flex-col border border-line bg-panel transition-colors hover:border-steel">
      <div className="aspect-[4/3] overflow-hidden bg-panel2">
        {image ? (
          <img
            src={image.image_url}
            alt={image.alt_text || title}
            className="h-full w-full object-cover"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-end p-4">
            <span className="font-display text-2xl tracking-[0.18em] text-steel">
              {product.brand || "BASS"}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="label">{product.brand || "Bassaddict"}</p>
          {product.featured ? (
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-paper">
              Featured
            </p>
          ) : null}
        </div>
        <h3 className="break-words font-display text-2xl leading-none tracking-wide">{title}</h3>
        {product.model_number ? (
          <p className="text-sm text-mute">{product.model_number}</p>
        ) : null}
        <p className="num text-lg">{publicPriceLabel(product)}</p>
        <p className="text-sm text-steel">{stockLabel(product.stock_status)}</p>
        <Button href={`/products/${product.slug}`} variant="line" className="mt-auto">
          View product
        </Button>
      </div>
    </article>
  );
}
