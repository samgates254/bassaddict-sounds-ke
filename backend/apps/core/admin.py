"""Singleton business settings. Developer credit is permission-locked."""

from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse

from .models import BusinessSettings


@admin.register(BusinessSettings)
class BusinessSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "Business",
            {
                "fields": (
                    "business_name",
                    "tagline",
                    "phone",
                    "whatsapp_number",
                    "email",
                    "address",
                ),
            },
        ),
        (
            "Developer attribution",
            {
                "fields": BusinessSettings.DEVELOPER_ATTRIBUTION_FIELDS,
                "description": (
                    "Only a superuser or a developer administrator can change "
                    "these fields. Owner edits are ignored."
                ),
            },
        ),
        ("Record", {"fields": ("updated_at",)}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        if BusinessSettings.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        settings_obj = BusinessSettings.load()
        return redirect(
            reverse("admin:core_businesssettings_change", args=[settings_obj.pk])
        )

    def get_readonly_fields(self, request, obj=None):
        readonly = list(super().get_readonly_fields(request, obj))
        if not self._can_edit_developer_attribution(request):
            for name in BusinessSettings.DEVELOPER_ATTRIBUTION_FIELDS:
                if name not in readonly:
                    readonly.append(name)
        return readonly

    def save_model(self, request, obj, form, change):
        if not self._can_edit_developer_attribution(request):
            self._keep_developer_attribution(obj, change)
        super().save_model(request, obj, form, change)

    @staticmethod
    def _can_edit_developer_attribution(request):
        return request.user.has_perm("core.change_developer_attribution")

    @staticmethod
    def _keep_developer_attribution(obj, change):
        if change and obj.pk:
            original = BusinessSettings.objects.get(pk=obj.pk)
        else:
            original = BusinessSettings()
        for name in BusinessSettings.DEVELOPER_ATTRIBUTION_FIELDS:
            setattr(obj, name, getattr(original, name))
