# Bassaddict Sounds KE — API

**Phase:** 0 — Architecture & Scaffolding

No API endpoints are implemented yet.

Django Admin is mounted at `/admin/`. That is the only URL registered in
Phase 0.

## Planned surface (later phases)

These paths are a direction, not a contract. They will be designed when
models exist.

### Accounts

- Registration
- Login / token refresh (JWT)
- Customer profile

### Catalog

- Public product list and detail
- Categories
- Public prices
- Authenticated customer-specific price on product detail

### Enquiries

- Create product, quote, installation, delivery, and custom-build
  enquiries
- Customer enquiry history
- Owner handling through Django Admin first

### Services

- Public list of workshop services

### Business

- Public business information
- Developer attribution (read-only)

## Out of scope for version one

- Payment endpoints
- Cart and checkout
- WhatsApp Business API webhooks
