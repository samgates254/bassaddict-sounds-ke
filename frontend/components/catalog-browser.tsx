"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import type { Category, ProductListItem } from "@/lib/api/types";
import { ProductCard } from "@/components/product-card";

export function CatalogBrowser({
  products,
  categories,
  whatsappNumber,
}: {
  products: ProductListItem[];
  categories: Category[];
  whatsappNumber: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [stockStatus, setStockStatus] = useState(searchParams.get("stock_status") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");

  // Keep state synced with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    if (stockStatus) params.set("stock_status", stockStatus);
    if (sortBy && sortBy !== "featured") params.set("sort", sortBy);

    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, "", newUrl);
  }, [search, selectedCategory, stockStatus, sortBy, pathname]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && product.category.slug !== selectedCategory) {
        return false;
      }

      // Stock status filter
      if (stockStatus && product.stock_status !== stockStatus) {
        return false;
      }

      // Text search
      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = (product.brand || "").toLowerCase().includes(query);
        const matchesModel = (product.model_number || "").toLowerCase().includes(query);
        const matchesCategory = product.category.name.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, stockStatus, search]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    if (sortBy === "price_asc") {
      copy.sort((a, b) => {
        const pa = a.public_price ? Number(a.public_price) : Infinity;
        const pb = b.public_price ? Number(b.public_price) : Infinity;
        return pa - pb;
      });
    } else if (sortBy === "price_desc") {
      copy.sort((a, b) => {
        const pa = a.public_price ? Number(a.public_price) : -Infinity;
        const pb = b.public_price ? Number(b.public_price) : -Infinity;
        return pb - pa;
      });
    } else if (sortBy === "name_asc") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      copy.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Default: featured first
      copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return copy;
  }, [filteredProducts, sortBy]);

  const hasActiveFilters = Boolean(search.trim() || selectedCategory || stockStatus || sortBy !== "featured");

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setStockStatus("");
    setSortBy("featured");
    router.replace(pathname);
  };

  return (
    <div className="space-y-8">
      {/* Search and Main Filters Bar */}
      <div className="glass-panel p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-12 md:items-center">
          {/* Search Input */}
          <div className="relative md:col-span-12 lg:col-span-4">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search speakers, subwoofers, Pioneer, KUERL..."
              className="w-full !pl-11 !pr-10 !py-2.5 text-sm"
              aria-label="Search equipment catalog"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search text"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="md:col-span-4 lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Status Filter Dropdown */}
          <div className="md:col-span-4 lg:col-span-2">
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              aria-label="Filter by stock availability"
              className="text-sm"
            >
              <option value="">All Stock</option>
              <option value="IN_STOCK">In Stock</option>
              <option value="LOW_STOCK">Low Stock</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
              <option value="ON_ORDER">On Order</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-4 lg:col-span-3 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="text-sm"
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="shrink-0 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-stone-300 hover:border-red-400/40 hover:text-red-400 transition"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Quick Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              selectedCategory === ""
                ? "bg-[#A8FF00] text-[#070A07] font-semibold"
                : "border border-white/10 bg-black/40 text-stone-300 hover:border-white/30 hover:text-white"
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category.slug === cat.slug).length;
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(active ? "" : cat.slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[#A8FF00] text-[#070A07] font-semibold"
                    : "border border-white/10 bg-black/40 text-stone-300 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count and Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
        <p>
          Showing <span className="font-semibold text-white">{sortedProducts.length}</span> of{" "}
          <span className="font-semibold text-white">{products.length}</span> showroom items
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[#A8FF00]">
              Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              <button
                type="button"
                onClick={() => setSelectedCategory("")}
                aria-label="Remove category filter"
                className="hover:text-white"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          )}
          {stockStatus && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-stone-200">
              Stock: {stockStatus === "IN_STOCK" ? "In Stock" : stockStatus === "LOW_STOCK" ? "Low Stock" : "Out of Stock"}
              <button
                type="button"
                onClick={() => setStockStatus("")}
                aria-label="Remove stock filter"
                className="hover:text-white"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="glass-panel flex flex-col items-center justify-center p-12 text-center sm:p-20">
          <span className="grid size-16 place-items-center rounded-full border border-[#A8FF00]/20 bg-black/40 text-[#A8FF00]">
            <Search className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold text-white">
            No matching equipment found
          </h3>
          <p className="mt-2 max-w-sm text-sm text-stone-400">
            We couldn&apos;t find anything matching your filter criteria. Try adjusting your search term or clearing filters.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="btn btn-ember mt-6"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
}
