from django.contrib.auth.models import User
from django.test import Client, TestCase


def login(client, username, password):
    user = User.objects.create(username=username)
    user.set_password(password)
    user.save()

    client.login(username=username, password=password)


class LoggedInTestCase(TestCase):
    username = 'username'
    password = 'password'

    def setUp(self):
        login(self.client, self.username, self.password)
