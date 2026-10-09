import Image from "next/image";
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
    <div className="grid lg:grid-cols-12">
      <div className="glass-panel relative z-10 mx-3 my-4 px-6 py-12 sm:mx-6 sm:px-9 lg:col-span-6 lg:my-16 lg:ml-[max(1rem,calc((100vw-1240px)/2))] lg:mr-[-5rem] lg:px-12 lg:py-16">
        <p className="label">The workshop</p>
        <h1 className="poster mt-4 font-display text-5xl sm:text-7xl lg:text-[5.5rem]">{business.business_name}</h1>
        <p className="mt-8 font-display text-xl tracking-[0.12em] text-ember">{business.tagline}</p>
        <div className="mt-10 grid max-w-xl gap-6 text-lg leading-8 text-mute">
          <p>
            Bassaddict Sounds KE is a professional car audio workshop. The work is powerful sound, quality equipment, and an install that belongs in the car.
          </p>
          <p>
            Systems, subwoofers, amplifiers, speakers, radios, displays, dashcams, lighting, and custom setups. What is listed is what the shop has published. A missing specification has not been entered.
          </p>
          <p>
            Nothing is paid on this website. You see the public price and enquire. Some customers also have a private price on their own account.
          </p>
          <p className="text-paper">{business.address}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn btn-ember" href="/products">
            Explore products
          </Link>
          <Link className="btn btn-line" href="/contact">
            Contact
          </Link>
        </div>
      </div>
      <div className="relative mx-3 min-h-[80vw] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:mx-6 lg:col-span-6 lg:mx-4 lg:min-h-[100svh]">
        <Image
          src="/images/gallery/pioneer-ts-w30040d4.jpg"
          alt="Magnet label reads TS-W30040D4, Champion series PRO, 2400W MAX, 800W NOM, 4.0 DVC."
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#070A07]/45 via-transparent to-[#A8FF00]/10" />
      </div>
    </div>
  );
}
