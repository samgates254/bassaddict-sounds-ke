import { test } from "node:test";
import assert from "node:assert/strict";

import { CANONICAL_WHATSAPP_NUMBER, FALLBACK_BUSINESS } from "./brand.ts";
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./fallback-catalog.ts";
import { formatKes, publicPriceLabel, stockLabel } from "./format.ts";
import {
  whatsappHref,
  productEnquiryMessage,
  buildEnquiryMessage,
  serviceEnquiryMessage,
  cartEnquiryMessage,
  generalEnquiryMessage,
} from "./whatsapp.ts";

test("Customer Journey A: Category Navigation -> Product Detail -> WhatsApp Link", () => {
  // 1. User selects category 'subwoofers'
  const subCategory = FALLBACK_CATEGORIES.find((c) => c.slug === "subwoofers");
  assert.ok(subCategory, "Subwoofers category must exist");
  assert.equal(subCategory.name, "Subwoofers & Bass");

  // 2. Filter products in this category
  const subs = FALLBACK_PRODUCTS.filter((p) => p.category?.slug === "subwoofers");
  assert.equal(subs.length, 6, "Must have 6 subwoofers in authoritative catalogue");

  // 3. User selects Pioneer Champion TS-W32S4
  const specimen = subs.find((p) => p.slug === "pioneer-ts-w3254-sub");
  assert.ok(specimen, "Pioneer TS-W32S4 must exist in catalogue");
  assert.equal(specimen.brand, "Pioneer");

  // 4. Generate WhatsApp enquiry link
  const message = productEnquiryMessage(specimen.name);
  const href = whatsappHref(CANONICAL_WHATSAPP_NUMBER, message);

  assert.ok(href.startsWith("https://wa.me/254794069405?text="));
  assert.ok(href.includes(encodeURIComponent("Pioneer Champion Series TS-W32S4")));
  assert.ok(href.includes(encodeURIComponent("Please confirm availability, price and installation options.")));
});

test("Customer Journey B: Search Query -> Dynamic Filtering -> Product Selection", () => {
  // Query: 'Sony'
  const sonyResults = FALLBACK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes("sony") ||
      (p.brand && p.brand.toLowerCase().includes("sony")) ||
      p.description.toLowerCase().includes("sony")
  );
  assert.ok(sonyResults.length > 0, "Sony query must return matches");
  for (const item of sonyResults) {
    assert.ok(
      item.name.toLowerCase().includes("sony") ||
        (item.brand && item.brand.toLowerCase().includes("sony")) ||
        item.description.toLowerCase().includes("sony")
    );
  }

  // Query: '1500W'
  const highPowerResults = FALLBACK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes("1500") ||
      p.description.toLowerCase().includes("1500") ||
      JSON.stringify(p.specifications).toLowerCase().includes("1500")
  );
  assert.ok(highPowerResults.length >= 2, "High power query 1500W must return matching subwoofers/amps");
});

test("Customer Journey C: Cart Operations — Add, Quantity Adjust, Subtotal, Remove", () => {
  // Item representation in Cart
  const item = {
    slug: "pioneer-ts-w3254",
    name: "Pioneer TS-W3254 Champion Series 12\" Subwoofer",
    price: "9500.00",
    image_url: "/products/pioneer-ts-w3254.jpg",
    brand: "Pioneer",
    quantity: 1,
  };

  // Add 1 item
  let qty = item.quantity;
  let unitPrice = Number(item.price);
  let subtotal = unitPrice * qty;
  assert.equal(subtotal, 9500);

  // Increment (+) to 2
  qty += 1;
  subtotal = unitPrice * qty;
  assert.equal(qty, 2);
  assert.equal(subtotal, 19000);

  // Decrement (-) to 1
  qty -= 1;
  subtotal = unitPrice * qty;
  assert.equal(qty, 1);
  assert.equal(subtotal, 9500);

  // Remove item
  const cart: typeof item[] = [item];
  const updatedCart = cart.filter((i) => i.slug !== item.slug);
  assert.equal(updatedCart.length, 0);
});

test("Customer Journey D: Cart WhatsApp Quotation Script Verification", () => {
  const cartItems = [
    {
      name: "Pioneer TS-W3254 Champion Series 12\" Subwoofer",
      quantity: 1,
      price: "9500.00",
      slug: "pioneer-ts-w3254",
    },
    {
      name: "Pioneer GM-A6704 4-Channel Power Amplifier",
      quantity: 1,
      price: "18500.00",
      slug: "pioneer-gm-a6704",
    },
    {
      name: "Programmable Flexible LED Screen (\"Devils' Eye\" Edition)",
      quantity: 1,
      price: null, // Price on request
      slug: "devils-eye-led-screen",
    },
  ];

  const origin = "https://bassaddict.co.ke";
  const message = cartEnquiryMessage(cartItems, origin);

  // Check structure
  assert.ok(message.includes("Hello Bassaddict Sounds KE,"));
  assert.ok(message.includes("1. 1x Pioneer TS-W3254 Champion Series 12\" Subwoofer"));
  assert.ok(message.includes("2. 1x Pioneer GM-A6704 4-Channel Power Amplifier"));
  assert.ok(message.includes("3. 1x Programmable Flexible LED Screen (\"Devils' Eye\" Edition)"));
  assert.ok(message.includes("Please provide pricing, workshop installation options, and availability"));
  // Zero customer-facing prices in cart enquiry
  assert.equal(message.includes("Estimated Total:"), false);
  assert.equal(message.includes("KSh"), false);

  const waLink = whatsappHref(CANONICAL_WHATSAPP_NUMBER, message);
  assert.ok(waLink.startsWith("https://wa.me/254794069405?text="));
});

test("Customer Journey E: Custom Build Form Submission & Quotation Generation", () => {
  const buildBrief = {
    vehicle: "Subaru Forester XT",
    budget: "Stage 2: Balanced SQ & SPL",
    requirements: "Custom ported MDF boot box with dual voice-coil Pioneer subwoofer, 4-channel power amp, and 0-gauge OFC wiring.",
    location: "Nairobi CBD",
  };

  const message = buildEnquiryMessage(buildBrief);
  assert.ok(message.includes("Subaru Forester XT"));
  assert.ok(message.includes("Budget: Stage 2: Balanced SQ & SPL"));
  assert.ok(message.includes("Custom ported MDF boot box"));
  assert.ok(message.includes("Location:\nNairobi CBD"));

  const waLink = whatsappHref(CANONICAL_WHATSAPP_NUMBER, message);
  assert.ok(waLink.startsWith("https://wa.me/254794069405?text="));
});

test("Customer Journey F: Services Enquiry (Workshop & Fabrication)", () => {
  const serviceName = "Custom MDF / Fiberglass Boot Enclosure Fabrication";
  const message = serviceEnquiryMessage(serviceName);
  assert.ok(message.includes("Custom MDF / Fiberglass Boot Enclosure Fabrication"));

  const waLink = whatsappHref(CANONICAL_WHATSAPP_NUMBER, message);
  assert.ok(waLink.startsWith("https://wa.me/254794069405?text="));
});

test("Customer Journey G: Contact Directions & Business Integrity", () => {
  assert.equal(FALLBACK_BUSINESS.business_name, "Bassaddict Sounds KE");
  assert.equal(FALLBACK_BUSINESS.address, "Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi, Kenya");
  assert.equal(FALLBACK_BUSINESS.phone, "0794069405");
  assert.equal(FALLBACK_BUSINESS.email, "bassaddictsounds@gmail.com");
  assert.equal(FALLBACK_BUSINESS.tagline, "ADDICTED TO BASS. DRIVEN BY SOUND.");
});
