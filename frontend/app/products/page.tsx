import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { FormField } from "@/components/form-field";
import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/api/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products",
  path: "/products",
  description:
    "Active car audio products from Bassaddict Sounds KE. Public prices only. Private prices stay on the customer account.",
});

const STOCK = ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "ON_ORDER"] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = {
    category: one(params.category),
    brand: one(params.brand),
    featured: one(params.featured),
    stock_status: one(params.stock_status),
  };
  const [products, categories] = await Promise.all([getProducts(filters), getCategories()]);

  return (
    <div className="site py-10">
      <p className="label">Catalog</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">Products</h1>
      <p className="mt-3 max-w-2xl text-mute">
        Active products from the shop. Prices shown here are public prices.
      </p>

      <form className="mt-8 grid gap-3 border border-line bg-panel p-4 md:grid-cols-5" method="get">
        <FormField label="Category">
          <select name="category" defaultValue={filters.category}>
            <option value="">All</option>
            {categories.ok
              ? categories.data.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))
              : null}
          </select>
        </FormField>
        <FormField label="Brand">
          <input name="brand" defaultValue={filters.brand} />
        </FormField>
        <FormField label="Featured">
          <select name="featured" defaultValue={filters.featured}>
            <option value="">Any</option>
            <option value="true">Featured</option>
            <option value="false">Not featured</option>
          </select>
        </FormField>
        <FormField label="Stock">
          <select name="stock_status" defaultValue={filters.stock_status}>
            <option value="">Any</option>
            {STOCK.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </FormField>
        <div className="flex items-end gap-2">
          <Button type="submit">Filter</Button>
          <Button variant="line" href="/products">
            Clear
          </Button>
        </div>
      </form>

      <div className="mt-8">
        {!products.ok ? (
          <ErrorState title="Unable to load products right now.">
            <p>Please check your connection and try again.</p>
          </ErrorState>
        ) : products.data.length === 0 ? (
          <EmptyState title="No products match.">
            <p>Try another filter, or check back after the shop adds stock.</p>
          </EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.data.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}
