"use client";

import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

export function FloatingWhatsApp({ number = CANONICAL_WHATSAPP_NUMBER }: { number?: string }) {
  const [dismissed, setDismissed] = useState(false);
  const href = whatsappHref(number, generalEnquiryMessage());

  return (
    <aside
      aria-label="WhatsApp live assistance"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6"
    >
      {!dismissed && (
        <div className="relative flex max-w-[280px] items-start gap-3 rounded-2xl border border-[#A8FF00]/25 bg-[#070A07]/95 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(168,255,0,0.12)] backdrop-blur-xl animate-fade-in sm:max-w-xs">
          <div className="size-2 mt-1.5 shrink-0 rounded-full bg-[#A8FF00] animate-pulse" />
          <div className="min-w-0 pr-4 text-xs">
            <p className="font-semibold text-white">Need equipment advice?</p>
            <p className="mt-0.5 text-stone-300">
              Chat directly with our audio engineer on WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss advice prompt"
            className="absolute right-2 top-2 rounded-full p-1 text-stone-400 hover:bg-white/10 hover:text-white"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bassaddict Sounds KE on WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full border border-[#A8FF00]/60 bg-[#070A07] text-[#A8FF00] shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_30px_rgba(168,255,0,0.25)] transition duration-300 hover:scale-105 hover:border-[#c2ff52] hover:bg-[#A8FF00] hover:text-[#070A07] focus:outline-none focus:ring-4 focus:ring-[#A8FF00]/30"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-[#A8FF00]/20 blur-sm group-hover:bg-[#A8FF00]/40 transition"
        />
        <MessageCircle className="relative size-7 transition-transform group-hover:scale-110" aria-hidden="true" />
        <span className="sr-only">Open WhatsApp Chat</span>
      </a>
    </aside>
  );
}
