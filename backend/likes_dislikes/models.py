from django.db import models

from posts.models import Post
from users.models import User


class AbstractModelLikesAndDislikes(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE)


class Likes(AbstractModelLikesAndDislikes):
    class Meta:
        verbose_name = 'Лайк'


class Dislikes(AbstractModelLikesAndDislikes):
    class Meta:
        verbose_name = 'Дизлайк'
