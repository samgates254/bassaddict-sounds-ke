import { CatalogBrowser } from "@/components/catalog-browser";
import { ErrorState } from "@/components/error-state";
import { getCategories, getProducts } from "@/lib/api/products";
import { getBusiness } from "@/lib/api/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products Showroom",
  path: "/products",
  description:
    "Explore genuine car audio equipment, speakers, subwoofers, and amplifiers at Bassaddict Sounds KE showroom on Luthuli Avenue, Nairobi.",
});

export default async function ProductsPage() {
  const [productsResult, categoriesResult, businessResult] = await Promise.all([
    getProducts(),
    getCategories(),
    getBusiness(),
  ]);

  const categories = categoriesResult.ok ? categoriesResult.data : [];
  const products = productsResult.ok ? productsResult.data : [];
  const whatsappNumber = businessResult.business.whatsapp_number || "0794069405";
  const isFallback = Boolean(
    ("isFallback" in productsResult && productsResult.isFallback) ||
      ("isFallback" in categoriesResult && categoriesResult.isFallback)
  );

  return (
    <div className="site py-12 sm:py-20">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="label">The Showroom</p>
        <h1 className="poster mt-3 font-display text-5xl sm:text-7xl">
          Sound Equipment Catalog
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-300 sm:text-lg">
          Genuine Pioneer, Kenwood, Sony, Nakamichi, Boschmann, and audiophile gear. Transparent public prices, verified specifications, live auditioning, and professional installations on Luthuli Avenue, Nairobi.
        </p>
      </div>

      {isFallback && (
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              <strong>Showroom Local Catalogue:</strong> Backend API is currently offline; displaying verified local showroom snapshot with {products.length} authentic products and genuine photography.
            </span>
          </div>
        </div>
      )}

      <div className="mt-10">
        {!productsResult.ok && products.length === 0 ? (
          <ErrorState title="Unable to load catalog right now.">
            <p>Please check your connection and try again.</p>
          </ErrorState>
        ) : (
          <CatalogBrowser
            products={products}
            categories={categories}
            whatsappNumber={whatsappNumber}
          />
        )}
      </div>
    </div>
  );
}
