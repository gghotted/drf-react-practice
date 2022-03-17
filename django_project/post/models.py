from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    class Meta:
        ordering = ['-id']

    user = models.ForeignKey(User, models.CASCADE)
    title = models.CharField(max_length=256)
    content = models.TextField()
