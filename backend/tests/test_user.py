import pytest
from rest_framework.test import APIClient


client = APIClient()
url_users = "/api/auth/users/"
url_token_create = "/api/auth/jwt/create/"
payload = dict(
    username="Harry_Poter 2023",
    email="harrypoter@mail.ru",
    name="Harry Poter",
    password="destroythehagwarts@20"
)

@pytest.mark.django_db
def test_users_url():
    response = client.get(url_users)
    assert response.status_code == 200


# @pytest.mark.django_db
# def test_user_create():
#     response = client.post(url_user_create, payload)

#     data = response.data

#     assert data["name"] == payload["name"]
#     assert data["username"] == payload["username"]
#     assert data["email"] == payload["email"]
#     assert "password" not in data


@pytest.mark.django_db
def test_user_token_create(user):
    response = client.post(
        url_token_create, dict(
            email=user.email,
            password="destroythehagwarts@20"
        )
    )
    assert response.status_code == 200


@pytest.mark.django_db
def test_user_token_create_fail():
    response = client.post(
        url_token_create, dict(
            email="wrong_mail@mail.ru",
            password="wrongpassword123"
        )
    )
    assert response.status_code == 401


@pytest.mark.django_db
def test_user_has_correct_data(user):
    response = client.get(f'/api/auth/users/{user.id}/')
    data = response.data
    print(f'че по нику1: {data}')
    print(f'че по нику2: {user.username}')
    assert data["username"] == user.username
