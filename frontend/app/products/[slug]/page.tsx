import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Wrench, MapPin } from "lucide-react";

import { Button } from "@/components/button";
import { EnquiryForm } from "@/components/enquiry-form";
import { ErrorState } from "@/components/error-state";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { ProductPurchaseActions } from "@/components/product-purchase-actions";
import { getBusiness } from "@/lib/api/business";
import { getMe } from "@/lib/api/auth";
import { getMyPrices, getProduct, getProducts } from "@/lib/api/products";
import { formatKes, publicPriceLabel, stockLabel } from "@/lib/format";
import { catalogImages } from "@/lib/product-assets";
import { pageMetadata } from "@/lib/seo";
import { SOCIAL_PLATFORMS } from "@/lib/social";
import { SocialIcon } from "@/components/social-icons";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product.ok) return { title: "Product" };
  const name = [product.data.brand, product.data.name].filter(Boolean).join(" ");
  const description =
    product.data.description ||
    `${name} from Bassaddict Sounds KE. Genuine equipment, showroom auditioning and installation on Luthuli Avenue, Nairobi.`;
  const photo = catalogImages(slug, name || "Product", product.data.images)[0];
  return pageMetadata({
    title: name || "Product",
    path: `/products/${slug}`,
    description,
    image: photo
      ? { url: photo.image_url, alt: photo.alt_text || name || "Product" }
      : null,
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [productResult, me, businessResult, allProductsResult] = await Promise.all([
    getProduct(slug),
    getMe(),
    getBusiness(),
    getProducts(),
  ]);

  if (!productResult.ok) {
    if (productResult.status === 404) notFound();
    return (
      <div className="site py-16">
        <ErrorState title="Unable to load this product." heading="h1">
          <p>Please check your connection and try again.</p>
        </ErrorState>
      </div>
    );
  }

  const product = productResult.data;
  const images = catalogImages(product.slug, product.name, product.images);
  const prices = me.ok ? await getMyPrices() : null;
  const mine =
    prices && prices.ok ? prices.data.find((item) => item.product === product.slug) : undefined;

  const whatsappNumber = businessResult.business.whatsapp_number || "0794069405";

  // Related products from same category or other showroom items
  const relatedProducts = allProductsResult.ok
    ? allProductsResult.data
        .filter((p) => p.slug !== product.slug)
        .slice(0, 3)
    : [];

  return (
    <div className="site py-10 sm:py-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-stone-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition">Showroom</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-white transition">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-[#A8FF00] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={images} name={product.name} />

          {/* Value Badges */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2.5 text-xs text-stone-300">
              <ShieldCheck className="size-4 text-[#A8FF00] shrink-0" aria-hidden="true" />
              <span>100% Genuine Audio Equipment</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-300">
              <Wrench className="size-4 text-[#A8FF00] shrink-0" aria-hidden="true" />
              <span>Professional Fitting on Luthuli Ave</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-300">
              <MapPin className="size-4 text-[#A8FF00] shrink-0" aria-hidden="true" />
              <span>Audition in Showroom Before Install</span>
            </div>
          </div>

          {/* Lightweight Social Channel Discovery */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#A8FF00]">
                  Watch Installations Live
                </p>
                <p className="mt-0.5 text-xs text-stone-300">
                  See bench test auditions &amp; vehicle builds on our official channels.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${platform.platform} (${platform.handle})`}
                    aria-label={`Watch on ${platform.platform}`}
                    className="group flex size-8 items-center justify-center rounded-full border border-white/10 bg-[#070A07] transition hover:border-[#A8FF00]/60 hover:bg-[#A8FF00]/15 hover:scale-110 motion-reduce:hover:scale-100"
                  >
                    <SocialIcon
                      id={platform.id}
                      className="size-3.5 transition-colors group-hover:text-white"
                      style={{ color: platform.brandColor }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info and Purchase Actions */}
        <div className="glass-panel p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="label">{product.brand || product.category.name}</span>
              <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-stone-300">
                {stockLabel(product.stock_status)}
              </span>
            </div>

            <h1 className="poster mt-3 break-words font-display text-4xl sm:text-5xl text-white">
              {product.name}
            </h1>

            {product.model_number && (
              <p className="mt-2 text-sm text-stone-400">Model: {product.model_number}</p>
            )}

            {/* Price Section */}
            <div className="mt-6 border-y border-[#A8FF00]/15 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-400">
                Showroom Public Price
              </p>
              <p className="num mt-1 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#A8FF00]">
                {publicPriceLabel(product)}
              </p>
              <p className="mt-2 text-xs text-stone-400">
                Installation and tuning quoted separately based on vehicle model.
              </p>
            </div>

            {/* Signed-in Customer Price */}
            {mine && (
              <div className="mt-6 rounded-2xl border border-ember/40 bg-[#A8FF00]/10 p-4">
                <p className="label text-[#A8FF00]">Your Bassaddict Account Price</p>
                <p className="num mt-1 font-display text-3xl font-bold text-white">{formatKes(mine.price)}</p>
                {mine.note && <p className="mt-1 text-xs text-stone-300">{mine.note}</p>}
                <p className="mt-2 text-[0.65rem] text-stone-400">
                  This exclusive negotiated price is tied specifically to your customer profile.
                </p>
              </div>
            )}

            {/* Interactive Purchase Controls */}
            <ProductPurchaseActions
              product={product}
              whatsappNumber={whatsappNumber}
            />

            {/* Description */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <h2 className="font-display text-lg font-semibold text-white">Equipment Overview</h2>
              {product.description ? (
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-stone-300">
                  {product.description}
                </p>
              ) : (
                <p className="mt-3 text-sm text-stone-400">
                  Detailed technical specifications for this unit are catalogued below.
                </p>
              )}
            </div>

            {/* Technical Specifications */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <h2 className="font-display text-lg font-semibold text-white">Technical Specifications</h2>
              <Specs value={product.specifications} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-[#A8FF00]/15 pt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="label">Recommended Audio Setup</p>
              <h2 className="poster mt-2 font-display text-3xl sm:text-5xl">Related Equipment</h2>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#A8FF00] hover:underline sm:flex"
            >
              View Full Catalog &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        </section>
      )}

      {/* Formal Enquiry Section */}
      <section className="mt-24 border-t border-[#A8FF00]/15 pt-16" id="request">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">Direct Consultation</p>
            <h2 className="poster mt-3 font-display text-4xl sm:text-5xl">Request Equipment or Fitting</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              Submit your vehicle details and specific installation preferences. Our sound engineers review your request and reply with a formal quote and scheduled fitting slot.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 text-xs text-stone-400">
              <strong className="text-white block mb-1">Showroom Location:</strong>
              {businessResult.business.address}
            </div>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm
              signedIn={me.ok}
              whatsappNumber={whatsappNumber}
              productSlug={product.slug}
              productName={product.name}
              lockType="PRODUCT"
              nextPath={`/products/${product.slug}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Specs({ value }: { value: unknown }) {
  if (Array.isArray(value) && value.length > 0) {
    return (
      <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/30 p-4 text-xs">
        {value.map((item, idx) => {
          if (item && typeof item === "object" && "label" in item && "value" in item) {
            return (
              <div key={idx} className="grid grid-cols-2 py-2.5">
                <dt className="text-stone-400 font-medium">{String(item.label)}</dt>
                <dd className="text-right font-display text-white">{String(item.value)}</dd>
              </div>
            );
          }
          return null;
        })}
      </dl>
    );
  }
  if (
    value == null ||
    (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
  ) {
    return (
      <p className="mt-4 text-xs text-stone-400">
        Inquire on WhatsApp or visit our Luthuli showroom for detailed bench test specifications.
      </p>
    );
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return (
      <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/30 p-4 text-xs">
        {Object.entries(value).map(([key, item]) => (
          <div key={key} className="grid grid-cols-2 py-2.5">
            <dt className="text-stone-400 font-medium">{key}</dt>
            <dd className="text-right font-display text-white">{formatSpec(item)}</dd>
          </div>
        ))}
      </dl>
    );
  }
  return <p className="mt-4 text-xs text-stone-300">{formatSpec(value)}</p>;
}

function formatSpec(value: unknown) {
  if (value == null) return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}
