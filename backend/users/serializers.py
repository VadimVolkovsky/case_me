from datetime import date, timedelta

from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, RefreshToken

from users.fields import Base64ImageField, delete_previous_image
from users.models import City, Follow, Profession, Skill, User


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
    """Сериализатор просмотра/редактирования профиля пользователя"""
    image = Base64ImageField()
    followers_count = serializers.SerializerMethodField(read_only=True)
    is_subscribed = serializers.SerializerMethodField(read_only=True)
    age = serializers.SerializerMethodField(read_only=True)
    birthdate = serializers.DateField(write_only=True)
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'name', 'username', 'birthdate', 'gender', 'age',
            'city', 'email', 'phone', 'about', 'profession',
            'skills', 'image', 'vk_url', 'facebook_url', 'twitter_url',
            'is_subscribed', 'followers_count',
        )

    def update(self, instance, validated_data):
        delete_previous_image(instance, validated_data)
        return super().update(instance, validated_data)

    def get_followers_count(self, obj):
        """Отображает количество подписчиков текущего пользователя"""
        return obj.follower.count()

    def get_age(self, obj):
        """Отображает возраст пользователя"""
        if obj.birthdate:
            return (date.today() - obj.birthdate) // timedelta(days=365.2425)

    def get_is_subscribed(self, obj):
        """Проверяет подписку на текущего пользователя"""
        user = self.context.get('request').user
        if user.is_anonymous:
            return False
        return user.follower.filter(author=obj).exists()


class CustomUserCreateSerializer(UserCreateSerializer):
    """ Сериализатор создания пользователя """
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = (
            'name', 'username', 'email', 'password',
        )

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                detail="Пользователь с таким ником уже зарегистрирован"
            )
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                detail="Пользователь с такой почтой уже зарегистрирован"
            )
        return value


class SubscribeSerializer(UserSerializer):
    """ Сериализатор для создания/получения подписок на пользователей """
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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Сериалайзер получения JWT токена с кастомной ошибкой"""
    default_error_messages = {
        'no_active_account': ('Неверный email или пароль')
    }
    username_field = User.email

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data
