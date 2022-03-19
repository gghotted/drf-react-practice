from common.test_utils import LoggedInTestCase
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from schema import Schema


class UserMeAPITestCase(LoggedInTestCase):
    urlname = 'user:me'
    response_schema = Schema(
        {
            'username': str
        }
    )

    def test_url(self):
        self.assertEqual(reverse(self.urlname), '/user/me/')

    def test_200(self):
        res = self.client.get(reverse(self.urlname), **self.headers)
        self.assertEqual(200, res.status_code)
        self.assertTrue(self.response_schema.is_valid(res.json()))
        
    def test_401(self):
        res = self.client.get(reverse(self.urlname))
        self.assertEqual(401, res.status_code)


class LoginAPITestCase(TestCase):
    urlname = 'user:login'
    response_schema = Schema(
        {
            'refresh': str,
            'access': str,
        }
    )

    @classmethod
    def setUpTestData(cls):
        cls.username = 'username'
        cls.password = 'password'
        cls.user = User.objects.create_user(
            username=cls.username,
            password=cls.password
        )
    
    def test_url(self):
        self.assertEqual(reverse(self.urlname), '/user/login/')
    
    def test_200(self):
        data = {
            'username': self.username,
            'password': self.password,
        }
        res = self.client.post(reverse(self.urlname), data)
        self.assertEqual(200, res.status_code)

    def test_401(self):
        data = {
            'username': self.username,
            'password': self.password * 2,
        }
        res = self.client.post(reverse(self.urlname), data)
        self.assertEqual(401, res.status_code)
