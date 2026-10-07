"""Catalog routes. Mounted at /api/v1/."""

from django.urls import path

from .views import CategoryListView, MyPriceListView, ProductDetailView, ProductListView

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
    path("me/prices/", MyPriceListView.as_view(), name="my-prices"),
]
