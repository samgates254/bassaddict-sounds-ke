"""Enquiries and quotes. This is not an order or payment model."""

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models


class EnquiryType(models.TextChoices):
    PRODUCT = "PRODUCT", "Product"
    INSTALLATION = "INSTALLATION", "Installation"
    DELIVERY = "DELIVERY", "Delivery"
    CUSTOM_BUILD = "CUSTOM_BUILD", "Custom build"
    GENERAL = "GENERAL", "General"


class EnquiryStatus(models.TextChoices):
    NEW = "NEW", "New"
    CONTACTED = "CONTACTED", "Contacted"
    QUOTED = "QUOTED", "Quoted"
    COMPLETED = "COMPLETED", "Completed"
    CANCELLED = "CANCELLED", "Cancelled"


class Enquiry(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="enquiries",
        help_text="Leave empty for a guest enquiry.",
    )
    enquiry_type = models.CharField(max_length=20, choices=EnquiryType.choices)
    product = models.ForeignKey(
        "catalog.Product",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="enquiries",
    )
    quantity = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
    )
    vehicle = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=EnquiryStatus.choices,
        default=EnquiryStatus.NEW,
    )
    owner_response = models.TextField(blank=True)
    offered_price = models.DecimalField(
        "offered price (KES)",
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Optional quote. This does not create a payment.",
    )
    delivery_fee = models.DecimalField(
        "delivery fee (KES)",
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "enquiry"
        verbose_name_plural = "enquiries"
        ordering = ["-created_at"]
        indexes = [
            models.Index(
                fields=["status", "-created_at"],
                name="enquiry_status_created_idx",
            ),
        ]
        constraints = [
            models.CheckConstraint(
                condition=models.Q(quantity__gte=1),
                name="enquiry_quantity_positive",
                violation_error_message="Quantity must be at least 1.",
            ),
            models.CheckConstraint(
                condition=models.Q(offered_price__isnull=True)
                | models.Q(offered_price__gte=0),
                name="enquiry_offered_price_non_negative",
                violation_error_message="Offered price cannot be negative.",
            ),
            models.CheckConstraint(
                condition=models.Q(delivery_fee__isnull=True)
                | models.Q(delivery_fee__gte=0),
                name="enquiry_delivery_fee_non_negative",
                violation_error_message="Delivery fee cannot be negative.",
            ),
        ]

    def __str__(self):
        label = self.get_enquiry_type_display()
        if self.pk:
            return f"{label} enquiry #{self.pk}"
        return f"{label} enquiry"

    def clean(self):
        super().clean()
        errors = {}
        if self.quantity is not None and self.quantity < 1:
            errors["quantity"] = "Quantity must be at least 1."
        if self.offered_price is not None and self.offered_price < 0:
            errors["offered_price"] = "Offered price cannot be negative."
        if self.delivery_fee is not None and self.delivery_fee < 0:
            errors["delivery_fee"] = "Delivery fee cannot be negative."
        if errors:
            raise ValidationError(errors)
