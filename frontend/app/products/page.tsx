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

  return (
    <div className="site py-12 sm:py-20">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="label">The Showroom</p>
        <h1 className="poster mt-3 font-display text-5xl sm:text-7xl">
          Sound Equipment Catalog
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-300 sm:text-lg">
          Genuine Pioneer, KUERL, JBL, and audiophile gear. Transparent public prices, live auditioning, and professional installations on Luthuli Avenue, Nairobi.
        </p>
      </div>

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
