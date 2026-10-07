import assert from "node:assert/strict";
import test from "node:test";

import { validateBuild, validateEnquiry, validateRegister, safeNextPath } from "./validation.ts";
import { PRODUCT_ASSETS, productAssetPath } from "./product-assets.ts";
import { productEnquiryMessage, whatsappDigits, whatsappHref, enquiryFollowUp, installationEnquiryMessage } from "./whatsapp.ts";

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

test("whatsapp links use the Kenyan number and the product script", () => {
  assert.equal(whatsappDigits("0794069405"), "254794069405");
  assert.equal(whatsappDigits("+254794069405"), "254794069405");
  const href = whatsappHref("0794069405", productEnquiryMessage("Pioneer GM-D9701"));
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
