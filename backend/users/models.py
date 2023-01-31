from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.urls import reverse
from phonenumber_field.modelfields import PhoneNumberField

GENDER_CHOICES = (
        ('m', 'мужской'),
        ('f', 'женский'),
    )


class Profession(models.Model):
    """Модель специальностей/профессий"""
    name = models.CharField(
        verbose_name="Специальность",
        max_length=50
    )

    class Meta:
        verbose_name = 'Специальность'
        verbose_name_plural = 'Специальности'
        ordering = ['id']



    def __str__(self):
        return self.name


class Skill(models.Model):
    """Модель навыков работы"""
    name = models.CharField(
        verbose_name="Навык",
        max_length=50
    )

    class Meta:
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'
        ordering = ['id']

    def __str__(self):
        return self.name


class City(models.Model):
    """Модель городов"""
    name = models.CharField(
        verbose_name="Название города",
        max_length=50
    )

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'
        ordering = ['id']

    def __str__(self):
        return self.name


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
    birthdate = models.DateField(verbose_name='День рождения', null=True)
    gender = models.CharField(max_length=7, choices=GENDER_CHOICES, verbose_name='Пол')
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
    about = models.TextField(max_length=256, null=True, blank=True)
    profession = models.ForeignKey(
        Profession,
        on_delete=models.SET_NULL,
        related_name="users",
        verbose_name="Специальность",
        blank=True,
        null=True
    )
    skills = models.ManyToManyField(
        Skill,
        related_name="users",
        verbose_name="Навык",
        blank=True
    )
    image = models.ImageField(
        'Аватар',
        upload_to='users/images/',
        blank=True,
        null=True
    )

    def get_absolute_url(self):
        return f'/users/{self.pk}/'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['id']

    vk_url = models.URLField(max_length=256, null=True, blank=True)
    facebook_url = models.URLField(max_length=256, null=True, blank=True)
    twitter_url = models.URLField(max_length=256, null=True, blank=True)
