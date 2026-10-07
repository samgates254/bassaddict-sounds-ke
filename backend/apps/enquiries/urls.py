"""Enquiry routes. Mounted at /api/v1/."""

from django.urls import path

from .views import EnquiryCreateView, MyEnquiryListView

urlpatterns = [
    path("enquiries/", EnquiryCreateView.as_view(), name="enquiry-create"),
    path("me/enquiries/", MyEnquiryListView.as_view(), name="my-enquiries"),
]
