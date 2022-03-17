from django.contrib.auth.models import User
from django.test import TestCase


def create_default_user():
    return User.objects.create_user(
        username='username',
        password='password',
    )


def login(client, username, password):
    user = User.objects.create_user(
        username=username,
        password=password,
    )
    client.login(username=username, password=password)
    return user


class LoggedInTestCase(TestCase):
    username = 'username'
    password = 'password'

    def setUp(self):
        self.user = login(self.client, self.username, self.password)
