# Bassaddict Sounds KE — Business Rules

**Phase 1:** these rules are encoded in models, constraints, and Django Admin.
They are not yet exposed through a public API.

## 1. Public product prices are visible publicly

`Product.public_price` is the shop price. Anonymous visitors will be allowed
to see it when the catalog API exists. `FIXED` products must have a public
price. `ON_REQUEST` and `CONTACT` products may leave it empty.

## 2. Customer-specific prices belong only to the assigned customer

`CustomerPrice` stores the negotiated amount for one `(customer, product)`
pair. It does not overwrite `Product.public_price`. Both can exist at once
(for example public 48,000 KES and customer 44,000 KES). The price cannot
be negative. Nothing in Phase 1 publishes that private price.

## 3. No online payment exists in version one

There is no payment model, gateway, checkout, or card capture.

## 4. Orders are not a full e-commerce order system

There is no cart, checkout, invoice, or fulfilment model. `Enquiry` is the
sales record.

## 5. Enquiries and quotes are the primary sales interaction

`Enquiry` covers product, installation, delivery, custom build, and general
requests. Quantity defaults to 1 and must stay at least 1. `offered_price`
and `delivery_fee` are optional quote amounts, not charges. Status moves
from `NEW` through `CONTACTED`, `QUOTED`, `COMPLETED`, or `CANCELLED`.
The owner follows up directly, mainly on WhatsApp (0794069405). Guest
enquiries are allowed (`customer` may be null).

## 6. The owner controls business and catalog data

The Owner group can manage categories, products, images, public prices,
customer prices, services, enquiries, customer profiles, and customer
accounts through Django Admin. Specifications, model numbers, and real
prices are entered by the owner. Phase 1 does not seed products or invent
specifications.

Customers are not staff. Creating a user with role `CUSTOMER` does not
grant Admin access.

## 7. Developer-level configuration remains protected

Developer attribution on `BusinessSettings` is:

- Name: Sam Gates
- Credit: Designed & Developed by Sam Gates — Developer Courtesy

`developer_name`, `developer_credit`, `developer_email`,
`developer_whatsapp`, and `developer_url` change only with the permission
`core.change_developer_attribution`. Superusers and the Developer group
have that permission. Ordinary owners do not. Admin ignores owner attempts
to change those fields, including a posted form that includes them.

The business name, tagline, phone, WhatsApp number, email, and address
remain owner-editable. There is only one settings row, and it cannot be
deleted.

## Additional constraints

- Currency is KES. Display as KSh. Persist money as decimals.
- User email is unique and stored in lowercase.
- Category, product, and service slugs are unique.
- Roles are `CUSTOMER`, `OWNER`, and `DEVELOPER`. Groups and permissions
  authorize access. The role string assigns the Owner or Developer group;
  views and admin actions still check permissions.
- WhatsApp in version one is click-to-chat, not the Business API. Link
  generation is not built yet.
- Vehicle fields on the customer profile are optional.
