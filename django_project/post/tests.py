from common.test_utils import LoggedInTestCase, create_default_user
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from schema import Or, Schema

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
    def create_testdata(save=True, **kwargs):
        if 'user' not in kwargs:
            kwargs['user'] = create_default_user()
        default_data = {
            'title': 'test title',
            'content': 'test content',
        }
        default_data.update(kwargs)
        post = Post(**default_data)
        if save:
            post.save()
        return post

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


class PostListAPITestCase(TestCase):
    urlname = 'post:post-list'
    response_schema = Schema(
        {
            'count': int,
            'next': Or(None, str),
            'previous': Or(None, str),
            'results': [PostDetailAPITestCase.response_schema.schema],
        }
    )

    @staticmethod
    def create_testdata(amount):
        user = create_default_user()
        posts = [
            PostDetailAPITestCase.create_testdata(save=False, user=user)
            for _ in range(amount)
        ]
        return Post.objects.bulk_create(posts)

    @classmethod
    def setUpTestData(cls):
        cls.posts = cls.create_testdata(11)

    def test_200(self):
        res = self.client.get(reverse(self.urlname))
        self.assertEqual(200, res.status_code)
        self.assertTrue(self.response_schema.is_valid(res.json()))


class PostUpdateAPITestCase(LoggedInTestCase):
    urlname = 'post:post-detail'

    def setUp(self):
        super().setUp()
        self.post = PostDetailAPITestCase.create_testdata(user=self.user)
    
    def test_200(self):
        url = reverse(self.urlname, kwargs={'pk': self.post.pk})
        data = {
            'title': 'updated title',
            'content': 'updated content',
        }
        res = self.client.patch(url, data, 'application/json')
        self.assertEqual(200, res.status_code)
        post = Post.objects.get(pk=self.post.pk)
        self.assertEqual(data, {'title': post.title, 'content': post.content})

    def test_403(self):
        new_user = User.objects.create_user(
            username='username1',
            password='password',
        )
        new_post = PostDetailAPITestCase.create_testdata(user=new_user)
        url = reverse(self.urlname, kwargs={'pk': new_post.pk})
        res = self.client.patch(url, {}, 'application/json')
        self.assertEqual(403, res.status_code)
    
    def test_403_2(self):
        self.client.logout()
        url = reverse(self.urlname, kwargs={'pk': self.post.pk})
        res = self.client.patch(url, {}, 'application/json')
        self.assertEqual(403, res.status_code)

    def test_404(self):
        url = reverse(self.urlname, kwargs={'pk': self.post.pk + 1})
        res = self.client.patch(url, {}, 'application/json')
        self.assertEqual(404, res.status_code)


class PostDeleteAPITestCase(LoggedInTestCase):
    urlname = 'post:post-detail'

    def setUp(self):
        super().setUp()
        self.post = PostDetailAPITestCase.create_testdata(user=self.user)

    def test_204(self):
        url = reverse(self.urlname, kwargs={'pk': self.post.pk})
        res = self.client.delete(url)
        self.assertEqual(204, res.status_code)

    def test_403(self):
        new_user = User.objects.create_user(
            username='username1',
            password='password',
        )
        new_post = PostDetailAPITestCase.create_testdata(user=new_user)
        url = reverse(self.urlname, kwargs={'pk': new_post.pk})
        res = self.client.delete(url)
        self.assertEqual(403, res.status_code)

    def test_403_2(self):
        self.client.logout()
        url = reverse(self.urlname, kwargs={'pk': self.post.pk})
        res = self.client.delete(url)
        self.assertEqual(403, res.status_code)

    def test_404(self):
        url = reverse(self.urlname, kwargs={'pk': self.post.pk + 1})
        res = self.client.delete(url)
        self.assertEqual(404, res.status_code)
