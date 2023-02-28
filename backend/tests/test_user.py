import pytest
from rest_framework.test import APIClient
from users.models import User


class TestUsers:
    client = APIClient()
    url_users = "/api/auth/users/"
    url_users_me = "/api/auth/users/me/"

    @pytest.mark.django_db
    def test_access_users_urls_for_no_auth_client(self, client, user):
        url = self.url_users
        code_expected = 403
        response = client.get(url)
        assert response.status_code == code_expected, (
            f'Убедитесь, то при GET запросе {url} для '
            f'неавторизованного пользователя возвращается'
            f'код {code_expected}'
        )

        url = f'/api/auth/users/{user.id}/'
        response = client.get(url)
        code_expected = 200
        assert response.status_code == code_expected, (
            f'Убедитесь, то при GET запросе {url} для '
            f'неавторизованного пользователя возвращается'
            f'код {code_expected}'
        )

        url = self.url_users_me
        response = client.get(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, то при GET запросе {url} для '
            f'неавторизованного пользователя возвращается'
            f'код {code_expected}'
        )
    
    @pytest.mark.django_db
    def test_user_has_correct_data(self, user_client, user):
        response = user_client.get(
            f'/api/auth/users/{user.id}/'
        )
        data = response.data
        assert data["username"] == user.username
        assert data["email"] == user.email
        assert data["name"] == user.name

    @pytest.mark.django_db(transaction=True)
    def test_auth_user_patch_request_with_valid_data(
        self, user, user_client, city_1, profession_1, skill_1, skill_2
    ):
        url = self.url_users_me
        valid_data = {
            "city": city_1.id,
            "profession": profession_1.id,
            "skills": [skill_1.id, skill_2.id],
            "phone": "+79995552233",
            "about": "Информация о себе",
            "vk_url": "https://vk.com/username/"
        }
        code_expected = 200
        response = user_client.patch(url, data=valid_data)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'с валидными параметрами возвращается '
            f'код {code_expected}'
        )

        test_user = User.objects.get(id=user.id)

        assert test_user.city.id == valid_data["city"]
        assert test_user.profession.id == valid_data["profession"]

        test_user_skills = list(test_user.skills.values_list('id', flat=True))
        assert test_user_skills == valid_data["skills"]

        assert test_user.phone == valid_data["phone"]
        assert test_user.about == valid_data["about"]
        assert test_user.vk_url == valid_data["vk_url"]


    def test_auth_user_patch_request_with_invalid_data(self):
        pass
