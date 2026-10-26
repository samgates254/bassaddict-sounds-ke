"use client";

import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatKes } from "@/lib/format";
import { cartEnquiryMessage, whatsappHref } from "@/lib/whatsapp";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, MessageCircle, ShieldCheck, Wrench, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
    hasUnpricedItems,
  } = useCart();

  const [origin, setOrigin] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const whatsappNumber = CANONICAL_WHATSAPP_NUMBER;
  const whatsappOrderMessage = cartEnquiryMessage(items, origin);
  const checkoutHref = whatsappHref(whatsappNumber, whatsappOrderMessage);

  return (
    <div className="site py-12 sm:py-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-stone-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white">Showroom</Link>
        <span>/</span>
        <span className="text-[#A8FF00]">Equipment Cart</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label">Order &amp; Quote Staging</p>
          <h1 className="poster mt-2 font-display text-5xl sm:text-7xl">Your Equipment Cart</h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-stone-400 hover:text-red-400 transition"
          >
            Clear all items
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="glass-panel mt-12 flex flex-col items-center justify-center p-12 text-center sm:p-20">
          <span className="grid size-20 place-items-center rounded-full border border-[#A8FF00]/25 bg-black/40 text-[#A8FF00] shadow-[0_0_30px_rgba(168,255,0,0.15)]">
            <ShoppingBag className="size-9" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-semibold text-white sm:text-3xl">
            Your shopping cart is empty
          </h2>
          <p className="mt-3 max-w-md text-base text-stone-400">
            Browse our catalogue of high-efficiency speakers, deep bass subwoofers, and high-power amplifiers.
          </p>
          <Link href="/products" className="btn btn-ember mt-8">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Explore Showroom
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Items Table */}
          <div className="lg:col-span-8">
            <div className="glass-panel overflow-hidden">
              <div className="border-b border-[#A8FF00]/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                Selected Equipment ({itemCount})
              </div>
              <ul className="divide-y divide-white/10" role="list">
                {items.map((item) => (
                  <li key={item.slug} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#121612]">
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
                      <div className="min-w-0">
                        <p className="label">{item.brand}</p>
                        <h3 className="font-display text-lg font-medium text-white">
                          <Link href={`/products/${item.slug}`} className="hover:text-[#A8FF00]">
                            {item.name}
                          </Link>
                        </h3>
                        {item.model_number && (
                          <p className="text-xs text-stone-400">{item.model_number}</p>
                        )}
                        <p className="mt-1 text-sm font-semibold text-stone-300">
                          {item.price ? formatKes(item.price) : "Price on request"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0">
                      <div className="flex items-center rounded-lg border border-white/15 bg-black/40">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-3 py-1.5 text-stone-300 hover:text-white"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="px-3 text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-3 py-1.5 text-stone-300 hover:text-white"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-display text-lg font-bold text-[#A8FF00]">
                          {item.price ? formatKes(String(Number(item.price) * item.quantity)) : "On request"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-full p-2 text-stone-400 hover:bg-white/10 hover:text-red-400 transition"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link href="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-400 hover:text-white">
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 sm:p-8">
              <h2 className="border-b border-[#A8FF00]/15 pb-4 font-display text-xl font-semibold text-white">
                Quotation Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-stone-400">
                  <span>Selected items ({itemCount})</span>
                  <span className="text-white font-medium">
                    KSh {new Intl.NumberFormat("en-KE").format(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Installation &amp; Tuning</span>
                  <span className="text-stone-300">Quote via WhatsApp</span>
                </div>
                {hasUnpricedItems && (
                  <p className="text-xs text-amber-300/80">
                    * Includes items with pricing provided on consultation.
                  </p>
                )}
                <div className="lime-rule pt-2" />
                <div className="flex items-baseline justify-between pt-2">
                  <span className="font-display text-base font-semibold text-white">Estimated Subtotal</span>
                  <span className="font-display text-2xl font-bold text-[#A8FF00]">
                    KSh {new Intl.NumberFormat("en-KE").format(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Verified Storefront Checkout Disclaimer */}
              <div className="mt-6 rounded-xl border border-white/10 bg-[#0f140f] p-4 text-xs leading-relaxed text-stone-300">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <MapPin className="size-4 text-[#A8FF00]" aria-hidden="true" />
                  Showroom Checkout Protocol
                </div>
                <p className="mt-2 text-stone-400">
                  Bassaddict Sounds KE finalizes equipment reservations, custom fitting appointments, and in-person payments at our Luthuli Avenue showroom.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa w-full gap-2 text-center text-sm"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Request Equipment Quote via WhatsApp
                </a>
              </div>

              <div className="mt-8 space-y-3 text-xs text-stone-400">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 text-[#A8FF00]" aria-hidden="true" />
                  <span>100% Genuine brand equipment guaranteed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Wrench className="size-4 text-[#A8FF00]" aria-hidden="true" />
                  <span>Professional installation available at Luthuli workshop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
