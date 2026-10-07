"""Root URL configuration.

API routes are not registered in Phase 0. Django Admin is the first
administrative interface and is the only path wired here.
"""

from django.contrib import admin
from django.urls import path

admin.site.site_header = "Bassaddict Sounds KE"
admin.site.site_title = "Bassaddict Admin"
admin.site.index_title = "Administration"

urlpatterns = [
    path("admin/", admin.site.urls),
]
