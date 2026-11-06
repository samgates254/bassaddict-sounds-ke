import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./fallback-catalog.ts";
import { publicPriceLabel } from "./format.ts";
import { cartEnquiryMessage } from "./whatsapp.ts";
import { displayImage } from "./product-assets.ts";

test("Priority 1: publicPriceLabel returns Price on Inquiry without monetary amounts", () => {
  assert.equal(publicPriceLabel({ public_price: "9500.00" }), "Price on Inquiry");
  assert.equal(publicPriceLabel({ public_price: "18500.00" }), "Price on Inquiry");
  assert.equal(publicPriceLabel({ public_price: null }), "Price on Inquiry");
  assert.equal(publicPriceLabel(), "Price on Inquiry");
});

test("Priority 1: cartEnquiryMessage produces zero KSh labels or monetary totals", () => {
  const msg = cartEnquiryMessage([
    { name: "Pioneer TS-6975 V3", quantity: 2, price: "12000.00", slug: "pioneer-ts-6975-v3" },
    { name: "Hifonics Brutus BXIPRO2.0", quantity: 1, price: "8500.00", slug: "hifonics-bxipro-20" },
  ]);
  assert.equal(msg.includes("KSh"), false);
  assert.equal(msg.includes("Estimated Total:"), false);
  assert.match(msg, /1\. 2x Pioneer TS-6975 V3/);
  assert.match(msg, /2\. 1x Hifonics Brutus BXIPRO2\.0/);
  assert.match(msg, /Please provide pricing, workshop installation options, and availability/);
});

test("Priority 3: Authoritative catalogue contains exactly 82 products across 8 categories", () => {
  assert.equal(FALLBACK_PRODUCTS.length, 82, "Catalogue must contain exactly 82 products");
  assert.equal(FALLBACK_CATEGORIES.length, 8, "Must contain exactly 8 canonical categories");

  const counts: Record<string, number> = {};
  for (const p of FALLBACK_PRODUCTS) {
    counts[p.category.slug] = (counts[p.category.slug] || 0) + 1;
  }

  assert.equal(counts["speakers"], 22, "Speakers must count 22");
  assert.equal(counts["subwoofers"], 6, "Subwoofers must count 6");
  assert.equal(counts["monitors"], 4, "Monitors must count 4");
  assert.equal(counts["car-radios"], 10, "Car radios must count 10");
  assert.equal(counts["amplifiers"], 6, "Amplifiers must count 6");
  assert.equal(counts["cables-connectors"], 16, "Cables must count 16");
  assert.equal(counts["lighting-accessories"], 4, "Lighting must count 4");
  assert.equal(counts["electronics-power"], 14, "Electronics must count 14");
});

test("Priority 3: All 15 newly integrated BASSADICT products exist with valid metadata", () => {
  const expectedNewSlugs = [
    "hifonics-bxipro-20",
    "audiobank-tab-3dx-crossover",
    "pioneer-ts-6975-v3",
    "pioneer-ts-r1051s",
    "kenwood-kfc-s1666",
    "kenwood-kfc-t40a",
    "nrd-audio-nrd-t350",
    "nrd-audio-nrd-s20",
    "pioneer-pro-red-bullet",
    "misound-pro-650m-midrange",
    "pioneer-mvh-s325bt",
    "nakamichi-nq711b",
    "nakamichi-n-t20",
    "pioneer-gm-d-mono-amplifier",
    "bassaddict-power-distribution-block",
  ];

  for (const slug of expectedNewSlugs) {
    const product = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    assert.ok(product, `Product ${slug} must exist in catalogue`);
    assert.ok(product.name.length > 5, `Product ${slug} must have a valid descriptive name`);
    assert.ok(product.primary_image?.image_url, `Product ${slug} must have a primary image`);
    assert.ok(product.category.slug, `Product ${slug} must have a category`);
  }
});

test("Priority 2: All 82 products have valid primary images that exist on disk", () => {
  const publicDir = path.resolve(import.meta.dirname, "../public");

  for (const product of FALLBACK_PRODUCTS) {
    const img = displayImage(product);
    assert.ok(img, `Product ${product.slug} must have a display image`);
    assert.ok(img.image_url, `Product ${product.slug} display image must have image_url`);

    // Verify physical file exists on disk
    const localPath = path.join(publicDir, img.image_url.replace(/^\//, ""));
    assert.ok(
      fs.existsSync(localPath),
      `Asset for product ${product.slug} does not exist at ${localPath}`
    );
  }
});

test("Priority 4: Catalogue search matches newly integrated products", () => {
  const queryHifonics = FALLBACK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes("hifonics") || p.description.toLowerCase().includes("hifonics")
  );
  assert.ok(queryHifonics.length >= 1, "Query 'hifonics' must return product");

  const queryAudiobank = FALLBACK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes("audiobank") || p.description.toLowerCase().includes("audiobank")
  );
  assert.ok(queryAudiobank.length >= 1, "Query 'audiobank' must return product");

  const queryNakamichi = FALLBACK_PRODUCTS.filter((p) =>
    (p.brand || "").toLowerCase().includes("nakamichi")
  );
  assert.ok(queryNakamichi.length >= 2, "Query 'nakamichi' must return at least 2 products");

  const queryNRD = FALLBACK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes("nrd") || (p.brand || "").toLowerCase().includes("nrd")
  );
  assert.ok(queryNRD.length >= 2, "Query 'nrd' must return at least 2 products");
});

test("Priority 3: Strict brand separation — ZERO MIKAKATI leaks", () => {
  const serialized = JSON.stringify(FALLBACK_PRODUCTS).toLowerCase();
  assert.equal(serialized.includes("mikakati"), false, "Must not contain 'mikakati'");
  assert.equal(serialized.includes("cereal"), false, "Must not contain 'cereal'");
  assert.equal(serialized.includes("grain"), false, "Must not contain 'grain'");
  assert.equal(serialized.includes("harvest"), false, "Must not contain 'harvest'");
  assert.equal(serialized.includes("fhfho34f43f34"), false, "Must not contain MIKAKATI image");
  assert.equal(serialized.includes("j jhggiugiu"), false, "Must not contain MIKAKATI video");
  assert.equal(serialized.includes("vnkjfvfvkfesver"), false, "Must not contain MIKAKATI photo");
});
