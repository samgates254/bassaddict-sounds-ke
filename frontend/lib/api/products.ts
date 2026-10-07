import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import type { Category, CustomerPrice, ProductDetail, ProductListItem } from "@/lib/api/types";

export type ProductFilters = {
  category?: string;
  brand?: string;
  featured?: string;
  stock_status?: string;
};

export const getCategories = cache(() => apiGet<Category[]>("/categories/"));

const loadProducts = cache((query: string) =>
  apiGet<ProductListItem[]>(`/products/${query ? `?${query}` : ""}`),
);

export function getProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  return loadProducts(params.toString());
}

export const getProduct = cache((slug: string) =>
  apiGet<ProductDetail>(`/products/${encodeURIComponent(slug)}/`),
);

export const getMyPrices = cache(() => apiGet<CustomerPrice[]>("/me/prices/", true));
