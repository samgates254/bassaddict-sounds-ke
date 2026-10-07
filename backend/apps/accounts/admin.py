"""Django Admin for users and customer profiles."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.db.models import Q

from .forms import AccountUserCreationForm, AccountUserChangeForm
from .models import CustomerProfile, User, UserRole


class CustomerProfileInline(admin.StackedInline):
    model = CustomerProfile
    can_delete = False
    extra = 0
    max_num = 1
    fields = (
        "location",
        "vehicle_make",
        "vehicle_model",
        "vehicle_year",
        "notes",
    )


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    form = AccountUserChangeForm
    add_form = AccountUserCreationForm
    ordering = ("email",)
    list_display = (
        "email",
        "first_name",
        "last_name",
        "phone",
        "role",
        "is_staff",
        "is_active",
    )
    list_filter = ("role", "is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("email", "first_name", "last_name", "phone")
    readonly_fields = ("last_login", "date_joined")
    filter_horizontal = ("groups", "user_permissions")
    inlines = (CustomerProfileInline,)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "phone")}),
        ("Role", {"fields": ("role",)}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "phone",
                    "role",
                    "usable_password",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if self._is_technical_admin(request):
            return queryset
        # Owners manage customer accounts, not staff or developer accounts.
        return queryset.filter(
            Q(pk=request.user.pk)
            | Q(role=UserRole.CUSTOMER, is_staff=False, is_superuser=False)
        )

    def get_fieldsets(self, request, obj=None):
        if self._is_technical_admin(request):
            return super().get_fieldsets(request, obj)
        if obj is None:
            return (
                (
                    None,
                    {
                        "classes": ("wide",),
                        "fields": (
                            "email",
                            "first_name",
                            "last_name",
                            "phone",
                            "usable_password",
                            "password1",
                            "password2",
                        ),
                    },
                ),
            )
        return (
            (None, {"fields": ("email", "password")}),
            ("Personal info", {"fields": ("first_name", "last_name", "phone")}),
            ("Role", {"fields": ("role", "is_active")}),
            ("Important dates", {"fields": ("last_login", "date_joined")}),
        )

    def get_readonly_fields(self, request, obj=None):
        readonly = list(super().get_readonly_fields(request, obj))
        if not self._is_technical_admin(request):
            for name in ("role", "is_staff", "is_superuser"):
                if name not in readonly:
                    readonly.append(name)
        return readonly

    def save_model(self, request, obj, form, change):
        if not self._is_technical_admin(request):
            if change:
                previous = User.objects.get(pk=obj.pk)
                obj.role = previous.role
                obj.is_staff = previous.is_staff
                obj.is_superuser = previous.is_superuser
            else:
                obj.role = UserRole.CUSTOMER
                obj.is_staff = False
                obj.is_superuser = False
        super().save_model(request, obj, form, change)

    @staticmethod
    def _is_technical_admin(request):
        # Same permission that unlocks developer attribution. Superusers
        # pass automatically. Owners do not have this permission.
        return request.user.has_perm("core.change_developer_attribution")


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "location",
        "vehicle_make",
        "vehicle_model",
        "vehicle_year",
    )
    list_select_related = ("user",)
    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "user__phone",
        "location",
        "vehicle_make",
        "vehicle_model",
    )
    ordering = ("user__email",)
    autocomplete_fields = ("user",)
    fieldsets = (
        (None, {"fields": ("user",)}),
        ("Where they are", {"fields": ("location",)}),
        (
            "Vehicle",
            {"fields": ("vehicle_year", "vehicle_make", "vehicle_model")},
        ),
        ("Notes", {"fields": ("notes",)}),
    )
