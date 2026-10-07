"""Public catalog serializers. Customer prices are not included."""

from rest_framework import serializers

from .models import Category, CustomerPrice, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "slug", "description", "sort_order")


class CategoryBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "slug")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("image_url", "alt_text", "is_primary", "sort_order")


class ProductListSerializer(serializers.ModelSerializer):
    category = CategoryBriefSerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "brand",
            "model_number",
            "category",
            "public_price",
            "price_type",
            "stock_status",
            "featured",
            "primary_image",
        )

    def get_primary_image(self, product):
        images = list(product.images.all())
        if not images:
            return None
        image = next((item for item in images if item.is_primary), images[0])
        return ProductImageSerializer(image).data


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategoryBriefSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "brand",
            "model_number",
            "category",
            "description",
            "specifications",
            "public_price",
            "price_type",
            "stock_status",
            "featured",
            "images",
        )


class CustomerPriceSerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)
    model_number = serializers.CharField(source="product.model_number", read_only=True)

    class Meta:
        model = CustomerPrice
        fields = ("product", "product_name", "model_number", "price", "note")
