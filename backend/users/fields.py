import base64

from django.core.files.base import ContentFile
from rest_framework import serializers


class Base64ImageField(serializers.ImageField):
    """Добавление аватарок пользователей"""
    def to_internal_value(self, data):
        try:
            if isinstance(data, str) and data.startswith('data:image'):
                format, imgstr = data.split(';base64,')
                ext = format.split('/')[-1]
                data = ContentFile(
                    base64.b64decode(imgstr), name='temp.' + ext
                )
            return super().to_internal_value(data)
        except ValueError:
            raise ValueError('Недопустимый формат изображения')


def delete_previous_image(instance, validated_data):
    """Функция для удаления прошлого изображения из базы данных"""
    if 'image' in validated_data:
        if instance.image != 'users/images/default_image.png':
            instance.image.delete()
    else:
        pass
