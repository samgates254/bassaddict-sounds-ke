# Bassaddict Sounds KE — Backend

**PHASE 0 — ARCHITECTURE & SCAFFOLDING**

Premium car audio systems and professional installations.

**Brand:** BASSADDICT SOUNDS KE  
**Tagline:** ADDICTED TO BASS. DRIVEN BY SOUND.

This repository is the Django backend for the Bassaddict Sounds KE
website. It is a catalog, enquiry, and account API. It is not a large
e-commerce platform. Version one has no online payment.

## Current phase

Phase 0 establishes project layout, settings, documentation, and empty
domain apps. It does **not** include models, serializers, views, JWT
login, pricing logic, or API endpoints.

Do not run `migrate` until a custom user model exists in `apps.accounts`
and `AUTH_USER_MODEL` is set. That belongs to a later phase.

## Stack

- Python
- Django
- Django REST Framework
- PostgreSQL (production)
- SQLite (default development database)
- JWT (`djangorestframework-simplejwt`)
- django-cors-headers

## Architecture overview

| App | Responsibility |
| --- | --- |
| `apps.core` | Business information and protected developer attribution |
| `apps.accounts` | Users, roles, customer profiles |
| `apps.catalog` | Products, images, public prices, customer-specific prices |
| `apps.enquiries` | Quotes, product/install/delivery/custom-build requests |
| `apps.services` | Workshop service offerings |

Settings live in `config/settings/` (`base`, `development`, `production`).

Django Admin (`/admin/`) is the first administrative interface.

See `docs/architecture.md` and `docs/business-rules.md`.

## Setup direction

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env`. Leave `SECRET_KEY=change-me` only on a local machine.

## Development command placeholders

```bash
# Run the development server (after Phase 1+ dependencies are in place)
python manage.py runserver

# Django system check (safe in Phase 0)
python manage.py check

# Do not run migrate in Phase 0
# python manage.py migrate

# Tests (placeholders only in Phase 0)
python manage.py test
```

`DJANGO_SETTINGS_MODULE` defaults to `config.settings.development` in
`manage.py`.

## Environment variables required

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

## Roles (planned)

Customer, owner, developer — implemented later with Django auth and
permissions.

## What this phase does not include

Models, API endpoints, JWT views, customer pricing logic, enquiry
workflow, WhatsApp URL generation, admin model registrations, and
database migrations with business models.
