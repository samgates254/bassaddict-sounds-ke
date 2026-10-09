"""Customer registration and profile serializers. No password output."""

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomerProfile, User, UserRole


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = (
            "location",
            "vehicle_make",
            "vehicle_model",
            "vehicle_year",
            "notes",
        )
        read_only_fields = fields


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "phone",
            "role",
            "profile",
        )
        read_only_fields = fields

    def get_profile(self, user):
        try:
            profile = user.profile
        except ObjectDoesNotExist:
            profile, _created = CustomerProfile.objects.get_or_create(user=user)
        return CustomerProfileSerializer(profile).data


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, trim_whitespace=False)
    password_confirm = serializers.CharField(write_only=True, trim_whitespace=False)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    phone = serializers.CharField(required=False, allow_blank=True, max_length=20)

    def validate_email(self, value):
        email = User.objects.normalize_email(value).strip().lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return email

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords do not match."}
            )
        validate_password(attrs["password"])
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        email = validated_data.pop("email")

        return User.objects.create_user(
            email=email,
            password=password,
            role=UserRole.CUSTOMER,
            is_staff=False,
            is_superuser=False,
            is_active=True,
            **validated_data,
        )


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Login with the email stored on the custom user."""

    def validate(self, attrs):
        email = attrs.get(self.username_field)
        if isinstance(email, str):
            attrs[self.username_field] = User.objects.normalize_email(email).strip().lower()
        return super().validate(attrs)
