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
  { file: "monitor-7-inch.jpg", slug: "monitor-7-inch" },
  { file: "monitor-9-inch.jpg", slug: "monitor-9-inch" },
  { file: "kuerl-subwoofer.jpg", slug: "kuerl-subwoofer" },
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
