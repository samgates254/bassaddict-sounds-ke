"""Django Admin for workshop services."""

from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "featured", "active", "sort_order")
    list_editable = ("featured", "active", "sort_order")
    list_filter = ("active", "featured")
    search_fields = ("name", "slug", "description")
    ordering = ("sort_order", "name")
    prepopulated_fields = {"slug": ("name",)}
    save_on_top = True
    fieldsets = (
        (
            None,
            {
                "fields": ("name", "slug", "description"),
                "description": (
                    "Publish only work the shop actually offers. "
                    "Leave the description blank rather than adding an unverified claim."
                ),
            },
        ),
        ("Visibility", {"fields": ("featured", "active", "sort_order")}),
    )
