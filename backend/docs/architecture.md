# Bassaddict Sounds KE — Backend Architecture

**Phase 2 complete:** public REST API and customer JWT authentication are mounted at `/api/v1/`. See `docs/api.md`.

Phase 1 remains the data model, custom user, Django Admin, and migrations.

## Project purpose

Bassaddict Sounds KE is a premium car audio shop and installation workshop
in Nairobi.

**Brand:** BASSADDICT SOUNDS KE  
**Tagline:** ADDICTED TO BASS. DRIVEN BY SOUND.  
**Location:** Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi, Kenya  
**WhatsApp / Phone:** 0794069405  
**Email:** bassaddictsounds@gmail.com

The website is a catalog, enquiry, and account system. It is not a large
e-commerce platform. Version one has no online payment.

Customers will browse public products and prices, register, receive
negotiated prices where the owner assigns them, and submit enquiries. The
owner follows up directly, mainly on WhatsApp. The public API for that
flow is documented in `docs/api.md`.

## Architecture

The backend is a single Django project with Django REST Framework.

The Django project lives in the `backend/` directory of this repository.
The customer site lives in `frontend/`.

```
backend/
├── manage.py
├── config/                 # project settings, URLs, WSGI/ASGI
├── apps/
│   ├── core/               # business identity and developer attribution
│   ├── accounts/           # users, roles, profiles
│   ├── catalog/            # products, public prices, customer prices
│   ├── enquiries/          # quotes and service requests
│   └── services/           # workshop service offerings
├── docs/
├── tests/
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

Settings are split:

- `config.settings.base` — shared configuration, including `AUTH_USER_MODEL`
- `config.settings.development` — local work, SQLite by default
- `config.settings.production` — PostgreSQL, TLS cookie and HSTS flags

Django Admin is the administrative interface. A custom React/Next.js admin
is out of scope.

`config/urls.py` mounts `/admin/` only.

## Models and relationships

### `apps.accounts`

`User` (`accounts.User`) extends `AbstractBaseUser` and `PermissionsMixin`.

- Login field: `email` (unique, stored lowercased)
- `first_name`, `last_name`, `phone`
- `role`: `CUSTOMER`, `OWNER`, `DEVELOPER`
- `is_active`, `is_staff`, `is_superuser`
- `date_joined`, `last_login`
- Groups and user permissions from Django

`UserManager.create_user` and `create_superuser` are the creation API.
`createsuperuser` uses email. A superuser defaults to role `DEVELOPER`.

Saving a user adjusts staff access:

- `CUSTOMER` is not staff (unless the account is a superuser)
- `OWNER` and `DEVELOPER` are staff

A `post_save` signal also:

- creates an empty `CustomerProfile`
- adds the user to the `Owner` or `Developer` group, or removes both for a customer

Those groups are created after migrate. The Owner group can manage the
catalog, services, enquiries, customer profiles, customer accounts, and
business contact details. It cannot change developer attribution. The
Developer group receives every Django permission.

`CustomerProfile` is one-to-one with `User` (`user.profile`):

- `location`
- `vehicle_make`, `vehicle_model`, `vehicle_year` (all optional)
- `notes`
- `created_at`, `updated_at`

### `apps.catalog`

`Category` → `Product` → `ProductImage`

`Category`: `name`, unique `slug`, `description`, `active`, `sort_order`, timestamps.

`Product`:

- `name`, unique `slug`, `brand` (plain text, no Brand table), `model_number`
- `category` (protected from deletion while products exist)
- `description`
- `specifications` (`JSONField`, owner-entered, default `{}`)
- `public_price` (`DecimalField`, KES, null allowed)
- `price_type`: `FIXED`, `ON_REQUEST`, `CONTACT`
- `stock_status`: `IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK`, `ON_ORDER`
- `featured`, `active`, timestamps

`FIXED` requires `public_price`. `ON_REQUEST` and `CONTACT` may leave it
empty. Prices cannot be negative.

`ProductImage`: `image_url`, `alt_text`, `is_primary`, `sort_order`.
Phase 1 stores a URL only. There is no upload pipeline or Cloudinary SDK.

`CustomerPrice`:

- `customer` → `User`
- `product` → `Product`
- `price` (KES decimal, not negative)
- `note`, timestamps
- unique together `(customer, product)`

Saving a customer price does not write `Product.public_price`.

### `apps.services`

`Service`: `name`, unique `slug`, `description`, `active`, `featured`,
`sort_order`, timestamps.

No service rows are seeded. The owner creates them in Admin.

### `apps.enquiries`

`Enquiry` is a communication / quotation request, not an order.

- `customer` nullable (guest enquiries; set null if the user is deleted)
- `enquiry_type`: `PRODUCT`, `INSTALLATION`, `DELIVERY`, `CUSTOM_BUILD`, `GENERAL`
- `product` nullable
- `quantity` default `1`, must be at least 1
- `vehicle`, `location`, `message`
- `status`: `NEW`, `CONTACTED`, `QUOTED`, `COMPLETED`, `CANCELLED`
- `owner_response`
- `offered_price`, `delivery_fee` optional non-negative decimals
- timestamps

No payment row is created.

### `apps.core`

`BusinessSettings` is a singleton. `save()` always uses primary key `1`,
a check constraint rejects any other id, and `delete()` is refused.
`BusinessSettings.load()` returns that row. Migrate creates it with the
confirmed shop defaults.

Business fields the owner may edit:

- `business_name`, `tagline`, `phone`, `whatsapp_number`, `email`, `address`

Developer attribution:

- `developer_name` default `Sam Gates`
- `developer_credit` default `Designed & Developed by Sam Gates — Developer Courtesy`
- `developer_email`, `developer_whatsapp`, `developer_url` (blank until set)

The custom permission `core.change_developer_attribution` is required to
edit those five fields in Django Admin. Superusers have it. The Developer
group has it. The Owner group does not. The Admin form marks the fields
read-only and `save_model` writes back the stored values if the permission
is missing, so a crafted POST cannot change them.

## Database

**Production:** PostgreSQL.

**Development:** SQLite by default (`db.sqlite3`). Set
`DB_ENGINE=postgresql` in `.env` to use Postgres locally.

Initial migrations:

- `accounts.0001_initial` (custom user, must exist before other app FKs)
- `catalog.0001_initial`
- `core.0001_initial`
- `enquiries.0001_initial`
- `services.0001_initial`

Do not create production credentials in this repository.

## Authentication direction

`AUTH_USER_MODEL = "accounts.User"`.

JWT login, refresh, and registration are mounted at `/api/v1/auth/`.
Access tokens last 60 minutes. Refresh tokens last 7 days.

| Role | Access |
| --- | --- |
| Customer | Account, profile, own enquiries, own private prices. Not staff. |
| Owner | Django Admin for catalog, prices, services, enquiries, customers, business contact details |
| Developer | Full technical administration, including developer attribution |

## Customer pricing

Every fixed-price product has a public price. A customer may also have one
negotiated price for that product.

Example the rules use (not seeded data):

- Public: KSh 48,000
- One customer: KSh 44,000

The negotiated price is a separate `CustomerPrice` row. Money uses
`DecimalField`. Currency code is KES. Do not use float.

## Enquiry concept

Customers ask; the owner replies. Status lives on `Enquiry`. Orders and
checkout do not exist.

## Admin

Registered ModelAdmins cover categories, products, product images, customer
prices, services, enquiries, users, customer profiles, and business
settings. Lists have search, filters, and ordering suited to shop work.
The business settings changelist opens the singleton change form. There is
no custom dashboard.

Non-technical staff cannot grant superuser, edit groups, or retitle
developer credit from the user and settings forms.

## WhatsApp

Version one will use WhatsApp click-to-chat links. Business number:
0794069405. Link building is not implemented yet. There is no WhatsApp
Business API.

## Technologies intentionally not used

Version one does not use microservices, Kafka, Redis, Celery, RabbitMQ,
GraphQL, Kubernetes, event sourcing, CQRS, payment gateways, or the
official WhatsApp Business API.

The stack stays a Django monolith: Python, Django, Django REST Framework,
PostgreSQL, and later JWT.
