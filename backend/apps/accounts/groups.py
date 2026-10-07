"""Django groups that back the owner and developer admin roles.

The User.role label is synced into these groups. Permission checks use
the groups, not the role string by itself.
"""

from django.contrib.auth.models import Group, Permission
from django.db.models import Q

OWNER_GROUP_NAME = "Owner"
DEVELOPER_GROUP_NAME = "Developer"

# Present only after catalog, services, enquiries, core, and accounts
# have all been migrated. Used so this can run from any post_migrate.
_REQUIRED_CODENAMES = (
    "add_product",
    "add_service",
    "add_enquiry",
    "change_businesssettings",
    "view_customerprofile",
)


def ensure_role_groups():
    """Create Owner and Developer groups and set their permissions.

    Returns False when permissions are not created yet (mid-migrate).
    """
    found = set(
        Permission.objects.filter(codename__in=_REQUIRED_CODENAMES).values_list(
            "codename", flat=True
        )
    )
    if set(_REQUIRED_CODENAMES) - found:
        return False

    owner_group, _created = Group.objects.get_or_create(name=OWNER_GROUP_NAME)
    developer_group, _created = Group.objects.get_or_create(name=DEVELOPER_GROUP_NAME)

    owner_filter = (
        Q(content_type__app_label__in=["catalog", "enquiries", "services"])
        | Q(content_type__app_label="accounts", content_type__model="customerprofile")
        | Q(
            content_type__app_label="accounts",
            content_type__model="user",
            codename__in=["add_user", "change_user", "view_user"],
        )
        | Q(
            content_type__app_label="core",
            content_type__model="businesssettings",
            codename__in=["view_businesssettings", "change_businesssettings"],
        )
    )
    owner_group.permissions.set(Permission.objects.filter(owner_filter))
    # Includes core.change_developer_attribution. Owners do not receive it.
    developer_group.permissions.set(Permission.objects.all())
    return True


def sync_user_role_group(user):
    """Put the user in the Owner or Developer group that matches their role."""
    if not user.pk or not ensure_role_groups():
        return
    owner_group = Group.objects.get(name=OWNER_GROUP_NAME)
    developer_group = Group.objects.get(name=DEVELOPER_GROUP_NAME)
    role = user.role
    if role == "OWNER":
        user.groups.add(owner_group)
        user.groups.remove(developer_group)
    elif role == "DEVELOPER":
        user.groups.add(developer_group)
        user.groups.remove(owner_group)
    else:
        user.groups.remove(owner_group, developer_group)
