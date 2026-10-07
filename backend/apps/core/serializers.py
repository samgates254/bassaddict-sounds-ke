"""Public business details. Developer attribution is not included."""

from rest_framework import serializers

from .models import BusinessSettings


class BusinessSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessSettings
        fields = (
            "business_name",
            "tagline",
            "phone",
            "whatsapp_number",
            "email",
            "address",
        )
