from django.conf import settings
from django.core import exceptions
from django.core.validators import RegexValidator
from rest_framework import serializers, status

import users.exceptions as exceptions
import users.models as model


class UsernameRegexValidator(RegexValidator):
    """Проверяет username пользователеля на соответствие
        заданым в settings условиям"""
    regex = settings.USERNAME_REGEX
    message = exceptions.invalid_username
    code = 'invalid'


def username_already_exists(self, value):
    """Проверяет уникальность никнейма и отображает кастомную ошибку"""
    if model.User.objects.filter(username=value).exists():
        raise serializers.ValidationError(
            detail=f'Пользователь с ником {value} уже зарегистрирован'
        )


def email_already_exists(self, value):
    """Проверяет уникальность email и отображает кастомную ошибку"""
    if model.User.objects.filter(email=value).exists():
        raise serializers.ValidationError(
            detail=f'Пользователь с почтой {value} уже зарегистрирован'
        )


def subscribe_already_exists(author, user):
    """Проверяет, существует ли подписка на данного пользователя"""
    if model.Follow.objects.filter(author=author, user=user).exists():
        raise serializers.ValidationError(
            detail=(
                f'Подписка на пользователя {author.username} уже существует'
            ),
            code=status.HTTP_400_BAD_REQUEST,
        )


def subscribe_myself(author, user):
    """Предовращает подписку на самого себя"""
    if user == author:
        raise serializers.ValidationError(
            detail='Нельзя подписаться на самого себя',
            code=status.HTTP_400_BAD_REQUEST,
        )



# def username_me(value):
#     """Запрещает регистрацию пользователя с username 'me'
#     для избежания конфликтов с эндпоинтом "/users/me/" (djoser) """
#     if value == 'me':
#         raise exceptions.ValidationError(
#             'Имя пользователя "me" запрещено. '
#             'Пожалуйста, используйте другое имя пользователя.'
#         )


# def username_min_lenght(self, value):
#     mig_length = settings.USERNAME_MIN_LENGTH
#     if len(value) < mig_length:
#         raise serializers.ValidationError(
#             detail=f'Никнейм не может быть короче {mig_length} символов'
#         )


# def username_max_length(self, value):
#     max_length = settings.USERNAME_MAX_LENGTH
#     if len(value) > max_length:
#         raise serializers.ValidationError(
#             detail=f'Никнейм не может быть длинее {max_length} символов'
#         )
#     return value