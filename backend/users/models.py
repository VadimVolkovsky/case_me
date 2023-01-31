from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from users.validators import username_me

GENDER_CHOICES = (
        ('M', 'Мужской'),
        ('F', 'Женский'),
    )


class UserInformation(models.Model):
    """Абстрактная модель для моделей profession, skill, city"""
    name = models.CharField(max_length=50)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class Profession(UserInformation):
    """Модель специальностей/профессий"""
    class Meta(UserInformation.Meta):
        verbose_name = 'Специальность'
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
        help_text="Формат даты YYYY.MM.DD",
        blank=True,
        null=True
    )
    gender = models.CharField(
        max_length=7,
        choices=GENDER_CHOICES
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        related_name="users",
        null=True,
    )
    email = models.EmailField(
        verbose_name="Email",
        max_length=50,
        unique=True
    )
    phone = PhoneNumberField(region="RU")
    about = models.TextField(
        max_length=256,
        null=True,
        blank=True
    )
    profession = models.ForeignKey(
        Profession,
        on_delete=models.SET_NULL,
        related_name="users",
        blank=True,
        null=True
    )
    skills = models.ManyToManyField(
        Skill,
        related_name="users",
        blank=True
    )
    image = models.ImageField(
        verbose_name='Аватар',
        upload_to='users/images/',
        blank=True,
        null=True
    )
    vk_url = models.URLField(max_length=256, null=True, blank=True)
    facebook_url = models.URLField(max_length=256, null=True, blank=True)
    twitter_url = models.URLField(max_length=256, null=True, blank=True)
