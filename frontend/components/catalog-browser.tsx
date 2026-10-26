"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X, ArrowUpDown, ChevronDown } from "lucide-react";
import type { Category, ProductListItem } from "@/lib/api/types";
import { ProductCard } from "@/components/product-card";

const PAGE_SIZE = 12;

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
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "");
  const [stockStatus, setStockStatus] = useState(searchParams.get("stock_status") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Dynamic brands list from available products
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    for (const p of products) {
      if (p.brand && p.brand.trim()) {
        brandSet.add(p.brand.trim());
      }
    }
    return Array.from(brandSet).sort((a, b) => a.localeCompare(b));
  }, [products]);

  // Keep state synced with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (stockStatus) params.set("stock_status", stockStatus);
    if (sortBy && sortBy !== "featured") params.set("sort", sortBy);

    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, "", newUrl);
  }, [search, selectedCategory, selectedBrand, stockStatus, sortBy, pathname]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, selectedCategory, selectedBrand, stockStatus, sortBy]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && product.category.slug !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand && (product.brand || "").toLowerCase() !== selectedBrand.toLowerCase()) {
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
        const matchesSlug = product.slug.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesCategory && !matchesSlug) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedBrand, stockStatus, search]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    if (sortBy === "price_asc") {
      copy.sort((a, b) => {
        const hasA = a.public_price != null && !isNaN(Number(a.public_price));
        const hasB = b.public_price != null && !isNaN(Number(b.public_price));
        if (!hasA && !hasB) return a.name.localeCompare(b.name);
        if (!hasA) return 1; // unpriced items placed at the end
        if (!hasB) return -1;
        return Number(a.public_price) - Number(b.public_price);
      });
    } else if (sortBy === "price_desc") {
      copy.sort((a, b) => {
        const hasA = a.public_price != null && !isNaN(Number(a.public_price));
        const hasB = b.public_price != null && !isNaN(Number(b.public_price));
        if (!hasA && !hasB) return a.name.localeCompare(b.name);
        if (!hasA) return 1; // unpriced items placed at the end
        if (!hasB) return -1;
        return Number(b.public_price) - Number(a.public_price);
      });
    } else if (sortBy === "name_asc") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      copy.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Default: featured first, then alphabetical by name
      copy.sort((a, b) => {
        if (a.featured !== b.featured) {
          return b.featured ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return copy;
  }, [filteredProducts, sortBy]);

  const paginatedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  const hasActiveFilters = Boolean(
    search.trim() || selectedCategory || selectedBrand || stockStatus || sortBy !== "featured"
  );

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrand("");
    setStockStatus("");
    setSortBy("featured");
    setVisibleCount(PAGE_SIZE);
    router.replace(pathname);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(sortedProducts.length, prev + PAGE_SIZE));
  };

  return (
    <div className="space-y-8">
      {/* Search and Main Filters Bar */}
      <div className="glass-panel p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="grid gap-4 md:grid-cols-12 md:items-center">
          {/* Search Input */}
          <div className="relative md:col-span-12 lg:col-span-4">
            <Search
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search equipment, Pioneer, Kenwood, 1500W..."
              className="w-full !pl-11 !pr-10 !py-2.5 text-sm rounded-xl border border-white/10 bg-black/60 text-white placeholder-stone-400 focus:border-[#A8FF00] focus:ring-1 focus:ring-[#A8FF00]"
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
              className="w-full text-sm rounded-xl border border-white/10 bg-black/60 text-white py-2.5 px-3 focus:border-[#A8FF00]"
            >
              <option value="">All Categories ({products.length})</option>
              {categories.map((c) => {
                const count = products.filter((p) => p.category.slug === c.slug).length;
                if (count === 0) return null;
                return (
                  <option key={c.slug} value={c.slug}>
                    {c.name} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Brand Filter Dropdown */}
          <div className="md:col-span-4 lg:col-span-2">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              aria-label="Filter by brand"
              className="w-full text-sm rounded-xl border border-white/10 bg-black/60 text-white py-2.5 px-3 focus:border-[#A8FF00]"
            >
              <option value="">All Brands</option>
              {availableBrands.map((b) => {
                const count = products.filter((p) => (p.brand || "").toLowerCase() === b.toLowerCase()).length;
                return (
                  <option key={b} value={b}>
                    {b} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sort By Dropdown & Reset */}
          <div className="md:col-span-4 lg:col-span-3 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="w-full text-sm rounded-xl border border-white/10 bg-black/60 text-white py-2.5 px-3 focus:border-[#A8FF00]"
            >
              <option value="featured">Featured First</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="shrink-0 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-xs font-semibold text-stone-300 hover:border-red-400/40 hover:text-red-400 transition"
                title="Reset all filters"
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
                ? "bg-[#A8FF00] text-[#070A07] font-semibold shadow-[0_0_12px_rgba(168,255,0,0.4)]"
                : "border border-white/10 bg-black/40 text-stone-300 hover:border-white/30 hover:text-white"
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category.slug === cat.slug).length;
            if (count === 0) return null;
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(active ? "" : cat.slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[#A8FF00] text-[#070A07] font-semibold shadow-[0_0_12px_rgba(168,255,0,0.4)]"
                    : "border border-white/10 bg-black/40 text-stone-300 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count and Active Filters Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
        <p>
          Showing{" "}
          <span className="font-semibold text-white">
            {Math.min(visibleCount, sortedProducts.length)}
          </span>{" "}
          of <span className="font-semibold text-white">{sortedProducts.length}</span> matching equipment
          {sortedProducts.length !== products.length && (
            <span> ({products.length} total showroom items)</span>
          )}
        </p>

        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A8FF00]/30 bg-[#A8FF00]/10 px-3 py-1 text-[#A8FF00]">
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

          {selectedBrand && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300">
              Brand: {selectedBrand}
              <button
                type="button"
                onClick={() => setSelectedBrand("")}
                aria-label="Remove brand filter"
                className="hover:text-white"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          )}

          {search.trim() && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-purple-300">
              Search: &quot;{search.trim()}&quot;
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Remove search filter"
                className="hover:text-white"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          )}

          {stockStatus && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-stone-200">
              Stock: {stockStatus === "IN_STOCK" ? "In Stock" : stockStatus === "CHECK" ? "Check Availability" : stockStatus}
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

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-stone-400 hover:text-white underline underline-offset-2 ml-1"
            >
              Clear all
            </button>
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
            We couldn&apos;t find anything matching your filter criteria. Try adjusting your search term, selecting a different brand or clearing filters.
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
        <>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>

          {/* Pagination / Load More */}
          {visibleCount < sortedProducts.length && (
            <div className="mt-12 flex flex-col items-center justify-center space-y-4">
              <p className="text-xs text-stone-400">
                Viewing {visibleCount} of {sortedProducts.length} items
              </p>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#A8FF00] transition-all duration-300"
                  style={{
                    width: `${Math.round((visibleCount / sortedProducts.length) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="btn btn-ember px-8 py-3 text-xs tracking-wider"
                >
                  Load More Products ({sortedProducts.length - visibleCount} remaining)
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleCount(sortedProducts.length)}
                  className="rounded-xl border border-white/15 bg-black/40 px-5 py-3 text-xs font-semibold text-stone-300 hover:border-white/30 hover:text-white transition"
                >
                  Show All ({sortedProducts.length})
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
