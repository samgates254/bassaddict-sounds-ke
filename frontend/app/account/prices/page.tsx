import type { Metadata } from "next";

import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { getMyPrices, getProducts } from "@/lib/api/products";
import { formatKes, publicPriceLabel } from "@/lib/format";

export const metadata: Metadata = { title: "My prices" };

export default async function PricesPage() {
  const [prices, products] = await Promise.all([getMyPrices(), getProducts()]);
  if (!prices.ok) {
    return (
      <ErrorState title="Unable to load your prices.">
        <p>Please check your connection and try again.</p>
      </ErrorState>
    );
  }
  const bySlug = new Map(
    products.ok ? products.data.map((product) => [product.slug, product]) : [],
  );

  return (
    <div>
      <h1 className="font-display text-5xl font-medium tracking-tight">My prices</h1>
      <p className="mt-3 max-w-2xl text-mute">
        These negotiated prices belong to this account only. The public catalog still
        shows the shop price.
      </p>
      {prices.data.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No private prices yet.">
            <p>If the shop sets one for you, it will appear here and on that product.</p>
          </EmptyState>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {prices.data.map((price) => {
            const product = bySlug.get(price.product);
            return (
              <li key={price.product} className="border-t border-white/10 py-8">
                <p className="label">{price.model_number || "Product"}</p>
                <h2 className="mt-2 font-display text-3xl tracking-wide">{price.product_name}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-steel">Public price</p>
                    <p className="num mt-1 text-xl">
                      {product ? publicPriceLabel(product) : "See product"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-ember">
                      Your Bassaddict price
                    </p>
                    <p className="num mt-1 font-display text-3xl">{formatKes(price.price)}</p>
                  </div>
                </div>
                {price.note ? <p className="mt-3 text-sm text-mute">{price.note}</p> : null}
                <Button className="mt-4" variant="line" href={`/products/${price.product}`}>
                  View product
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
