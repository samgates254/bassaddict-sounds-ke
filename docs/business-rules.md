# Bassaddict Sounds KE — Business Rules

**Phase:** 0 — Architecture & Scaffolding

These rules constrain later implementation. They are not yet encoded in
models or APIs.

## 1. Public product prices are visible publicly

Catalog prices shown on the public website are the shop's public prices.
Anonymous visitors may see them.

## 2. Customer-specific prices belong only to the assigned customer

A negotiated price is private to that customer. It is stored separately
from the public price. It must not overwrite the public product price.
Other customers must not see it.

## 3. No online payment exists in version one

The backend must not connect payment gateways, checkout, or card capture.

## 4. Orders are not a full e-commerce order system

Version one does not implement cart, checkout, order lifecycle, invoices,
or fulfilment workflows of a typical online store.

## 5. Enquiries and quotes are the primary sales interaction

Customers enquire about products, installation, delivery, and custom
builds. The owner follows up directly, mainly on WhatsApp
(0794069405) and other normal channels.

## 6. The owner controls business and catalog data

The owner manages products, public prices, customer prices, services,
enquiries, and public business information through Django Admin.

Product specifications, model numbers, ratings, and prices must be
entered from real shop data. The system must not invent them.

## 7. Developer-level configuration remains protected

Developer role covers technical administration, deployment, and
debugging. Developer attribution (Sam Gates / Designed & Developed by
Sam Gates / Developer Courtesy) is protected from ordinary owner
editing.

## Additional constraints

- Currency is KES. Display as KSh. Persist money as decimal values.
- Roles are customer, owner, and developer, using Django auth and
  permissions.
- WhatsApp in version one is click-to-chat, not the Business API.
- Loyal customer accounts exist so negotiated prices and enquiry history
  can be attached to a person.
