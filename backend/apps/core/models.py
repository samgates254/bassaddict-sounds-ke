"""Single business-settings record, including protected developer credit."""

from django.core.exceptions import ValidationError
from django.db import models


class BusinessSettings(models.Model):
    """Singleton shop identity. Save always writes primary key 1."""

    SINGLETON_ID = 1
    DEVELOPER_ATTRIBUTION_FIELDS = (
        "developer_name",
        "developer_credit",
        "developer_email",
        "developer_whatsapp",
        "developer_url",
    )

    business_name = models.CharField(max_length=200, default="Bassaddict Sounds KE")
    tagline = models.CharField(
        max_length=200,
        default="ADDICTED TO BASS. DRIVEN BY SOUND.",
    )
    phone = models.CharField(max_length=32, default="0794069405")
    whatsapp_number = models.CharField(max_length=32, default="0794069405")
    email = models.EmailField(default="bassaddictsounds@gmail.com")
    address = models.TextField(
        default="Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi, Kenya",
    )
    developer_name = models.CharField(max_length=150, default="Sam Gates")
    developer_credit = models.CharField(
        max_length=255,
        default="Designed & Developed by Sam Gates — Developer Courtesy",
    )
    developer_email = models.EmailField(blank=True)
    developer_whatsapp = models.CharField(max_length=32, blank=True)
    developer_url = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "business settings"
        verbose_name_plural = "business settings"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(pk=1),
                name="business_settings_singleton",
                violation_error_message="Only one business settings record is allowed.",
            ),
        ]
        permissions = [
            (
                "change_developer_attribution",
                "Can change developer attribution",
            ),
        ]

    def __str__(self):
        return self.business_name

    def save(self, *args, **kwargs):
        self.pk = self.SINGLETON_ID
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("Business settings cannot be deleted.")

    @classmethod
    def load(cls):
        obj, _created = cls.objects.get_or_create(pk=cls.SINGLETON_ID)
        return obj
