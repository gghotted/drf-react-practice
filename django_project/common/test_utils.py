from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse


def create_default_user():
    return User.objects.create_user(
        username='username',
        password='password',
    )


class LoggedInTestCase(TestCase):
    username = 'username'
    password = 'password'

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username=cls.username,
            password=cls.password,
        )
        data = {
            'username': cls.username,
            'password': cls.password,
        }
        res = cls.client_class().post(reverse('user:login'), data)
        cls.jwt = res.json()
        cls.headers = {'HTTP_AUTHORIZATION': f'Bearer {cls.jwt["access_token"]}'}
