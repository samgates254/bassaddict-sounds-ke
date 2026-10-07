"""Django Admin for the catalog."""

from django.contrib import admin

from .models import Category, CustomerPrice, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image_url", "alt_text", "is_primary", "sort_order")
    ordering = ("sort_order", "id")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "active", "sort_order")
    list_editable = ("active", "sort_order")
    list_filter = ("active",)
    search_fields = ("name", "slug", "description")
    ordering = ("sort_order", "name")
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = (
        (None, {"fields": ("name", "slug", "description", "sort_order", "active")}),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "brand",
        "model_number",
        "category",
        "public_price",
        "price_type",
        "stock_status",
        "featured",
        "active",
    )
    list_editable = ("featured", "active")
    list_filter = ("category", "brand", "price_type", "stock_status", "featured", "active")
    list_select_related = ("category",)
    search_fields = ("name", "brand", "model_number", "slug", "description")
    ordering = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    autocomplete_fields = ("category",)
    inlines = (ProductImageInline,)
    save_on_top = True
    fieldsets = (
        (None, {"fields": ("name", "slug", "brand", "model_number", "category")}),
        (
            "Description",
            {
                "fields": ("description", "specifications"),
                "description": (
                    "Leave a specification blank when it is not verified. "
                    "Do not guess power, impedance, size, or a warranty."
                ),
            },
        ),
        ("Price and stock", {"fields": ("price_type", "public_price", "stock_status")}),
        ("Visibility", {"fields": ("featured", "active")}),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "is_primary", "sort_order", "alt_text", "image_url")
    list_editable = ("is_primary", "sort_order")
    list_filter = ("is_primary", "product")
    list_select_related = ("product",)
    search_fields = ("product__name", "alt_text", "image_url")
    ordering = ("product", "sort_order")
    autocomplete_fields = ("product",)


@admin.register(CustomerPrice)
class CustomerPriceAdmin(admin.ModelAdmin):
    list_display = ("customer", "product", "price", "note", "updated_at")
    list_filter = ("product", "updated_at")
    list_select_related = ("customer", "product")
    search_fields = (
        "customer__email",
        "customer__first_name",
        "customer__last_name",
        "product__name",
        "product__brand",
        "note",
    )
    ordering = ("customer__email", "product__name")
    autocomplete_fields = ("customer", "product")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("customer", "product", "price", "note")}),
        ("Dates", {"fields": ("created_at", "updated_at")}),
    )
