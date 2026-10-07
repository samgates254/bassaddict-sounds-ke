from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.services.models import Service


class ServiceApiTests(APITestCase):
    def setUp(self):
        super().setUp()
        cache.clear()
        Service.objects.create(
            name="Car Audio Installation",
            slug="car-audio-installation",
            featured=True,
        )
        Service.objects.create(
            name="Retired service",
            slug="retired-service",
            active=False,
        )

    def test_only_active_services_are_public(self):
        response = self.client.get(reverse("service-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        slugs = {item["slug"] for item in response.data}
        self.assertEqual(slugs, {"car-audio-installation"})
        featured = self.client.get(reverse("service-list"), {"featured": "true"})
        self.assertEqual(len(featured.data), 1)
