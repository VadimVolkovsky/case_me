from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers, status
from users.fields import Base64ImageField
from users.models import City, Profession, Skill, User, Follow


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


class CustomUserSerializer(UserSerializer):
    """Сериализатор просмотра профиля пользователя"""
    image = Base64ImageField()

    class Meta:
        model = User
        fields = (
            'id', 'name', 'username', 'birthdate', 'gender',
            'city', 'email', 'phone', 'about', 'profession',
            'skills', 'image', 'vk_url', 'facebook_url', 'twitter_url',
        )


class CustomUserCreateSerializer(UserCreateSerializer):
    """ Сериализатор создания пользователя """
    image = Base64ImageField(required=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'name', 'username', 'birthdate', 'gender',
            'city', 'email', 'phone', 'about', 'profession',
            'skills', 'image', 'vk_url', 'facebook_url', 'twitter_url',
            'password',
        )


class SubscribeSerializer(UserSerializer):
    """ Сериализатор для создания/получения подписок """
    class Meta(UserSerializer.Meta):
        fields = (
            "id", 'name', 'username', 'email',
        )
        read_only_fields = ('name', 'username', 'email',)

    def validate(self, data):
        author = self.instance
        user = self.context.get('request').user
        if Follow.objects.filter(author=author, user=user).exists():
            raise serializers.ValidationError(
                detail='Подписка уже существует',
                code=status.HTTP_400_BAD_REQUEST,
            )
        if user == author:
            raise serializers.ValidationError(
                detail='Нельзя подписаться на самого себя',
                code=status.HTTP_400_BAD_REQUEST,
            )
        return data