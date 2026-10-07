from decimal import Decimal

from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User
from apps.catalog.models import Category, PriceType, Product
from apps.enquiries.models import Enquiry, EnquiryStatus, EnquiryType


class EnquiryApiTests(APITestCase):
    def setUp(self):
        super().setUp()
        cache.clear()
        self.customer = User.objects.create_user(
            email="amina@example.com",
            password="BassAddict-test-1",
        )
        self.other = User.objects.create_user(
            email="john@example.com",
            password="BassAddict-test-1",
        )
        category = Category.objects.create(name="Amplifiers", slug="amplifiers")
        self.product = Product.objects.create(
            name="Test amplifier",
            slug="test-amplifier",
            category=category,
            price_type=PriceType.FIXED,
            public_price=Decimal("48000.00"),
        )
        Enquiry.objects.create(
            customer=self.other,
            enquiry_type=EnquiryType.GENERAL,
            message="Other customer enquiry",
            owner_response="Call John",
            offered_price=Decimal("1000.00"),
        )

    def test_customer_creates_enquiry_without_owner_fields(self):
        anonymous = self.client.post(
            reverse("enquiry-create"),
            {"enquiry_type": EnquiryType.GENERAL, "message": "Hello"},
            format="json",
        )
        self.assertEqual(anonymous.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.force_authenticate(self.customer)
        response = self.client.post(
            reverse("enquiry-create"),
            {
                "enquiry_type": EnquiryType.PRODUCT,
                "product": self.product.slug,
                "quantity": 2,
                "vehicle": "Toyota Axio",
                "location": "Nairobi",
                "message": "Is this in stock?",
                "status": EnquiryStatus.COMPLETED,
                "owner_response": "Forged reply",
                "offered_price": "1.00",
                "delivery_fee": "5.00",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], EnquiryStatus.NEW)
        self.assertEqual(response.data["product"], "test-amplifier")
        self.assertEqual(response.data["quantity"], 2)
        self.assertEqual(response.data["owner_response"], "")
        self.assertIsNone(response.data["offered_price"])
        self.assertIsNone(response.data["delivery_fee"])

    def test_customer_lists_only_own_enquiries(self):
        Enquiry.objects.create(
            customer=self.customer,
            enquiry_type=EnquiryType.INSTALLATION,
            message="Install this weekend",
        )
        anonymous = self.client.get(reverse("my-enquiries"))
        self.assertEqual(anonymous.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.force_authenticate(self.customer)
        response = self.client.get(reverse("my-enquiries"), {"customer": self.other.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["message"], "Install this weekend")
        self.assertNotIn("Call John", str(response.data))
        self.assertNotIn("1000.00", str(response.data))
