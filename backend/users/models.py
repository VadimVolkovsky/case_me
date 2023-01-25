from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from phonenumber_field.modelfields import PhoneNumberField

GENDER_CHOICES = (
        ('мужской', 'мужской'),
        ('женский', 'женский'),
    )


class City(models.Model):
    """Модель городов"""
    name = models.CharField(
        verbose_name="Название города",
        max_length=50
    )


class User(AbstractUser):
    """Модель пользователя"""
    name = models.CharField(
        verbose_name="Имя и Фамилия",
        max_length=50
    )
    username = models.CharField(
        verbose_name="Имя пользователя",
        max_length=50,
        unique=True,
        validators=(UnicodeUsernameValidator(),)
    )
    birthdate = models.DateField()
    gender = models.CharField(max_length=7, choices=GENDER_CHOICES)
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        verbose_name="Город",
        related_name="users",
        null=True,
    )
    email = models.EmailField(
        verbose_name="Email",
        max_length=50,
        unique=True
    )
    phone = PhoneNumberField(region="RU")
    image = models.ImageField(
        'Аватар',
        upload_to='users/images/',
        blank=True,
        null=True
    )
    vk_url = models.CharField(max_length=256, null=True, blank=True)
    facebook_url = models.CharField(max_length=256, null=True, blank=True)
    twitter_url = models.CharField(max_length=256, null=True, blank=True)