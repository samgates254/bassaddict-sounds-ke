import { CANONICAL_WHATSAPP_NUMBER } from "./brand.ts";
import assert from "node:assert/strict";
import test from "node:test";

import { validateBuild, validateEnquiry, validateRegister, safeNextPath } from "./validation.ts";
import { PRODUCT_ASSETS, productAssetPath } from "./product-assets.ts";
import { productEnquiryMessage, whatsappDigits, whatsappHref, enquiryFollowUp, installationEnquiryMessage, cartEnquiryMessage } from "./whatsapp.ts";

test("registration rejects a short password and a mismatch", () => {
  const errors = validateRegister({
    email: "amina@example.com",
    password: "short",
    passwordConfirm: "other",
    phone: "",
  });
  assert.equal(errors.password, "Use at least 8 characters.");
  assert.equal(errors.password_confirm, "Passwords do not match.");
});

test("enquiry requires a message and a positive quantity", () => {
  const errors = validateEnquiry({ enquiryType: "PRODUCT", message: "  ", quantity: 0 });
  assert.ok(errors.message);
  assert.ok(errors.quantity);
});

test("build brief requires goal, make, and location", () => {
  const errors = validateBuild({ goal: "", make: "", location: "" });
  assert.ok(errors.goal);
  assert.ok(errors.make);
  assert.ok(errors.location);
});

test("next paths stay on this site", () => {
  assert.equal(safeNextPath("/products/amp"), "/products/amp");
  assert.equal(safeNextPath("https://evil.example"), "/account");
  assert.equal(safeNextPath("//evil.example"), "/account");
  assert.equal(safeNextPath("/%2F%2Fevil.example"), "/account");
});

test("an image filename maps to a slug and never to a price", () => {
  assert.equal(productAssetPath("pioneer-ts-6900pro"), "/images/products/pioneer-ts-6900pro.jpg");
  assert.equal(productAssetPath("483721"), null);
  for (const asset of PRODUCT_ASSETS) {
    assert.equal("price" in asset, false);
    assert.equal(asset.file.includes("KSh"), false);
    assert.match(productAssetPath(asset.slug) ?? "", /^\/images\/products\/.+/);
  }
  const numericName = "483721.jpg";
  assert.equal(
    PRODUCT_ASSETS.some((asset) => asset.file === numericName),
    false,
  );
  assert.equal(Number.isFinite(Number(numericName)), false);
});

test("whatsapp links use the canonical Kenyan number and the product script", () => {
  assert.equal(CANONICAL_WHATSAPP_NUMBER, "0794069405");
  assert.equal(whatsappDigits(CANONICAL_WHATSAPP_NUMBER), "254794069405");
  assert.equal(whatsappDigits("+254794069405"), "254794069405");
  const href = whatsappHref(CANONICAL_WHATSAPP_NUMBER, productEnquiryMessage("Pioneer GM-D9701"));
  assert.ok(href.startsWith("https://wa.me/254794069405?text="));
  assert.ok(decodeURIComponent(href).includes("I'm interested in the Pioneer GM-D9701."));
});

test("follow-up messages use only known details", () => {
  const install = installationEnquiryMessage({ location: "Nairobi" });
  assert.match(install, /enquire about installation/);
  assert.equal(install.includes("Vehicle:"), false);
  assert.match(install, /Location: Nairobi/);

  const product = enquiryFollowUp({
    enquiryType: "PRODUCT",
    productName: "Pioneer TS-Z65F",
    message: "Is it in stock?",
  });
  assert.match(product, /Pioneer TS-Z65F/);
  assert.match(product, /Is it in stock\?/);
  assert.equal(product.includes("Budget:"), false);
});


test("cart enquiry message lists items, quantities and price summary", () => {
  const msg = cartEnquiryMessage([
    { name: "Pioneer TS-6900PRO", quantity: 2, price: "14500.00", slug: "pioneer-ts-6900pro" },
    { name: "KUERL 10-Inch Subwoofer", quantity: 1, price: "16500.00", slug: "kuerl-subwoofer" }
  ]);
  assert.match(msg, /2x Pioneer TS-6900PRO/);
  assert.match(msg, /1x KUERL 10-Inch Subwoofer/);
  assert.match(msg, /Estimated Total: KSh 45,500/);
});

test("cart enquiry message handles empty or zero-quantity carts safely", () => {
  const emptyMsg = cartEnquiryMessage([]);
  assert.match(emptyMsg, /enquire about your car audio services/);

  const zeroQtyMsg = cartEnquiryMessage([
    { name: "Pioneer TS-6900PRO", quantity: 0, price: "14500.00", slug: "pioneer-ts-6900pro" }
  ]);
  assert.match(zeroQtyMsg, /enquire about your car audio services/);
});

test("cart enquiry message includes site origin product links and handles special characters safely", () => {
  const msg = cartEnquiryMessage(
    [
      {
        name: "Pioneer 6\"x9\" High-Efficiency & Bass Speaker",
        quantity: 1,
        price: "14500.00",
        slug: "pioneer-6x9-speaker",
      },
    ],
    "https://bassaddict.co.ke"
  );
  assert.match(msg, /Pioneer 6"x9" High-Efficiency & Bass Speaker/);
  assert.match(msg, /\(https:\/\/bassaddict\.co\.ke\/products\/pioneer-6x9-speaker\)/);
  assert.match(msg, /Estimated Total: KSh 14,500/);
  assert.match(msg, /Showroom consultation & quote request; not a prepaid online order/);

  // Verify whatsappHref encoding of the message
  const href = whatsappHref("0794069405", msg);
  assert.ok(href.startsWith("https://wa.me/254794069405?text="));
  // Must be valid URL without unencoded illegal characters
  assert.doesNotThrow(() => new URL(href));
  assert.ok(!href.includes("\n")); // Newlines must be URL-encoded (%0A)
});

test("cart enquiry message handles unpriced items without misleading zero totals", () => {
  const msg = cartEnquiryMessage([
    { name: "Custom Fiber Enclosure", quantity: 1, price: null, slug: "custom-enclosure" },
  ]);
  assert.match(msg, /1x Custom Fiber Enclosure — Price on request/);
  // When no items have prices, no misleading Estimated Total is printed
  assert.equal(msg.includes("Estimated Total:"), false);
});

import { stockLabel } from "./format.ts";

test("stockLabel handles all backend StockStatus enum values", () => {
  assert.equal(stockLabel("IN_STOCK"), "In stock");
  assert.equal(stockLabel("LOW_STOCK"), "Low stock");
  assert.equal(stockLabel("OUT_OF_STOCK"), "Out of stock");
  assert.equal(stockLabel("ON_ORDER"), "On order");
  assert.equal(stockLabel("UNKNOWN_STATUS"), "UNKNOWN_STATUS");
});
