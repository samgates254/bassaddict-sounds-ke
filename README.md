# Bassaddict Sounds KE

Premium car audio systems and professional installations.

**Tagline:** ADDICTED TO BASS. DRIVEN BY SOUND.

**Shop:** Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi, Kenya  
**Phone / WhatsApp:** 0794069405 (`https://wa.me/254794069405`)  
**Email:** bassaddictsounds@gmail.com

There is no online payment, cart, or checkout. A customer looks at a product, sees the public price, and sends an enquiry. The owner answers from Django Admin or WhatsApp.

```
bassaddict-sounds-ke/
├── backend/     Django API and Django Admin
├── frontend/    Next.js storefront
├── docs/        pointers — API docs live in backend/docs
└── README.md
```

## Customer flow

1. Browse products, services, or the build form.
2. Public prices come from the catalog. A signed-in customer may also see **Your Bassaddict price** from their own account. Another customer's price is never shown.
3. Sign in and send an enquiry (`PRODUCT`, `INSTALLATION`, `DELIVERY`, `CUSTOM_BUILD`, or `GENERAL`).
4. Continue on WhatsApp if they want. The site only opens `wa.me`. It does not call the WhatsApp Business API.

Account pages: overview, read-only profile, private prices, own enquiries. Logout is a POST action.

## Owner workflow

Django Admin at `/admin/` is the only back office.

The owner manages categories, products, image URLs, customer prices, services, enquiries, customers, and customer profiles. Business name, tagline, phone, WhatsApp, email, and address live on the business settings record.

Developer attribution stays locked to a superuser or a user with `core.change_developer_attribution`. An owner cannot change it.

Do not invent product prices or specifications in the database. If a spec is unknown, leave it blank. Supplied equipment photographs live in `frontend/public/images/`. A filename identifies an asset and is not a price. See [frontend/public/images/README.md](frontend/public/images/README.md). Image URLs entered in Admin override those local files. Public prices still come from the catalog API.

## Developer credit

Visible in the site footer, separate from the shop number:

- Designed & Developed by Sam Gates and Ken Kimwe
- Developer Courtesy
- WhatsApp +254111374435 (Sam Gates)
- WhatsApp +254796088951 (Ken Kimwe)
- sangates.dev@gmail.com
- samgates.developer@gmail.com
- kimwe.king@gmail.com

The business WhatsApp is **+254794069405**. Do not swap the two numbers.

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API base: `http://127.0.0.1:8000/api/v1`  
Contract: [backend/docs/api.md](backend/docs/api.md)

Local settings: `config.settings.development` (SQLite).  
Production settings: `config.settings.production` (PostgreSQL, real `SECRET_KEY`, `ALLOWED_HOSTS`). See `backend/.env.example`. Never commit `.env`.

## Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_API_URL` must point at `/api/v1`.  
`NEXT_PUBLIC_SITE_URL` is optional and only for canonical links, Open Graph URLs, and the sitemap. Leave it unset until the public domain exists.

Tokens are httpOnly cookies (`bass_access`, `bass_refresh`). They are not in `localStorage`.

## Deployment direction

Not deployed from this repository automatically.

- Backend: `DJANGO_SETTINGS_MODULE=config.settings.production`, PostgreSQL, `migrate`, then the WSGI app. Set `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to the real storefront origin.
- Frontend: `npm run build`, then `npm run start` (or the host's Node adapter). Set `NEXT_PUBLIC_API_URL` to the public API and, when the domain is known, `NEXT_PUBLIC_SITE_URL`.

## Checks

```bash
backend/.venv/bin/python backend/manage.py check
backend/.venv/bin/python backend/manage.py test
backend/.venv/bin/python backend/manage.py makemigrations --check
cd frontend && npx tsc --noEmit && npm run build
node --experimental-strip-types --test frontend/lib/check.test.ts
```
