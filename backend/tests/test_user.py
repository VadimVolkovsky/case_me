import pytest
from rest_framework.test import APIClient


class TestUsers:
    client = APIClient()
    url_users = "/api/auth/users/"
    url_token_create = "/api/auth/jwt/create/"

    @pytest.mark.django_db
    def test_users_url(self, client):
        url = self.url_users
        response = client.get(url)
        assert response.status_code == 200

    @pytest.mark.django_db
    def test_user_has_correct_data(self, user_client, user):
        response = user_client.get(
            f'/api/auth/users/{user.id}/'
        )
        data = response.data
        assert data["username"] == user.username
        assert data["email"] == user.email
        assert data["name"] == user.name
