type AssetImage = {
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
};

/**
 * Local product photograph → catalog slug.
 *
 * The filename is an asset identifier. It is not a price, and digits in the
 * filename are not shillings. Public prices come from the product API.
 * Customer prices come from GET /api/v1/me/prices/.
 *
 * When Django Admin already has an image URL, that URL wins.
 * Add a random file such as 483721.jpg by appending a row here and placing
 * the file in public/images/products/. Do not encode the price in the name.
 */
export const PRODUCT_ASSETS: readonly { file: string; slug: string }[] = [
  { file: "pioneer-ts-6900pro.jpg", slug: "pioneer-ts-6900pro" },
  { file: "pioneer-ts-z65f.jpg", slug: "pioneer-ts-z65f" },
  { file: "kuerl-subwoofer.jpg", slug: "kuerl-subwoofer" },
  { file: "monitor-9-inch.jpg", slug: "monitor-9-inch" },
  { file: "monitor-7-inch.jpg", slug: "monitor-7-inch" },
  { file: "pioneer-mvh-245bt.jpg", slug: "pioneer-mvh-245bt" },
  { file: "kenwood-kwd-x17.jpg", slug: "kenwood-kwd-x17" },
  { file: "sony-dsg-jl7.jpg", slug: "sony-dsg-jl7" },
  { file: "stv-5589.jpg", slug: "stv-5589" },
  { file: "stv-extra-bass-1162.jpg", slug: "stv-extra-bass-1162" },
  { file: "stv-5586.jpg", slug: "stv-5586" },
  { file: "stv-tagwood.jpg", slug: "stv-tagwood-board" },
  { file: "pioneer-ts-w3254.jpg", slug: "pioneer-ts-w3254-sub" },
  { file: "kenwood-12-sub.jpg", slug: "kenwood-12-subwoofer" },
  { file: "pioneer-ts-a6995r.jpg", slug: "pioneer-ts-a6995r" },
  { file: "sony-xs-fb6930.jpg", slug: "sony-xs-fb6930" },
  { file: "pioneer-ts-a3054.jpg", slug: "pioneer-ts-a3054-sub" },
  { file: "pioneer-ts-r6951s.jpg", slug: "pioneer-ts-r6951s" },
  { file: "pioneer-ts-b350pro.jpg", slug: "pioneer-ts-b350pro-bullet" },
  { file: "pioneer-ts-a6986s.jpg", slug: "pioneer-ts-a6986s" },
  { file: "nakamichi-nse6.jpg", slug: "nakamichi-nse6" },
  { file: "flux-neo260.jpg", slug: "flux-neo260" },
  { file: "pioneer-ts-a1696s.jpg", slug: "pioneer-ts-a1696s" },
  { file: "pioneer-ts-g1610f.jpg", slug: "pioneer-ts-g1610f" },
  { file: "vlang-underseat.jpg", slug: "vlang-underseat-subwoofer" },
  { file: "tweeter-coil-pair.jpg", slug: "apart-tweeter-coil-pair" },
  { file: "kenwood-4ch-amp.jpg", slug: "kenwood-1000w-4channel" },
  { file: "audiobank-ab43n.jpg", slug: "audiobank-ab43n" },
  { file: "pioneer-gm-e7004.jpg", slug: "pioneer-gm-e7004" },
  { file: "pioneer-gm-a6704.jpg", slug: "pioneer-gm-a6704" },
  { file: "boschmann-1500.jpg", slug: "boschmann-1500w" },
  { file: "stv-xlr-set.jpg", slug: "stv-xlr-connectors" },
  { file: "power-speakon.jpg", slug: "power-speakon-set" },
  { file: "speakon-good.jpg", slug: "speakon-connectors-premium" },
  { file: "speakon-small.jpg", slug: "speakon-connectors-small" },
  { file: "jack-to-jack.jpg", slug: "jack-to-jack-cable" },
  { file: "rca-jack-set.jpg", slug: "rca-plug-set" },
  { file: "rca-2by1.jpg", slug: "rca-2by1-cable" },
  { file: "rca-3x3.jpg", slug: "rca-3by3-cable" },
  { file: "speaker-cable-15mm.jpg", slug: "speaker-cable-15mm" },
  { file: "mic-cable-100m.jpg", slug: "stv-mic-cable-100m" },
  { file: "flat-twin-cable.jpg", slug: "flat-twin-electrical-cable" },
  { file: "devils-eye.jpg", slug: "devils-eye-led-screen" },
  { file: "led-smart-strip.jpg", slug: "led-smart-neon-strip" },
  { file: "led-flex-welcome.jpg", slug: "led-flexible-display" },
  { file: "hdmi-splitter.jpg", slug: "hdmi-splitter-1080p" },
  { file: "wall-mount.jpg", slug: "stv-t44-wall-mount" },
  { file: "stv-box-16gb.jpg", slug: "stv-4k-android-box-16gb" },
  { file: "mi-tv-stick.jpg", slug: "mi-tv-stick" },
  { file: "stv-mt-x708.jpg", slug: "stv-mt-x708-equalizer" },
  { file: "boschmann-eqx75.jpg", slug: "boschmann-eqx-75pro" },
  { file: "multimeter.jpg", slug: "stv-digital-multimeter" },
  { file: "mp-aa-3000.jpg", slug: "mp-aa-rechargeable-3000" },
  { file: "mp-charger.jpg", slug: "mp-standard-charger" },
  { file: "psu-12v15a.jpg", slug: "power-supply-12v-15a" },
  { file: "psu-12v30a.jpg", slug: "power-supply-12v-30a" },
  { file: "car-entertainment-9.jpg", slug: "car-entertainment-system-9" },
  { file: "car-multimedia.jpg", slug: "car-multimedia-system" },
  { file: "mp3-board.jpg", slug: "stv-mp3-audio-board" },
  { file: "pioneer-ts-w312d4.jpg", slug: "pioneer-ts-w312d4" },
  { file: "pioneer-ts-520.jpg", slug: "pioneer-ts-520" },
  { file: "fat-jack.jpg", slug: "fat-jack" },
  { file: "phone-jack-small.jpg", slug: "phone-jack-small" },
  { file: "electrical-cable-yellow.jpg", slug: "electrical-cable-yellow" },
  { file: "speaker-cable-gauge.jpg", slug: "speaker-cable-gauge" },
  { file: "stv-box-8gb.jpg", slug: "stv-box-8gb" },
  { file: "stv-box-red.jpg", slug: "stv-box-red" },
];

const bySlug = new Map(PRODUCT_ASSETS.map((asset) => [asset.slug, asset.file]));

export function productAssetPath(slug: string) {
  const file = bySlug.get(slug);
  return file ? `/images/products/${file}` : null;
}

export function catalogImages(slug: string, name: string, images: AssetImage[]) {
  if (images.length > 0) return images;
  const src = productAssetPath(slug);
  if (!src) return images;
  return [
    {
      image_url: src,
      alt_text: name,
      is_primary: true,
      sort_order: 0,
    },
  ];
}

export function displayImage(product: {
  slug: string;
  name: string;
  primary_image: AssetImage | null;
}) {
  if (product.primary_image) return product.primary_image;
  const images = catalogImages(product.slug, product.name, []);
  return images[0] ?? null;
}
