import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { CartProvider } from "@/context/cart-context";
import { getBusiness } from "@/lib/api/business";
import { siteOrigin } from "@/lib/seo";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  title: {
    default: "Bassaddict Sounds KE | Premium Car Audio & Professional Installations",
    template: "%s | Bassaddict Sounds KE",
  },
  description:
    "Premium car audio systems, subwoofers, amplifiers, and professional installations. Bassaddict Sounds KE, Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi.",
  openGraph: {
    type: "website",
    siteName: "Bassaddict Sounds KE",
    locale: "en_KE",
    title: "Bassaddict Sounds KE | Pro Sound. Built To Move You.",
    description:
      "Premium car audio systems, active subwoofers, and custom vehicle sound fabrication on Luthuli Avenue, Nairobi.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { business } = await getBusiness();
  const whatsappNumber = business.whatsapp_number || CANONICAL_WHATSAPP_NUMBER;

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased text-[#F4F7EF] bg-[#070A07]`}>
        {/* Background ambient lighting */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <span className="absolute -left-[22rem] -top-[24rem] size-[48rem] animate-orb-lime-one rounded-full bg-[#A8FF00]/10 blur-[120px]" />
          <span className="absolute -right-[24rem] top-[10%] size-[52rem] animate-orb-lime-two rounded-full bg-[#A8FF00]/8 blur-[150px]" />
          <span className="absolute -bottom-[36rem] left-[20%] size-[56rem] animate-orb-lime-three rounded-full bg-[#8CFF00]/8 blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_48%_38%,rgba(168,255,0,0.08),rgba(7,10,7,0.85)_74%)]" />
        </div>

        {/* Accessibility Skip Link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#A8FF00] focus:px-5 focus:py-3 focus:text-[#070A07] font-semibold"
        >
          Skip to content
        </a>

        {/* Global Cart Provider */}
        <CartProvider>
          <Header business={business} />
          <main id="main">{children}</main>
          <Footer business={business} />
          <CartDrawer whatsappNumber={whatsappNumber} />
          <FloatingWhatsApp number={whatsappNumber} />
        </CartProvider>
      </body>
    </html>
  );
}
