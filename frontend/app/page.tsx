import Link from "next/link";

import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { getCategories, getProducts } from "@/lib/api/products";
import { getServices } from "@/lib/api/services";
import { pageMetadata } from "@/lib/seo";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Bassaddict Sounds KE | Premium Car Audio & Professional Installations",
  absoluteTitle: true,
  path: "/",
  description:
    "Premium car audio systems and professional installations. Speakers, amplifiers, subwoofers, and installs from Bassaddict Sounds KE on Luthuli Avenue, Nairobi.",
});

export default async function HomePage() {
  const [products, categories, services, businessResult] = await Promise.all([
    getProducts(),
    getCategories(),
    getServices(),
    getBusiness(),
  ]);
  const business = businessResult.business;
  const featured =
    products.ok ? products.data.filter((item) => item.featured).slice(0, 4) : [];
  const shown = featured.length ? featured : products.ok ? products.data.slice(0, 4) : [];

  return (
    <div>
      <section className="border-b border-line">
        <div className="site grid gap-10 py-14 md:grid-cols-[1.4fr_0.8fr] md:py-20">
          <div>
            <p className="font-display text-xl tracking-[0.12em] sm:text-3xl sm:tracking-[0.14em]">
              BASSADDICT SOUNDS KE
            </p>
            <h1 className="mt-4 break-words font-display text-4xl leading-[0.9] tracking-wide sm:text-6xl md:text-7xl">
              ADDICTED TO BASS.
              <span className="mt-2 block text-ember">DRIVEN BY SOUND.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper">
              Premium car audio systems & professional installations.
            </p>
            <p className="mt-3 max-w-xl text-mute">
              Speakers, amplifiers, subs, and the install that makes them sit in the car.
              The workshop is on Luthuli Avenue, Nairobi. Ask before anything is fitted.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products">Explore products</Button>
              <Button variant="line" href="/build">
                Build my sound system
              </Button>
              <WhatsAppButton number={business.whatsapp_number} message={generalEnquiryMessage()}>
                WhatsApp us
              </WhatsAppButton>
            </div>
          </div>
          <aside className="border border-line bg-panel p-6">
            <p className="label">Workshop</p>
            <p className="mt-4 font-display text-3xl leading-tight tracking-wide">
              Ground Floor, New Loitoktok House
            </p>
            <p className="mt-3 text-mute">{business.address}</p>
            <dl className="mt-6 grid gap-3 text-sm">
              <div className="flex justify-between gap-4 border-t border-line pt-3">
                <dt className="text-steel">Phone</dt>
                <dd>{business.phone}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-3">
                <dt className="text-steel">Email</dt>
                <dd className="text-right">{business.email}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-3">
                <dt className="text-steel">Payment</dt>
                <dd>Enquire first. No checkout.</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="site py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-wide">Featured products</h2>
          <Link href="/products" className="text-sm text-steel hover:text-paper">
            All products
          </Link>
        </div>
        {!products.ok ? (
          <ErrorState title="Unable to load products right now.">
            <p>Please check your connection and try again.</p>
          </ErrorState>
        ) : shown.length === 0 ? (
          <EmptyState title="The catalog is empty.">
            <p>Active products will show here once the shop publishes them in admin.</p>
          </EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-line bg-panel">
        <div className="site grid gap-8 py-14 md:grid-cols-3">
          <div>
            <p className="label">01</p>
            <h2 className="mt-3 font-display text-3xl tracking-wide">Equipment for the car</h2>
            <p className="mt-3 text-mute">
              Speakers, amplifiers, subs, screens, and the parts around them. Specs are
              the ones the shop enters, not guesses.
            </p>
          </div>
          <div>
            <p className="label">02</p>
            <h2 className="mt-3 font-display text-3xl tracking-wide">Installed, not dropped off</h2>
            <p className="mt-3 text-mute">
              Installation, tuning, and custom builds are part of the work. Tell the
              workshop the vehicle and what you want from the system.
            </p>
          </div>
          <div>
            <p className="label">03</p>
            <h2 className="mt-3 font-display text-3xl tracking-wide">A price you can ask for</h2>
            <p className="mt-3 text-mute">
              Public prices are on the product. Some customers also have a private
              price on their account. Nothing is charged on this site.
            </p>
          </div>
        </div>
      </section>

      <section className="site py-14">
        <h2 className="font-display text-4xl tracking-wide">Services</h2>
        {!services.ok ? (
          <div className="mt-6">
            <ErrorState title="Unable to load services right now.">
              <p>Please check your connection and try again.</p>
            </ErrorState>
          </div>
        ) : services.data.length === 0 ? (
          <p className="mt-4 text-mute">No active services are published yet.</p>
        ) : (
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {services.data.slice(0, 6).map((service) => (
              <li key={service.slug} className="flex items-baseline justify-between gap-4 py-4">
                <span className="font-display text-2xl tracking-wide">{service.name}</span>
                {service.featured ? <span className="label text-ember">Featured</span> : null}
              </li>
            ))}
          </ul>
        )}
        <Button className="mt-6" variant="line" href="/services">
          All services
        </Button>
      </section>

      <section className="bg-ember text-white">
        <div className="site flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              Custom work
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-wide">Build my sound system</h2>
            <p className="mt-2 max-w-xl text-white/85">
              Tell the workshop the car, the budget, and whether you want bass, volume,
              or a full rebuild. Bassaddict plans the install.
            </p>
          </div>
          <Link className="btn bg-ink text-paper" href="/build">
            Start the brief
          </Link>
        </div>
      </section>

      <section className="site py-14">
        <h2 className="font-display text-4xl tracking-wide">Categories</h2>
        {!categories.ok ? (
          <p className="mt-4 text-mute">Unable to load categories right now.</p>
        ) : categories.data.length === 0 ? (
          <p className="mt-4 text-mute">No active categories yet.</p>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.data.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="border border-line px-4 py-5 hover:border-steel"
              >
                <span className="font-display text-2xl tracking-wide">{category.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-line">
        <div className="site grid gap-8 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl tracking-wide">Installations</h2>
            <p className="mt-4 text-mute">
              Shop photographs are in the gallery. They are supplied equipment photos,
              not the priced catalog and not stock pictures.
            </p>
            <Button className="mt-6" variant="line" href="/gallery">
              Gallery
            </Button>
          </div>
          <div className="border border-line p-6">
            <h2 className="font-display text-4xl tracking-wide">Talk to the shop</h2>
            <p className="mt-3 text-mute">{business.address}</p>
            <WhatsAppButton
              className="mt-6"
              number={business.whatsapp_number}
              message={generalEnquiryMessage()}
            >
              WhatsApp {business.phone}
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
