from django.contrib.auth.models import Group
from django.db import IntegrityError, transaction
from django.test import TestCase

from apps.accounts.groups import DEVELOPER_GROUP_NAME, OWNER_GROUP_NAME
from apps.accounts.models import CustomerProfile, User, UserRole


class UserTests(TestCase):
    def test_create_customer_is_not_staff(self):
        user = User.objects.create_user(
            email="Customer@Example.com",
            password="BassAddict-test-1",
            first_name="Amina",
            last_name="Otieno",
            phone="0712345678",
        )
        self.assertEqual(user.email, "customer@example.com")
        self.assertEqual(user.role, UserRole.CUSTOMER)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        self.assertTrue(user.check_password("BassAddict-test-1"))
        self.assertTrue(CustomerProfile.objects.filter(user=user).exists())

    def test_email_is_unique(self):
        User.objects.create_user(
            email="owner@example.com",
            password="BassAddict-test-1",
        )
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                User.objects.create_user(
                    email="Owner@Example.com",
                    password="BassAddict-test-1",
                )

    def test_roles_place_staff_in_admin_groups(self):
        customer = User.objects.create_user(
            email="customer@example.com",
            password="BassAddict-test-1",
            role=UserRole.CUSTOMER,
            is_staff=True,
        )
        owner = User.objects.create_user(
            email="owner@example.com",
            password="BassAddict-test-1",
            role=UserRole.OWNER,
        )
        developer = User.objects.create_user(
            email="developer@example.com",
            password="BassAddict-test-1",
            role=UserRole.DEVELOPER,
        )

        self.assertFalse(customer.is_staff)
        self.assertFalse(customer.groups.filter(name=OWNER_GROUP_NAME).exists())
        self.assertTrue(owner.is_staff)
        self.assertFalse(owner.is_superuser)
        self.assertTrue(owner.groups.filter(name=OWNER_GROUP_NAME).exists())
        self.assertTrue(developer.is_staff)
        self.assertTrue(developer.groups.filter(name=DEVELOPER_GROUP_NAME).exists())
        self.assertTrue(Group.objects.filter(name=OWNER_GROUP_NAME).exists())
        self.assertTrue(Group.objects.filter(name=DEVELOPER_GROUP_NAME).exists())

    def test_create_superuser(self):
        user = User.objects.create_superuser(
            email="Dev@Example.com",
            password="BassAddict-test-1",
        )
        self.assertEqual(user.email, "dev@example.com")
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_active)
        self.assertEqual(user.role, UserRole.DEVELOPER)
        self.assertTrue(user.groups.filter(name=DEVELOPER_GROUP_NAME).exists())

    def test_vehicle_profile_fields_are_optional(self):
        user = User.objects.create_user(
            email="driver@example.com",
            password="BassAddict-test-1",
        )
        profile = user.profile
        profile.vehicle_make = "Toyota"
        profile.save()
        profile.full_clean()
        self.assertEqual(profile.vehicle_model, "")
        self.assertIsNone(profile.vehicle_year)
