# Bassaddict Sounds KE — Backend

**PHASE 2 COMPLETE — Public REST API and customer JWT authentication**

Premium car audio systems and professional installations.

**Brand:** BASSADDICT SOUNDS KE  
**Tagline:** ADDICTED TO BASS. DRIVEN BY SOUND.

This directory is the Django backend for the Bassaddict Sounds KE
website. The Next.js storefront is in `../frontend`.

## Current phase

Phase 1 holds the data model, custom user, Django Admin, and migrations.
Phase 2 adds the public API under `/api/v1/`:

- Customer registration, email/password JWT login, refresh, and `/auth/me/`
- Public categories, products, product detail, and services
- The signed-in customer's own negotiated prices
- Authenticated enquiry create and that customer's enquiry list
- Read-only public business contact details

Owner and developer work stays in Django Admin. There is no payment,
cart, or owner CRUD API. See `docs/api.md`.

## Stack

- Python 3.14
- Django 6.1
- Django REST Framework
- PostgreSQL (production)
- SQLite (default development database)
- JWT (`djangorestframework-simplejwt`)
- django-cors-headers

## Architecture overview

| App | Responsibility |
| --- | --- |
| `apps.core` | Singleton business settings and protected developer attribution |
| `apps.accounts` | Custom user, roles, customer profiles |
| `apps.catalog` | Categories, products, image URLs, public prices, customer prices |
| `apps.enquiries` | Product, installation, delivery, custom-build, and general requests |
| `apps.services` | Workshop service offerings |

Settings live in `config/settings/` (`base`, `development`, `production`).

`AUTH_USER_MODEL = "accounts.User"`. Users log in with email. There is no
username field.

Django Admin (`/admin/`) is the business management interface.

See `docs/architecture.md`, `docs/business-rules.md`, and `docs/api.md`.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

`createsuperuser` asks for an email and password. The account is a
developer superuser. Create the owner from Django Admin afterwards:
set role to Owner. That marks them as staff and adds the Owner group.
Customers created in Admin stay non-staff.

Edit `.env`. Leave `SECRET_KEY=change-me` only on a local machine.

## Commands

```bash
python manage.py check
python manage.py check --deploy
python manage.py makemigrations --check
python manage.py test
python manage.py runserver
```

`DJANGO_SETTINGS_MODULE` defaults to `config.settings.development` in
`manage.py`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DJANGO_SETTINGS_MODULE` | `config.settings.development` or `config.settings.production` |
| `SECRET_KEY` | Django secret. Placeholder `change-me` is rejected in production |
| `DEBUG` | `True` / `False` |
| `ALLOWED_HOSTS` | Comma-separated hosts |
| `DB_ENGINE` | `sqlite` (development default) or `postgresql` |
| `DB_NAME` | Database name (required in production) |
| `DB_USER` | PostgreSQL user |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port, default `5432` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins |
| `CSRF_TRUSTED_ORIGINS` | Comma-separated trusted origins |
| `SECURE_SSL_REDIRECT` | Production TLS redirect, default `True` |

Copy `.env.example`. Never commit `.env` or a real secret.

## Roles

| Role | Meaning |
| --- | --- |
| `CUSTOMER` | Website customer. Not staff. |
| `OWNER` | Business admin. Staff, Owner group. Cannot edit developer credit. |
| `DEVELOPER` | Technical admin. Staff, Developer group, can edit developer credit. |

Django permissions and groups are the authorization boundary. The role
field is the label that assigns those groups.

## Storefront

The customer website is `../frontend`. This Django project does not render it.
Production uses `DJANGO_SETTINGS_MODULE=config.settings.production`.
The storefront reads `NEXT_PUBLIC_API_URL` and builds `wa.me` links in the browser.
This API still does not call WhatsApp, and it still does not take payment.

## What this phase does not include

WhatsApp Business API calls, payment, cart, checkout, owner write APIs,
seeded products or prices, and a custom admin dashboard. Click-to-chat
links are built by the storefront, not by this API.
