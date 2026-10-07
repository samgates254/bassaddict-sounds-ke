from decimal import Decimal

from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction
from django.test import TestCase

from apps.accounts.models import User
from apps.catalog.models import (
    Category,
    CustomerPrice,
    PriceType,
    Product,
    ProductImage,
    StockStatus,
)


class CatalogTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Amplifiers",
            slug="amplifiers",
            description="Shop amplifiers.",
        )

    def test_category_creation(self):
        self.category.full_clean()
        self.assertTrue(self.category.active)
        self.assertEqual(str(self.category), "Amplifiers")

    def test_fixed_price_product(self):
        product = Product.objects.create(
            name="Test amplifier",
            slug="test-amplifier",
            brand="Example",
            model_number="TA-1",
            category=self.category,
            price_type=PriceType.FIXED,
            public_price=Decimal("48000.00"),
            stock_status=StockStatus.IN_STOCK,
            featured=True,
        )
        product.full_clean()
        self.assertEqual(product.public_price, Decimal("48000.00"))
        ProductImage.objects.create(
            product=product,
            image_url="https://example.com/amp.jpg",
            alt_text="Amplifier",
            is_primary=True,
        )
        self.assertEqual(product.images.count(), 1)

    def test_fixed_price_requires_public_price(self):
        product = Product(
            name="Missing price",
            slug="missing-price",
            category=self.category,
            price_type=PriceType.FIXED,
            public_price=None,
        )
        with self.assertRaises(ValidationError):
            product.full_clean()
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Product.objects.create(
                    name="Missing price",
                    slug="missing-price",
                    category=self.category,
                    price_type=PriceType.FIXED,
                    public_price=None,
                )

    def test_on_request_and_contact_products_allow_empty_public_price(self):
        for price_type in (PriceType.ON_REQUEST, PriceType.CONTACT):
            product = Product(
                name=f"Item {price_type}",
                slug=price_type.lower(),
                category=self.category,
                price_type=price_type,
                public_price=None,
            )
            product.full_clean()
            product.save()
            product.refresh_from_db()
            self.assertIsNone(product.public_price)

    def test_customer_price_is_separate_and_unique(self):
        customer = User.objects.create_user(
            email="john@example.com",
            password="BassAddict-test-1",
        )
        product = Product.objects.create(
            name="Test amplifier",
            slug="test-amplifier",
            category=self.category,
            price_type=PriceType.FIXED,
            public_price=Decimal("48000.00"),
        )
        CustomerPrice.objects.create(
            customer=customer,
            product=product,
            price=Decimal("44000.00"),
            note="Repeat customer",
        )
        product.refresh_from_db()
        self.assertEqual(product.public_price, Decimal("48000.00"))
        self.assertEqual(customer.customer_prices.get().price, Decimal("44000.00"))

        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                CustomerPrice.objects.create(
                    customer=customer,
                    product=product,
                    price=Decimal("43000.00"),
                )

        negative = CustomerPrice(
            customer=customer,
            product=product,
            price=Decimal("-1.00"),
        )
        with self.assertRaises(ValidationError):
            negative.full_clean()
