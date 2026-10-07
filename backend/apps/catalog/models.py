"""Catalog: categories, products, image URLs, and private customer prices.

A customer price is a separate record. It never overwrites public_price.
Money is DecimalField, currency KES. Specifications are owner-entered JSON.
"""

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class PriceType(models.TextChoices):
    FIXED = "FIXED", "Fixed"
    ON_REQUEST = "ON_REQUEST", "On request"
    CONTACT = "CONTACT", "Contact"


class StockStatus(models.TextChoices):
    IN_STOCK = "IN_STOCK", "In stock"
    LOW_STOCK = "LOW_STOCK", "Low stock"
    OUT_OF_STOCK = "OUT_OF_STOCK", "Out of stock"
    ON_ORDER = "ON_ORDER", "On order"


class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True)
    description = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    brand = models.CharField(max_length=120, blank=True)
    model_number = models.CharField(max_length=120, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )
    description = models.TextField(blank=True)
    specifications = models.JSONField(
        default=dict,
        blank=True,
        help_text="Owner-entered product attributes. Do not invent specifications.",
    )
    public_price = models.DecimalField(
        "public price (KES)",
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Required when the price type is fixed. Leave empty for on-request or contact pricing.",
    )
    price_type = models.CharField(
        max_length=20,
        choices=PriceType.choices,
        default=PriceType.FIXED,
    )
    stock_status = models.CharField(
        max_length=20,
        choices=StockStatus.choices,
        default=StockStatus.IN_STOCK,
    )
    featured = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(public_price__isnull=True)
                | models.Q(public_price__gte=0),
                name="product_public_price_non_negative",
                violation_error_message="Public price cannot be negative.",
            ),
            models.CheckConstraint(
                condition=~models.Q(price_type=PriceType.FIXED)
                | models.Q(public_price__isnull=False),
                name="product_fixed_requires_public_price",
                violation_error_message="A fixed price product must have a public price.",
            ),
        ]

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        errors = {}
        if self.price_type == PriceType.FIXED and self.public_price is None:
            errors["public_price"] = "A fixed price requires a public price."
        if self.public_price is not None and self.public_price < 0:
            errors["public_price"] = "Public price cannot be negative."
        if errors:
            raise ValidationError(errors)


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image_url = models.URLField(
        "image URL",
        max_length=500,
        help_text="Direct image URL. No upload processing in this phase.",
    )
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(
        "primary",
        default=False,
        help_text="Mark the image that should be shown first.",
    )
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "product image"
        verbose_name_plural = "product images"
        ordering = ["sort_order", "id"]

    def __str__(self):
        label = "primary" if self.is_primary else "image"
        return f"{self.product} ({label})"


class CustomerPrice(models.Model):
    """Negotiated price for one customer and one product.

    This does not replace Product.public_price. Both values are kept.
    """

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="customer_prices",
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="customer_prices",
    )
    price = models.DecimalField(
        "customer price (KES)",
        max_digits=12,
        decimal_places=2,
        help_text="Private price for this customer. Does not change the public price.",
    )
    note = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "customer price"
        verbose_name_plural = "customer prices"
        ordering = ["customer__email", "product__name"]
        constraints = [
            models.UniqueConstraint(
                fields=["customer", "product"],
                name="unique_customer_product_price",
            ),
            models.CheckConstraint(
                condition=models.Q(price__gte=0),
                name="customer_price_non_negative",
                violation_error_message="Customer price cannot be negative.",
            ),
        ]

    def __str__(self):
        return f"{self.customer} — {self.product}: {self.price}"

    def clean(self):
        super().clean()
        if self.price is not None and self.price < 0:
            raise ValidationError({"price": "Customer price cannot be negative."})
