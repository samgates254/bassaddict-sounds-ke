"use client";

import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatKes } from "@/lib/format";
import { whatsappHref, cartEnquiryMessage } from "@/lib/whatsapp";

export function CartDrawer({ whatsappNumber = CANONICAL_WHATSAPP_NUMBER }: { whatsappNumber?: string }) {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    hasUnpricedItems,
    isCartOpen,
    closeCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const whatsappOrderMessage = cartEnquiryMessage(items, origin);
  const checkoutHref = whatsappHref(whatsappNumber, whatsappOrderMessage);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#A8FF00]/20 bg-[#070A07] shadow-[0_0_80px_rgba(0,0,0,0.9)] animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#A8FF00]/15 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-[#A8FF00]/10 text-[#A8FF00]">
              <ShoppingBag className="size-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight text-white">
                Equipment Cart
              </h2>
              <p className="text-xs text-stone-400">
                {itemCount} {itemCount === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-stone-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full border border-[#A8FF00]/20 bg-black/40 text-[#A8FF00]">
                <ShoppingBag className="size-7 opacity-75" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-white">
                Your cart is empty
              </h3>
              <p className="mt-2 max-w-xs text-sm text-stone-400">
                Explore our showroom collection of professional car audio, subwoofers, and amplifiers.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="btn btn-ember mt-6"
              >
                Explore Showroom
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10" role="list">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-4">
                  {/* Thumbnail */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#121612]">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-xs font-semibold text-stone-500">
                        {item.brand || "AUDIO"}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm font-medium text-white hover:text-[#A8FF00] line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-stone-500 hover:text-red-400 p-1 transition"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-stone-400">{item.brand}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-white/15 bg-black/40">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-2.5 py-1 text-stone-300 hover:text-white"
                        >
                          <Minus className="size-3" aria-hidden="true" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2.5 py-1 text-stone-300 hover:text-white"
                        >
                          <Plus className="size-3" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-sm font-semibold text-[#A8FF00]">
                          {item.price ? formatKes(String(Number(item.price) * item.quantity)) : "On request"}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with WhatsApp Checkout Handoff */}
        {items.length > 0 && (
          <div className="border-t border-[#A8FF00]/15 bg-black/60 p-6 backdrop-blur-xl">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.16em] text-stone-400">
                Estimated Total
              </span>
              <div className="text-right">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  KSh {new Intl.NumberFormat("en-KE").format(totalPrice)}
                </span>
                {hasUnpricedItems && (
                  <p className="text-[0.65rem] text-stone-400">
                    + Items with price on request
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#0f140f] p-3 text-[0.72rem] leading-relaxed text-stone-300">
              <strong className="text-white">Shop Order Workflow:</strong> Click below to send your itemized equipment list directly to our Luthuli Avenue team on WhatsApp for availability confirmation, fitting options, and reservation.
            </div>

            <div className="mt-5 grid gap-2.5">
              <a
                href={checkoutHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa w-full gap-2 text-center"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Request Equipment Quote via WhatsApp
              </a>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-red-400 transition"
                >
                  Clear cart
                </button>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center gap-1 text-xs text-[#A8FF00] hover:underline"
                >
                  View full cart page
                  <ArrowRight className="size-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
