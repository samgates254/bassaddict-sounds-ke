import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/button";
import { EnquiryForm } from "@/components/enquiry-form";
import { ErrorState } from "@/components/error-state";
import { ProductGallery } from "@/components/product-gallery";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { getMe } from "@/lib/api/auth";
import { getMyPrices, getProduct } from "@/lib/api/products";
import { formatKes, publicPriceLabel, stockLabel } from "@/lib/format";
import { catalogImages } from "@/lib/product-assets";
import { productEnquiryMessage } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

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
    `${name} from Bassaddict Sounds KE. Public price and installation on request.`;
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
  const [productResult, me, businessResult] = await Promise.all([
    getProduct(slug),
    getMe(),
    getBusiness(),
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
  const title = [product.brand, product.name].filter(Boolean).join(" ");

  return (
    <div>
      <div className="site grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          <ProductGallery images={images} name={product.name} />
        </div>
        <div className="lg:col-span-5 lg:pt-4">
          <p className="label">{product.brand || product.category.name}</p>
          <h1 className="poster mt-4 break-words font-display text-5xl sm:text-6xl">{product.name}</h1>
          {product.model_number ? <p className="mt-4 text-mute">{product.model_number}</p> : null}
          <p className="mt-10 text-[0.68rem] uppercase tracking-[0.2em] text-steel">Public price</p>
          <p className="num mt-2 font-display text-5xl font-medium tracking-tight text-paper">{publicPriceLabel(product)}</p>
          <p className="mt-3 text-sm text-steel">
            {product.price_type.replaceAll("_", " ")} · {stockLabel(product.stock_status)}
            {product.featured ? " · Featured" : ""}
          </p>
          {mine ? (
            <div className="mt-8 border-l border-ember pl-5">
              <p className="label text-ember">Your Bassaddict price</p>
              <p className="num mt-2 font-display text-4xl">{formatKes(mine.price)}</p>
              {mine.note ? <p className="mt-2 text-sm text-mute">{mine.note}</p> : null}
              <p className="mt-2 text-xs text-mute">This price is only on your account.</p>
            </div>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-3">
            <WhatsAppButton
              number={businessResult.business.whatsapp_number}
              message={productEnquiryMessage(title)}
            >
              Ask on WhatsApp
            </WhatsAppButton>
            <Button variant="line" href={`/products/${product.slug}#request`}>
              Request this product
            </Button>
          </div>
          {product.description ? (
            <p className="mt-12 max-w-md whitespace-pre-wrap text-lg leading-8 text-mute">{product.description}</p>
          ) : (
            <p className="mt-12 text-mute">No description has been published yet.</p>
          )}
          <Specs value={product.specifications} />
        </div>
      </div>
      <div className="site border-t border-white/10 py-16 lg:grid lg:grid-cols-12" id="request">
        <div className="lg:col-span-7 lg:col-start-6">
          <EnquiryForm
            signedIn={me.ok}
            whatsappNumber={businessResult.business.whatsapp_number}
            productSlug={product.slug}
            productName={product.name}
            lockType="PRODUCT"
            nextPath={`/products/${product.slug}`}
          />
        </div>
      </div>
    </div>
  );
}

function Specs({ value }: { value: unknown }) {
  if (
    value == null ||
    (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
  ) {
    return (
      <p className="mt-10 text-sm text-mute">No specifications have been published for this product yet.</p>
    );
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return (
      <dl className="mt-12">
        {Object.entries(value).map(([key, item]) => (
          <div key={key} className="grid gap-1 border-t border-white/10 py-4 sm:grid-cols-[9rem_1fr]">
            <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-steel">{key}</dt>
            <dd className="min-w-0 break-words font-display text-lg">{formatSpec(item)}</dd>
          </div>
        ))}
      </dl>
    );
  }
  return <p className="mt-10 whitespace-pre-wrap text-sm text-mute">{formatSpec(value)}</p>;
}

function formatSpec(value: unknown) {
  if (value == null) return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}
