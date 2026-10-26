"""Read-only public business information and health checks."""

from django.db import connection
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BusinessSettings
from .serializers import BusinessSettingsSerializer


class BusinessView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BusinessSettingsSerializer

    def get_object(self):
        return BusinessSettings.load()


class HealthCheckView(APIView):
    """Production readiness health check endpoint for monitoring and load balancers."""

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
            db_status = "connected"
            http_status = status.HTTP_200_OK
            overall_status = "ok"
        except Exception:
            db_status = "disconnected"
            http_status = status.HTTP_503_SERVICE_UNAVAILABLE
            overall_status = "degraded"

        return Response(
            {
                "status": overall_status,
                "service": "bassaddict-api",
                "database": db_status,
            },
            status=http_status,
        )
