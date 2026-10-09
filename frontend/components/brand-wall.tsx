import Image from "next/image";

const BRANDS = [
  { name: "Alpine", asset: "alpine" },
  { name: "Audiobank", asset: "audiobank", onDark: true },
  { name: "Boschmann", asset: "boschmann" },
  { name: "Focal", asset: "focal" },
  { name: "Hertz", asset: "hertz" },
  { name: "Infinity", asset: "infinity" },
  { name: "JBL", asset: "jbl" },
  { name: "JL Audio", asset: "jl-audio" },
  { name: "JVC", asset: "jvc" },
  { name: "Kicker", asset: "kicker" },
  { name: "Kicker Performance Audio", asset: "kicker-performance" },
  { name: "Nakamichi", asset: "nakamichi", onDark: true },
  { name: "NRD Audio", asset: "nrd-audio" },
  { name: "ProCar Sound & Security", asset: "procar" },
  { name: "Rockford Fosgate", asset: "rockford-fosgate" },
  { name: "Skar Audio", asset: "skar-audio" },
  { name: "Sony", asset: "sony" },
  { name: "STV", asset: "stv" },
];

export function BrandWall() {
  const brandLogos = (duplicate: boolean) => (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center gap-10 px-5 sm:gap-16 sm:px-8"
    >
      {BRANDS.map((brand) => (
        <li
          key={brand.asset}
          className="flex h-24 w-36 shrink-0 items-center justify-center sm:h-28 sm:w-44"
        >
          <Image
            src={`/images/brands/${brand.asset}.png`}
            alt={duplicate ? "" : brand.name}
            width={180}
            height={90}
            className={`max-h-16 w-full object-contain opacity-100 drop-shadow-[0_0_10px_rgba(168,255,0,0.12)] transition duration-300 hover:scale-105 hover:drop-shadow-[0_0_16px_rgba(168,255,0,0.32)] sm:max-h-20 ${brand.onDark ? "brightness-0 invert" : ""}`}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-labelledby="brand-wall-title"
      className="border-t border-[#A8FF00]/20 bg-[#0A0E0A] py-16 sm:py-20"
    >
      <div>
        <div className="site mb-8 max-w-2xl sm:mb-10">
          <p className="label">Trusted names in audio</p>
          <h2
            id="brand-wall-title"
            className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Sound from brands that move you.
          </h2>
        </div>
        <div
          aria-label="Audio brands"
          className="brand-marquee overflow-hidden"
          role="region"
        >
          <div className="brand-marquee-track flex w-max">
            {brandLogos(false)}
            {brandLogos(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
