"""Django Admin for customer enquiries."""

from django.contrib import admin

from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "enquiry_type",
        "status",
        "product",
        "location",
        "message_preview",
        "created_at",
    )
    list_editable = ("status",)
    list_filter = ("enquiry_type", "status", "created_at")
    list_select_related = ("customer", "product")
    search_fields = (
        "message",
        "owner_response",
        "location",
        "vehicle",
        "customer__email",
        "customer__first_name",
        "customer__last_name",
        "product__name",
        "customer__phone",
    )
    ordering = ("-created_at",)
    date_hierarchy = "created_at"
    autocomplete_fields = ("customer", "product")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "customer",
                    "enquiry_type",
                    "status",
                    "product",
                    "quantity",
                )
            },
        ),
        ("Request", {"fields": ("vehicle", "location", "message")}),
        (
            "Quote",
            {
                "fields": ("owner_response", "offered_price", "delivery_fee"),
                "description": "A quote is not a payment or an order.",
            },
        ),
        ("Dates", {"fields": ("created_at", "updated_at")}),
    )

    @admin.display(description="Message")
    def message_preview(self, enquiry):
        text = " ".join(enquiry.message.split())
        if len(text) <= 80:
            return text
        return f"{text[:77]}…"
