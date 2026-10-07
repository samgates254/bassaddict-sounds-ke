"""Development settings.

SQLite is the default local database so development can start without a
PostgreSQL install. Set DB_ENGINE=postgresql to use Postgres locally.
"""

import os

from .base import *  # noqa: F403
from .base import BASE_DIR, env_bool

DEBUG = env_bool("DEBUG", default=True)

SECRET_KEY = os.getenv("SECRET_KEY", "change-me")

engine = os.getenv("DB_ENGINE", "sqlite").strip().lower()

if engine in {"postgres", "postgresql", "psycopg"}:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("DB_NAME", "bassaddict"),
            "USER": os.getenv("DB_USER", "postgres"),
            "PASSWORD": os.getenv("DB_PASSWORD", ""),
            "HOST": os.getenv("DB_HOST", "localhost"),
            "PORT": os.getenv("DB_PORT", "5432"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
