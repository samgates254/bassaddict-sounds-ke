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
    "description": "Flexible LED panels, smart neon strips, HDMI splitters and TV brackets.",
    "sort_order": 7
  },
  {
    "slug": "electronics-power",
    "name": "Electronics & Power Supplies",
    "description": "Switch-mode power supplies, parametric equalizers, Android boxes and multimeters.",
    "sort_order": 8
  }
];

export const FALLBACK_PRODUCTS: ProductDetail[] = [
  {
    "id": 1,
    "name": "Pioneer TS-6900PRO 6x9-Inch 2-Way Coaxial Speakers",
    "slug": "pioneer-ts-6900pro",
    "brand": "Pioneer",
    "model_number": "TS-6900PRO",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-6900PRO 6x9-inch high-efficiency 2-way coaxial speaker pair from the Pioneer Reference for Open Show (P.R.O.) series. Delivers 600W max power and 92dB high sensitivity for extreme sound pressure levels and crystal clear highs.",
    "specifications": {
      "Speaker Size": "6x9 inch",
      "Speaker Type": "2-Way High Efficiency Coaxial",
      "Peak Power": "600W MAX",
      "RMS Power": "100W",
      "Sensitivity": "92 dB",
      "Frequency Response": "29 Hz - 40 kHz",
      "Impedance": "4 Ohm"
    },
    "public_price": "14500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-6900pro.jpg",
      "alt_text": "Pioneer TS-6900PRO 6x9-Inch 2-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-6900pro.jpg",
        "alt_text": "Pioneer TS-6900PRO 6x9-Inch 2-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 2,
    "name": "Pioneer Z-Series TS-Z65F 6.5-Inch 2-Way Coaxial Speakers",
    "slug": "pioneer-ts-z65f",
    "brand": "Pioneer",
    "model_number": "TS-Z65F",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-Z65F premium 6.5-inch 2-way coaxial speaker pair from the audiophile Z-Series. Features Hi-Res Audio certification, Twaron aramid fiber cone, and smooth open-staging acoustic precision.",
    "specifications": {
      "Series": "Z-Series",
      "Speaker Size": "6.5 inch (16.5 cm)",
      "Speaker Type": "2-Way Coaxial",
      "Peak Power": "330W MAX",
      "RMS Power": "110W",
      "Hi-Res Audio": "Certified",
      "Frequency Response": "32 Hz - 96 kHz",
      "Sensitivity": "85 dB",
      "Impedance": "4 Ohm"
    },
    "public_price": "28000.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-z65f.jpg",
      "alt_text": "Pioneer Z-Series TS-Z65F 6.5-Inch 2-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-z65f.jpg",
        "alt_text": "Pioneer Z-Series TS-Z65F 6.5-Inch 2-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 3,
    "name": "KUERL 8-Inch High Performance Active Underseat Subwoofer",
    "slug": "kuerl-subwoofer",
    "brand": "KUERL",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "KUERL 8-inch high-performance active underseat car subwoofer with integrated amplifier. Features rigid geometric cast enclosure, 150W RMS power, and full onboard tuning controls (Gain, LPF, Bass Boost, Phase).",
    "specifications": {
      "Brand": "KUERL",
      "Woofer Size": "8 inch (4 Ohm)",
      "RMS Power": "150W RMS",
      "Power Supply": "DC 12V (10.8 - 15.6V)",
      "Enclosure Type": "Ultra-Slim Cast Active Enclosure",
      "Integrated Controls": "Input Gain, Bass Boost, Low Pass Filter, Phase Switch, Protect LED",
      "Model Status": "Needs manual verification (model unprinted on front face; size corrected from 10\" to 8\")"
    },
    "public_price": "16500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "/images/products/kuerl-subwoofer.jpg",
      "alt_text": "KUERL 8-Inch High Performance Active Underseat Subwoofer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kuerl-subwoofer.jpg",
        "alt_text": "KUERL 8-Inch High Performance Active Underseat Subwoofer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 4,
    "name": "9-Inch TFT/LED Hi-Res In-Car Display Monitor",
    "slug": "monitor-9-inch",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Displays & In-Dash Monitors",
      "slug": "monitors"
    },
    "description": "9-inch high-resolution TFT/LED digital in-car video monitor with universal mounting stand and detachable headrest shroud bracket. Features dual AV video inputs for reverse camera and media receiver integration, built-in speaker, and wireless remote.",
    "specifications": {
      "Screen Size": "9 inch TFT/LED Digital Monitor",
      "Aspect Ratio": "16:9 Wide Screen Format",
      "Resolution": "800 x 480 High Resolution",
      "Video System": "NTSC / PAL Compatible",
      "Inputs": "2 Video Inputs, 1 Audio Input (RCA)",
      "Audio": "Built-in Speaker & IR Transmitter for Wireless Headphones",
      "Power Requirement": "DC 12V +/- 10% (5W Max)",
      "Dimensions": "8.7\"H x 5.7\"W x 0.8\"D",
      "Accessories": "Detachable Headrest Shroud, Universal Stand Mount, Full Function Remote Control"
    },
    "public_price": "12500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/monitor-9-inch.jpg",
      "alt_text": "9-Inch TFT/LED Hi-Res In-Car Display Monitor",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/monitor-9-inch.jpg",
        "alt_text": "9-Inch TFT/LED Hi-Res In-Car Display Monitor",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 5,
    "name": "7-Inch TFT/LED Hi-Res In-Car Display Monitor",
    "slug": "monitor-7-inch",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Displays & In-Dash Monitors",
      "slug": "monitors"
    },
    "description": "7-inch high-resolution TFT/LED matrix display monitor with headrest shroud and stand mount. Supports NTSC and PAL dual video feeds for reversing parking cameras and passenger video playback.",
    "specifications": {
      "Screen Size": "7.0 inch TFT/LED Matrix System",
      "Aspect Ratio": "16:9 Wide Screen",
      "Resolution": "800 x 480 RGB",
      "Video System": "NTSC & PAL Multi System",
      "Inputs": "2 Video Inputs",
      "Controls": "Brightness, Contrast, Color & Tint Adjustments",
      "Power Requirement": "DC 12V",
      "Accessories": "Headrest Shroud, Stand Mount, Wireless Remote Control"
    },
    "public_price": "8500.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/monitor-7-inch.jpg",
      "alt_text": "7-Inch TFT/LED Hi-Res In-Car Display Monitor",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/monitor-7-inch.jpg",
        "alt_text": "7-Inch TFT/LED Hi-Res In-Car Display Monitor",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 6,
    "name": "DV Pioneer DH 100Wx4 Bluetooth Digital Media Receiver",
    "slug": "pioneer-mvh-245bt",
    "brand": "DV Pioneer DH",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "DV Pioneer DH single-DIN car digital media receiver with Bluetooth connectivity, front USB and AUX inputs, MIXTRAX playback, 4 RCA pre-outs, and high-power MOSFET 100Wx4 amplification.",
    "specifications": {
      "Brand": "DV Pioneer DH",
      "Chassis": "Single-DIN In-Dash Receiver",
      "Max Power Output": "100W x 4 MOSFET Max",
      "Connectivity": "Bluetooth, Front USB, Front AUX",
      "Pre-Outs": "4 RCA Pre-Outs",
      "Audio Features": "Subwoofer Control, MIXTRAX, Spotify / Smartphone Compatibility",
      "Steering Control": "Steering Wheel Control Ready"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-mvh-245bt.jpg",
      "alt_text": "DV Pioneer DH 100Wx4 Bluetooth Digital Media Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-mvh-245bt.jpg",
        "alt_text": "DV Pioneer DH 100Wx4 Bluetooth Digital Media Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 7,
    "name": "Kenwood KWD-X17 Car Radio & MP3 Receiver",
    "slug": "kenwood-kwd-x17",
    "brand": "Kenwood",
    "model_number": "KWD-X17",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "Kenwood KWD-X17 in-dash car radio and MP3 player featuring Bluetooth streaming, dual USB ports, DSP digital sound processing, Music Mix, variable color illumination, and included wireless remote control.",
    "specifications": {
      "Brand": "Kenwood",
      "Model": "KWD-X17",
      "Product Type": "Car Radio / MP3 Player",
      "Connectivity": "Bluetooth, Dual USB Ports, AUX",
      "Audio Processing": "DSP Digital Sound Processor",
      "Features": "Dual Phone Connection, Music Mix, Variable Color Illumination",
      "Accessories": "Full Function Wireless Remote Control Included"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/kenwood-kwd-x17.jpg",
      "alt_text": "Kenwood KWD-X17 Car Radio & MP3 Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kenwood-kwd-x17.jpg",
        "alt_text": "Kenwood KWD-X17 Car Radio & MP3 Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 8,
    "name": "DV-SONY-OK DSG-JL7 100Wx4 Bluetooth Car MP3 Receiver",
    "slug": "sony-dsg-jl7",
    "brand": "DV-SONY-OK",
    "model_number": "DSG-JL7",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "DV-SONY-OK DSG-JL7 in-dash digital media player powered by TDA7388 IC with 100Wx4 max power output. Supports Bluetooth audio, dual USB, TF card, 7-color illumination, Extra Bass, and 4 RCA pre-outs.",
    "specifications": {
      "Brand": "DV-SONY-OK",
      "Model": "DSG-JL7",
      "Max Power": "100W x 4 Max",
      "Power Amplifier IC": "TDA7388",
      "Media Inputs": "Bluetooth, USB (Media + Charging), TF Card, 3.5mm AUX, FM Radio",
      "Supported Formats": "MP3, WMA",
      "Pre-Outs": "4 Pre-Outs (5V)",
      "Lighting": "7 Colors Variable Illumination",
      "Sound Enhancement": "Extra Bass",
      "Accessories": "Wireless Remote Control Included"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/sony-dsg-jl7.jpg",
      "alt_text": "DV-SONY-OK DSG-JL7 100Wx4 Bluetooth Car MP3 Receiver",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/sony-dsg-jl7.jpg",
        "alt_text": "DV-SONY-OK DSG-JL7 100Wx4 Bluetooth Car MP3 Receiver",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 9,
    "name": "STV 5589 Car MP3 Receiver with Bluetooth",
    "slug": "stv-5589",
    "brand": "STV",
    "model_number": "5589",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 5589 single-DIN in-dash car MP3 receiver with Bluetooth, high-current USB charging, TF microSD card playback, FM radio tuner, front auxiliary input, and multi-color LED display illumination.",
    "specifications": {
      "Brand": "STV",
      "Model": "5589",
      "Type": "MP3 Receiver / MP3 Car Player",
      "Playback Support": "FM Radio, Bluetooth, USB, TF Card, AUX In",
      "Audio Formats": "MP3, WMA",
      "Charging": "High-Current USB Fast Charging",
      "Compatibility": "Smartphone Compatible / iPod Direct Control",
      "Display": "Color Customization Illumination"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-5589.jpg",
      "alt_text": "STV 5589 Car MP3 Receiver with Bluetooth",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-5589.jpg",
        "alt_text": "STV 5589 Car MP3 Receiver with Bluetooth",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 10,
    "name": "STV 1162 X-Bass Bluetooth Car MP3 Player",
    "slug": "stv-extra-bass-1162",
    "brand": "STV",
    "model_number": "1162",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 1162 X-Bass single-DIN car audio receiver featuring high-impact Extra Bass tuning, Bluetooth hands-free and audio streaming, front USB port, TF card playback, FM tuner, and remote control.",
    "specifications": {
      "Brand": "STV",
      "Model": "1162",
      "Series": "X-Bass Extra Bass",
      "Type": "FM / Bluetooth / TF / USB MP3 Player",
      "Connectivity": "Bluetooth, Front USB, TF Card Slot, AUX",
      "Tuner": "FM Stereo Radio",
      "Sound Enhancement": "X-Bass Extra Bass Processing",
      "Accessories": "Wireless Remote Control Included"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-extra-bass-1162.jpg",
      "alt_text": "STV 1162 X-Bass Bluetooth Car MP3 Player",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-extra-bass-1162.jpg",
        "alt_text": "STV 1162 X-Bass Bluetooth Car MP3 Player",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 11,
    "name": "STV 5586 Car MP3 Receiver with Bluetooth",
    "slug": "stv-5586",
    "brand": "STV",
    "model_number": "5586",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 5586 in-dash digital car audio receiver with Bluetooth calling and music streaming, dual USB ports (media playback and high-current phone charging), TF card reader, front AUX, and customizable LED colors.",
    "specifications": {
      "Brand": "STV",
      "Model": "5586",
      "Type": "MP3 Receiver / MP3 Car Player",
      "Connectivity": "Bluetooth, Dual USB, TF Card Slot, Front 3.5mm AUX",
      "Media Formats": "MP3, WMA",
      "Tuner": "FM Radio",
      "Charging": "High-Current Fast USB Charging",
      "Display": "Color Customization LED Illumination"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-5586.jpg",
      "alt_text": "STV 5586 Car MP3 Receiver with Bluetooth",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-5586.jpg",
        "alt_text": "STV 5586 Car MP3 Receiver with Bluetooth",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 12,
    "name": "STV STV-TGW1 70W Bluetooth Amplifier Board",
    "slug": "stv-tagwood-board",
    "brand": "STV",
    "model_number": "STV-TGW1",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV-TGW1 multi-purpose 70W amplifier and media decoder board for vehicle custom audio boxes and portable sound rigs. Features Bluetooth, USB, TF, FM, guitar input, mic input, and wireless remote control.",
    "specifications": {
      "Brand": "STV",
      "Model": "STV-TGW1",
      "Product Type": "Amplifier Board",
      "Power Output": "1 x 70W",
      "DC Power Input": "DC 12V / 2A",
      "Battery Input": "DC 12V/4A - 24V/4A",
      "Playback Support": "Bluetooth, AUX, USB, TF Card, FM Radio",
      "Instrument Inputs": "Guitar Input, Microphone Input",
      "Accessories": "Remote Control Included"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-tagwood.jpg",
      "alt_text": "STV STV-TGW1 70W Bluetooth Amplifier Board",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-tagwood.jpg",
        "alt_text": "STV STV-TGW1 70W Bluetooth Amplifier Board",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 13,
    "name": "Pioneer Champion Series TS-W32S4 12-Inch Subwoofer",
    "slug": "pioneer-ts-w3254-sub",
    "brand": "Pioneer",
    "model_number": "TS-W32S4",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "Pioneer Champion Series TS-W32S4 12-inch (30cm) high-output component car subwoofer. Features rigid honeycombed cone structure, 1500W max power handling, and a single 4-ohm voice coil for hard-hitting, authoritative sub-bass.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-W32S4",
      "Series": "Champion Series",
      "Subwoofer Size": "12 inch (30 cm)",
      "Type": "Component Car Subwoofer",
      "Max Power": "1500W Max",
      "RMS / Nominal Power": "400W NOM",
      "Impedance": "Single 4 Ohm (4\u03a9 SVC)",
      "Frequency Response": "20 Hz - 1.6 kHz",
      "Sensitivity": "90 dB"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-w3254.jpg",
      "alt_text": "Pioneer Champion Series TS-W32S4 12-Inch Subwoofer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-w3254.jpg",
        "alt_text": "Pioneer Champion Series TS-W32S4 12-Inch Subwoofer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 14,
    "name": "Kenwood 12-Inch Subwoofer Driver (1000W Peak)",
    "slug": "kenwood-12-subwoofer",
    "brand": "Kenwood",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "Kenwood 12-inch car audio component subwoofer driver featuring an X-motif textured polypropylene cone with spiral ribbing for enhanced structural rigidity and clean low-frequency bass punch.",
    "specifications": {
      "Brand": "Kenwood",
      "Subwoofer Size": "12 inch (30 cm)",
      "Cone Design": "X-Motif Textured Polypropylene Cone",
      "Peak Power": "1000W Peak (Showroom display rating)",
      "Impedance": "4 Ohm",
      "Model Status": "Needs manual verification (model unprinted on front cone face)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/kenwood-12-sub.jpg",
      "alt_text": "Kenwood 12-Inch Subwoofer Driver (1000W Peak)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kenwood-12-sub.jpg",
        "alt_text": "Kenwood 12-Inch Subwoofer Driver (1000W Peak)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 15,
    "name": "Pioneer TS-A6995R 6x9-Inch 5-Way Coaxial Speakers",
    "slug": "pioneer-ts-a6995r",
    "brand": "Pioneer",
    "model_number": "TS-A6995R",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-A6995R 6x9-inch 5-way coaxial speaker pair delivering 600W max power handling. Multi-driver design provides expansive high-frequency dispersion and punchy mid-bass response for rear package trays and door panels.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-A6995R",
      "Speaker Size": "6x9 inch",
      "Speaker Type": "5-Way Coaxial Speaker",
      "Max Power": "600W MAX",
      "RMS Power": "100W",
      "Cone Material": "Multilayer Mica Matrix Cone",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a6995r.jpg",
      "alt_text": "Pioneer TS-A6995R 6x9-Inch 5-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a6995r.jpg",
        "alt_text": "Pioneer TS-A6995R 6x9-Inch 5-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 16,
    "name": "Sony XS-FB6930 6x9-Inch 3-Way Coaxial Speakers",
    "slug": "sony-xs-fb6930",
    "brand": "Sony",
    "model_number": "XS-FB6930",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Sony XS-FB6930 6x9-inch 3-way coaxial speaker pair featuring MRC (Mica Reinforced Cellular) woofer cone, 450W peak power, 60W RMS, and Sony protective cross-spoke grilles.",
    "specifications": {
      "Brand": "Sony",
      "Model": "XS-FB6930",
      "Speaker Size": "6x9 inch (16 x 24 cm)",
      "Speaker Type": "3-Way Coaxial Speakers",
      "Peak Power": "450W Max",
      "RMS Power": "60W",
      "Woofer Cone": "MRC (Mica Reinforced Cellular) Aramid",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/sony-xs-fb6930.jpg",
      "alt_text": "Sony XS-FB6930 6x9-Inch 3-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/sony-xs-fb6930.jpg",
        "alt_text": "Sony XS-FB6930 6x9-Inch 3-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 17,
    "name": "Pioneer A-Series TS-A30S4 12-Inch Subwoofer",
    "slug": "pioneer-ts-a3054-sub",
    "brand": "Pioneer",
    "model_number": "TS-A30S4",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "Pioneer A-Series TS-A30S4 12-inch (30cm) component subwoofer handling 1400W max power. Engineered with an IMPP composite cone with spiral pattern for tight, distortion-free low-end response.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-A30S4",
      "Series": "A-Series",
      "Subwoofer Size": "12 inch (30 cm)",
      "Type": "Component Car Subwoofer",
      "Max Power": "1400W Max",
      "RMS / Nominal Power": "400W NOM",
      "Impedance": "Single 4 Ohm (4\u03a9 SVC)",
      "Frequency Response": "22 Hz - 1.6 kHz",
      "Sensitivity": "87 dB"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a3054.jpg",
      "alt_text": "Pioneer A-Series TS-A30S4 12-Inch Subwoofer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a3054.jpg",
        "alt_text": "Pioneer A-Series TS-A30S4 12-Inch Subwoofer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 18,
    "name": "Pioneer R-Series TS-R6951S 6x9-Inch 3-Way Coaxial Speakers",
    "slug": "pioneer-ts-r6951s",
    "brand": "Pioneer",
    "model_number": "TS-R6951S",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer R-Series TS-R6951S 6x9-inch 3-way coaxial speaker pair with 400W max power handling, high sensitivity design, and Multilayer Mica Matrix cone for punchy, dynamic audio directly off factory head units.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-R6951S",
      "Series": "R-Series",
      "Speaker Size": "6x9 inch (16 cm x 24 cm)",
      "Speaker Type": "3-Way Coaxial Speakers",
      "Max Power": "400W MAX",
      "RMS Power": "50W",
      "Sensitivity": "92 dB (High Sensitivity)",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-r6951s.jpg",
      "alt_text": "Pioneer R-Series TS-R6951S 6x9-Inch 3-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-r6951s.jpg",
        "alt_text": "Pioneer R-Series TS-R6951S 6x9-Inch 3-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 19,
    "name": "Pioneer PRO Series TS-B351PRO 3.5-Inch Bullet Tweeters",
    "slug": "pioneer-ts-b350pro-bullet",
    "brand": "Pioneer",
    "model_number": "TS-B351PRO",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer Reference for Open Show (P.R.O.) TS-B351PRO 3.5-inch (87mm) high-efficiency bullet tweeters. Engineered with lightweight titanium diaphragms and cast aluminum chassis for screaming SPL high-frequency projection.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-B351PRO",
      "Series": "P.R.O. (Pioneer Reference for Open Show)",
      "Tweeter Size": "3.5 inch (87 mm)",
      "Type": "High Efficiency Bullet Tweeter Pair",
      "Max Power": "300W Max",
      "RMS Power": "100W",
      "Sensitivity": "100 dB",
      "Diaphragm": "Titanium Diaphragm with Die-Cast Aluminum Chassis",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-b350pro.jpg",
      "alt_text": "Pioneer PRO Series TS-B351PRO 3.5-Inch Bullet Tweeters",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-b350pro.jpg",
        "alt_text": "Pioneer PRO Series TS-B351PRO 3.5-Inch Bullet Tweeters",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 20,
    "name": "Pioneer A-Series TS-A6968S 6x9-Inch 4-Way Coaxial Speakers",
    "slug": "pioneer-ts-a6986s",
    "brand": "Pioneer",
    "model_number": "TS-A6968S",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer A-Series TS-A6968S 6x9-inch 4-way coaxial speaker pair handling 450W max power. Delivers seamless frequency transitions with rich low-end punch and detailed mid-range reproduction.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-A6968S",
      "Series": "A-Series",
      "Speaker Size": "6x9 inch (16 cm x 24 cm)",
      "Speaker Type": "4-Way Coaxial Speakers",
      "Max Power": "450W Max",
      "RMS Power": "90W",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a6986s.jpg",
      "alt_text": "Pioneer A-Series TS-A6968S 6x9-Inch 4-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a6986s.jpg",
        "alt_text": "Pioneer A-Series TS-A6968S 6x9-Inch 4-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 21,
    "name": "Nakamichi NSE Series NSE1648 6.5-Inch 2-Way Coaxial Speakers",
    "slug": "nakamichi-nse6",
    "brand": "Nakamichi",
    "model_number": "NSE1648",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Nakamichi NSE Series NSE1648 6.5-inch 2-way coaxial car speakers. Engineered for clear vocal articulation and crisp highs with 260W peak power and 40W continuous N-Power handling.",
    "specifications": {
      "Brand": "Nakamichi",
      "Model": "NSE1648",
      "Series": "NSE Series",
      "Speaker Size": "6.5 inch (16.5 cm)",
      "Speaker Type": "2-Way Coaxial Speakers",
      "Peak Power": "260W",
      "N-Power (RMS)": "40W",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/nakamichi-nse6.jpg",
      "alt_text": "Nakamichi NSE Series NSE1648 6.5-Inch 2-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/nakamichi-nse6.jpg",
        "alt_text": "Nakamichi NSE Series NSE1648 6.5-Inch 2-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 22,
    "name": "Flux NEO-260 6.5-Inch 2-Way Component Speaker System",
    "slug": "flux-neo260",
    "brand": "Flux",
    "model_number": "NEO-260",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Flux Audio NEO-260 audiophile 6.5-inch 2-way component speaker kit. Includes pressed paper cone midwoofers in steel baskets, 25mm silk dome tweeters, and 2-way passive crossovers with adjustable tweeter attenuation.",
    "specifications": {
      "Brand": "Flux",
      "Model": "NEO-260",
      "Speaker Type": "2-Way Component Speaker System",
      "Midwoofer": "6.5 inch, pressed paper cone & steel basket",
      "Tweeter": "25mm voice coil special silk dome tweeter",
      "Crossover": "2-way passive crossover with adjustable tweeter level",
      "Power Rating": "50W RMS",
      "Impedance": "4 Ohm",
      "Frequency Response": "60 Hz - 20 kHz"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/flux-neo260.jpg",
      "alt_text": "Flux NEO-260 6.5-Inch 2-Way Component Speaker System",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/flux-neo260.jpg",
        "alt_text": "Flux NEO-260 6.5-Inch 2-Way Component Speaker System",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 23,
    "name": "Pioneer TS-A1696S 6-Inch 4-Way Coaxial Speakers",
    "slug": "pioneer-ts-a1696s",
    "brand": "Pioneer",
    "model_number": "TS-A1696S",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-A1696S 16cm (6-inch) 4-way coaxial speakers handling up to 500W max power. Multi-hole mounting frame enables wide application fitting across Toyota, Nissan, and universal door openings.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-A1696S",
      "Speaker Size": "16 cm / 6 inch",
      "Speaker Type": "4-Way Coaxial Speakers",
      "Max Power": "500W MAX",
      "Mounting": "Wide Application Multi-Fit Basket",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-a1696s.jpg",
      "alt_text": "Pioneer TS-A1696S 6-Inch 4-Way Coaxial Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-a1696s.jpg",
        "alt_text": "Pioneer TS-A1696S 6-Inch 4-Way Coaxial Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 24,
    "name": "Pioneer G-Series TS-G1610F-2 6.5-Inch Dual-Cone Speakers",
    "slug": "pioneer-ts-g1610f",
    "brand": "Pioneer",
    "model_number": "TS-G1610F-2",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer G-Series TS-G1610F-2 16cm (6.5-inch) dual-cone full-range car speakers. Handles 280W max (40W RMS) with IMPP composite cone for reliable, punchy sound replacement of factory door speakers.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-G1610F-2",
      "Series": "G-Series",
      "Speaker Size": "6.5 inch (16 cm)",
      "Speaker Type": "Dual Cone Speaker / Haut-Parleur A Double Cone",
      "Max Power": "280W Max",
      "RMS Power": "40W NOM",
      "Impedance": "4 Ohm"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-g1610f.jpg",
      "alt_text": "Pioneer G-Series TS-G1610F-2 6.5-Inch Dual-Cone Speakers",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-g1610f.jpg",
        "alt_text": "Pioneer G-Series TS-G1610F-2 6.5-Inch Dual-Cone Speakers",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 25,
    "name": "VLANG VL1083-B 2000W Underseat Active Subwoofer",
    "slug": "vlang-underseat-subwoofer",
    "brand": "VLANG",
    "model_number": "VL1083-B",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "VLANG VL1083-B enthusiast-grade ultra-slim active car subwoofer unit handling 2000W max power. Compact low-profile form factor installs under front car seats for deep bass reinforcement without sacrificing trunk space.",
    "specifications": {
      "Brand": "VLANG",
      "Model": "VL1083-B",
      "Product Type": "Enthusiast Car Sub-Woofer Unit",
      "Form Factor": "Ultra-Slim Underseat Active Subwoofer",
      "Max Power": "2000W MAX POWER"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/vlang-underseat.jpg",
      "alt_text": "VLANG VL1083-B 2000W Underseat Active Subwoofer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/vlang-underseat.jpg",
        "alt_text": "VLANG VL1083-B 2000W Underseat Active Subwoofer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 26,
    "name": "72.2mm KSV Titanium Tweeter Voice Coil Diaphragms (Pair)",
    "slug": "apart-tweeter-coil-pair",
    "brand": "",
    "model_number": "72.2mm KSV",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pair of 72.2mm KSV replacement compression driver voice coils with precision titanium dome diaphragms. Service component for rebuilding pro-audio horn drivers and high-output compression bullet tweeters.",
    "specifications": {
      "Voice Coil Diameter": "72.2 mm (\u03a672.2)",
      "Former Material": "KSV (Kapton)",
      "Diaphragm": "Titanium Dome with Terminal Leads",
      "Quantity": "Pair (2 Pieces)",
      "Application": "High-Output Compression Horn Driver Repair"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/tweeter-coil-pair.jpg",
      "alt_text": "72.2mm KSV Titanium Tweeter Voice Coil Diaphragms (Pair)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/tweeter-coil-pair.jpg",
        "alt_text": "72.2mm KSV Titanium Tweeter Voice Coil Diaphragms (Pair)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 27,
    "name": "Kenwood PS-Series KAC-PS704EX 1000W 4-Channel Power Amplifier",
    "slug": "kenwood-1000w-4channel",
    "brand": "Kenwood",
    "model_number": "KAC-PS704EX",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Kenwood Performance Standard (PS) KAC-PS704EX 1000W bridgeable 4-channel Class AB car power amplifier. Delivers 70W RMS x 4 (4\u03a9) or 200W RMS x 2 bridged, with cast aluminum heatsink, cooling fan, and speaker-level inputs.",
    "specifications": {
      "Brand": "Kenwood",
      "Model": "KAC-PS704EX",
      "Series": "Performance Standard (PS) Solid Power",
      "Amplifier Class": "Class AB",
      "Channel Configuration": "4 / 3 / 2 Channels Bridgeable",
      "Max Power Output": "1000W",
      "RMS Power (4 Ohm)": "70W x 4 channels",
      "RMS Power (2 Ohm)": "100W x 4 channels",
      "Bridged RMS (4 Ohm)": "200W x 2 channels",
      "Filters": "Variable LPF (50-200Hz), Fixed HPF (80Hz)",
      "Inputs": "RCA Line Inputs & Speaker Level Inputs (Signal Sensing Turn-on)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/kenwood-4ch-amp.jpg",
      "alt_text": "Kenwood PS-Series KAC-PS704EX 1000W 4-Channel Power Amplifier",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/kenwood-4ch-amp.jpg",
        "alt_text": "Kenwood PS-Series KAC-PS704EX 1000W 4-Channel Power Amplifier",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 28,
    "name": "Audiobank Tango Series AB-43N 5000W 4-Channel Power Amplifier",
    "slug": "audiobank-ab43n",
    "brand": "Audiobank",
    "model_number": "AB-43N",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Audiobank Tango Series AB-43N high-output 4-channel MOSFET car power amplifier. Delivers 5000W maximum peak power handling with heavy-duty ribbed aluminum heat-sink chassis and onboard crossover controls.",
    "specifications": {
      "Brand": "Audiobank (Ultimate Audio Force)",
      "Model": "AB-43N",
      "Series": "Tango Series",
      "Channels": "4-Channel Bridgeable (4CH)",
      "Max Power": "5000W",
      "Power Supply": "High Efficiency MOSFET"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/audiobank-ab43n.jpg",
      "alt_text": "Audiobank Tango Series AB-43N 5000W 4-Channel Power Amplifier",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/audiobank-ab43n.jpg",
        "alt_text": "Audiobank Tango Series AB-43N 5000W 4-Channel Power Amplifier",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 29,
    "name": "Pioneer GM-E7004 1000W 4-Channel Bridgeable Power Amplifier",
    "slug": "pioneer-gm-e7004",
    "brand": "Pioneer",
    "model_number": "GM-E7004",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Pioneer GM-E7004 bridgeable 4-channel Class AB car power amplifier with 1000W max power. Delivers 70W RMS x 4 into 4 ohms (190W x 2 bridged), with selectable low-pass and high-pass filters and speaker-level inputs.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "GM-E7004",
      "Channel Configuration": "4 / 3 / 2 Channel Bridgeable",
      "Max Power Output": "1000W Max",
      "RMS Power (4 Ohm)": "70W x 4 channels",
      "RMS Power (2 Ohm)": "95W x 4 channels",
      "Bridged RMS (4 Ohm)": "190W x 2 channels",
      "Amplifier Class": "Class AB",
      "Filters": "Variable LPF / HPF (32 Hz - 320 Hz)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-gm-e7004.jpg",
      "alt_text": "Pioneer GM-E7004 1000W 4-Channel Bridgeable Power Amplifier",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-gm-e7004.jpg",
        "alt_text": "Pioneer GM-E7004 1000W 4-Channel Bridgeable Power Amplifier",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 30,
    "name": "Pioneer GM-A6704 1000W 4-Channel Bridgeable Power Amplifier",
    "slug": "pioneer-gm-a6704",
    "brand": "Pioneer",
    "model_number": "GM-A6704",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Pioneer GM-A6704 bridgeable 4-channel car power amplifier delivering 1000W max power. Features variable HPF/LPF crossovers, bass boost control, and speaker-level inputs for seamless OEM and aftermarket integration.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "GM-A6704",
      "Channel Configuration": "4 / 3 / 2 Channel Bridgeable",
      "Max Power Output": "1000W Max",
      "RMS Power (4 Ohm)": "60W x 4 channels",
      "RMS Power (2 Ohm)": "90W x 4 channels",
      "Bridged RMS (4 Ohm)": "190W x 2 channels",
      "Amplifier Class": "Class AB",
      "Bass Boost": "Variable 0 to 12 dB at 50 Hz"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-gm-a6704.jpg",
      "alt_text": "Pioneer GM-A6704 1000W 4-Channel Bridgeable Power Amplifier",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-gm-a6704.jpg",
        "alt_text": "Pioneer GM-A6704 1000W 4-Channel Bridgeable Power Amplifier",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 31,
    "name": "Boschmann PCH-4880DX 1500W 4-Channel MOSFET Power Amplifier",
    "slug": "boschmann-1500w",
    "brand": "Boschmann",
    "model_number": "PCH-4880DX",
    "category": {
      "name": "Power Amplifiers",
      "slug": "amplifiers"
    },
    "description": "Boschmann BM Audio PCH-4880DX 1500W 4-channel MOSFET car power amplifier. Features pure aluminium heat sink, bridgeable 4/3/2 channel operation, variable subwoofer frequency, and super-clean signal amplification.",
    "specifications": {
      "Brand": "Boschmann (BM Audio)",
      "Model": "PCH-4880DX",
      "Channel Configuration": "4 / 3 / 2 Channel Bridgeable",
      "Max Power": "1500 Watts",
      "Technology": "High Efficiency MOSFET Power Supply, Superjunction Technology",
      "Heat Sink": "High Density Pure Aluminium Heat Sink",
      "Protection": "Thermal, Short-Circuit, Overload, DC Offset"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/boschmann-1500.jpg",
      "alt_text": "Boschmann PCH-4880DX 1500W 4-Channel MOSFET Power Amplifier",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/boschmann-1500.jpg",
        "alt_text": "Boschmann PCH-4880DX 1500W 4-Channel MOSFET Power Amplifier",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 32,
    "name": "STV 3-Pin XLR Male & Female Audio Connectors (3 Pairs)",
    "slug": "stv-xlr-connectors",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV 3-pin heavy-duty XLR male and female connector pairs with rugged nickel-plated metal shells and color-coded strain relief boots (red, blue, green) for balanced mic and line-level audio cables.",
    "specifications": {
      "Brand": "STV",
      "Connector Type": "3-Pin XLR (Balanced Audio)",
      "Configuration": "3 Male + 3 Female Connectors (3 Complete Pairs)",
      "Shell": "Nickel-Plated Metal Body with STV Stamp",
      "Strain Relief": "Color-Coded Flexible Boots (Red, Blue, Green)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-xlr-set.jpg",
      "alt_text": "STV 3-Pin XLR Male & Female Audio Connectors (3 Pairs)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-xlr-set.jpg",
        "alt_text": "STV 3-Pin XLR Male & Female Audio Connectors (3 Pairs)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 33,
    "name": "STV 4-Pole Speakon Speaker Connectors (Tray Pack)",
    "slug": "power-speakon-set",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV 4-pole high-current speakon cable connectors in retail tray pack. Features durable blue and white twist-lock bodies with metal latch locks for heavy-gauge amplifier-to-subwoofer loudspeaker connections.",
    "specifications": {
      "Brand": "STV",
      "Connector Type": "4-Pole Speakon Loudspeaker Connector",
      "Color": "Blue and White with Quick-Release Metal Latch",
      "Application": "High-Power Car Audio Subwoofer & Stage Speaker Runs"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/power-speakon.jpg",
      "alt_text": "STV 4-Pole Speakon Speaker Connectors (Tray Pack)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/power-speakon.jpg",
        "alt_text": "STV 4-Pole Speakon Speaker Connectors (Tray Pack)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 34,
    "name": "Neutrik NL4FC 4-Pole Speakon Cable Connectors",
    "slug": "speakon-connectors-premium",
    "brand": "Neutrik",
    "model_number": "NL4FC",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Genuine Neutrik NL4FC 4-pole speakon cable connectors (Swiss Made). Industry-standard 30A rated loudspeaker connector featuring glass-reinforced housing, chuck type strain relief, and quick-lock metal latch.",
    "specifications": {
      "Brand": "Neutrik",
      "Model": "NL4FC",
      "Origin": "Swiss Made",
      "Connector Type": "4-Pole Speakon Cable Connector",
      "Current Rating": "30A RMS continuous",
      "Locking System": "Quick Lock Metal Latch"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speakon-good.jpg",
      "alt_text": "Neutrik NL4FC 4-Pole Speakon Cable Connectors",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speakon-good.jpg",
        "alt_text": "Neutrik NL4FC 4-Pole Speakon Cable Connectors",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 35,
    "name": "STV 4-Pole Multi-Color Speakon Speaker Connectors",
    "slug": "speakon-connectors-small",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV 4-pole speakon speaker connectors featuring assorted color-coded boots (red, green, orange, blue, yellow) and metal release latches for channel identification in multi-amp car audio installations.",
    "specifications": {
      "Brand": "STV",
      "Connector Type": "4-Pole Speakon Speaker Connector",
      "Color Coding": "Multi-Color Boots (Red, Green, Orange, Blue, Yellow)",
      "Latch": "Quick-Release Metal Latch",
      "Application": "Speaker and Subwoofer Cable Termination"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speakon-small.jpg",
      "alt_text": "STV 4-Pole Multi-Color Speakon Speaker Connectors",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speakon-small.jpg",
        "alt_text": "STV 4-Pole Multi-Color Speakon Speaker Connectors",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 36,
    "name": "6.35mm Mono Jack to Jack Instrument Audio Cable",
    "slug": "jack-to-jack-cable",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Heavy-duty 6.35mm (1/4-inch) mono TS to TS jack audio lead with molded red strain-relief boots and thick rubberized brown jacket for noise-free instrument and amplifier patching.",
    "specifications": {
      "Connector A": "6.35 mm (1/4\") Mono TS Jack Male",
      "Connector B": "6.35 mm (1/4\") Mono TS Jack Male",
      "Shielding": "Low-Noise Audio Shielding",
      "Jacket": "Flexible Heavy-Duty Rubberized Sheath"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/jack-to-jack.jpg",
      "alt_text": "6.35mm Mono Jack to Jack Instrument Audio Cable",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/jack-to-jack.jpg",
        "alt_text": "6.35mm Mono Jack to Jack Instrument Audio Cable",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 37,
    "name": "Gold-Plated Metal RCA Male Solder Plugs (Set)",
    "slug": "rca-plug-set",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "High-grade gold-plated RCA male solder-type audio/video connectors with knurled metal barrels and red/black polarity identification rings for custom RCA interconnect fabrication.",
    "specifications": {
      "Connector Type": "RCA Male Solder Plug",
      "Contact Plating": "Gold-Plated Center Pin and Ground Ring",
      "Barrel Material": "Knurled Nickel-Alloy Shell",
      "Polarity": "Color-Coded Red & Black Indicator Rings"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/rca-jack-set.jpg",
      "alt_text": "Gold-Plated Metal RCA Male Solder Plugs (Set)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/rca-jack-set.jpg",
        "alt_text": "Gold-Plated Metal RCA Male Solder Plugs (Set)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 38,
    "name": "3.5mm Stereo Mini-Jack to 2 RCA Male Audio Cable",
    "slug": "rca-2by1-cable",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Standard 3.5mm stereo mini-jack (1/8\") to dual RCA male audio interconnect cable. Connects mobile phones, tablets, or auxiliary sources to car amplifier or head unit RCA inputs.",
    "specifications": {
      "Connector A": "3.5 mm (1/8\") Stereo TRS Mini-Jack Male",
      "Connector B": "2 x RCA Male (Red / White Audio)",
      "Jacket": "Flexible Black PVC",
      "Application": "Auxiliary Audio Interconnect"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/rca-2by1.jpg",
      "alt_text": "3.5mm Stereo Mini-Jack to 2 RCA Male Audio Cable",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/rca-2by1.jpg",
        "alt_text": "3.5mm Stereo Mini-Jack to 2 RCA Male Audio Cable",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 39,
    "name": "3 RCA to 3 RCA Composite Audio/Video Cable",
    "slug": "rca-3by3-cable",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Color-coded 3 RCA to 3 RCA composite audio/video cable with gold-plated tips. Transmits standard composite video (yellow) and stereo left/right audio (white/red) for in-car monitors and players.",
    "specifications": {
      "Connectors": "3 x RCA Male to 3 x RCA Male",
      "Color Coding": "Yellow (Video), White (Audio L), Red (Audio R)",
      "Application": "In-Car AV Monitors, Headrest Displays, DVD/Media Players"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/rca-3x3.jpg",
      "alt_text": "3 RCA to 3 RCA Composite Audio/Video Cable",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/rca-3x3.jpg",
        "alt_text": "3 RCA to 3 RCA Composite Audio/Video Cable",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 40,
    "name": "STV Spacetech 2x1.5mm Transparent Speaker Cable (100m)",
    "slug": "speaker-cable-15mm",
    "brand": "STV",
    "model_number": "2x1.5mm",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV Spacetech Ventures 2x1.5mm transparent twin-core speaker wire on 100-meter bulk roll. Flexible clear PVC insulation with polarity indicator stripe for clean car audio loudspeaker wiring.",
    "specifications": {
      "Brand": "STV Spacetech Ventures",
      "Model": "2x1.5mm",
      "Conductor Configuration": "2 x 1.5 mm\u00b2 Twin Conductor",
      "Roll Length": "100 meters",
      "Insulation": "Transparent PVC with Polarity Marking"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speaker-cable-15mm.jpg",
      "alt_text": "STV Spacetech 2x1.5mm Transparent Speaker Cable (100m)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speaker-cable-15mm.jpg",
        "alt_text": "STV Spacetech 2x1.5mm Transparent Speaker Cable (100m)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 41,
    "name": "STV High-Grade Low-Noise Microphone Cable (100m)",
    "slug": "stv-mic-cable-100m",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV professional high-grade low-noise balanced microphone and signal cable on 100-meter bulk reel. Heavy-duty rubberized black jacket with foil and braided shielding for interference-free runs.",
    "specifications": {
      "Brand": "STV",
      "Product": "High Grade Low Noise Microphone Cable",
      "Length": "100 meters",
      "Shielding": "Braided / Foil Shielded Balanced Audio",
      "Jacket": "Heavy-Duty Black PVC"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mic-cable-100m.jpg",
      "alt_text": "STV High-Grade Low-Noise Microphone Cable (100m)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mic-cable-100m.jpg",
        "alt_text": "STV High-Grade Low-Noise Microphone Cable (100m)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 42,
    "name": "STV Spacetech 2x2.5+1.5mm Twin Flat Earth Cable (100m)",
    "slug": "flat-twin-electrical-cable",
    "brand": "STV",
    "model_number": "2x2.5+1.5mm",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV Spacetech Ventures 2x2.5+1.5mm grey twin flat copper electrical cable with bare earth on 100-meter roll. 100% copper high-performance conductors for electrical and shop installation wiring.",
    "specifications": {
      "Brand": "STV Spacetech Ventures",
      "Model": "2x2.5+1.5mm",
      "Conductors": "2 x 2.5 mm\u00b2 Insulated + 1.5 mm\u00b2 Bare Earth (100% Copper)",
      "Roll Length": "100 meters",
      "Color": "Grey",
      "Sheath Print": "STV TWIN FLAT EARTH 2X2.5+1.5 SQMM"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/flat-twin-cable.jpg",
      "alt_text": "STV Spacetech 2x2.5+1.5mm Twin Flat Earth Cable (100m)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/flat-twin-cable.jpg",
        "alt_text": "STV Spacetech 2x2.5+1.5mm Twin Flat Earth Cable (100m)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 43,
    "name": "Programmable Flexible LED Screen (\"Devils' Eye\" Edition)",
    "slug": "devils-eye-led-screen",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "Programmable flexible full-color LED matrix panel display featuring the popular dynamic Devil's Eye animation. Smartphone app controlled for displaying animated graphics, text, and custom effects on rear vehicle glass.",
    "specifications": {
      "Product Type": "Flexible LED Screen Display Panel",
      "Theme / Graphics": "Devil's Eye Dynamic Matrix Animations",
      "Control": "Smartphone Bluetooth App Programmable",
      "Installation": "Flexible Window Adhesive Mount",
      "Certifications": "FCC, CE, RoHS"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/devils-eye.jpg",
      "alt_text": "Programmable Flexible LED Screen (\"Devils' Eye\" Edition)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/devils-eye.jpg",
        "alt_text": "Programmable Flexible LED Screen (\"Devils' Eye\" Edition)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 44,
    "name": "Smart LED Neon Strip Light (5V USB, 16M Colors, IP67)",
    "slug": "led-smart-neon-strip",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "5V USB-powered flexible smart neon LED strip light. Features 16 million RGB colors, IP67 waterproof silicone construction, app-based ambient sound sync, and wireless IR remote control for custom in-car and under-dash illumination.",
    "specifications": {
      "Product Type": "LED Smart Neon Strip Light",
      "Power Supply": "DC 5V USB",
      "Colors": "16 Million RGB Colors with Brightness Adjustment",
      "Waterproof Rating": "IP67 Waterproof",
      "Controls": "Smartphone App + 24-Key Wireless IR Remote"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/led-smart-strip.jpg",
      "alt_text": "Smart LED Neon Strip Light (5V USB, 16M Colors, IP67)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/led-smart-strip.jpg",
        "alt_text": "Smart LED Neon Strip Light (5V USB, 16M Colors, IP67)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 45,
    "name": "Programmable Flexible LED Scrolling Display (\"WELCOME\" Edition)",
    "slug": "led-flexible-display",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "Programmable ultra-thin flexible matrix LED screen display for automotive rear windows and commercial storefronts. Supports multi-color scrolling text (e.g. WELCOME, HELLO), GIF animations, custom graffiti, and music visualization.",
    "specifications": {
      "Product Type": "Flexible LED Screen Display",
      "Display Capabilities": "Text, GIF Animation, Audio Spectrum, Image, Photo, Graffiti",
      "Connectivity": "Bluetooth Smartphone App Controlled",
      "Mounting": "Flexible Curved / Flat Surface Application",
      "Applications": "Cars, SUVs, Buses, Trucks, Storefronts"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/led-flex-welcome.jpg",
      "alt_text": "Programmable Flexible LED Scrolling Display (\"WELCOME\" Edition)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/led-flex-welcome.jpg",
        "alt_text": "Programmable Flexible LED Scrolling Display (\"WELCOME\" Edition)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 46,
    "name": "1x4 Powered HDMI Splitter (1080P 3D Ver 1.4, 1-In 4-Out)",
    "slug": "hdmi-splitter-1080p",
    "brand": "",
    "model_number": "1x4 Splitter Ver 1.4",
    "category": {
      "name": "Lighting & Accessories",
      "slug": "lighting-accessories"
    },
    "description": "1x4 powered HDMI distribution amplifier splitter (1 HDMI input to 4 simultaneous HDMI outputs). Supports 1080P Full HD and 3D video signals at HDMI v1.4 specification; includes 5V 1A DC wall adapter.",
    "specifications": {
      "Configuration": "1 Input to 4 Outputs (SPLITTER 1x4)",
      "Resolution Support": "1080P Full HD, 3D Compatible",
      "HDMI Specification": "Version 1.4",
      "Power Supply": "External DC 5V 1000mA Power Adapter (Model XYS-0501000Z)",
      "Chassis": "Metal Shielded Housing with Output Status LEDs"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/hdmi-splitter.jpg",
      "alt_text": "1x4 Powered HDMI Splitter (1080P 3D Ver 1.4, 1-In 4-Out)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/hdmi-splitter.jpg",
        "alt_text": "1x4 Powered HDMI Splitter (1080P 3D Ver 1.4, 1-In 4-Out)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 47,
    "name": "STV Spacetech T44 25\"-65\" Tilting TV Wall Mount Bracket",
    "slug": "stv-t44-wall-mount",
    "brand": "STV",
    "model_number": "T44",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV Spacetech T44 heavy-duty flat-panel tilting wall mount bracket for 25\" to 65\" LED, LCD, and Plasma screens. Supports up to 45kg (110 lbs) load with VESA patterns up to 400x400mm and -15\u00b0 to +15\u00b0 tilt adjustment.",
    "specifications": {
      "Brand": "STV Spacetech Ventures",
      "Model": "T44",
      "Supported Screen Sizes": "25\" to 65\" Displays",
      "Max Load Capacity": "45 kg (110 lbs)",
      "VESA Compatibility": "200x200 mm to 400x400 mm",
      "Tilt Range": "-15\u00b0 to +15\u00b0"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/wall-mount.jpg",
      "alt_text": "STV Spacetech T44 25\"-65\" Tilting TV Wall Mount Bracket",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/wall-mount.jpg",
        "alt_text": "STV Spacetech T44 25\"-65\" Tilting TV Wall Mount Bracket",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 48,
    "name": "STV 4K Android TV Set-Top Box with Voice Remote",
    "slug": "stv-4k-android-box-16gb",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV 4K Ultra HD Android TV set-top streaming media player. Powered by Android TV with built-in Google Assistant, Google Play Store, and dedicated voice control remote with one-touch Netflix and YouTube buttons.",
    "specifications": {
      "Brand": "STV",
      "Product Type": "4K Android Set-Top Box",
      "Operating System": "Powered by Android TV",
      "Resolution": "4K Ultra HD",
      "Voice Assistant": "Google Assistant Voice Control",
      "Preloaded Apps": "YouTube, Netflix, Prime Video, Google Play",
      "Remote": "STV Voice Remote Included",
      "Model Status": "Needs manual verification (model unprinted on front face)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-box-16gb.jpg",
      "alt_text": "STV 4K Android TV Set-Top Box with Voice Remote",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-box-16gb.jpg",
        "alt_text": "STV 4K Android TV Set-Top Box with Voice Remote",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 49,
    "name": "IM TV Stick Android TV Streaming Device",
    "slug": "mi-tv-stick",
    "brand": "IM",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "IM TV Stick compact HDMI streaming media player powered by Android TV. Plugs directly into display HDMI ports to stream Netflix, YouTube, Prime Video, Vudu, and Hulu with included Google Assistant voice remote.",
    "specifications": {
      "Brand": "IM",
      "Product Name": "IM TV Stick",
      "Operating System": "Powered by Android TV",
      "Voice Assistant": "Google Assistant Voice Control",
      "Connectivity": "Direct HDMI Plug",
      "Streaming Apps": "Netflix, YouTube, Prime Video, Vudu, Hulu",
      "Accessories": "IM Voice Remote Control Included"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mi-tv-stick.jpg",
      "alt_text": "IM TV Stick Android TV Streaming Device",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mi-tv-stick.jpg",
        "alt_text": "IM TV Stick Android TV Streaming Device",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 50,
    "name": "STV MT-X708 7-Band Parametric Car Audio Equalizer",
    "slug": "stv-mt-x708-equalizer",
    "brand": "STV",
    "model_number": "MT-X708",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV MT-X708 7-band dual-control parametric car audio equalizer with dedicated subwoofer output and volume controls. Features 7 EQ adjustment bands (50Hz to 12kHz) and sub frequency selector for precise system acoustic tuning.",
    "specifications": {
      "Brand": "STV",
      "Model": "MT-X708",
      "Product Type": "7-Band Dual Control Parametric Equalizer",
      "Subwoofer Control": "Dedicated Sub Volume & Sub Frequency Controls",
      "Equalization Frequencies": "50Hz, 125Hz, 315Hz, 750Hz, 2.2kHz, 6kHz, 12kHz",
      "Outputs": "Front, Rear, and Subwoofer Pre-Outs"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-mt-x708.jpg",
      "alt_text": "STV MT-X708 7-Band Parametric Car Audio Equalizer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-mt-x708.jpg",
        "alt_text": "STV MT-X708 7-Band Parametric Car Audio Equalizer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 51,
    "name": "Boschmann Gunmetal Line EQX-75PRO 7-Band Parametric Equalizer",
    "slug": "boschmann-eqx-75pro",
    "brand": "Boschmann",
    "model_number": "EQX-75PRO",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "Boschmann BM Audio EQX-75PRO Gunmetal Line professional parametric graphic equalizer with low-pass crossover and 13-volt peak line driver. Features half-DIN chassis, transparent top cover panel, and dual red/green illumination.",
    "specifications": {
      "Brand": "Boschmann (BM Audio Laboratories)",
      "Model": "EQX-75PRO",
      "Series": "Gunmetal Line / Concorde Gold Turbine Series",
      "Type": "Professional Parametric Graphic Equalizer with Low-Pass X-Over",
      "Line Driver": "13 Volt Peak Line Driver",
      "Illumination": "Two Backlight Illumination (Red / Green)",
      "Chassis": "One-Half DIN Size, Transparent Top Cover Panel, Black Chassis",
      "Inputs / Outputs": "CD/Radio Inputs, Front/Rear/Subwoofer Outputs"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/boschmann-eqx75.jpg",
      "alt_text": "Boschmann Gunmetal Line EQX-75PRO 7-Band Parametric Equalizer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/boschmann-eqx75.jpg",
        "alt_text": "Boschmann Gunmetal Line EQX-75PRO 7-Band Parametric Equalizer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 52,
    "name": "STV Spacetech DT9205A Digital Multimeter",
    "slug": "stv-digital-multimeter",
    "brand": "STV",
    "model_number": "DT9205A",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV Spacetech DT9205A digital electronic multimeter with large adjustable LCD display. Measures AC/DC voltage, AC/DC current up to 20A, resistance, capacitance, diode drop, and continuity buzzer in a protective rubber holster.",
    "specifications": {
      "Brand": "STV Spacetech Ventures",
      "Model": "DT9205A",
      "Product Type": "Digital Multimeter",
      "Display": "Large 3.5-digit LCD with Auto Power-Off",
      "Functions": "AC/DC Voltage, DC/AC Current (to 20A), Resistance, Capacitance, Diode & Continuity",
      "Protection": "Heavy-Duty Protective Rubber Holster"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/multimeter.jpg",
      "alt_text": "STV Spacetech DT9205A Digital Multimeter",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/multimeter.jpg",
        "alt_text": "STV Spacetech DT9205A Digital Multimeter",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 53,
    "name": "MP Multiple Power AA 3000mAh Ni-MH Rechargeable Batteries (2-Pack)",
    "slug": "mp-aa-rechargeable-3000",
    "brand": "MP",
    "model_number": "3000mAh",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "MP Multiple Power high-capacity AA 1.2V 3000mAh Ni-MH rechargeable battery pair. Rated for up to 1100 recharge cycles; ideal for test instruments, digital meters, wireless remotes, and workshop electronics.",
    "specifications": {
      "Brand": "MP Multiple Power",
      "Battery Size": "AA (R6)",
      "Chemistry": "Ni-MH (Nickel-Metal Hydride)",
      "Voltage": "1.2V",
      "Capacity": "3000 mAh",
      "Cycle Life": "Up to 1100 recharge cycles",
      "Quantity": "2 Batteries per Pack"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mp-aa-3000.jpg",
      "alt_text": "MP Multiple Power AA 3000mAh Ni-MH Rechargeable Batteries (2-Pack)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mp-aa-3000.jpg",
        "alt_text": "MP Multiple Power AA 3000mAh Ni-MH Rechargeable Batteries (2-Pack)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 54,
    "name": "MP Multiple Power MP-C802B Battery Charger (AA/AAA/9V)",
    "slug": "mp-standard-charger",
    "brand": "MP",
    "model_number": "MP-C802B",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "MP Multiple Power MP-C802B standard plug-in multi-cell battery charger. Accommodates AA, AAA, and 9V Ni-MH / Ni-CD rechargeable batteries with dual red LED charging status indicators.",
    "specifications": {
      "Brand": "MP Multiple Power",
      "Model": "MP-C802B",
      "Product Type": "Standard Battery Charger",
      "Compatible Battery Sizes": "AA, AAA, and 9V Rechargeable Cells",
      "Battery Chemistry": "Ni-MH / Ni-CD",
      "Status Display": "Dual Red Charging Status LEDs"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mp-charger.jpg",
      "alt_text": "MP Multiple Power MP-C802B Battery Charger (AA/AAA/9V)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mp-charger.jpg",
        "alt_text": "MP Multiple Power MP-C802B Battery Charger (AA/AAA/9V)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 55,
    "name": "12V 15A Regulated Switching Power Supply (AC-DC 180W)",
    "slug": "power-supply-12v-15a",
    "brand": "",
    "model_number": "12V 15A",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "12V 15A (180W) AC-DC professional regulated switching power supply in ventilated perforated aluminum casing. Ideal for workshop car audio display benches, 12V LED drivers, and bench-testing amplifiers.",
    "specifications": {
      "Product Type": "Regulated AC-DC Switching Power Supply",
      "Output Voltage": "12V DC",
      "Output Current": "15A (180W Max)",
      "Input Voltage": "100 - 240V AC 50/60Hz",
      "Protections": "Over-Voltage, Over-Current, Short-Circuit, Surge Protected",
      "Indicator": "Output LED Indicator"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/psu-12v15a.jpg",
      "alt_text": "12V 15A Regulated Switching Power Supply (AC-DC 180W)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/psu-12v15a.jpg",
        "alt_text": "12V 15A Regulated Switching Power Supply (AC-DC 180W)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 56,
    "name": "12V 30A Regulated Switching Power Supply with Cooling Fan (360W)",
    "slug": "power-supply-12v-30a",
    "brand": "",
    "model_number": "12V 30A",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "12V 30A (360W) high-output regulated switching power supply in heavy-duty aluminum enclosure with active cooling fan. Supplies clean 12V DC power for high-wattage car amplifiers and sound demo boards.",
    "specifications": {
      "Product Type": "Regulated AC-DC Switching Power Supply",
      "Output Voltage": "12V DC",
      "Output Current": "30A (360W Max)",
      "Cooling": "Integrated Temperature-Controlled Exhaust Fan",
      "Housing": "Ventilated Aluminum Enclosure with Screw Terminal Strip"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/psu-12v30a.jpg",
      "alt_text": "12V 30A Regulated Switching Power Supply with Cooling Fan (360W)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/psu-12v30a.jpg",
        "alt_text": "12V 30A Regulated Switching Power Supply with Cooling Fan (360W)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 57,
    "name": "9-Inch Android Car Entertainment & Navigation System",
    "slug": "car-entertainment-system-9",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Displays & In-Dash Monitors",
      "slug": "monitors"
    },
    "description": "9-inch full-touchscreen Android in-dash car entertainment and navigation console. Features GPS navigation, WiFi connectivity, Bluetooth hands-free audio, and smartphone screen mirroring.",
    "specifications": {
      "Product Type": "Car Entertainment System",
      "Screen Size": "9 inch Touchscreen (box checked 9 INCH)",
      "Operating System": "Android OS",
      "Core Features": "GPS Navigation, WiFi, Bluetooth, High-Resolution Multimedia Playback",
      "Model Status": "Needs manual verification (model unprinted on outer carton)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/car-entertainment-9.jpg",
      "alt_text": "9-Inch Android Car Entertainment & Navigation System",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/car-entertainment-9.jpg",
        "alt_text": "9-Inch Android Car Entertainment & Navigation System",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 58,
    "name": "Universal Android In-Dash Touchscreen Car Multimedia System",
    "slug": "car-multimedia-system",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Displays & In-Dash Monitors",
      "slug": "monitors"
    },
    "description": "Universal Android in-dash capacitive touchscreen car multimedia console complete with full installation accessories. Includes GPS antenna puck, dual USB ports, main wiring harness, RCA AV harness, and mounting brackets.",
    "specifications": {
      "Product Type": "In-Dash Touchscreen Multimedia System",
      "Display": "Capacitive Multi-Touch Glass Screen with Touch Side Buttons",
      "Included Harnesses": "Main Power/Speaker ISO Harness, RCA AV/Camera Input Cable, Dual USB Leads",
      "Accessories": "External GPS Antenna Receiver, Left/Right Metal Mounting Brackets",
      "Model Status": "Needs manual verification (model unprinted on outer carton)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/car-multimedia.jpg",
      "alt_text": "Universal Android In-Dash Touchscreen Car Multimedia System",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/car-multimedia.jpg",
        "alt_text": "Universal Android In-Dash Touchscreen Car Multimedia System",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 59,
    "name": "STV 747D Digital MP3 Bluetooth Audio Decoder Board (12V)",
    "slug": "stv-mp3-audio-board",
    "brand": "STV",
    "model_number": "747D",
    "category": {
      "name": "Car Radios & Receivers",
      "slug": "car-radios"
    },
    "description": "STV 747D 12V digital MP3 audio decoder module board with front USB, TF card slot, 3.5mm AUX, FM tuner, Bluetooth audio streaming, LED digital display, push-button controls, and full infrared remote control.",
    "specifications": {
      "Brand": "STV",
      "Model": "747D (Box sticker marked V20 / 747D)",
      "Product Name": "STV Digital MP3 Audio Board",
      "Operating Voltage": "DC 12V (Supports 5V / 12V)",
      "Connectivity": "Bluetooth, USB Port, TF Card Slot, 3.5mm AUX, FM Radio",
      "Controls": "Front Panel Tactile Buttons (Vol-, Scan, Vol+, Mode) + IR Remote Control",
      "Accessories": "Infrared Remote Control and Wiring Lead Pigtails Included"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/mp3-board.jpg",
      "alt_text": "STV 747D Digital MP3 Bluetooth Audio Decoder Board (12V)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/mp3-board.jpg",
        "alt_text": "STV 747D Digital MP3 Bluetooth Audio Decoder Board (12V)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 60,
    "name": "Pioneer Champion Series TS-W312D4 12-Inch DVC Subwoofer",
    "slug": "pioneer-ts-w312d4",
    "brand": "Pioneer",
    "model_number": "TS-W312D4",
    "category": {
      "name": "Subwoofers & Bass",
      "slug": "subwoofers"
    },
    "description": "Pioneer Champion Series TS-W312D4 12-inch (30cm) dual voice coil component subwoofer. Handles 1600W max power (500W RMS) with dual 4-ohm voice coils, reinforced IMPP composite cone, and double-stacked magnet assembly for tremendous bass impact.",
    "specifications": {
      "Brand": "Pioneer",
      "Model": "TS-W312D4",
      "Series": "Champion Series",
      "Subwoofer Size": "12 inch (30 cm)",
      "Voice Coil": "Dual 4 Ohm (4\u03a9 DVC)",
      "Max Power": "1600W Max",
      "RMS / Nominal Power": "500W NOM",
      "Frequency Response": "20 Hz - 1.6 kHz",
      "Sensitivity": "92 dB"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-w312d4.jpg",
      "alt_text": "Pioneer Champion Series TS-W312D4 12-Inch DVC Subwoofer",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-w312d4.jpg",
        "alt_text": "Pioneer Champion Series TS-W312D4 12-Inch DVC Subwoofer",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 61,
    "name": "Pioneer TS-S20 20mm 200W Component Dome Tweeters (Pair)",
    "slug": "pioneer-ts-520",
    "brand": "Pioneer",
    "model_number": "TS-S20",
    "category": {
      "name": "Speakers & Coaxials",
      "slug": "speakers"
    },
    "description": "Pioneer TS-S20 20mm component dome tweeters (pair) featuring amorphous titanium-coated diaphragms, integrated -12dB/oct in-line crossover networks, and 200W max power handling for smooth, non-fatiguing high frequencies.",
    "specifications": {
      "Brand": "Pioneer (Pioneer Corporation)",
      "Model": "TS-S20",
      "Tweeter Size": "20 mm Dome",
      "Type": "Component Tweeter Pair",
      "Max Power": "200W MAX",
      "Nominal Power": "50W NOM",
      "Diaphragm": "Amorphous Titanium Coated Diaphragm",
      "Crossover Network": "-12 dB/oct In-Line Network",
      "Mounting": "Surface Mount Easy Application",
      "UPC Barcode": "0 12562 13298 1"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/pioneer-ts-520.jpg",
      "alt_text": "Pioneer TS-S20 20mm 200W Component Dome Tweeters (Pair)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/pioneer-ts-520.jpg",
        "alt_text": "Pioneer TS-S20 20mm 200W Component Dome Tweeters (Pair)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 62,
    "name": "6.35mm (1/4\") Heavy-Duty Mono TS Jack Audio Plugs (Set of 4)",
    "slug": "fat-jack",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Set of four heavy-duty 6.35mm (1/4-inch) mono TS audio jack plugs. Features durable black enamel metal barrels, flexible rubber strain boots, and gold-plated tip contacts for solder-termination of guitar, mic, and instrument leads.",
    "specifications": {
      "Connector Type": "6.35 mm (1/4 inch) Mono TS Jack Plug",
      "Shell": "Black Metal Enamel Barrel with Rubber Strain Relief",
      "Contact Plating": "Gold-Plated Tip and Ground Contacts",
      "Termination": "Internal Solder Tabs with Cable Clamp",
      "Quantity": "Set of 4 Plugs"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/fat-jack.jpg",
      "alt_text": "6.35mm (1/4\") Heavy-Duty Mono TS Jack Audio Plugs (Set of 4)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/fat-jack.jpg",
        "alt_text": "6.35mm (1/4\") Heavy-Duty Mono TS Jack Audio Plugs (Set of 4)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 63,
    "name": "3.5mm Stereo TRS Mini-Jack Solder Audio Plugs (Assorted)",
    "slug": "phone-jack-small",
    "brand": "",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "Bulk assortment of 3.5mm (1/8-inch) stereo TRS mini-jack plugs. Features machined aluminum barrels in vibrant anodized colors (red, blue, black, silver), gold-plated 3-pole contacts, and internal solder terminals.",
    "specifications": {
      "Connector Type": "3.5 mm (1/8 inch) Stereo TRS Mini-Jack",
      "Contact Plating": "Gold-Plated 3-Pole Contacts (Tip, Ring, Sleeve)",
      "Barrels": "Machined Anodized Aluminum (Red, Blue, Black, Silver)",
      "Termination": "Solder Terminal Lugs with Internal Cable Clamp"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/phone-jack-small.jpg",
      "alt_text": "3.5mm Stereo TRS Mini-Jack Solder Audio Plugs (Assorted)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/phone-jack-small.jpg",
        "alt_text": "3.5mm Stereo TRS Mini-Jack Solder Audio Plugs (Assorted)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 64,
    "name": "STV Spacetech 1.5mm Solid Yellow/Green Earth Electrical Cable (100yd)",
    "slug": "electrical-cable-yellow",
    "brand": "STV",
    "model_number": "1.5mm solid",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "STV Spacetech Ventures 1.5mm solid copper single-core electrical earth wire on 100-yard roll. High-performance 100% copper conductor with dual-color yellow/green insulation for automotive grounding and electrical wiring.",
    "specifications": {
      "Brand": "STV Spacetech Ventures",
      "Model": "1.5mm solid",
      "Conductor Type": "1.5 mm\u00b2 Solid 100% Copper Conductor",
      "Length": "100 yards",
      "Color": "Yellow / Green (Earth / Grounding)",
      "Quality Standard": "100% Copper High Performance"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/electrical-cable-yellow.jpg",
      "alt_text": "STV Spacetech 1.5mm Solid Yellow/Green Earth Electrical Cable (100yd)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/electrical-cable-yellow.jpg",
        "alt_text": "STV Spacetech 1.5mm Solid Yellow/Green Earth Electrical Cable (100yd)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 65,
    "name": "QiWeiGe 1000 High-Purity 100% Copper Speaker Cable (100m)",
    "slug": "speaker-cable-gauge",
    "brand": "QiWeiGe",
    "model_number": "1000",
    "category": {
      "name": "Cables & Connectors",
      "slug": "cables-connectors"
    },
    "description": "QiWeiGe Model 1000 high-purity 100% copper heavy-gauge twin speaker cable on 100-meter bulk reel. Clear transparent flexible insulation ensures maximum current delivery and minimal signal resistance for vehicle subwoofer and amplifier stages.",
    "specifications": {
      "Brand": "QiWeiGe",
      "Model": "1000",
      "Conductor Material": "100% High-Purity Copper",
      "Length": "100 meters",
      "Jacket": "Transparent Heavy-Duty Twin Insulated Cable"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/speaker-cable-gauge.jpg",
      "alt_text": "QiWeiGe 1000 High-Purity 100% Copper Speaker Cable (100m)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/speaker-cable-gauge.jpg",
        "alt_text": "QiWeiGe 1000 High-Purity 100% Copper Speaker Cable (100m)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 66,
    "name": "STV 4K Android TV Set-Top Box (Thor Superhero Edition)",
    "slug": "stv-box-8gb",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV 4K Ultra HD Android TV set-top streaming player in limited-edition Marvel Thor themed retail box. Features Google Assistant voice remote, YouTube, Netflix, Prime Video, and 4K media playback.",
    "specifications": {
      "Brand": "STV",
      "Product Type": "4K Android Set-Top Box",
      "Operating System": "Powered by Android TV",
      "Resolution": "4K Ultra HD",
      "Voice Control": "Google Assistant Voice Remote",
      "Preloaded Services": "YouTube, Netflix, Prime Video, Google Play",
      "Packaging Edition": "Thor Superhero Edition Graphic",
      "Model Status": "Needs manual verification (model unprinted on front face)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-box-8gb.jpg",
      "alt_text": "STV 4K Android TV Set-Top Box (Thor Superhero Edition)",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-box-8gb.jpg",
        "alt_text": "STV 4K Android TV Set-Top Box (Thor Superhero Edition)",
        "is_primary": true,
        "sort_order": 0
      }
    ]
  },
  {
    "id": 67,
    "name": "STV Dual-Band WiFi 4K 60FPS Android TV Box",
    "slug": "stv-box-red",
    "brand": "STV",
    "model_number": "NEEDS MANUAL VERIFICATION",
    "category": {
      "name": "Electronics & Power",
      "slug": "electronics-power"
    },
    "description": "STV 4K 60FPS Android streaming TV box in football/sports themed packaging. Equipped with 2.4G/5G dual-band WiFi, H.265 HEVC 10-bit decoding, voice control remote, and preloaded streaming applications.",
    "specifications": {
      "Brand": "STV",
      "Product Type": "TV Box (Entertainment Edition)",
      "Resolution": "4K 10-Bit 60 FPS",
      "Video Decoding": "H.265 HEVC Hardware Decoding",
      "WiFi": "2.4G / 5G Dual-Band WiFi",
      "Voice Control": "Voice Remote Control with Dedicated App Keys",
      "Preloaded Streaming": "Live TV, Series, VOD, Netflix, YouTube, Prime Video, EA FC",
      "Model Status": "Needs manual verification (model unprinted on front face)"
    },
    "public_price": null,
    "price_type": "ON_REQUEST",
    "stock_status": "CHECK",
    "featured": false,
    "primary_image": {
      "image_url": "/images/products/stv-box-red.jpg",
      "alt_text": "STV Dual-Band WiFi 4K 60FPS Android TV Box",
      "is_primary": true,
      "sort_order": 0
    },
    "images": [
      {
        "image_url": "/images/products/stv-box-red.jpg",
        "alt_text": "STV Dual-Band WiFi 4K 60FPS Android TV Box",
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
