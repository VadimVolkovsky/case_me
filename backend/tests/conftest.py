import pytest

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


client = APIClient()
url_token_create = "/api/auth/jwt/create/"


@pytest.fixture
def user(django_user_model):
    """Неавторизованный пользователь №1"""
    return django_user_model.objects.create_user(
        username="Harry_Poter 2023",
        email="harrypoter@mail.ru",
        name="Harry Poter",
        password="destroythehagwarts@20"
    )


@pytest.fixture
def user_2(django_user_model):
    """Неавторизованный пользователь №2"""
    return django_user_model.objects.create_user(
        username="Lord_Voldemort",
        email="Lord_Voldemort@mail.ru",
        name="Lord Voldemort",
        password="Lor_Vold_password"
    )


@pytest.fixture
def token(user):
    """Получение токена"""
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@pytest.fixture
def user_client(token):
    """Авторизованный пользователь"""
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token["access"]}')
    return client
