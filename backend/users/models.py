from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from users.validators import username_me


class UserInformation(models.Model):
    """Абстрактная модель для моделей profession, skill, city"""
    name = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Название"
    )

    class Meta:
        ordering = ['id']
        abstract = True

    def __str__(self):
        return self.name


class Profession(UserInformation):
    """Модель специальностей/профессий"""
    class Meta(UserInformation.Meta):
        verbose_name = 'Специальность'
        verbose_name_plural = 'Специальности'
        default_related_name = "professions"


class Skill(UserInformation):
    """Модель навыков работы"""
    class Meta(UserInformation.Meta):
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'
        default_related_name = "skills"


class City(UserInformation):
    """Модель городов"""
    class Meta(UserInformation.Meta):
        verbose_name = 'Город'
        verbose_name_plural = 'Города'
        default_related_name = "cities"


class User(AbstractUser):
    """Модель пользователя"""
    GENDER_CHOICES = (
        ('M', 'Мужской'),
        ('F', 'Женский'),
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    name = models.CharField(
        verbose_name="Имя и Фамилия",
        max_length=50
    )
    username = models.CharField(
        verbose_name="Никнейм",
        max_length=50,
        unique=True,
        validators=(UnicodeUsernameValidator(), username_me)
    )
    birthdate = models.DateField(
        verbose_name="Дата рождения",
        help_text="Формат даты YYYY-MM-DD",
        blank=True,
        null=True
    )
    gender = models.CharField(
        verbose_name='Пол',
        max_length=7,
        choices=GENDER_CHOICES,
        blank=True,
        null=True
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        related_name="users",
        blank=True,
        null=True,
        verbose_name='Город',
    )
    email = models.EmailField(
        verbose_name="Email",
        max_length=50,
        unique=True
    )
    phone = PhoneNumberField(
        region="RU",
        blank=True,
        null=True,
        verbose_name='Телефон',
    )
    about = models.TextField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name='О себе'
    )
    profession = models.ForeignKey(
        Profession,
        on_delete=models.SET_NULL,
        related_name="users",
        blank=True,
        null=True,
        verbose_name='Специальность'
    )
    skills = models.ManyToManyField(
        Skill,
        related_name="users",
        blank=True,
        verbose_name='Навык',
    )
    image = models.ImageField(
        default='users/images/default_image.png',
        verbose_name='Аватар',
        upload_to='users/images/',
        blank=True,
        null=True,
    )
    vk_url = models.URLField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name="ВКонтакте")
    facebook_url = models.URLField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name="Facebook")
    twitter_url = models.URLField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name='Twitter'
    )

    def get_absolute_url(self):
        return f'/api/auth/users/{self.pk}/'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['id']


class Follow(models.Model):
    """Модель для подписки на пользователей"""
    user = models.ForeignKey(
        User,
        related_name='follower',
        on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        User,
        related_name='following',
        on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['author', 'user'],
                name='unique_following'
            ),
            models.CheckConstraint(
                check=~models.Q(user=models.F('author')),
                name='prevent_self_follow',
            )
        ]
