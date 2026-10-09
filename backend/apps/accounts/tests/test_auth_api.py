from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User, UserRole


class AuthApiTests(APITestCase):
    password = "BassAddict-test-1"

    def setUp(self):
        super().setUp()
        cache.clear()

    def test_register_creates_customer(self):
        response = self.client.post(
            reverse("auth-register"),
            {
                "email": "Customer@Example.com",
                "password": self.password,
                "password_confirm": self.password,
                "first_name": "Amina",
                "phone": "0712345678",
                "role": UserRole.OWNER,
                "is_staff": True,
                "is_superuser": True,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn("password", response.data)
        self.assertEqual(response.data["email"], "customer@example.com")
        self.assertEqual(response.data["role"], UserRole.CUSTOMER)
        self.assertEqual(response.data["profile"]["vehicle_make"], "")
        user = User.objects.get(email="customer@example.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertEqual(user.role, UserRole.CUSTOMER)
        self.assertTrue(user.profile.pk)

    def test_duplicate_email_is_rejected(self):
        payload = {
            "email": "amina@example.com",
            "password": self.password,
            "password_confirm": self.password,
        }
        first = self.client.post(reverse("auth-register"), payload, format="json")
        self.assertEqual(first.status_code, status.HTTP_201_CREATED)
        second = self.client.post(
            reverse("auth-register"),
            {**payload, "email": "Amina@Example.com"},
            format="json",
        )
        self.assertEqual(second.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.filter(email="amina@example.com").count(), 1)

    def test_login_refresh_and_me(self):
        User.objects.create_user(email="amina@example.com", password=self.password)

        wrong = self.client.post(
            reverse("auth-login"),
            {"email": "amina@example.com", "password": "wrong-password"},
            format="json",
        )
        self.assertEqual(wrong.status_code, status.HTTP_401_UNAUTHORIZED)

        login = self.client.post(
            reverse("auth-login"),
            {"email": "Amina@Example.com", "password": self.password},
            format="json",
        )
        self.assertEqual(login.status_code, status.HTTP_200_OK)
        self.assertIn("access", login.data)
        self.assertIn("refresh", login.data)
        self.assertNotIn("password", login.data)

        unauthenticated = self.client.get(reverse("auth-me"))
        self.assertEqual(unauthenticated.status_code, status.HTTP_401_UNAUTHORIZED)

        refresh = self.client.post(
            reverse("auth-refresh"),
            {"refresh": login.data["refresh"]},
            format="json",
        )
        self.assertEqual(refresh.status_code, status.HTTP_200_OK)
        self.assertIn("access", refresh.data)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login.data['access']}")
        me = self.client.get(reverse("auth-me"))
        self.assertEqual(me.status_code, status.HTTP_200_OK)
        self.assertEqual(me.data["email"], "amina@example.com")
        self.assertIn("profile", me.data)
        self.assertNotIn("is_superuser", me.data)
        self.assertNotIn("password", me.data)
