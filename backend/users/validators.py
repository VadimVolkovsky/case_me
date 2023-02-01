from django.core import exceptions


def username_me(value):
    if value == 'me':
        raise exceptions.ValidationError(
            'Имя пользователя "me" запрещено. '
            'Пожалуйста, используйте другое имя пользователя.'
        )
    return value
