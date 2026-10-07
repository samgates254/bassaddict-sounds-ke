"""Keep profiles and role groups in step with user records."""

from django.db.models.signals import post_migrate, post_save


def create_customer_profile(sender, instance, created, raw=False, **kwargs):
    if raw or not created:
        return
    from .models import CustomerProfile

    CustomerProfile.objects.get_or_create(user=instance)


def sync_role_group(sender, instance, raw=False, **kwargs):
    if raw:
        return
    from .groups import sync_user_role_group

    sync_user_role_group(instance)


def ensure_groups_after_migrate(sender, **kwargs):
    from .groups import ensure_role_groups

    ensure_role_groups()


def connect_signals(user_model):
    post_save.connect(
        create_customer_profile,
        sender=user_model,
        dispatch_uid="accounts_create_customer_profile",
    )
    post_save.connect(
        sync_role_group,
        sender=user_model,
        dispatch_uid="accounts_sync_role_group",
    )
    post_migrate.connect(
        ensure_groups_after_migrate,
        dispatch_uid="accounts_ensure_role_groups",
    )
