"""Read-only public business information."""

from rest_framework import generics, permissions

from .models import BusinessSettings
from .serializers import BusinessSettingsSerializer


class BusinessView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessSettingsSerializer

    def get_object(self):
        return BusinessSettings.load()
