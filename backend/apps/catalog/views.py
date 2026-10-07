"""Public catalog reads and the signed-in customer's own prices."""

from rest_framework import generics, permissions

from .models import Category, CustomerPrice, Product
from .serializers import (
    CategorySerializer,
    CustomerPriceSerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


def _as_bool(value):
    return str(value).strip().lower() in {"1", "true", "yes", "on"}


class CategoryListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(active=True)


class ProductListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(active=True).select_related("category").prefetch_related(
            "images"
        )
        params = self.request.query_params
        category = params.get("category")
        if category:
            queryset = queryset.filter(category__slug=category, category__active=True)
        brand = params.get("brand")
        if brand:
            queryset = queryset.filter(brand__icontains=brand.strip())
        stock_status = params.get("stock_status")
        if stock_status:
            queryset = queryset.filter(stock_status=stock_status)
        featured = params.get("featured")
        if featured not in (None, ""):
            queryset = queryset.filter(featured=_as_bool(featured))
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductDetailSerializer
    lookup_field = "slug"
    queryset = Product.objects.filter(active=True).select_related("category").prefetch_related(
        "images"
    )


class MyPriceListView(generics.ListAPIView):
    """Prices for request.user only. The client cannot choose a customer."""

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomerPriceSerializer

    def get_queryset(self):
        return CustomerPrice.objects.filter(customer=self.request.user).select_related(
            "product"
        )
