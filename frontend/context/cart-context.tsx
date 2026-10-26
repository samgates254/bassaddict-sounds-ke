"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type CartItem = {
  slug: string;
  name: string;
  brand: string;
  price: string | null;
  image_url: string | null;
  quantity: number;
  model_number?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
  hasUnpricedItems: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "bassaddict_cart_v1";
const MAX_ITEM_QUANTITY = 99;

/**
 * Defensively validate and sanitize item data from untrusted sources
 * such as localStorage or external inputs.
 */
function sanitizeCartItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  if (typeof obj.slug !== "string" || !obj.slug.trim()) return null;
  if (typeof obj.name !== "string" || !obj.name.trim()) return null;

  const rawQty = Number(obj.quantity);
  const quantity = Number.isFinite(rawQty)
    ? Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.floor(rawQty)))
    : 1;

  let price: string | null = null;
  if (obj.price != null && obj.price !== "") {
    const numPrice = Number(obj.price);
    if (Number.isFinite(numPrice) && numPrice >= 0) {
      price = String(numPrice);
    }
  }

  const brand = typeof obj.brand === "string" ? obj.brand.slice(0, 100) : "";
  const image_url =
    typeof obj.image_url === "string" && obj.image_url.trim() ? obj.image_url.trim() : null;
  const model_number =
    typeof obj.model_number === "string" && obj.model_number.trim()
      ? obj.model_number.trim().slice(0, 100)
      : undefined;

  return {
    slug: obj.slug.trim(),
    name: obj.name.trim().slice(0, 200),
    brand,
    price,
    image_url,
    quantity,
    ...(model_number ? { model_number } : {}),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const sanitized = parsed
            .map(sanitizeCartItem)
            .filter((item): item is CartItem => item !== null);
          setItems(sanitized);
        }
      }
    } catch {
      // Discard corrupted or malformed localStorage silently
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage quota or privacy sandbox errors
    }
  }, [items, mounted]);

  const addItem = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    const rawQty = Math.floor(Number(quantity) || 1);
    const validQty = Math.min(MAX_ITEM_QUANTITY, Math.max(1, rawQty));

    const sanitizedBase = sanitizeCartItem({ ...product, quantity: validQty });
    if (!sanitizedBase) return;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.slug === sanitizedBase.slug);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(
          MAX_ITEM_QUANTITY,
          updated[existingIndex].quantity + validQty
        );
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      }
      return [...prev, sanitizedBase];
    });
    setIsCartOpen(true);
  };

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    const rawQty = Math.floor(Number(quantity) || 0);
    if (rawQty <= 0) {
      removeItem(slug);
      return;
    }
    const clampedQty = Math.min(MAX_ITEM_QUANTITY, rawQty);
    setItems((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, quantity: clampedQty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const { totalPrice, hasUnpricedItems } = useMemo(() => {
    let sum = 0;
    let unpriced = false;
    for (const item of items) {
      if (item.price != null && !Number.isNaN(Number(item.price))) {
        sum += Number(item.price) * item.quantity;
      } else {
        unpriced = true;
      }
    }
    return { totalPrice: sum, hasUnpricedItems: unpriced };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
        hasUnpricedItems,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
