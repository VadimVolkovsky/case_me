from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers

from users.models import City, Profession, Skill, User


class CustomUserSerializer(UserSerializer):
    """Сериализатор просмотра профиля пользователя"""
    city = serializers.StringRelatedField()
    profession = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = (
            'id', 'name', 'username', 'birthdate', 'gender',
            'city', 'email', 'phone', 'about', 'profession',
            'skills',
        )


class CustomUserCreateSerializer(UserCreateSerializer):
    """ Сериализатор создания пользователя """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'name', 'username', 'birthdate', 'gender',
            'city', 'email', 'phone', 'about', 'profession',
            'skills', 'password',
        ) # доработать редактирование профиля для полей FK


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ("id", "name")


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ("id", "name")


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "name")
