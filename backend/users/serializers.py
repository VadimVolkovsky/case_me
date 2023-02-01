from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers, status
from users.fields import Base64ImageField, delete_previous_image
from users.models import City, Profession, Skill, User, Follow
from datetime import date, timedelta


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
    followers_count = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    birthdate = serializers.DateField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'name', 'username', 'birthdate', 'gender', 'age',
            'city', 'email', 'phone', 'about', 'profession',
            'skills', 'image', 'vk_url', 'facebook_url', 'twitter_url',
            'followers_count',
        )

    def update(self, instance, validated_data):
        delete_previous_image(instance, validated_data)
        return super().update(instance, validated_data)

    def get_followers_count(self, obj):
        """Отображает количество подписчиков текущего пользователя"""
        return obj.follower.count()

    def get_age(self, obj):
        return (date.today() - obj.birthdate) // timedelta(days=365.2425)


class CustomUserCreateSerializer(UserCreateSerializer):
    """ Сериализатор создания пользователя """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'name', 'username', 'birthdate', 'gender',
            'city', 'email', 'phone', 'password',
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