from django.test import TestCase

from apps.services.models import Service


class ServiceTests(TestCase):
    def test_service_creation(self):
        service = Service.objects.create(
            name="Car Audio Installation",
            slug="car-audio-installation",
            description="Workshop installation.",
            featured=True,
            sort_order=1,
        )
        service.full_clean()
        self.assertTrue(service.active)
        self.assertTrue(service.featured)
        self.assertEqual(str(service), "Car Audio Installation")
