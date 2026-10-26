import type { Category, ProductDetail, ProductListItem } from "@/lib/api/types";

export const FALLBACK_CATEGORIES: Category[] = [
  {
    "slug": "speakers",
    "name": "Speakers & Coaxials",
    "description": "Coaxials, component sets, bullet tweeters and high-res speakers.",
    "sort_order": 1
  },
  {
    "slug": "subwoofers",
    "name": "Subwoofers & Bass",
    "description": "12-inch subwoofers, underseat units and high-power bass drivers.",
    "sort_order": 2
  },
  {
    "slug": "amplifiers",
    "name": "Power Amplifiers",
    "description": "Class-D mono, 2-channel and 4-channel power amplifiers for high SPL builds.",
    "sort_order": 3
  },
  {
    "slug": "car-radios",
    "name": "Car Radios & Receivers",
    "description": "Digital media receivers, Bluetooth units, USB MP3 players and amplifier boards.",
    "sort_order": 4
  },
  {
    "slug": "monitors",
    "name": "Displays & In-Dash Monitors",
    "description": "High-resolution in-dash TFT/LED touchscreens, headrest monitors and multimedia units.",
    "sort_order": 5
  },
  {
    "slug": "cables-connectors",
    "name": "Cables & Connectors",
    "description": "Speaker cable, mic cable, RCA and jack leads, speakons and XLR connectors.",
    "sort_order": 6
  },
  {
    "slug": "lighting-accessories",
    "name": "Lighting & Accessories",
    "description": "Programmable flexible LED screens, smart neon strips, HDMI splitters and wall mounts.",
    "sort_order": 7
  },
  {
    "slug": "electronics-power",
    "name": "Electronics & Power",
    "description": "Android TV boxes, 7-band equalizers, multimeters, power supplies and rechargeable cells.",
    "sort_order": 8
  }
];

export const FALLBACK_PRODUCTS: ProductDetail[] = [
  {
    "id": 1,
    "name": "Pioneer TS-6900PRO High Efficiency Speaker",
    "slug": "pioneer-ts-6900pro",
    "brand": "Pioneer",
    "model_number": "TS-6900PRO",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-6900PRO 6x9-inch 2-Way Coaxial Speaker. Designed for serious sound pressure levels with high sensitivity and crystal clear highs.",
    "specifications": {
      "Size": "6x9 inch",
      "Max Power": "600W",
      "RMS Power": "100W",
      "Sensitivity": "92 dB",
      "Frequency Response": "29 Hz - 40 kHz"
    },
    "public_price": "14500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-6900pro.jpg",
      "alt_text": "Pioneer TS-6900PRO High Efficiency Speaker",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-6900pro.jpg",
        "alt_text": "Pioneer TS-6900PRO High Efficiency Speaker",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 2,
    "name": "Pioneer TS-Z65F 2-Way Hi-Res Speaker",
    "slug": "pioneer-ts-z65f",
    "brand": "Pioneer",
    "model_number": "TS-Z65F",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-Z65F Hi-Res Audio 6.5-inch 2-Way Coaxial Speaker. Audiophile-grade precision, Twaron cone, and smooth open-staging sound reproduction.",
    "specifications": {
      "Size": "6.5 inch",
      "Audio": "Hi-Res Certified",
      "Max Power": "330W",
      "RMS Power": "110W",
      "Frequency Response": "32 Hz - 96 kHz"
    },
    "public_price": "28000.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-z65f.jpg",
      "alt_text": "Pioneer TS-Z65F 2-Way Hi-Res Speaker",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-z65f.jpg",
        "alt_text": "Pioneer TS-Z65F 2-Way Hi-Res Speaker",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 3,
    "name": "KUERL 10-Inch High Performance Active Subwoofer",
    "slug": "kuerl-subwoofer",
    "brand": "KUERL",
    "model_number": "K-1008APR",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "KUERL 10-inch Underseat Active Subwoofer with built-in high-output amplifier. Fits under vehicle seats or compact boot spaces for tight, clean low-end punch.",
    "specifications": {
      "Woofer": "10 inch 4 Ohm",
      "RMS Power": "150W RMS",
      "Max Power": "600W",
      "Voltage": "DC 12V",
      "Controls": "Remote Bass Level, LPF, Gain"
    },
    "public_price": "16500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/kuerl-subwoofer.jpg",
      "alt_text": "KUERL 10-Inch High Performance Active Subwoofer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kuerl-subwoofer.jpg",
        "alt_text": "KUERL 10-Inch High Performance Active Subwoofer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 4,
    "name": "9-Inch TFT/LED Hi-Res Display Monitor",
    "slug": "monitor-9-inch",
    "brand": "Bassaddict Audio",
    "model_number": "TM-900HD",
    "category": {
      "name": "Displays & In-Dash Monitors",
      "slug": "monitors"
    },
    "description": "9-inch TFT/LED High-Resolution In-Car Display Monitor. Multi-source video inputs for reverse cameras, media players, and headrest installations.",
    "specifications": {
      "Display": "9-inch LED Backlit",
      "Resolution": "1024 x 600",
      "Inputs": "Dual AV Video",
      "Mount": "Dashboard Stand & Headrest Shroud"
    },
    "public_price": "12500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/monitor-9-inch.jpg",
      "alt_text": "9-Inch TFT/LED Hi-Res Display Monitor",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/monitor-9-inch.jpg",
        "alt_text": "9-Inch TFT/LED Hi-Res Display Monitor",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 5,
    "name": "7-Inch TFT/LED Hi-Res Display Monitor",
    "slug": "monitor-7-inch",
    "brand": "Bassaddict Audio",
    "model_number": "TM-700HD",
    "category": {
      "name": "Displays & In-Dash Monitors",
      "slug": "monitors"
    },
    "description": "7-inch TFT/LED High-Resolution Display Monitor with headrest shroud and stand. Crisp display for reverse parking view and passenger entertainment.",
    "specifications": {
      "Display": "7-inch LED Backlit",
      "Resolution": "800 x 480",
      "Inputs": "AV Video + Reverse Trigger",
      "Mount": "Headrest Shroud & Stand"
    },
    "public_price": "8500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/monitor-7-inch.jpg",
      "alt_text": "7-Inch TFT/LED Hi-Res Display Monitor",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/monitor-7-inch.jpg",
        "alt_text": "7-Inch TFT/LED Hi-Res Display Monitor",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 6,
    "name": "Pioneer MVH-245BT Digital Media Receiver",
    "slug": "pioneer-mvh-245bt",
    "brand": "Pioneer",
    "model_number": "MVH-245BT",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "Single-DIN digital media receiver with USB and Bluetooth, shown in its retail packaging.",
    "specifications": {
      "Format": "Single-DIN media receiver",
      "Connectivity": "USB, Bluetooth (per packaging)",
      "Playback": "iPod / iPhone / Android ready (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-mvh-245bt.jpg",
      "alt_text": "Pioneer MVH-245BT Digital Media Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-mvh-245bt.jpg",
        "alt_text": "Pioneer MVH-245BT Digital Media Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 7,
    "name": "Kenwood KWD-X17 Bluetooth Receiver",
    "slug": "kenwood-kwd-x17",
    "brand": "Kenwood",
    "model_number": "KWD-X17",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "Kenwood Bluetooth car receiver, boxed with remote control as photographed.",
    "specifications": {
      "Connectivity": "Bluetooth (per packaging)",
      "Includes": "Remote control"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/kenwood-kwd-x17.jpg",
      "alt_text": "Kenwood KWD-X17 Bluetooth Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kenwood-kwd-x17.jpg",
        "alt_text": "Kenwood KWD-X17 Bluetooth Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 8,
    "name": "Sony-Style DSG-JL7 Receiver",
    "slug": "sony-dsg-jl7",
    "brand": "",
    "model_number": "DSG-JL7",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "DSG-JL7 in-dash receiver with remote, photographed in retail packaging. Brand styling on packaging requires confirmation.",
    "specifications": {
      "Includes": "Remote control"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/sony-dsg-jl7.jpg",
      "alt_text": "Sony-Style DSG-JL7 Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/sony-dsg-jl7.jpg",
        "alt_text": "Sony-Style DSG-JL7 Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 9,
    "name": "STV 5589 MP3 Receiver",
    "slug": "stv-5589",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 5589 MP3 car receiver with USB playback, as shown in its retail box.",
    "specifications": {
      "Playback": "MP3 / USB (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-5589.jpg",
      "alt_text": "STV 5589 MP3 Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-5589.jpg",
        "alt_text": "STV 5589 MP3 Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 10,
    "name": "STV Extra Bass 1162 Receiver",
    "slug": "stv-extra-bass-1162",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 1162 receiver with extra-bass branding and front USB, boxed as photographed.",
    "specifications": {
      "Playback": "MP3, front USB (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-extra-bass-1162.jpg",
      "alt_text": "STV Extra Bass 1162 Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-extra-bass-1162.jpg",
        "alt_text": "STV Extra Bass 1162 Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 11,
    "name": "STV 5586 MP3 Receiver",
    "slug": "stv-5586",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 5586 MP3 car receiver with USB and iPod support shown on packaging.",
    "specifications": {
      "Playback": "MP3 / USB (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-5586.jpg",
      "alt_text": "STV 5586 MP3 Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-5586.jpg",
        "alt_text": "STV 5586 MP3 Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 12,
    "name": "STV TAGWOOD Amplifier Board",
    "slug": "stv-tagwood-board",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV-TGW1 TAGWOOD amplifier board for custom installs, boxed as photographed.",
    "specifications": {
      "Type": "Amplifier board"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-tagwood.jpg",
      "alt_text": "STV TAGWOOD Amplifier Board",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-tagwood.jpg",
        "alt_text": "STV TAGWOOD Amplifier Board",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 13,
    "name": "Pioneer 12\" Subwoofer TS-W3254 \u00b7 1500W max",
    "slug": "pioneer-ts-w3254-sub",
    "brand": "Pioneer",
    "model_number": "TS-W3254",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "12-inch Pioneer subwoofer from the Champion Series, rated 1500W max per packaging.",
    "specifications": {
      "Size": "12\" / 30cm",
      "Power": "1500W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-w3254.jpg",
      "alt_text": "Pioneer 12\" Subwoofer TS-W3254 \u00b7 1500W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-w3254.jpg",
        "alt_text": "Pioneer 12\" Subwoofer TS-W3254 \u00b7 1500W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 14,
    "name": "Kenwood 12\" Subwoofer Driver \u00b7 1000W",
    "slug": "kenwood-12-subwoofer",
    "brand": "Kenwood",
    "model_number": "",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "Bare 12-inch Kenwood subwoofer driver photographed out of the box \u2014 a sculptural, ready-to-enclosure unit.",
    "specifications": {
      "Size": "12\"",
      "Power": "1000W (per catalogue label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/kenwood-12-sub.jpg",
      "alt_text": "Kenwood 12\" Subwoofer Driver \u00b7 1000W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kenwood-12-sub.jpg",
        "alt_text": "Kenwood 12\" Subwoofer Driver \u00b7 1000W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 15,
    "name": "Pioneer 6x9\" TS-A6995R \u00b7 600W",
    "slug": "pioneer-ts-a6995r",
    "brand": "Pioneer",
    "model_number": "TS-A6995R",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer 6x9\" oval speaker, 600W max per packaging.",
    "specifications": {
      "Size": "6x9\"",
      "Power": "600W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a6995r.jpg",
      "alt_text": "Pioneer 6x9\" TS-A6995R \u00b7 600W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a6995r.jpg",
        "alt_text": "Pioneer 6x9\" TS-A6995R \u00b7 600W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 16,
    "name": "Sony 6x9\" XS-FB6930 \u00b7 450W",
    "slug": "sony-xs-fb6930",
    "brand": "Sony",
    "model_number": "",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Sony 6x9\" coaxial speaker photographed as a bare unit; 450W per catalogue label.",
    "specifications": {
      "Size": "6x9\"",
      "Power": "450W (per catalogue label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/sony-xs-fb6930.jpg",
      "alt_text": "Sony 6x9\" XS-FB6930 \u00b7 450W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/sony-xs-fb6930.jpg",
        "alt_text": "Sony 6x9\" XS-FB6930 \u00b7 450W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 17,
    "name": "Pioneer 12\" Subwoofer TS-A3054 \u00b7 1400W max",
    "slug": "pioneer-ts-a3054-sub",
    "brand": "Pioneer",
    "model_number": "TS-A3054",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "12-inch Pioneer subwoofer, 1400W max per packaging.",
    "specifications": {
      "Size": "12\" / 30cm",
      "Power": "1400W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a3054.jpg",
      "alt_text": "Pioneer 12\" Subwoofer TS-A3054 \u00b7 1400W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a3054.jpg",
        "alt_text": "Pioneer 12\" Subwoofer TS-A3054 \u00b7 1400W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 18,
    "name": "Pioneer 6x9\" TS-R6951S \u00b7 400W",
    "slug": "pioneer-ts-r6951s",
    "brand": "Pioneer",
    "model_number": "TS-R6951S",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer 6x9\" 3-way speaker, 400W max per packaging.",
    "specifications": {
      "Size": "6x9\"",
      "Power": "400W max (per packaging)",
      "Configuration": "3-way (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-r6951s.jpg",
      "alt_text": "Pioneer 6x9\" TS-R6951S \u00b7 400W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-r6951s.jpg",
        "alt_text": "Pioneer 6x9\" TS-R6951S \u00b7 400W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 19,
    "name": "Pioneer Bullet Tweeter Pair TS-B350PRO \u00b7 300W",
    "slug": "pioneer-ts-b350pro-bullet",
    "brand": "Pioneer",
    "model_number": "TS-B350PRO",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer 3.5\" bullet tweeters, 300W max per packaging.",
    "specifications": {
      "Size": "3.5\" / 87mm",
      "Power": "300W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-b350pro.jpg",
      "alt_text": "Pioneer Bullet Tweeter Pair TS-B350PRO \u00b7 300W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-b350pro.jpg",
        "alt_text": "Pioneer Bullet Tweeter Pair TS-B350PRO \u00b7 300W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 20,
    "name": "Pioneer 6x9\" TS-A6986S \u00b7 450W max",
    "slug": "pioneer-ts-a6986s",
    "brand": "Pioneer",
    "model_number": "TS-A6986S",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer 6x9\" oval pair, 450W max per packaging.",
    "specifications": {
      "Size": "6x9\" / 16x24cm",
      "Power": "450W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a6986s.jpg",
      "alt_text": "Pioneer 6x9\" TS-A6986S \u00b7 450W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a6986s.jpg",
        "alt_text": "Pioneer 6x9\" TS-A6986S \u00b7 450W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 21,
    "name": "Nakamichi 6\" NSE Series \u00b7 260W",
    "slug": "nakamichi-nse6",
    "brand": "Nakamichi",
    "model_number": "",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Nakamichi NSE series 6\" coaxial pair, 260W per catalogue label.",
    "specifications": {
      "Size": "6\"",
      "Power": "260W (per catalogue label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/nakamichi-nse6.jpg",
      "alt_text": "Nakamichi 6\" NSE Series \u00b7 260W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/nakamichi-nse6.jpg",
        "alt_text": "Nakamichi 6\" NSE Series \u00b7 260W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 22,
    "name": "Flux NEO-260 2-Way Speaker System",
    "slug": "flux-neo260",
    "brand": "Flux",
    "model_number": "NEO-260",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Flux NEO-260 two-way speaker system in retail packaging as photographed.",
    "specifications": {
      "Configuration": "2-way (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/flux-neo260.jpg",
      "alt_text": "Flux NEO-260 2-Way Speaker System",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/flux-neo260.jpg",
        "alt_text": "Flux NEO-260 2-Way Speaker System",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 23,
    "name": "Pioneer 6\" TS-A1696S \u00b7 500W",
    "slug": "pioneer-ts-a1696s",
    "brand": "Pioneer",
    "model_number": "TS-A1696S",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer 6\" coaxial, 500W max per packaging.",
    "specifications": {
      "Size": "16cm / 6\"",
      "Power": "500W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a1696s.jpg",
      "alt_text": "Pioneer 6\" TS-A1696S \u00b7 500W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a1696s.jpg",
        "alt_text": "Pioneer 6\" TS-A1696S \u00b7 500W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 24,
    "name": "Pioneer 6\" TS-G1610F \u00b7 280W max",
    "slug": "pioneer-ts-g1610f",
    "brand": "Pioneer",
    "model_number": "TS-G1610F",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer 6\" coaxial pair, 280W max per packaging.",
    "specifications": {
      "Size": "6\" / 16cm",
      "Power": "280W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-g1610f.jpg",
      "alt_text": "Pioneer 6\" TS-G1610F \u00b7 280W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-g1610f.jpg",
        "alt_text": "Pioneer 6\" TS-G1610F \u00b7 280W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 25,
    "name": "VLANG Underseat Subwoofer Unit \u00b7 2000W max",
    "slug": "vlang-underseat-subwoofer",
    "brand": "VLANG",
    "model_number": "",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "VLANG underseat active subwoofer unit, 2000W max per packaging \u2014 a compact bass upgrade.",
    "specifications": {
      "Type": "Underseat subwoofer unit",
      "Power": "2000W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/vlang-underseat.jpg",
      "alt_text": "VLANG Underseat Subwoofer Unit \u00b7 2000W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/vlang-underseat.jpg",
        "alt_text": "VLANG Underseat Subwoofer Unit \u00b7 2000W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 26,
    "name": "Tweeter Coil Pair \u00b7 72.2mm",
    "slug": "apart-tweeter-coil-pair",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pair of 72.2mm tweeter voice coils photographed in packaging \u2014 service parts for tweeter rebuilds.",
    "specifications": {
      "Size": "72.2mm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/tweeter-coil-pair.jpg",
      "alt_text": "Tweeter Coil Pair \u00b7 72.2mm",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/tweeter-coil-pair.jpg",
        "alt_text": "Tweeter Coil Pair \u00b7 72.2mm",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 27,
    "name": "Kenwood 4-Channel Amplifier \u00b7 1000W",
    "slug": "kenwood-1000w-4channel",
    "brand": "Kenwood",
    "model_number": "",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Kenwood 1000W four-channel amplifier photographed as a bare unit \u2014 the power stage of a front-and-rear build.",
    "specifications": {
      "Channels": "4",
      "Power": "1000W (per catalogue label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/kenwood-4ch-amp.jpg",
      "alt_text": "Kenwood 4-Channel Amplifier \u00b7 1000W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kenwood-4ch-amp.jpg",
        "alt_text": "Kenwood 4-Channel Amplifier \u00b7 1000W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 28,
    "name": "Audiobank AB-43N Amplifier \u00b7 5000W",
    "slug": "audiobank-ab43n",
    "brand": "Audiobank",
    "model_number": "AB-43N",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Audiobank AB-43N monoblock amplifier, 5000W per packaging \u2014 serious power for serious sub stages.",
    "specifications": {
      "Power": "5000W (per packaging)",
      "Series": "Tango (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/audiobank-ab43n.jpg",
      "alt_text": "Audiobank AB-43N Amplifier \u00b7 5000W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/audiobank-ab43n.jpg",
        "alt_text": "Audiobank AB-43N Amplifier \u00b7 5000W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 29,
    "name": "Pioneer GM-E7004 \u00b7 1000W max",
    "slug": "pioneer-gm-e7004",
    "brand": "Pioneer",
    "model_number": "GM-E7004",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Pioneer 4/3/2-channel amplifier, 1000W max per packaging.",
    "specifications": {
      "Channels": "4/3/2 (per packaging)",
      "Power": "1000W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-gm-e7004.jpg",
      "alt_text": "Pioneer GM-E7004 \u00b7 1000W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-gm-e7004.jpg",
        "alt_text": "Pioneer GM-E7004 \u00b7 1000W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 30,
    "name": "Pioneer GM-A6704 \u00b7 1000W max",
    "slug": "pioneer-gm-a6704",
    "brand": "Pioneer",
    "model_number": "GM-A6704",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Pioneer 4/3/2-channel amplifier, 1000W max per packaging.",
    "specifications": {
      "Channels": "4/3/2 (per packaging)",
      "Power": "1000W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-gm-a6704.jpg",
      "alt_text": "Pioneer GM-A6704 \u00b7 1000W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-gm-a6704.jpg",
        "alt_text": "Pioneer GM-A6704 \u00b7 1000W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 31,
    "name": "Boschmann BM Audio Amplifier \u00b7 1500W",
    "slug": "boschmann-1500w",
    "brand": "Boschmann",
    "model_number": "",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Boschmann BM Audio amplifier, 1500W per packaging; exact model to be confirmed.",
    "specifications": {
      "Power": "1500W (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/boschmann-1500.jpg",
      "alt_text": "Boschmann BM Audio Amplifier \u00b7 1500W",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/boschmann-1500.jpg",
        "alt_text": "Boschmann BM Audio Amplifier \u00b7 1500W",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 32,
    "name": "STV XLR Connectors \u00b7 Male & Female Set",
    "slug": "stv-xlr-connectors",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Set of STV XLR male and female cable connectors in assorted colours, as photographed.",
    "specifications": {
      "Type": "XLR male + female"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/stv-xlr-set.jpg",
      "alt_text": "STV XLR Connectors \u00b7 Male & Female Set",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-xlr-set.jpg",
        "alt_text": "STV XLR Connectors \u00b7 Male & Female Set",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 33,
    "name": "Power Speakon Connector Set",
    "slug": "power-speakon-set",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Tray of power speakon connectors for amplifier-to-speaker runs.",
    "specifications": {
      "Type": "Power speakon"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/power-speakon.jpg",
      "alt_text": "Power Speakon Connector Set",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/power-speakon.jpg",
        "alt_text": "Power Speakon Connector Set",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 34,
    "name": "Speakon Connectors \u00b7 Premium",
    "slug": "speakon-connectors-premium",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Premium speakon cable connectors, tray as photographed.",
    "specifications": {
      "Type": "Speakon"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speakon-good.jpg",
      "alt_text": "Speakon Connectors \u00b7 Premium",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speakon-good.jpg",
        "alt_text": "Speakon Connectors \u00b7 Premium",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 35,
    "name": "Speakon Connectors \u00b7 Small",
    "slug": "speakon-connectors-small",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Compact speakon connectors in mixed colours, tray as photographed.",
    "specifications": {
      "Type": "Speakon, small"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speakon-small.jpg",
      "alt_text": "Speakon Connectors \u00b7 Small",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speakon-small.jpg",
        "alt_text": "Speakon Connectors \u00b7 Small",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 36,
    "name": "Jack-to-Jack Instrument Cable",
    "slug": "jack-to-jack-cable",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Coiled 6.35mm jack-to-jack lead in red-brown finish, as photographed.",
    "specifications": {
      "Connector": "6.35mm jack both ends"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/jack-to-jack.jpg",
      "alt_text": "Jack-to-Jack Instrument Cable",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/jack-to-jack.jpg",
        "alt_text": "Jack-to-Jack Instrument Cable",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 37,
    "name": "RCA Plugs Set",
    "slug": "rca-plug-set",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Bundle of RCA plugs for signal cable building and repair.",
    "specifications": {
      "Type": "RCA plug"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/rca-jack-set.jpg",
      "alt_text": "RCA Plugs Set",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/rca-jack-set.jpg",
        "alt_text": "RCA Plugs Set",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 38,
    "name": "RCA 2-by-1 Cable",
    "slug": "rca-2by1-cable",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Twin RCA to single lead pair, as photographed.",
    "specifications": {
      "Configuration": "2 RCA to 1"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/rca-2by1.jpg",
      "alt_text": "RCA 2-by-1 Cable",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/rca-2by1.jpg",
        "alt_text": "RCA 2-by-1 Cable",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 39,
    "name": "RCA 3-by-3 Cable",
    "slug": "rca-3by3-cable",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Three-channel RCA interconnect, as photographed.",
    "specifications": {
      "Configuration": "3 RCA to 3"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/rca-3x3.jpg",
      "alt_text": "RCA 3-by-3 Cable",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/rca-3x3.jpg",
        "alt_text": "RCA 3-by-3 Cable",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 40,
    "name": "Speaker Cable 1.5mm",
    "slug": "speaker-cable-15mm",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Reels of 1.5mm speaker cable in mixed colours, as photographed.",
    "specifications": {
      "Gauge": "1.5mm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speaker-cable-15mm.jpg",
      "alt_text": "Speaker Cable 1.5mm",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speaker-cable-15mm.jpg",
        "alt_text": "Speaker Cable 1.5mm",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 41,
    "name": "STV Microphone Cable \u00b7 100m",
    "slug": "stv-mic-cable-100m",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "100-metre reel of STV microphone cable, as photographed.",
    "specifications": {
      "Length": "100m (per label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mic-cable-100m.jpg",
      "alt_text": "STV Microphone Cable \u00b7 100m",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mic-cable-100m.jpg",
        "alt_text": "STV Microphone Cable \u00b7 100m",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 42,
    "name": "Flat Twin Electrical Cable \u00b7 100m",
    "slug": "flat-twin-electrical-cable",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Twin flat electrical cable 2x1.5mm, 100m per label, photographed on the reel.",
    "specifications": {
      "Configuration": "2 x 1.5mm (per label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/flat-twin-cable.jpg",
      "alt_text": "Flat Twin Electrical Cable \u00b7 100m",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/flat-twin-cable.jpg",
        "alt_text": "Flat Twin Electrical Cable \u00b7 100m",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 43,
    "name": "\"Devils' Eye\" LED Flexible Screen",
    "slug": "devils-eye-led-screen",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "Programmable LED flexible display panel in \"Devils' Eye\" retail packaging \u2014 display whatever you want, per packaging.",
    "specifications": {
      "Type": "LED flexible screen"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/devils-eye.jpg",
      "alt_text": "\"Devils' Eye\" LED Flexible Screen",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/devils-eye.jpg",
        "alt_text": "\"Devils' Eye\" LED Flexible Screen",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 44,
    "name": "LED Smart Neon Strip Light",
    "slug": "led-smart-neon-strip",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "Smart neon strip light with remote and app control shown on packaging.",
    "specifications": {
      "Control": "Remote / app (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/led-smart-strip.jpg",
      "alt_text": "LED Smart Neon Strip Light",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/led-smart-strip.jpg",
        "alt_text": "LED Smart Neon Strip Light",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 45,
    "name": "LED Flexible Screen Display",
    "slug": "led-flexible-display",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "LED flexible display showing scrolling text (\"WELCOME\" as photographed) \u2014 for shopfronts and installs.",
    "specifications": {
      "Type": "LED flexible display"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/led-flex-welcome.jpg",
      "alt_text": "LED Flexible Screen Display",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/led-flex-welcome.jpg",
        "alt_text": "LED Flexible Screen Display",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 46,
    "name": "HDMI Splitter \u00b7 1080P 3D v1.4",
    "slug": "hdmi-splitter-1080p",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "1x2 HDMI splitter, 1080P 3D version 1.4, with power supply \u2014 boxed as photographed.",
    "specifications": {
      "Configuration": "1 in, 2 out (per packaging)",
      "Spec": "1080P 3D v1.4 (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/hdmi-splitter.jpg",
      "alt_text": "HDMI Splitter \u00b7 1080P 3D v1.4",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/hdmi-splitter.jpg",
        "alt_text": "HDMI Splitter \u00b7 1080P 3D v1.4",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 47,
    "name": "STV T44 TV Wall Mount \u00b7 25\u201365\"",
    "slug": "stv-t44-wall-mount",
    "brand": "STV",
    "model_number": "T44",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "STV Spacetech T44 flat-panel tilt wall mount for LED/LCD/plasma TVs 25\u201365\", per packaging.",
    "specifications": {
      "Fits": "25\u201365\" (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/wall-mount.jpg",
      "alt_text": "STV T44 TV Wall Mount \u00b7 25\u201365\"",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/wall-mount.jpg",
        "alt_text": "STV T44 TV Wall Mount \u00b7 25\u201365\"",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 48,
    "name": "STV 4K Android Set-Top Box \u00b7 2GB/16GB",
    "slug": "stv-4k-android-box-16gb",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV 4K Android set-top box with 2GB RAM / 16GB storage, Google Assistant branding per packaging.",
    "specifications": {
      "Memory": "2GB RAM / 16GB ROM (per label)",
      "Output": "4K (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-box-16gb.jpg",
      "alt_text": "STV 4K Android Set-Top Box \u00b7 2GB/16GB",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-box-16gb.jpg",
        "alt_text": "STV 4K Android Set-Top Box \u00b7 2GB/16GB",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 49,
    "name": "Xiaomi Mi TV Stick (Android TV)",
    "slug": "mi-tv-stick",
    "brand": "Xiaomi",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "Mi TV Stick Android TV streaming stick in orange retail packaging, as photographed.",
    "specifications": {
      "Platform": "Android TV (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mi-tv-stick.jpg",
      "alt_text": "Xiaomi Mi TV Stick (Android TV)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mi-tv-stick.jpg",
        "alt_text": "Xiaomi Mi TV Stick (Android TV)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 50,
    "name": "STV MT-X708 Car Equalizer",
    "slug": "stv-mt-x708-equalizer",
    "brand": "STV",
    "model_number": "MT-X708",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV MT-X708 7-band dual-control parametric car equalizer with subwoofer output, per packaging.",
    "specifications": {
      "Bands": "7-band (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-mt-x708.jpg",
      "alt_text": "STV MT-X708 Car Equalizer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-mt-x708.jpg",
        "alt_text": "STV MT-X708 Car Equalizer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 51,
    "name": "Boschmann EQX-75 PRO Equalizer",
    "slug": "boschmann-eqx-75pro",
    "brand": "Boschmann",
    "model_number": "EQX-75",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "Boschmann EQX-75 PRO parametric graphic equalizer from the Concorde Gold Turbine series, per packaging.",
    "specifications": {
      "Series": "Concorde Gold Turbine (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/boschmann-eqx75.jpg",
      "alt_text": "Boschmann EQX-75 PRO Equalizer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/boschmann-eqx75.jpg",
        "alt_text": "Boschmann EQX-75 PRO Equalizer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 52,
    "name": "STV Digital Multimeter",
    "slug": "stv-digital-multimeter",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV Spacetech digital multimeter in retail packaging \u2014 the install bench staple.",
    "specifications": {
      "Type": "Digital multimeter"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/multimeter.jpg",
      "alt_text": "STV Digital Multimeter",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/multimeter.jpg",
        "alt_text": "STV Digital Multimeter",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 53,
    "name": "MP AA Rechargeable Batteries \u00b7 3000mAh",
    "slug": "mp-aa-rechargeable-3000",
    "brand": "MP",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "MP Multiple Power AA Ni-MH rechargeables, 3000mAh per packaging.",
    "specifications": {
      "Capacity": "3000mAh (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mp-aa-3000.jpg",
      "alt_text": "MP AA Rechargeable Batteries \u00b7 3000mAh",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mp-aa-3000.jpg",
        "alt_text": "MP AA Rechargeable Batteries \u00b7 3000mAh",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 54,
    "name": "MP Standard Battery Charger",
    "slug": "mp-standard-charger",
    "brand": "MP",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "MP Multiple Power standard charger for AA/AAA cells, as photographed.",
    "specifications": {
      "Cells": "AA / AAA (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mp-charger.jpg",
      "alt_text": "MP Standard Battery Charger",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mp-charger.jpg",
        "alt_text": "MP Standard Battery Charger",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 55,
    "name": "Power Supply \u00b7 12V 15A",
    "slug": "power-supply-12v-15a",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "Professional AC-DC 12V 15A power supply in retail packaging.",
    "specifications": {
      "Output": "12V 15A (per label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/psu-12v15a.jpg",
      "alt_text": "Power Supply \u00b7 12V 15A",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/psu-12v15a.jpg",
        "alt_text": "Power Supply \u00b7 12V 15A",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 56,
    "name": "Power Supply \u00b7 12V 30A",
    "slug": "power-supply-12v-30a",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "12V 30A power supply unit, handwritten label as photographed.",
    "specifications": {
      "Output": "12V 30A (per label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/psu-12v30a.jpg",
      "alt_text": "Power Supply \u00b7 12V 30A",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/psu-12v30a.jpg",
        "alt_text": "Power Supply \u00b7 12V 30A",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 57,
    "name": "Car Entertainment System \u00b7 9\"",
    "slug": "car-entertainment-system-9",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "9-inch touchscreen car entertainment system in retail packaging, as photographed.",
    "specifications": {
      "Display": "9\" (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/car-entertainment-9.jpg",
      "alt_text": "Car Entertainment System \u00b7 9\"",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/car-entertainment-9.jpg",
        "alt_text": "Car Entertainment System \u00b7 9\"",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 58,
    "name": "Car Multimedia System",
    "slug": "car-multimedia-system",
    "brand": "",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "Car multimedia head unit photographed open-box with full wiring and mounting kit laid out.",
    "specifications": {
      "Includes": "Wiring + mounting kit (as photographed)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/car-multimedia.jpg",
      "alt_text": "Car Multimedia System",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/car-multimedia.jpg",
        "alt_text": "Car Multimedia System",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 59,
    "name": "STV Digital MP3 Audio Board",
    "slug": "stv-mp3-audio-board",
    "brand": "STV",
    "model_number": "",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV digital MP3 audio board with USB/TF playback and remote, photographed with its receiver.",
    "specifications": {
      "Playback": "MP3 / USB / TF (per packaging)",
      "Includes": "Remote control"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mp3-board.jpg",
      "alt_text": "STV Digital MP3 Audio Board",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mp3-board.jpg",
        "alt_text": "STV Digital MP3 Audio Board",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 60,
    "name": "Pioneer 12\" Subwoofer TS-W312D4 \u00b7 1600W max",
    "slug": "pioneer-ts-w312d4",
    "brand": "Pioneer",
    "model_number": "TS-W312D4",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "Pioneer 12-inch Champion Series subwoofer TS-W312D4, rated 1600W max per packaging.",
    "specifications": {
      "Size": "12\" / 30cm",
      "Power": "1600W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-w312d4.jpg",
      "alt_text": "Pioneer 12\" Subwoofer TS-W312D4 \u00b7 1600W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-w312d4.jpg",
        "alt_text": "Pioneer 12\" Subwoofer TS-W312D4 \u00b7 1600W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 61,
    "name": "Pioneer TS-520 20mm Tweeters \u00b7 200W max",
    "slug": "pioneer-ts-520",
    "brand": "Pioneer",
    "model_number": "TS-520",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-520 20mm dome tweeters, 200W max per packaging.",
    "specifications": {
      "Size": "20mm",
      "Power": "200W max (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-520.jpg",
      "alt_text": "Pioneer TS-520 20mm Tweeters \u00b7 200W max",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-520.jpg",
        "alt_text": "Pioneer TS-520 20mm Tweeters \u00b7 200W max",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 62,
    "name": "6.35mm Heavy Duty Jack Plugs",
    "slug": "fat-jack",
    "brand": "",
    "model_number": "6.35mm",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Heavy-duty 6.35mm jack plugs for instrument and audio cables.",
    "specifications": {
      "Connector": "6.35mm (1/4\") mono jack plug"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/fat-jack.jpg",
      "alt_text": "6.35mm Heavy Duty Jack Plugs",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/fat-jack.jpg",
        "alt_text": "6.35mm Heavy Duty Jack Plugs",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 63,
    "name": "3.5mm Stereo Phone Jacks",
    "slug": "phone-jack-small",
    "brand": "",
    "model_number": "3.5mm",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Compact 3.5mm stereo phone jack plugs for auxiliary and audio leads.",
    "specifications": {
      "Connector": "3.5mm stereo jack"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/phone-jack-small.jpg",
      "alt_text": "3.5mm Stereo Phone Jacks",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/phone-jack-small.jpg",
        "alt_text": "3.5mm Stereo Phone Jacks",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 64,
    "name": "STV Electrical Cable 1.5mm \u00b7 100yd",
    "slug": "electrical-cable-yellow",
    "brand": "STV",
    "model_number": "1.5mm-100YD",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV single-core 1.5mm electrical installation cable on a 100-yard reel.",
    "specifications": {
      "Gauge": "1.5mm",
      "Length": "100 yards (per label)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/electrical-cable-yellow.jpg",
      "alt_text": "STV Electrical Cable 1.5mm \u00b7 100yd",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/electrical-cable-yellow.jpg",
        "alt_text": "STV Electrical Cable 1.5mm \u00b7 100yd",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 65,
    "name": "High-Gauge Speaker Cable Reel",
    "slug": "speaker-cable-gauge",
    "brand": "",
    "model_number": "SPK-G1000",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "High-gauge speaker cable on bulk reel for custom vehicle audio wiring.",
    "specifications": {
      "Type": "Speaker cable reel"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speaker-cable-gauge.jpg",
      "alt_text": "High-Gauge Speaker Cable Reel",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speaker-cable-gauge.jpg",
        "alt_text": "High-Gauge Speaker Cable Reel",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 66,
    "name": "STV 4K Android Set-Top Box \u00b7 2GB/8GB",
    "slug": "stv-box-8gb",
    "brand": "STV",
    "model_number": "STV-4K-8GB",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV 4K Android multimedia set-top box with 2GB RAM and 8GB storage.",
    "specifications": {
      "Memory": "2GB RAM / 8GB ROM (per label)",
      "Output": "4K (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-box-8gb.jpg",
      "alt_text": "STV 4K Android Set-Top Box \u00b7 2GB/8GB",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-box-8gb.jpg",
        "alt_text": "STV 4K Android Set-Top Box \u00b7 2GB/8GB",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 67,
    "name": "STV Android TV Box (Retail Edition)",
    "slug": "stv-box-red",
    "brand": "STV",
    "model_number": "STV-4K-RED",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV Android multimedia TV box in red retail presentation packaging.",
    "specifications": {
      "Output": "4K Ultra HD (per packaging)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-box-red.jpg",
      "alt_text": "STV Android TV Box (Retail Edition)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-box-red.jpg",
        "alt_text": "STV Android TV Box (Retail Edition)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  }
];

export const FALLBACK_PRODUCT_LIST_ITEMS: ProductListItem[] = FALLBACK_PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  brand: p.brand,
  model_number: p.model_number,
  category: p.category,
  public_price: p.public_price,
  price_type: p.price_type,
  stock_status: p.stock_status,
  featured: p.featured,
  primary_image: p.images[0] ?? null,
}));
