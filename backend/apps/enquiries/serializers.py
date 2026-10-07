"""Enquiry create and customer read serializers.

Customers cannot set status, owner response, or quote amounts.
"""

from rest_framework import serializers

from apps.catalog.models import Product

from .models import Enquiry, EnquiryStatus


class EnquirySerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(slug_field="slug", read_only=True)

    class Meta:
        model = Enquiry
        fields = (
            "id",
            "enquiry_type",
            "product",
            "quantity",
            "vehicle",
            "location",
            "message",
            "status",
            "owner_response",
            "offered_price",
            "delivery_fee",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


class EnquiryCreateSerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(
        slug_field="slug",
        queryset=Product.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Enquiry
        fields = (
            "enquiry_type",
            "product",
            "quantity",
            "vehicle",
            "location",
            "message",
        )

    def create(self, validated_data):
        validated_data["customer"] = self.context["request"].user
        validated_data["status"] = EnquiryStatus.NEW
        return super().create(validated_data)
