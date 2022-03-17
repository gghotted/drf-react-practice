from common.test_utils import LoggedInTestCase
from django.test import TestCase
from django.urls import reverse


class PostCreateAPITestCase(LoggedInTestCase):
    urlname = 'post:post-list'

    def test_url(self):
        self.assertEqual(reverse(self.urlname), '/post/')
