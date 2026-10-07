from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.core"
    label = "core"
    verbose_name = "Business"

    def ready(self):
        from django.db.models.signals import post_migrate

        post_migrate.connect(
            _ensure_business_settings,
            sender=self,
            dispatch_uid="core_ensure_business_settings",
        )


def _ensure_business_settings(sender, **kwargs):
    from .models import BusinessSettings

    BusinessSettings.load()
