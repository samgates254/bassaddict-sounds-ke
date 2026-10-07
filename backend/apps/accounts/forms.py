"""Admin forms for the email-based user. No public registration form yet."""

from django.contrib.auth.forms import AdminUserCreationForm, UserChangeForm

from .models import User


class AccountUserCreationForm(AdminUserCreationForm):
    class Meta(AdminUserCreationForm.Meta):
        model = User
        fields = ("email",)
        field_classes = {}


class AccountUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = "__all__"
        field_classes = {}
