"""Public list of active workshop services."""

from rest_framework import generics, permissions

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ServiceSerializer

    def get_queryset(self):
        queryset = Service.objects.filter(active=True)
        featured = self.request.query_params.get("featured")
        if featured not in (None, ""):
            is_featured = str(featured).strip().lower() in {"1", "true", "yes", "on"}
            queryset = queryset.filter(featured=is_featured)
        return queryset
