from django.db import models
from users.models import User

from .utils import user_directory_path


class Post(models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name='user',
    )
    url = models.CharField(
        max_length=255,
        unique=True,
    )
    created_at = models.DateField(
        auto_now_add=True,
        verbose_name='Дата создания',
    )
    update_at = models.DateField(
        auto_now=True,
        verbose_name='Дата обновления',
        # editable=False
    )
    title = models.CharField(
        max_length=100,
        verbose_name='Заголовок',
    )
    content = models.TextField(
        verbose_name='Контент',
    )
    main_image = models.FileField(
        upload_to=user_directory_path,
        null=True,  # ask for front
        # default=...,
        blank=True
    )
    is_private = models.BooleanField(
        verbose_name='Статус приватности',
    )
    # amount_like = models.ForeignKey(
    #     to=Like,
    #     on_delete=models.CASCADE,
    #     verbose_name='количество лайков',
    #     null=True,
    # )
    # amount_dislike = models.ForeignKey(
    #     to=Dislike,
    #     on_delete=models.CASCADE,
    #     verbose_name='количество дизлайков',
    #     null=True,
    # )
    # comments = models.ForeignKey(
    #     to=Comment,
    #     on_delete=models.CASCADE,
    #     verbose_name='комментарии',
    #     null=True,
    # )

    # themes = models.ManyToManyField(
    #     to=Theme,
    #     related_name='theme',
    # )
    # key_words = models.ManyToManyField(
    #     to=Word,
    #     related_name='word',
    # )

    def __str__(self):
        return f'owner: {self.user.username} / post: {self.title}'
    # ask for front

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статья'
