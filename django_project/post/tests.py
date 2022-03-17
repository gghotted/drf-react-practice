from common.test_utils import LoggedInTestCase, login
from django.test import TestCase
from django.urls import reverse


class PostCreateAPITestCase(LoggedInTestCase):
    urlname = 'post:post-list'

    def test_url(self):
        self.assertEqual(reverse(self.urlname), '/post/')

    def test_201(self):
        data = {
            'title': 'test title',
            'content': 'test content',
        }
        res = self.client.post(reverse(self.urlname), data)
        self.assertEqual(201, res.status_code)
