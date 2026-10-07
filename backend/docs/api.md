# Bassaddict Sounds KE — API

**Phase 2:** public REST API and customer JWT authentication.

Base path: `/api/v1/`

Money is a JSON string, Kenyan shillings (KES), for example `"48000.00"`.
There is no response envelope. Lists are JSON arrays. Errors use Django REST
framework's default body, usually `{"detail": "..."}` or field errors.

Authentication is a JWT access token:

```
Authorization: Bearer <access>
```

Send JSON (`Content-Type: application/json`).

Public reads work with no token. Customer routes require a valid access
token. There is no owner or developer API. That work stays in Django Admin.

Registration and login are throttled. The default cache is in-process
memory. Redis is not used.

## Authentication

### Register

`POST /api/v1/auth/register/` — public — `201`

```json
{
  "email": "amina@example.com",
  "password": "a-long-password",
  "password_confirm": "a-long-password",
  "first_name": "Amina",
  "last_name": "Otieno",
  "phone": "0712345678"
}
```

`email`, `password`, and `password_confirm` are required. The name and
phone fields are optional.

The account is always an active `CUSTOMER`. It is not staff and not a
superuser. `role`, `is_staff`, and `is_superuser` in the body are ignored.
Passwords are checked with Django's password validators. Duplicate email,
including a different letter case, is `400`.

Response (no password):

```json
{
  "email": "amina@example.com",
  "first_name": "Amina",
  "last_name": "Otieno",
  "phone": "0712345678",
  "role": "CUSTOMER",
  "profile": {
    "location": "",
    "vehicle_make": "",
    "vehicle_model": "",
    "vehicle_year": null,
    "notes": ""
  }
}
```

Registration does not return tokens. Call login next.

### Login

`POST /api/v1/auth/login/` — public — `200`

```json
{
  "email": "amina@example.com",
  "password": "a-long-password"
}
```

```json
{
  "access": "<jwt>",
  "refresh": "<jwt>"
}
```

Email is matched case-insensitively. A wrong password is `401`.

Access tokens last 60 minutes. Refresh tokens last 7 days.

### Refresh

`POST /api/v1/auth/refresh/` — public — `200`

```json
{ "refresh": "<refresh>" }
```

```json
{ "access": "<jwt>" }
```

### Current user

`GET /api/v1/auth/me/` — authenticated — `200`

Same shape as the register response. No password, staff flag, or
permissions. Missing or invalid token: `401`.

## Catalog

These routes are public. They never include `CustomerPrice`.

### Categories

`GET /api/v1/categories/`

Active categories only.

```json
[
  {
    "name": "Amplifiers",
    "slug": "amplifiers",
    "description": "",
    "sort_order": 0
  }
]
```

### Products

`GET /api/v1/products/`

Active products only. Optional query filters, combined with AND:

| Query | Meaning |
| --- | --- |
| `category` | Category slug. Inactive categories match nothing. |
| `brand` | Case-insensitive substring |
| `featured` | `true` or `false` |
| `stock_status` | `IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK`, `ON_ORDER` |

```json
[
  {
    "id": 1,
    "name": "Test amplifier",
    "slug": "test-amplifier",
    "brand": "Pioneer",
    "model_number": "TA-1",
    "category": { "name": "Amplifiers", "slug": "amplifiers" },
    "public_price": "48000.00",
    "price_type": "FIXED",
    "stock_status": "IN_STOCK",
    "featured": true,
    "primary_image": {
      "image_url": "https://example.com/amp.jpg",
      "alt_text": "Amplifier",
      "is_primary": true,
      "sort_order": 0
    }
  }
]
```

`public_price` is `null` when the shop left it empty (`ON_REQUEST` or
`CONTACT`). `primary_image` is `null` when the product has no image.
Images are URLs. This API does not upload files.

### Product detail

`GET /api/v1/products/{slug}/`

`404` when the slug is missing or the product is inactive.

Adds `description`, `specifications` (object), and `images` (array of the
same image objects). Does not add a private price, even when the caller
is logged in.

## Customer prices

`GET /api/v1/me/prices/` — authenticated — `200`

Returns only `CustomerPrice` rows for the token's user. A `customer` query
parameter or body is ignored. Another customer's price is never included.
Anonymous calls are `401`.

```json
[
  {
    "product": "test-amplifier",
    "product_name": "Test amplifier",
    "model_number": "TA-1",
    "price": "44000.00",
    "note": "Repeat customer"
  }
]
```

`price` does not replace `public_price`. The product endpoints still
return the public price only. The frontend can show this private price
beside it after login.

## Services

`GET /api/v1/services/` — public

Active services only. Optional `featured=true` or `featured=false`.

```json
[
  {
    "name": "Car Audio Installation",
    "slug": "car-audio-installation",
    "description": "",
    "featured": true,
    "sort_order": 0
  }
]
```

## Enquiries

There is no payment and no order. An enquiry asks the shop to follow up.

### Create

`POST /api/v1/enquiries/` — authenticated — `201`

Anonymous calls are `401`.

```json
{
  "enquiry_type": "PRODUCT",
  "product": "test-amplifier",
  "quantity": 2,
  "vehicle": "Toyota Axio",
  "location": "Nairobi",
  "message": "Is this in stock?"
}
```

`enquiry_type` is `PRODUCT`, `INSTALLATION`, `DELIVERY`, `CUSTOM_BUILD`,
or `GENERAL`. `product` is a product slug and may be omitted. `quantity`
defaults to 1 and must be at least 1. `message` is required.

The server sets `status` to `NEW` and sets the customer from the token.
`status`, `owner_response`, `offered_price`, and `delivery_fee` in the
body are ignored.

The response is the enquiry object below.

### Own list

`GET /api/v1/me/enquiries/` — authenticated — `200`

Only enquiries whose customer is the token user. A client-supplied
customer id is ignored.

```json
[
  {
    "id": 1,
    "enquiry_type": "PRODUCT",
    "product": "test-amplifier",
    "quantity": 2,
    "vehicle": "Toyota Axio",
    "location": "Nairobi",
    "message": "Is this in stock?",
    "status": "NEW",
    "owner_response": "",
    "offered_price": null,
    "delivery_fee": null,
    "created_at": "2026-10-07T12:00:00Z",
    "updated_at": "2026-10-07T12:00:00Z"
  }
]
```

`product` is `null` when the enquiry is not tied to a product. Quote
fields are filled later by the owner in Django Admin. Customers cannot
change them through this API. There is no update or delete route.

## Business

`GET /api/v1/business/` — public — `200`

```json
{
  "business_name": "Bassaddict Sounds KE",
  "tagline": "ADDICTED TO BASS. DRIVEN BY SOUND.",
  "phone": "0794069405",
  "whatsapp_number": "0794069405",
  "email": "bassaddictsounds@gmail.com",
  "address": "Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi, Kenya"
}
```

Developer attribution is not in this payload. The frontend may build a
WhatsApp click-to-chat link from `whatsapp_number`. This API does not
call the WhatsApp Business API.

## Ownership rules

- Private prices and enquiries are loaded with `customer=request.user`.
- Public product serializers have no customer-price field.
- Registration cannot create an owner, a developer, or a staff user.
- Owner catalog changes stay in Django Admin.

## Not in this phase

Payments, cart, checkout, orders, owner CRUD APIs, file upload, and
WhatsApp Business API calls.
