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

from django.core.management import call_command
from io import StringIO


class SeedCatalogCommandTests(TestCase):
    def test_seed_catalog_populates_and_preserves_custom_data(self):
        out = StringIO()
        call_command("seed_catalog", stdout=out)
        self.assertIn("Catalog seed completed successfully!", out.getvalue())

        # Verify initial population
        prod = Product.objects.get(slug="pioneer-ts-6900pro")
        self.assertEqual(prod.public_price, Decimal("14500.00"))

        # Business user changes price in admin
        prod.public_price = Decimal("17500.00")
        prod.stock_status = StockStatus.LOW_STOCK
        prod.save()

        # Re-run seed in safe mode (default)
        out2 = StringIO()
        call_command("seed_catalog", stdout=out2)
        prod.refresh_from_db()

        # Price and stock must be PRESERVED
        self.assertEqual(prod.public_price, Decimal("17500.00"))
        self.assertEqual(prod.stock_status, StockStatus.LOW_STOCK)
        self.assertIn("Preserved existing product", out2.getvalue())

        # Re-run with --overwrite
        out3 = StringIO()
        call_command("seed_catalog", overwrite=True, stdout=out3)
        prod.refresh_from_db()
        self.assertEqual(prod.public_price, Decimal("14500.00"))
        self.assertEqual(prod.stock_status, StockStatus.IN_STOCK)
        self.assertIn("Overwrote product", out3.getvalue())
