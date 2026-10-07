import Link from "next/link";

import { getBusiness } from "@/lib/api/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description:
    "Bassaddict Sounds KE installs car audio in Nairobi: systems, subwoofers, amplifiers, speakers, radios, dashcams, lighting, and custom setups.",
});

export default async function AboutPage() {
  const { business } = await getBusiness();

  return (
    <div className="site max-w-3xl py-10">
      <p className="label">About</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">{business.business_name}</h1>
      <p className="mt-4 font-display text-2xl tracking-wide text-steel">{business.tagline}</p>
      <div className="mt-6 grid gap-4 text-lg text-mute">
        <p>
          Bassaddict Sounds KE is a professional car audio and sound solutions company
          focused on powerful sound, quality products, and professional installation.
        </p>
        <p>
          The work covers audio systems, subwoofers, amplifiers, speakers, radios and
          displays, dashcams, lighting, installation, and custom setups. What is listed
          on the site is what the shop has published. If a specification is missing, it
          has not been entered.
        </p>
        <p>
          Nothing is paid on this website. You look at a product, see the public price,
          and enquire. Some customers also have a private price on their own account.
          The workshop replies from Luthuli Avenue.
        </p>
        <p>The shop is at {business.address}.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn btn-ember" href="/products">
          Explore products
        </Link>
        <Link className="btn btn-line" href="/contact">
          Contact
        </Link>
      </div>
    </div>
  );
}
