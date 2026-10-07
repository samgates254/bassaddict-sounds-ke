from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.core.models import BusinessSettings


class BusinessApiTests(APITestCase):
    def setUp(self):
        super().setUp()
        cache.clear()

    def test_business_is_public_and_hides_developer_attribution(self):
        settings_obj = BusinessSettings.load()
        settings_obj.developer_name = "Sam Gates"
        settings_obj.developer_email = "sam@example.com"
        settings_obj.save()

        response = self.client.get(reverse("business"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business_name"], "Bassaddict Sounds KE")
        self.assertEqual(response.data["phone"], "0794069405")
        self.assertEqual(response.data["email"], "bassaddictsounds@gmail.com")
        self.assertNotIn("developer_name", response.data)
        self.assertNotIn("developer_credit", response.data)
        self.assertNotIn("developer_email", response.data)
        self.assertNotIn("developer_whatsapp", response.data)
        self.assertNotIn("developer_url", response.data)
        self.assertNotIn("Sam Gates", str(response.data))
        self.assertNotIn("sam@example.com", str(response.data))
