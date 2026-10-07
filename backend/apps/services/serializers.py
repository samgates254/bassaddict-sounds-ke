"""Public workshop service serializer."""

from rest_framework import serializers

from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("name", "slug", "description", "featured", "sort_order")
