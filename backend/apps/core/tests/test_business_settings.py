from django.contrib.auth.models import Permission
from django.core.exceptions import ValidationError
from django.test import TestCase
from django.urls import reverse

from apps.accounts.models import User, UserRole
from apps.core.models import BusinessSettings


class BusinessSettingsTests(TestCase):
    def test_singleton_behavior(self):
        first = BusinessSettings.load()
        second = BusinessSettings.load()
        BusinessSettings(business_name="Still one row").save()
        self.assertEqual(first.pk, second.pk)
        self.assertEqual(first.pk, BusinessSettings.SINGLETON_ID)
        self.assertEqual(BusinessSettings.objects.count(), 1)
        self.assertEqual(BusinessSettings.objects.get().business_name, "Still one row")
        with self.assertRaises(ValidationError):
            first.delete()

    def test_owner_cannot_edit_developer_attribution(self):
        settings_obj = BusinessSettings.load()
        original_name = settings_obj.developer_name
        original_credit = settings_obj.developer_credit
        owner = User.objects.create_user(
            email="owner@example.com",
            password="BassAddict-test-1",
            role=UserRole.OWNER,
        )
        self.client.force_login(owner)
        response = self.client.post(
            reverse("admin:core_businesssettings_change", args=[settings_obj.pk]),
            {
                "business_name": "Bassaddict Workshop",
                "tagline": settings_obj.tagline,
                "phone": "0711000000",
                "whatsapp_number": settings_obj.whatsapp_number,
                "email": settings_obj.email,
                "address": settings_obj.address,
                "developer_name": "Someone Else",
                "developer_credit": "Removed credit",
                "developer_email": "evil@example.com",
                "developer_whatsapp": "0700000000",
                "developer_url": "https://evil.example",
            },
        )
        self.assertEqual(response.status_code, 302, getattr(response, "content", b"")[:1500])
        settings_obj.refresh_from_db()
        self.assertEqual(settings_obj.business_name, "Bassaddict Workshop")
        self.assertEqual(settings_obj.phone, "0711000000")
        self.assertEqual(settings_obj.developer_name, original_name)
        self.assertEqual(settings_obj.developer_credit, original_credit)
        self.assertEqual(settings_obj.developer_email, "")
        self.assertFalse(owner.has_perm("core.change_developer_attribution"))

    def test_superuser_can_edit_developer_attribution(self):
        settings_obj = BusinessSettings.load()
        developer = User.objects.create_superuser(
            email="dev@example.com",
            password="BassAddict-test-1",
        )
        self.client.force_login(developer)
        response = self.client.post(
            reverse("admin:core_businesssettings_change", args=[settings_obj.pk]),
            self._form_data(
                settings_obj,
                developer_name="Sam Gates",
                developer_credit="Designed & Developed by Sam Gates — Developer Courtesy",
                developer_email="sam@example.com",
                developer_url="https://example.com/sam",
            ),
        )
        self.assertEqual(response.status_code, 302, getattr(response, "content", b"")[:1500])
        settings_obj.refresh_from_db()
        self.assertEqual(settings_obj.developer_email, "sam@example.com")
        self.assertEqual(settings_obj.developer_url, "https://example.com/sam")
        self.assertTrue(developer.has_perm("core.change_developer_attribution"))

    def test_developer_permission_can_edit_without_superuser(self):
        settings_obj = BusinessSettings.load()
        developer = User.objects.create_user(
            email="builder@example.com",
            password="BassAddict-test-1",
            role=UserRole.DEVELOPER,
        )
        self.assertFalse(developer.is_superuser)
        self.assertTrue(developer.has_perm("core.change_developer_attribution"))
        permission = Permission.objects.get(codename="change_developer_attribution")
        self.assertIn(permission, developer.groups.get(name="Developer").permissions.all())

        self.client.force_login(developer)
        response = self.client.post(
            reverse("admin:core_businesssettings_change", args=[settings_obj.pk]),
            self._form_data(
                settings_obj,
                developer_whatsapp="0794000000",
            ),
        )
        self.assertEqual(response.status_code, 302, getattr(response, "content", b"")[:1500])
        settings_obj.refresh_from_db()
        self.assertEqual(settings_obj.developer_whatsapp, "0794000000")

    def _form_data(self, settings_obj, **overrides):
        data = {
            "business_name": settings_obj.business_name,
            "tagline": settings_obj.tagline,
            "phone": settings_obj.phone,
            "whatsapp_number": settings_obj.whatsapp_number,
            "email": settings_obj.email,
            "address": settings_obj.address,
            "developer_name": settings_obj.developer_name,
            "developer_credit": settings_obj.developer_credit,
            "developer_email": settings_obj.developer_email,
            "developer_whatsapp": settings_obj.developer_whatsapp,
            "developer_url": settings_obj.developer_url,
        }
        data.update(overrides)
        return data
