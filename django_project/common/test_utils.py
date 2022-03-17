from django.contrib.auth.models import User
from django.test import Client, TestCase


def login(username, password):
    user = User.objects.create(username=username)
    user.set_password(password)
    user.save()

    c = Client()
    c.login(username=username, password=password)


class LoggedInTestCase(TestCase):
    username = 'username'
    password = 'password'

    @classmethod
    def setUpTestData(cls):
        login(cls.username, cls.password)
