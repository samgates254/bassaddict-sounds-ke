"""Authenticated enquiry create and the caller's own enquiry list."""

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Enquiry
from .serializers import EnquiryCreateSerializer, EnquirySerializer


class EnquiryCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnquiryCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        return Response(EnquirySerializer(enquiry).data, status=status.HTTP_201_CREATED)


class MyEnquiryListView(generics.ListAPIView):
    """Enquiries for request.user only. The client cannot choose a customer."""

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EnquirySerializer

    def get_queryset(self):
        return (
            Enquiry.objects.filter(customer=self.request.user)
            .select_related("product")
            .order_by("-created_at")
        )
