from decimal import Decimal

from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.accounts.models import User
from apps.catalog.models import Category, CustomerPrice, PriceType, Product, ProductImage


class CatalogApiTests(APITestCase):
    def setUp(self):
        super().setUp()
        cache.clear()
        self.category = Category.objects.create(name="Amplifiers", slug="amplifiers")
        Category.objects.create(name="Hidden", slug="hidden", active=False)
        self.product = Product.objects.create(
            name="Test amplifier",
            slug="test-amplifier",
            brand="Pioneer",
            model_number="TA-1",
            category=self.category,
            description="Shop amplifier.",
            specifications={"channels": "1"},
            price_type=PriceType.FIXED,
            public_price=Decimal("48000.00"),
            featured=True,
        )
        ProductImage.objects.create(
            product=self.product,
            image_url="https://example.com/amp.jpg",
            alt_text="Amplifier",
            is_primary=True,
        )
        Product.objects.create(
            name="Hidden product",
            slug="hidden-product",
            category=self.category,
            price_type=PriceType.ON_REQUEST,
            active=False,
        )
        self.customer = User.objects.create_user(
            email="amina@example.com",
            password="BassAddict-test-1",
        )
        self.other = User.objects.create_user(
            email="john@example.com",
            password="BassAddict-test-1",
        )
        CustomerPrice.objects.create(
            customer=self.customer,
            product=self.product,
            price=Decimal("44000.00"),
            note="Repeat customer",
        )
        CustomerPrice.objects.create(
            customer=self.other,
            product=self.product,
            price=Decimal("43000.00"),
            note="Other customer",
        )

    def test_anonymous_categories_hide_inactive(self):
        response = self.client.get(reverse("category-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        slugs = {item["slug"] for item in response.data}
        self.assertEqual(slugs, {"amplifiers"})

    def test_anonymous_products_hide_inactive_and_private_prices(self):
        response = self.client.get(reverse("product-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        slugs = [item["slug"] for item in response.data]
        self.assertEqual(slugs, ["test-amplifier"])
        payload = response.data[0]
        self.assertEqual(payload["public_price"], "48000.00")
        self.assertEqual(payload["primary_image"]["image_url"], "https://example.com/amp.jpg")
        self.assertNotIn("customer_price", payload)
        self.assertNotIn("44000.00", str(response.data))
        self.assertNotIn("43000.00", str(response.data))

        filtered = self.client.get(
            reverse("product-list"),
            {"category": "amplifiers", "brand": "pioneer", "featured": "true"},
        )
        self.assertEqual(len(filtered.data), 1)
        missed = self.client.get(reverse("product-list"), {"category": "hidden"})
        self.assertEqual(missed.data, [])

    def test_product_detail_is_public_and_has_no_customer_price(self):
        response = self.client.get(reverse("product-detail", args=["test-amplifier"]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Test amplifier")
        self.assertEqual(response.data["specifications"], {"channels": "1"})
        self.assertEqual(response.data["images"][0]["image_url"], "https://example.com/amp.jpg")
        self.assertNotIn("44000.00", str(response.data))
        self.assertEqual(
            self.client.get(reverse("product-detail", args=["hidden-product"])).status_code,
            status.HTTP_404_NOT_FOUND,
        )

        self.client.force_authenticate(self.customer)
        authed = self.client.get(reverse("product-detail", args=["test-amplifier"]))
        self.assertEqual(authed.status_code, status.HTTP_200_OK)
        self.assertNotIn("44000.00", str(authed.data))

    def test_customer_sees_only_own_prices(self):
        anonymous = self.client.get(reverse("my-prices"))
        self.assertEqual(anonymous.status_code, status.HTTP_401_UNAUTHORIZED)

        self.client.force_authenticate(self.customer)
        response = self.client.get(reverse("my-prices"), {"customer": self.other.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["product"], "test-amplifier")
        self.assertEqual(response.data[0]["product_name"], "Test amplifier")
        self.assertEqual(response.data[0]["model_number"], "TA-1")
        self.assertEqual(response.data[0]["price"], "44000.00")
        self.assertNotIn("43000.00", str(response.data))
