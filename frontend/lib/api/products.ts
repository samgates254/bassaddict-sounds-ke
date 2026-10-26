import { cache } from "react";

import { apiGet, type ApiResult } from "@/lib/api/client";
import type { Category, CustomerPrice, ProductDetail, ProductListItem } from "@/lib/api/types";
import {
  FALLBACK_CATEGORIES,
  FALLBACK_PRODUCTS,
  FALLBACK_PRODUCT_LIST_ITEMS,
} from "@/lib/fallback-catalog";

export type ProductFilters = {
  category?: string;
  brand?: string;
  featured?: string;
  stock_status?: string;
};

export const getCategories = cache(async (): Promise<ApiResult<Category[]>> => {
  const result = await apiGet<Category[]>("/categories/");
  if (result.ok && Array.isArray(result.data) && result.data.length > 0) {
    return result;
  }
  return { ok: true, data: FALLBACK_CATEGORIES, isFallback: true };
});

const loadProducts = cache(async (query: string): Promise<ApiResult<ProductListItem[]>> => {
  const result = await apiGet<ProductListItem[]>(`/products/${query ? `?${query}` : ""}`);
  return result;
});

export async function getProducts(filters: ProductFilters = {}): Promise<ApiResult<ProductListItem[]>> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  const result = await loadProducts(params.toString());
  if (result.ok && Array.isArray(result.data) && result.data.length > 0) {
    return result;
  }

  // Filter local fallback items
  let items = [...FALLBACK_PRODUCT_LIST_ITEMS];
  if (filters.category) {
    items = items.filter((p) => p.category.slug === filters.category);
  }
  if (filters.brand) {
    const b = filters.brand.toLowerCase();
    items = items.filter((p) => (p.brand || "").toLowerCase().includes(b));
  }
  if (filters.stock_status) {
    items = items.filter((p) => p.stock_status === filters.stock_status);
  }
  if (filters.featured !== undefined) {
    const isFeat = filters.featured === "true" || filters.featured === "1";
    items = items.filter((p) => p.featured === isFeat);
  }

  return { ok: true, data: items, isFallback: true };
}

export const getProduct = cache(async (slug: string): Promise<ApiResult<ProductDetail>> => {
  const result = await apiGet<ProductDetail>(`/products/${encodeURIComponent(slug)}/`);
  if (result.ok) {
    return result;
  }
  // If backend is not available or returned 404, check fallback
  const found = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
  if (found) {
    return { ok: true, data: found, isFallback: true };
  }
  return result;
});

export const getMyPrices = cache(() => apiGet<CustomerPrice[]>("/me/prices/", true));
