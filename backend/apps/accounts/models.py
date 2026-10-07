"""Accounts: email login, roles, and customer profiles.

Authorization uses Django groups and permissions. The role field is a
readable label that also places the user in the matching admin group.
It is not a separate permission system.
"""

from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone


class UserRole(models.TextChoices):
    CUSTOMER = "CUSTOMER", "Customer"
    OWNER = "OWNER", "Owner"
    DEVELOPER = "DEVELOPER", "Developer"


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address.")
        email = self.normalize_email(email).lower()
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("role", UserRole.CUSTOMER)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", UserRole.DEVELOPER)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Email-based user. Customers are not staff."""

    email = models.EmailField(
        "email address",
        unique=True,
        error_messages={"unique": "A user with this email already exists."},
    )
    first_name = models.CharField("first name", max_length=150, blank=True)
    last_name = models.CharField("last name", max_length=150, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CUSTOMER,
        help_text=(
            "Customer, owner, or developer. Django Admin access still depends "
            "on staff status, groups, and permissions."
        ),
    )
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into Django Admin.",
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text="Unselect this instead of deleting accounts.",
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        ordering = ["email"]

    def __str__(self):
        name = self.get_full_name()
        if name:
            return f"{name} <{self.email}>"
        return self.email

    def clean(self):
        super().clean()
        if self.email:
            self.email = self.__class__.objects.normalize_email(self.email).lower()

    def save(self, **kwargs):
        update_fields = kwargs.get("update_fields")
        changed = set()
        if self.email:
            normalized = self.__class__.objects.normalize_email(self.email).lower()
            if normalized != self.email:
                self.email = normalized
                changed.add("email")
        if self.role == UserRole.CUSTOMER and not self.is_superuser:
            if self.is_staff:
                self.is_staff = False
                changed.add("is_staff")
        elif self.role in {UserRole.OWNER, UserRole.DEVELOPER} and not self.is_staff:
            self.is_staff = True
            changed.add("is_staff")
        if update_fields is not None and changed:
            kwargs["update_fields"] = set(update_fields) | changed
        super().save(**kwargs)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name or self.email


class CustomerProfile(models.Model):
    """Optional vehicle and location details for a customer account."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    location = models.CharField(max_length=255, blank=True)
    vehicle_make = models.CharField(max_length=100, blank=True)
    vehicle_model = models.CharField(max_length=100, blank=True)
    vehicle_year = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "customer profile"
        verbose_name_plural = "customer profiles"
        ordering = ["user__email"]

    def __str__(self):
        vehicle = " ".join(
            part
            for part in (
                str(self.vehicle_year or ""),
                self.vehicle_make,
                self.vehicle_model,
            )
            if part
        )
        if vehicle:
            return f"{self.user.email} — {vehicle}"
        return self.user.email
