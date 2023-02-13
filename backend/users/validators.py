from django.core import exceptions


def username_me(value):
    """Запрещает регистрацию пользователя с username 'me'
    для избежания конфликтов с эндпоинтом "/users/me/" (djoser) """
    if value == 'me':
        raise exceptions.ValidationError(
            'Имя пользователя "me" запрещено. '
            'Пожалуйста, используйте другое имя пользователя.'
        )
    return value
