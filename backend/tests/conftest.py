import pytest

from users.models import User


@pytest.fixture
def user(django_user_model):
    return django_user_model.objects.create_user(
        username="Harry_Poter 2023",
        email="harrypoter@mail.ru",
        name="Harry Poter",
        password="destroythehagwarts@20"
    )


# @pytest.fixture
# def user():
#     user = User.objects.create(
#         username="Harry_Poter 2023",
#         email="harrypoter@mail.ru",
#         name="Harry Poter",
#         password="destroythehagwarts@20"
#     )
#     return user


