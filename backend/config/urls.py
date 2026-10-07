"""Root URL configuration.

Django Admin remains at /admin/. The public API is mounted at /api/v1/.
"""

from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "Bassaddict Sounds KE"
admin.site.site_title = "Bassaddict Admin"
admin.site.index_title = "Workshop"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("apps.accounts.urls")),
    path("api/v1/", include("apps.catalog.urls")),
    path("api/v1/", include("apps.services.urls")),
    path("api/v1/", include("apps.enquiries.urls")),
    path("api/v1/", include("apps.core.urls")),
]
