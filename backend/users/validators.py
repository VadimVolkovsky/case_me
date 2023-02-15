from django.conf import settings
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import RegexValidator
from django.core import exceptions
from rest_framework import serializers, status

import users.models as model


class UsernameRegexValidator(RegexValidator):
    regex = r'[a-zA-Z0-9_\-\.@]{3,20}$'
    message = 'Кривой никнейм'
    code = 'invalid_username'
    # flags = 0


def username_me(value):
    """Запрещает регистрацию пользователя с username 'me'
    для избежания конфликтов с эндпоинтом "/users/me/" (djoser) """
    if value == 'me':
        raise exceptions.ValidationError(
            'Имя пользователя "me" запрещено. '
            'Пожалуйста, используйте другое имя пользователя.'
        )
    return value


def username_already_exists(self, value):
    if model.User.objects.filter(username=value).exists():
        raise serializers.ValidationError(
            detail=f'Пользователь с ником {value} уже зарегистрирован'
        )


def username_min_lenght(self, value):
    mig_length = settings.USERNAME_MIN_LENGTH
    if len(value) < mig_length:
        raise serializers.ValidationError(
            detail=f'Никнейм не может быть короче {mig_length} символов'
        )


def username_max_length(self, value):
    max_length = settings.USERNAME_MAX_LENGTH
    if len(value) > max_length:
        raise serializers.ValidationError(
            detail=f'Никнейм не может быть длинее {max_length} символов'
        )


def email_already_exists(self, value):
    if model.User.objects.filter(email=value).exists():
        raise serializers.ValidationError(
            detail=f'Пользователь с почтой {value} уже зарегистрирован'
        )


def subscribe_already_exists(author, user):
    if model.Follow.objects.filter(author=author, user=user).exists():
        raise serializers.ValidationError(
            detail=(
                f'Подписка на пользователя {author.username} уже существует'
            ),
            code=status.HTTP_400_BAD_REQUEST,
        )


def subscribe_myself(author, user):
    if user == author:
        raise serializers.ValidationError(
            detail='Нельзя подписаться на самого себя',
            code=status.HTTP_400_BAD_REQUEST,
        )
