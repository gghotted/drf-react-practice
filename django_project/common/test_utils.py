from django.contrib.auth.models import User
from django.test import TestCase


def login(client, username, password):
    User.objects.create_user(
        username=username,
        password=password,
    )
    client.login(username=username, password=password)


class LoggedInTestCase(TestCase):
    username = 'username'
    password = 'password'

    def setUp(self):
        login(self.client, self.username, self.password)
