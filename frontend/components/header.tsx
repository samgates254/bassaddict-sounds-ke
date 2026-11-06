"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  MessageCircle,
  ShoppingBag,
  X,
  Phone,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { BusinessSettings } from "@/lib/api/types";
import { generalEnquiryMessage, whatsappHref } from "@/lib/whatsapp";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

const MAIN_NAV = [
  { href: "/products", label: "Catalogue" },
  { href: "/services", label: "Services & Tuning" },
  { href: "/build", label: "Custom Builds" },
  { href: "/gallery", label: "Workshop Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact & Bay" },
] as const;

export function Header({ business }: { business: BusinessSettings }) {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const whatsappNumber = business.whatsapp_number || CANONICAL_WHATSAPP_NUMBER;
  const whatsappLink = whatsappHref(whatsappNumber, generalEnquiryMessage());

  return (
    <div className="w-full">
      {/* 1. TOP UTILITY BAR (NATURAL & PROFESSIONAL) */}
      <div className="border-b border-white/10 bg-[#050705] text-[11px] text-[#A6B0A2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="size-3 text-[#A8FF00]" />
              Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/15" />
            <span className="hidden sm:flex items-center gap-1 text-stone-400">
              <Clock className="size-3 text-[#A8FF00]" />
              Mon — Sat: 8:30 AM — 6:30 PM
            </span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a
              href={`tel:${whatsappNumber}`}
              className="hidden md:inline-flex items-center gap-1 text-stone-300 hover:text-[#A8FF00] transition"
            >
              <Phone className="size-3 text-[#A8FF00]" />
              Direct Call: {whatsappNumber}
            </a>
            <span className="hidden md:inline h-3 w-px bg-white/15" />
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#A8FF00] hover:underline"
            >
              <MessageCircle className="size-3" />
              WhatsApp Helpdesk
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN STOREFRONT NAVIGATION WITH OFFICIAL BASSADICT LOGO */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080B08]/95 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Real BASSADICT Brand Logo */}
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <Image
              src="/images/brand/bassaddict-logo.png"
              alt="Bassaddict Sounds KE"
              width={220}
              height={86}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Clean Navigation */}
          <nav
            aria-label="Storefront Categories"
            className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-stone-200"
          >
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#A8FF00] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons: Cart, WhatsApp, Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex size-11 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="size-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-[10px] font-black text-black">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Consultation Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-11 items-center gap-2 rounded-xl bg-[#A8FF00] px-5 text-xs font-black uppercase tracking-wider text-[#070A07] shadow-[0_4px_20px_rgba(168,255,0,0.25)] transition hover:bg-[#b8ff26]"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp Consult</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex size-11 items-center justify-center rounded-xl border border-white/15 text-white"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#080B08] px-6 py-6">
            <nav className="flex flex-col gap-4 text-sm font-semibold tracking-wider text-white">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#A8FF00]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A8FF00] py-3 text-xs font-black uppercase tracking-wider text-[#070A07]"
                >
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp ({whatsappNumber})
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
