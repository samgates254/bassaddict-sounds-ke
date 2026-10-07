from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction
from django.test import TestCase

from apps.enquiries.models import Enquiry, EnquiryStatus, EnquiryType


class EnquiryTests(TestCase):
    def test_enquiry_defaults_and_guest(self):
        enquiry = Enquiry.objects.create(
            enquiry_type=EnquiryType.GENERAL,
            message="Please call me about a system.",
            location="Nairobi",
        )
        self.assertEqual(enquiry.quantity, 1)
        self.assertEqual(enquiry.status, EnquiryStatus.NEW)
        self.assertIsNone(enquiry.customer)
        self.assertIsNone(enquiry.offered_price)
        self.assertIsNone(enquiry.delivery_fee)

    def test_enquiry_types_are_accepted(self):
        self.assertEqual(
            set(EnquiryType.values),
            {"PRODUCT", "INSTALLATION", "DELIVERY", "CUSTOM_BUILD", "GENERAL"},
        )
        for enquiry_type in EnquiryType.values:
            enquiry = Enquiry(
                enquiry_type=enquiry_type,
                message=f"{enquiry_type} request",
            )
            enquiry.full_clean()
            enquiry.save()
        self.assertEqual(Enquiry.objects.count(), len(EnquiryType.values))

    def test_quantity_must_be_positive(self):
        enquiry = Enquiry(
            enquiry_type=EnquiryType.PRODUCT,
            message="Need two.",
            quantity=0,
        )
        with self.assertRaises(ValidationError):
            enquiry.full_clean()
        enquiry = Enquiry.objects.create(
            enquiry_type=EnquiryType.PRODUCT,
            message="Need two.",
        )
        enquiry.quantity = 0
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                enquiry.save()
