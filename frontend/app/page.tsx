import { MasterStorefront } from "@/components/storefront/master-storefront";
import { getBusiness } from "@/lib/api/business";
import { getCategories, getProducts } from "@/lib/api/products";
import { getServices } from "@/lib/api/services";

export default async function HomePage() {
  const [productsResult, servicesResult, categoriesResult, businessResult] = await Promise.all([
    getProducts(),
    getServices(),
    getCategories(),
    getBusiness(),
  ]);

  const business = businessResult.business;
  const categories = categoriesResult.ok ? categoriesResult.data : [];
  const products = productsResult.ok ? productsResult.data : [];
  const services = servicesResult.ok ? servicesResult.data : [];

  return (
    <MasterStorefront
      business={business}
      categories={categories}
      products={products}
      services={services}
    />
  );
}
