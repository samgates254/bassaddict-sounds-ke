import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getBusiness } from "@/lib/api/business";
import { siteOrigin } from "@/lib/seo";

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
    "Premium car audio systems and professional installations. Bassaddict Sounds KE, Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi.",
  openGraph: {
    type: "website",
    siteName: "Bassaddict Sounds KE",
    locale: "en_KE",
    title: "Bassaddict Sounds KE",
    description:
      "Premium car audio systems and professional installations on Luthuli Avenue, Nairobi.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { business } = await getBusiness();

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ember focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header business={business} />
        <main id="main">{children}</main>
        <Footer business={business} />
      </body>
    </html>
  );
}
