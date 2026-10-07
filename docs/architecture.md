# Bassaddict Sounds KE — Backend Architecture

**Phase:** 0 — Architecture & Scaffolding

This document describes the intended backend. It is not an implementation
status report. Business models, APIs, and authentication are not built yet.

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

Customers browse public products and prices, register, receive negotiated
prices where the owner assigns them, and submit enquiries. The owner
follows up directly, mainly on WhatsApp.

## Architecture

The backend is a single Django project with Django REST Framework.

This repository **is** the backend. The workspace root is the Django
project root. There is no nested `bassaddict-backend/` folder because the
parent directory is already `bassaddict-sounds-ke/backend`.

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

- `config.settings.base` — shared configuration
- `config.settings.development` — local work
- `config.settings.production` — deployed environment

Django Admin is the first administrative interface. A custom React/Next.js
admin is out of scope until a later decision.

## Applications and responsibilities

### `apps.core` — Business

Home for global business information that the owner may later edit:

- Business name
- Tagline
- Phone
- WhatsApp number
- Email
- Address
- Social links

Developer attribution lives here as a protected value:

- Name: Sam Gates
- Credit: Designed & Developed by Sam Gates
- Label: Developer Courtesy

The owner may edit business contact and location data. Developer
attribution must remain protected from ordinary owner editing.

`core` is an intentional extra app. Business identity is not accounts,
catalog, enquiries, or services, so it has its own place.

### `apps.accounts` — Accounts

- Registration and login
- Customer profile
- Roles: customer, owner, developer
- Customer account information

Use Django's user model, groups, and permissions. Do not build a custom
enterprise RBAC system.

`AUTH_USER_MODEL` is **not** set in Phase 0 because no custom user model
exists yet. The first `migrate` must wait until that model is defined.

### `apps.catalog` — Catalog

- Products, categories, brands, product models
- Product images
- Stock status
- Featured and active/inactive products
- Public price
- Customer-specific price (separate record, assigned to one customer)

Catalog data is entered by the owner. Do not invent specifications, model
numbers, RMS ratings, impedance, dimensions, or prices.

Known product names from supplied photos (names only, no invented specs):

- Pioneer TS-6900PRO
- Pioneer TS-Z65F
- Pioneer GM-D9701
- Pioneer GM-D9705
- Pioneer Champion Series PRO subwoofer
- 7-inch TFT/LED Hi-Res Display Monitor
- 9-inch TFT/LED Hi-Res Display Monitor
- Kuerl high-performance woofer

### `apps.enquiries` — Enquiries

Primary sales interaction in version one.

- Product enquiries
- Quote requests
- Installation requests
- Delivery requests
- Custom sound-system / build requests
- Customer messages
- Owner responses
- Enquiry status

There is no full e-commerce order system in this version.

### `apps.services` — Services

Workshop offerings, including:

- Car audio installation
- Sound upgrades
- Amplifier installation
- Subwoofer installation
- Android radio installation
- Headrest monitor installation
- Dashcam installation
- LED lighting
- Sound tuning
- Custom sound builds

## Database direction

**Production:** PostgreSQL.

**Development:** SQLite by default (`db.sqlite3`) so local setup stays
simple. Set `DB_ENGINE=postgresql` in `.env` to use Postgres locally.

Do not create production credentials in this repository.

## Authentication direction

JWT via `djangorestframework-simplejwt`.

Roles:

| Role | Access |
| --- | --- |
| Customer | Account, profile, enquiries, private prices assigned to them |
| Owner | Products, prices, customer prices, services, enquiries, business content |
| Developer | Technical administration, system administration, deployment/debugging |

Django Admin is the first staff interface for owner and developer work.

## Customer pricing concept

Every product has a public price. A customer may also have a negotiated
price for that product.

Example:

- Public: Pioneer GM-D9701 — KSh 48,000
- Customer John: KSh 44,000

The negotiated price is a separate value. It must not replace the public
product price. The backend later returns:

- public price for anonymous visitors
- the authenticated customer's private price when one exists

Money is stored with `DecimalField`. Currency code is KES. Display is KSh.
Do not use floating-point types for money.

## Enquiry concept

Customers ask; the owner replies. Enquiries cover products, quotes,
installation, delivery, and custom builds. Status tracking belongs here.
Orders and checkout do not.

## Admin concept

Django Admin manages:

- Products, categories, product images
- Customer profiles
- Customer prices
- Services
- Enquiries
- Business information (except protected developer attribution)

No custom frontend admin in this version unless a later phase requests it.

## WhatsApp communication concept

Version one uses WhatsApp click-to-chat links.

Business number: 0794069405

Enquiry and product context may later be encoded into a pre-filled
message URL. There is no official WhatsApp Business API in version one.

## Developer attribution

Name: Sam Gates  
Credit: Designed & Developed by Sam Gates  
Label: Developer Courtesy

This credit is part of the product identity. Owner-editable business
settings must not be able to remove or rewrite it through ordinary admin
forms.

## Technologies intentionally not used

Version one does not use:

- Microservices
- Kafka
- Redis
- Celery
- RabbitMQ
- GraphQL
- Kubernetes
- Event sourcing
- CQRS
- Complex message queues
- AI services
- Payment gateways
- Official WhatsApp Business API
- A custom React/Next.js admin dashboard

The stack stays a maintainable Django monolith: Python, Django, Django
REST Framework, PostgreSQL, JWT.
