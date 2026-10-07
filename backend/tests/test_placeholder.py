"""Project-level checks that do not belong to one app.

Domain tests live next to each app. API tests wait until endpoints exist.
"""

from django.conf import settings
from django.test import SimpleTestCase


class ProjectFoundationTests(SimpleTestCase):
    def test_custom_user_is_configured(self):
        self.assertEqual(settings.AUTH_USER_MODEL, "accounts.User")
