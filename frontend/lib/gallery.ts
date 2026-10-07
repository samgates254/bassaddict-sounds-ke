export type ShopPhoto = {
  src: string;
  alt: string;
  caption: string;
  frame: "hero" | "tall" | "wide" | "mid" | "sm";
};

/** Supplied equipment photographs. Not a priced catalog and not claimed installs. */
const photos: Omit<ShopPhoto, "alt">[] = [
  {
    src: "/images/gallery/pioneer-champion-pro.jpg",
    frame: "hero",
    caption: "Label reads Pioneer Champion series PRO.",
  },
  {
    src: "/images/gallery/pioneer-ts-w30040d4.jpg",
    frame: "tall",
    caption: "Magnet label reads TS-W30040D4, Champion series PRO, 2400W MAX, 800W NOM, 4.0 DVC.",
  },
  {
    src: "/images/gallery/kuerl-subwoofer.jpg",
    frame: "wide",
    caption:
      "Orange badge reads KUERL. Dust cap reads POWER SUPPLY DC 12V and WOOFER 10INCH 4OHM 150W RMS. Side reads HIGH PERFORMANCE SUBWOOFER.",
  },
  {
    src: "/images/gallery/pioneer-gm-d9701-d9705.jpg",
    frame: "wide",
    caption:
      "Boxes read Pioneer GM-D9701, Class D mono amplifier, 1 CH. CAN. 2400W Max, and Pioneer GM-D9705, 5/3 CH. CAN. 2000W Max, Class FD.",
  },
  {
    src: "/images/gallery/pioneer-ts-6900pro.jpg",
    frame: "mid",
    caption: 'Box reads Pioneer TS-6900PRO, high efficiency 2-way speaker, 600W MAX, 92dB, 6"×9".',
  },
  {
    src: "/images/gallery/pioneer-ts-z65f.jpg",
    frame: "mid",
    caption: "Box reads Pioneer TS-Z65F, 2-WAY SPEAKER, Hi-Res AUDIO.",
  },
  {
    src: "/images/gallery/pioneer-ts-w32s4.jpg",
    frame: "sm",
    caption: 'Box reads Pioneer TS-W32S4, 12"/30cm, 1500W Max, Champion series.',
  },
  {
    src: "/images/gallery/kuerl-panel.jpg",
    frame: "sm",
    caption: "Panel reads REMOTE, LOW LEVEL, HIGH LEVEL, POWER, and FUSE.",
  },
  {
    src: "/images/gallery/monitor-9-inch.jpg",
    frame: "mid",
    caption: 'Box title reads 9" TFT/LED Hi-Res Display Monitor.',
  },
  {
    src: "/images/gallery/monitor-7-inch.jpg",
    frame: "sm",
    caption: 'Box reads 7" TFT/LED Hi-Res Display Monitor, Headrest Shroud and Stand.',
  },
  {
    src: "/images/gallery/pioneer-ts-r6951s.jpg",
    frame: "sm",
    caption: "Box reads Pioneer TS-R6951S, 3-WAY SPEAKER.",
  },
  {
    src: "/images/gallery/pioneer-ts-a6968s.jpg",
    frame: "sm",
    caption: "Box reads Pioneer A-series TS-A6968S.",
  },
  {
    src: "/images/gallery/pioneer-ts-r1651s-2.jpg",
    frame: "mid",
    caption: "Box reads Pioneer TS-R1651S-2, High Sensitivity, 3-WAY SPEAKER, 300W MAX, 16cm.",
  },
  {
    src: "/images/gallery/nrd-tweeter.jpg",
    frame: "tall",
    caption:
      "Supplied photo of an NRD tweeter being fitted to a small enclosure. Not a priced catalog item.",
  },
  {
    src: "/images/gallery/home-pioneer-kenwood.jpg",
    frame: "wide",
    caption:
      "Supplied home photo showing a Pioneer subwoofer cabinet and a Kenwood unit. Not a priced catalog item, and not described as a Bassaddict installation.",
  },
];

export const SHOP_PHOTOS: ShopPhoto[] = photos.map((photo) => ({
  ...photo,
  alt: photo.caption,
}));
