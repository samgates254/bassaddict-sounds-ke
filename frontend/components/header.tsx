"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, ShoppingBag, X, Phone } from "lucide-react";
import { Mark } from "@/components/mark";
import { useCart } from "@/context/cart-context";
import type { BusinessSettings } from "@/lib/api/types";
import { telHref } from "@/lib/format";
import { generalEnquiryMessage, whatsappHref } from "@/lib/whatsapp";
import { NAV } from "@/lib/brand";
import { SOCIAL_PLATFORMS } from "@/lib/social";
import { SocialIcon } from "@/components/social-icons";

export function Header({ business }: { business: BusinessSettings }) {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const whatsappLink = whatsappHref(business.whatsapp_number, generalEnquiryMessage());

  return (
    <header className="sticky top-0 z-40 border-b border-[#A8FF00]/15 bg-[#070A07]/85 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
      <div className="site flex min-h-20 items-center justify-between gap-4 py-3">
        {/* Brand Logo */}
        <Link href="/" className="shrink-0 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#A8FF00]">
          <Mark className="h-10 w-auto sm:h-12" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "bg-[#A8FF00]/15 text-[#c2ff52]"
                    : "text-stone-300 hover:bg-[#A8FF00]/10 hover:text-[#c2ff52]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
          {/* Desktop Compact Social Channels */}
          <div className="hidden lg:flex items-center gap-1.5 border-r border-white/10 pr-2.5">
            {SOCIAL_PLATFORMS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Follow BASSADICT on ${s.platform} (${s.handle})`}
                aria-label={`Official ${s.platform} page`}
                className="group/social flex size-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-stone-400 transition hover:border-[#A8FF00]/50 hover:bg-[#A8FF00]/10 hover:text-white"
              >
                <SocialIcon
                  id={s.id}
                  className="size-3.5 transition-transform duration-200 group-hover/social:scale-110 motion-reduce:group-hover/social:scale-100"
                />
              </a>
            ))}
          </div>

          {/* Account */}
          <Link
            href="/account"
            className="hidden rounded-full border border-white/10 px-3.5 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-stone-300 transition hover:border-[#A8FF00]/40 hover:text-white md:inline"
          >
            Account
          </Link>

          {/* Cart Icon Button with Badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open equipment cart with ${itemCount} items`}
            className="group relative flex size-10 items-center justify-center rounded-full border border-[#A8FF00]/25 bg-black/40 text-stone-200 transition hover:border-[#A8FF00] hover:bg-[#A8FF00]/10 hover:text-[#A8FF00] sm:size-11"
          >
            <ShoppingBag className="size-4 sm:size-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-[0.65rem] font-bold text-[#070A07] shadow-[0_0_12px_rgba(168,255,0,0.8)]">
                {itemCount}
              </span>
            )}
          </button>

          {/* WhatsApp Action */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp assistance"
            className="btn btn-wa !min-h-10 !px-3.5 hidden sm:inline-flex text-[0.68rem]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="grid size-10 place-items-center rounded-full border border-white/15 bg-black/40 text-stone-300 hover:text-white lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Drawer */}
          <div className="fixed inset-y-0 right-0 z-10 flex w-full max-w-sm flex-col border-l border-[#A8FF00]/20 bg-[#070A07] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#A8FF00]/15 pb-4">
              <Mark className="h-8 w-auto" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="rounded-full p-2 text-stone-400 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 font-display text-2xl font-medium tracking-tight transition ${
                      active
                        ? "bg-[#A8FF00]/15 text-[#A8FF00]"
                        : "text-stone-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-4 border-t border-white/10 pt-4">
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-2xl font-medium text-stone-200 hover:bg-white/5 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="size-5 text-[#A8FF00]" aria-hidden="true" />
                    Equipment Cart
                  </span>
                  {itemCount > 0 && (
                    <span className="rounded-full bg-[#A8FF00] px-2.5 py-0.5 text-xs font-bold text-[#070A07]">
                      {itemCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 font-display text-2xl font-medium text-stone-200 hover:bg-white/5 hover:text-white"
                >
                  My Account
                </Link>
              </div>

              {/* Mobile Drawer Social Channels */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="px-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#A8FF00]">
                  Follow BASSADICT
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2 px-1">
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <a
                      key={platform.id}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs font-semibold text-stone-200 transition hover:border-[#A8FF00]/60 hover:bg-[#A8FF00]/15 hover:text-[#A8FF00]"
                      aria-label={`${platform.platform} (${platform.handle})`}
                    >
                      <span style={{ color: platform.brandColor }}>
                        <SocialIcon id={platform.id} className="size-4 shrink-0" />
                      </span>
                      <span className="truncate">{platform.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            <div className="border-t border-[#A8FF00]/15 pt-5 space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa w-full gap-2 text-center"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp {business.phone}
              </a>

              <a
                href={telHref(business.phone)}
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-xs tracking-wider text-stone-300 hover:text-white"
              >
                <Phone className="size-3.5" aria-hidden="true" />
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
