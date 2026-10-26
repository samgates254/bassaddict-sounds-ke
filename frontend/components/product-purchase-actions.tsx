"use client";

import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import { useState } from "react";
import { Plus, Minus, ShoppingBag, MessageCircle, Check, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { whatsappHref, productEnquiryMessage } from "@/lib/whatsapp";
import type { ProductDetail } from "@/lib/api/types";

import { displayImage } from "@/lib/product-assets";

export function ProductPurchaseActions({
  product,
  whatsappNumber = CANONICAL_WHATSAPP_NUMBER,
}: {
  product: ProductDetail;
  whatsappNumber?: string;
}) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const title = [product.brand, product.name].filter(Boolean).join(" ");
  const enquiryLink = whatsappHref(whatsappNumber, productEnquiryMessage(title));

  const handleAddToCart = () => {
    const img = displayImage(product);
    addItem(
      {
        slug: product.slug,
        name: product.name,
        brand: product.brand || product.category.name,
        price: product.public_price,
        image_url: img ? img.image_url : null,
        model_number: product.model_number,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Quantity & Add to Cart Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center rounded-2xl border border-white/15 bg-black/50 p-1">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid size-10 place-items-center rounded-xl text-stone-300 hover:bg-white/10 hover:text-white transition"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-display text-base font-semibold text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
            className="grid size-10 place-items-center rounded-xl text-stone-300 hover:bg-white/10 hover:text-white transition"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn flex-1 gap-2.5 px-6 min-h-12 ${
            added ? "btn-ember !bg-[#c2ff52]" : "btn-ember"
          }`}
        >
          {added ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              <span>Added to Cart ({quantity})</span>
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" aria-hidden="true" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Order Action */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <a
          href={enquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa flex-1 gap-2 text-center"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          <span>Order / Inquire on WhatsApp</span>
        </a>

        <a
          href="#request"
          className="btn btn-line px-5 text-center"
        >
          <span>Send Formal Brief</span>
        </a>
      </div>
    </div>
  );
}
