import pytest
from rest_framework.test import APIClient


class TestJWT:
    client = APIClient()
    url_users = "/api/auth/users/"
    url_token_create = "/api/auth/jwt/create/"

    @pytest.mark.django_db(transaction=True)
    def test_user_token_create_with_valid_request_data(self, client, user):
        url = self.url_token_create
        valid_data = {
            "email": user.email,
            "password": "destroythehagwarts@20"
        }
        code_expected = 200
        response = client.post(url, data=valid_data)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе `{url}` с валидными данными, '
            f'возвращается код {code_expected}'
        )

        fields_in_response = ['refresh', 'access']
        for field in fields_in_response:
            assert field in response.json().keys(), (
                f'Убедитесь, что при запросе `{url}` с валидными данными, '
                f' в ответе возвращается код {code_expected} с ключами '
                f'{fields_in_response}, где содержатся токены'
            )

    @pytest.mark.django_db(transaction=True)
    def test_user_token_create_with_invalid_request_data(self, client):
        url = self.url_token_create
        response = client.post(url)
        code_expected = 400
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url} без параметров,'
            f'возвращается код {code_expected}'
        )
        fields_invalid = ['email', 'password']
        for field in fields_invalid:
            assert field in response.json().keys(), (
                f'Убедитесь, что при запросе `{url}` без параметров, '
                f'возвращается код {code_expected} с сообщением о том, '
                'при обработке каких полей возникла ошибка.'
                f'Не найдено поле {field}'
            )

        invalid_data = {
            "email": "invalid_email@mail.ru",
            "password": "invalid_password123"
        }
        code_expected = 401
        response = client.post(url, invalid_data)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url} с неверными данными,'
            f'возвращается код {code_expected}'
        )
