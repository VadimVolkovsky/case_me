import pytest
from rest_framework.test import APIClient
from users.models import User


class TestUsers:
    client = APIClient()
    url_users = "/api/users/"
    url_users_me = "/api/users/me/"

    @pytest.mark.django_db
    def test_access_users_urls_for_no_auth_client(self, user):
        url = self.url_users
        code_expected = 401
        response = self.client.get(url)
        assert response.status_code == code_expected, (
            f'Убедитесь, то при GET запросе {url} для '
            f'неавторизованного пользователя возвращается'
            f'код {code_expected}'
        )

        url = f'/api/users/{user.id}/'
        response = self.client.get(url)
        code_expected = 200
        assert response.status_code == code_expected, (
            f'Убедитесь, то при GET запросе {url} для '
            f'неавторизованного пользователя возвращается'
            f'код {code_expected}'
        )

        url = self.url_users_me
        response = self.client.get(url)
        print(f'печатчаем респонс: {response}')
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, то при GET запросе {url} для '
            f'неавторизованного пользователя возвращается'
            f'код {code_expected}'
        )

    @pytest.mark.django_db
    def test_user_has_correct_data(self, user_client, user):
        response = user_client.get(
            f'/api/users/{user.id}/'
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

    def test_auth_user_request_edit_another_user(
            self, user, user_2, user_client
    ):
        url = f'/api/users/{user_2.id}/'
        response = user_client.patch(url)
        code_expected = 404
        assert response.status_code == code_expected, (
            f'Убедитесь, что при попытке пользователя редактировать '
            f'профиль другого пользователя, возвращается код {code_expected}'
        )

    def test_user_subscribe(self, user, user_2, user_client):
        url = '/api/users/subscriptions/'
        response = self.client.get(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} неавторизованный '
            f'пользователь не может посмотреть свои подписки, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.get(url)
        code_expected = 200
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} авторизованный '
            f'пользователь может посмотреть свои подписки, '
            f'и возвращается код {code_expected}'
        )

        test_data = response.json()
        assert type(test_data) == list, (
            f'Убедитесь, что при GET запросе {url} возвращается список'
        )

        url = f'/api/users/{user_2.id}/subscribe/'
        response = user_client.post(url)
        code_expected = 201
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} авторизованный '
            f'пользователь успешно подписывается на другого пользователя, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.delete(url)
        code_expected = 204
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} авторизованный '
            f'пользователь успешно отписывается от другого пользователя, '
            f'и возвращается код {code_expected}'
        )

        response = self.client.post(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} неавторизованный '
            f'пользователь не может подписать на другого пользователя, '
            f'и возвращается код {code_expected}'
        )

    def test_user_set_password(self, user_client):
        url = '/api/users/set_password/'
        valid_data = {
            "new_password": "destroythehagwarts@20_new",
            "current_password": "destroythehagwarts@20"
        }
        response = user_client.post(url, data=valid_data)
        code_expected = 204
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} с валидными '
            f'данными, авторизованный пользователь успешно '
            f'изменяет свой пароль, и возвращается код {code_expected}'
        )

        invalid_data = {
            "new_password": "destroythehagwarts@20_new",
            "current_password": "destroythehagwarts@20_wrong_pswrd"
        }
        response = user_client.post(url, data=invalid_data)
        code_expected = 400
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} с невалидными '
            f'данными, авторизованный пользователь не может '
            f'изменить свой пароль, и возвращается код {code_expected}'
        )


    # тест на сброс пароля (как получить ссылку из email ?)
