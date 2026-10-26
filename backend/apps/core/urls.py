"""Business routes. Mounted at /api/v1/."""

from django.urls import path

from .views import BusinessView, HealthCheckView

urlpatterns = [
    path("business/", BusinessView.as_view(), name="business"),
    path("health/", HealthCheckView.as_view(), name="health"),
]
