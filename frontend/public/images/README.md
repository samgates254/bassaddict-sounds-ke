# Image folders

Drop real Bassaddict Sounds KE photographs into these folders. The site does not invent product photos, and it does not read a price out of a filename.

```
frontend/public/images/
├── brand/      logo and mark files
├── hero/       homepage photographs
├── products/   one file per catalog product
├── gallery/    workshop photographs that are not the priced catalog
└── ads/        developer courtesy graphic
```

`brand/bassaddict-logo.png` is the supplied Bassaddict mark. The header uses that file. A filename is still not a price.

## Product files

A product image is an asset identifier. It points at a product slug. The slug points at the Django product. The price comes from that product.

```
483721.jpg
  → slug pioneer-ts-6900pro
  → Product(slug="pioneer-ts-6900pro")
  → backend public_price
```

The image filename is an asset identifier, NOT the product price.

If the owner changes the price in Django Admin, the filename stays the same. Customer prices still come only from `GET /api/v1/me/prices/` and are not stored in this folder.

Current map (`frontend/lib/product-assets.ts`):
Contains 67 genuine product entries (5 initial Bassaddict products + 62 authentic crops imported from the verified asset register):
- 5 Original catalog items: Pioneer TS-6900PRO, Pioneer TS-Z65F, KUERL 10-Inch Subwoofer, 9-Inch Monitor, 7-Inch Monitor
- 62 Imported verified equipment items: Pioneer subwoofers & coaxials, Kenwood receivers & amplifiers, Sony speakers, Nakamichi coaxials, Boschmann amplifiers & equalizers, Audiobank 5000W amp, STV receivers, XLR/speakon cables, flexible LED displays, etc.

Images are also mirrored in `frontend/public/products/` for direct resolution.
Admin image URLs override these local files. An empty catalog image falls back to the local file when the slug matches. The public price is still the API field.

These gallery files are not mapped to one product, because one picture shows more than one model or is not a catalog item:

- `pioneer-gm-d9701-d9705.jpg` shows both GM-D9701 and GM-D9705
- `pioneer-champion-pro.jpg` and `pioneer-ts-w30040d4.jpg`
- `pioneer-ts-a6968s.jpg`, `pioneer-ts-r1651s-2.jpg`, `pioneer-ts-r6951s.jpg`, `pioneer-ts-w32s4.jpg`
- `kuerl-panel.jpg`, `nrd-tweeter.jpg`, `home-pioneer-kenwood.jpg`

## Developer advert

Put one file in `ads/`:

- `developer-courtesy.webp`
- `developer-courtesy.png`
- `developer-courtesy.jpg`
- `developer-courtesy.jpeg`

The footer shows it beside “Designed & Developed by Sam Gates / Developer Courtesy”. It does not replace the shop header, and it does not use the shop WhatsApp number.

Shop enquiries use +254794069405. The developer line uses +254111374435.
