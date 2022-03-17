from common.test_utils import LoggedInTestCase
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from schema import Schema

from post.models import Post


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


class PostDetailAPITestCase(TestCase):
    urlname = 'post:post-detail'
    response_schema = Schema(
        {
            'id': int,
            'title': str,
            'content': str,
            'user': str,
        }
    )

    @staticmethod
    def create_testdata(**kwargs):
        user = User.objects.create_user(
            username='username',
            password='password',
        )
        default_data = {
            'title': 'test title',
            'content': 'test content',
            'user': user,
        }
        default_data.update(kwargs)
        return Post.objects.create(**default_data)

    @classmethod
    def setUpTestData(cls):
        cls.post = cls.create_testdata()
        cls.url = reverse(cls.urlname, kwargs={'pk': cls.post.pk})

    def test_url(self):
        self.assertEqual(self.url, f'/post/{self.post.pk}/')

    def test_200(self):
        res = self.client.get(self.url)
        self.assertEqual(200, res.status_code)
        self.assertTrue(self.response_schema.is_valid(res.json()))

    def test_404(self):
        res = self.client.get(reverse(self.urlname, kwargs={'pk': self.post.pk + 1}))
        self.assertEqual(404, res.status_code)
