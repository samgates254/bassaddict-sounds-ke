# Staging & Production Deployment Guide: Bassaddict Sounds KE

This guide describes how to configure, verify, deploy, and maintain the Bassaddict Sounds KE storefront and API services on staging and production infrastructure.

---

## 1. Architecture Overview

- **Frontend:** Next.js 15.5 (React 19, Node.js 22 LTS runtime) serving SSR and statically generated routes on port `8080` (or `3000`).
- **Backend:** Django 6.1.2 with Django REST Framework 3.18.3 running on Python 3.12+ / 3.14 on WSGI (Gunicorn) on port `8000`.
- **Database:** Managed PostgreSQL (required by `config.settings.production` using `psycopg` 3.3).
- **Media & Static:** Static files collected via `collectstatic`; media served via web server or S3-compatible storage.
- **Handoff:** Client-side cart with WhatsApp quotation enquiry compilation to Nairobi showroom team (`0794069405`). No online payment gateway is connected or promised.

---

## 2. Environment Variables

### A. Backend (`backend/.env`)

Configure the following variables in the backend environment. Do not commit actual secrets to version control.

```bash
# Target settings module (forces DEBUG=False and validates production constraints)
DJANGO_SETTINGS_MODULE=config.settings.production

# Minimum 50-character cryptographically secure key (placeholder rejected by production check)
SECRET_KEY=PLACEHOLDER_GENERATE_50_CHAR_RANDOM_SECRET_KEY

# Comma-separated allowed hostnames for HTTP Host header validation
ALLOWED_HOSTS=staging-api.example.com,127.0.0.1

# PostgreSQL connection settings (required when DJANGO_SETTINGS_MODULE=config.settings.production)
# Note: production.py always uses 'django.db.backends.postgresql' directly
DB_NAME=bassaddict_staging
DB_USER=bassaddict_user
DB_PASSWORD=PLACEHOLDER_STRONG_POSTGRES_PASSWORD
DB_HOST=staging-db.internal.example.com
DB_PORT=5432

# CORS & CSRF: Must match the public frontend origin exactly (no trailing slash)
CORS_ALLOWED_ORIGINS=https://staging.example.com
CSRF_TRUSTED_ORIGINS=https://staging.example.com

# Optional security toggle (default is True in production)
SECURE_SSL_REDIRECT=True
```

*(Note: The following security flags are enforced directly in `production.py` and do not require environment variable overrides: `DEBUG = False`, `DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql'`, `SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')`, `SESSION_COOKIE_SECURE = True`, `CSRF_COOKIE_SECURE = True`, `SECURE_HSTS_SECONDS = 31536000`, `SECURE_CONTENT_TYPE_NOSNIFF = True`, and `X_FRAME_OPTIONS = 'DENY'`.)*

### B. Frontend (`frontend/.env`)

```bash
# Public API base URL accessible from both SSR server and browser client
NEXT_PUBLIC_API_URL=https://staging-api.example.com/api/v1

# Public site origin for canonical URLs, Open Graph, and itemized WhatsApp quotes
NEXT_PUBLIC_SITE_URL=https://staging.example.com
```

---

## 3. Database Provisioning & Migrations

1. **PostgreSQL Database Creation:**
   ```sql
   CREATE DATABASE bassaddict_staging;
   CREATE USER bassaddict_user WITH PASSWORD 'PLACEHOLDER_STRONG_POSTGRES_PASSWORD';
   GRANT ALL PRIVILEGES ON DATABASE bassaddict_staging TO bassaddict_user;
   ALTER DATABASE bassaddict_staging OWNER TO bassaddict_user;
   ```

2. **Execute Migrations:**
   ```bash
   cd backend
   python manage.py migrate --noinput
   ```

3. **Catalog Seeding (Data Protection Mode):**
   ```bash
   # Safe default: creates missing categories, verified products, and services
   # PRESERVES existing business-managed prices, descriptions, and stock statuses.
   python manage.py seed_catalog

   # NOTE: Never run with --overwrite in production or staging unless an explicit
   # full fixture reset has been authorized in writing.
   ```

4. **Create Administrative Superuser:**
   ```bash
   python manage.py createsuperuser
   ```

---

## 4. Backend Startup & Static Collection

1. **Collect Static Files:**
   ```bash
   cd backend
   python manage.py collectstatic --noinput
   ```

2. **Start WSGI Service (Gunicorn):**
   ```bash
   # Run with 3-4 worker processes behind reverse proxy
   gunicorn config.wsgi:application \
     --bind 127.0.0.1:8000 \
     --workers 3 \
     --timeout 60 \
     --access-logfile - \
     --error-logfile -
   ```

---

## 5. Frontend Build & Startup

1. **Install Dependencies:**
   ```bash
   cd frontend
   npm ci
   ```

2. **Compile Production Bundle:**
   ```bash
   npm run build
   ```

3. **Start Next.js Server:**
   ```bash
   npm start -- --hostname 127.0.0.1 --port 8080
   ```

---

## 6. Reverse Proxy & HTTPS Requirements (Nginx Example)

The reverse proxy must terminate TLS and pass the `X-Forwarded-Proto` and `Host` headers so Django's SSL checks evaluate correctly.

```nginx
# Frontend Storefront (https://staging.example.com)
server {
    listen 443 ssl http2;
    server_name staging.example.com;

    ssl_certificate /etc/ssl/certs/staging.example.com.crt;
    ssl_certificate_key /etc/ssl/private/staging.example.com.key;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}

# Backend API (https://staging-api.example.com)
server {
    listen 443 ssl http2;
    server_name staging-api.example.com;

    ssl_certificate /etc/ssl/certs/staging-api.example.com.crt;
    ssl_certificate_key /etc/ssl/private/staging-api.example.com.key;

    location /static/ {
        alias /var/www/bassaddict/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

---

## 7. Health-Check Verification

Both endpoints must be monitored by container orchestrators or uptime probes:

- **Root Health:** `GET https://staging-api.example.com/health/`
- **API Health:** `GET https://staging-api.example.com/api/v1/health/`

**Expected Responses:**
- When healthy (database connected):
  ```json
  HTTP/1.1 200 OK
  {"status":"ok","service":"bassaddict-api","database":"connected"}
  ```
- When database is unreachable:
  ```json
  HTTP/1.1 503 Service Unavailable
  {"status":"degraded","service":"bassaddict-api","database":"disconnected"}
  ```

---

## 8. Backup & Rollback Procedures

### A. Database Backup
Schedule automated nightly dumps before any migration:
```bash
pg_dump -U bassaddict_user -h staging-db.internal.example.com -Fc bassaddict_staging > /var/backups/bassaddict_$(date +%Y%m%d_%H%M%S).dump
```

### B. Database Restore
```bash
pg_restore -U bassaddict_user -h staging-db.internal.example.com -d bassaddict_staging --clean --if-exists /var/backups/bassaddict_YYYYMMDD_HHMMSS.dump
```

### C. Application Rollback
1. Re-deploy the previous known-good git commit tag.
2. If migrations were applied, run:
   ```bash
   python manage.py migrate <app_name> <target_migration_number>
   ```
3. Re-run `npm run build` and restart services.
