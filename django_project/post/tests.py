from common.test_utils import LoggedInTestCase
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

    def test_400(self):
        res = self.client.post(reverse(self.urlname))
        self.assertEqual(400, res.status_code)

    def test_403(self):
        self.client.logout()
        res = self.client.post(reverse(self.urlname))
        self.assertEqual(403, res.status_code)
