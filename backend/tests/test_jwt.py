import pytest
from rest_framework.test import APIClient


class TestJWT:
    client = APIClient()
    url_token_create = "/api/auth/jwt/create/"
    url_token_refresh = "/api/auth/jwt/refresh/"
    url_token_verify = "/api/auth/jwt/verify/"

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

    @pytest.mark.django_db(transaction=True)
    def test_jwt_refresh_with_valid_request_data(self, client, user):
        url = self.url_token_refresh
        valid_data = {
            "email": user.email,
            "password": "destroythehagwarts@20"
        }
        response = client.post(self.url_token_create, data=valid_data)
        token_refresh = response.json().get("refresh")
        code_expected = 200
        response = client.post(url, data={"refresh": token_refresh})
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url}'
            f'с валидным параметром refresh, возвращается код {code_expected}'
        )

    @pytest.mark.django_db(transaction=True)
    def test_jwt_refresh_with_invalid_request_data(self, client, user):
        url = self.url_token_refresh
        response = client.post(url)
        code_expected = 400
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url} без параметров,'
            f'возвращается код {code_expected}'
        )

        invalid_data = {
            "refresh": "invalid_token_123abcdqwer"
        }
        response = client.post(url, data=invalid_data)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url} c неверным значением'
            f'параметра refresh, возвращается код {code_expected}'
        )

    @pytest.mark.django_db(transaction=True)
    def test_jwt_verify_with_valid_request_data(self, client, user):
        url = self.url_token_verify
        valid_data = {
            "email": user.email,
            "password": "destroythehagwarts@20"
        }
        response = client.post(self.url_token_create, data=valid_data)
        token_access = response.json().get("access")
        token_refresh = response.json().get("refresh")
        code_expected = 200
        response = client.post(url, data={"token": token_access})
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе `{url}` с валидным параметром token, '
            f'возвращается код {code_expected}. '
            f'Валидацию должны проходить как refresh, так и access токены'
            f'Текущая проблема с валидацией по токену access'
        )
        response = client.post(url, data={"token": token_refresh})
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе `{url}` с валидным параметром token, '
            f'возвращается код {code_expected}. '
            f'Валидацию должны проходить как refresh, так и access токены'
            f'Текущая проблема с валидацией по токену refresh'
        )

    @pytest.mark.django_db(transaction=True)
    def test_jwt_verify_with_invalid_request_data(self, client, user):
        url = self.url_token_verify
        response = client.post(url)
        code_expected = 400
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url} без параметров'
            f'возвращается код {code_expected}'
        )

        invalid_data = {
            "token": "invalid_token_123abcdqwer"
        }
        code_expected = 401
        response = client.post(url, data=invalid_data)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при запросе {url} с неверным токеном'
            f'возвращается код {code_expected}'
        )

        fields_expected = ["detail", "code"]
        for field in fields_expected:
            assert field in response.json(), (
                f'Убедитесь, что при запросе {url} с неверным токеном'
                f'в ответе возвращается код {code_expected} с сообщением'
                f'об ошибке в поле {field}'
        )
