import pytest
from rest_framework.test import APIClient


class TestCityProfessionSKill:
    client = APIClient()
    url_city = "/api/cities/"
    url_profession = "/api/professions/"
    url_skill = "/api/skills/"

    @pytest.mark.django_db
    def test_cities(self, user_client):
        url = self.url_city
        response = self.client.get(url)
        code_expected = 200
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} доступен '
            f'неавторизованным пользователям и возвращается '
            f'код {code_expected}'
        )

        response = user_client.get(url)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} доступен '
            f'авторизованным пользователям и возвращается '
            f'код {code_expected}'
        )

        valid_data = {
            "name": "Самара"
        }
        response = self.client.post(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'неавторизованный пользователь не может создать новый объект, '
            f'и возвращается код {code_expected}'
        )
        response = self.client.post(url, valid_data)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'неавторизованный пользователь не может создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.post(url, data=valid_data)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'авторизованный пользователь не можеть создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.post(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'авторизованный пользователь не можеть создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        url = "/api/cities/1/"
        response = self.client.patch(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'неавторизованным пользователям запрещено изменять объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.patch(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'авторизованным пользователям запрещено изменять объект, '
            f'и возвращается код {code_expected}'
        )

        response = self.client.delete(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} '
            f'неавторизованным пользователям запрещено удалять объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.delete(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} '
            f'авторизованным пользователям запрещено удалять объект, '
            f'и возвращается код {code_expected}'
        )

    @pytest.mark.django_db
    def test_profession(self, user_client):
        url = self.url_profession
        response = self.client.get(url)
        code_expected = 200
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} доступен '
            f'неавторизованным пользователям и возвращается '
            f'код {code_expected}'
        )

        response = user_client.get(url)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} доступен '
            f'авторизованным пользователям и возвращается '
            f'код {code_expected}'
        )

        valid_data = {
            "name": "Самара"
        }
        response = self.client.post(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'неавторизованный пользователь не может создать новый объект, '
            f'и возвращается код {code_expected}'
        )
        response = self.client.post(url, valid_data)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'неавторизованный пользователь не может создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.post(url, data=valid_data)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'авторизованный пользователь не можеть создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.post(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'авторизованный пользователь не можеть создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        url = "/api/professions/1/"
        response = self.client.patch(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'неавторизованным пользователям запрещено изменять объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.patch(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'авторизованным пользователям запрещено изменять объект, '
            f'и возвращается код {code_expected}'
        )

        response = self.client.delete(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} '
            f'неавторизованным пользователям запрещено удалять объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.delete(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} '
            f'авторизованным пользователям запрещено удалять объект, '
            f'и возвращается код {code_expected}'
        )

    @pytest.mark.django_db
    def test_skill(self, user_client):
        url = self.url_skill
        response = self.client.get(url)
        code_expected = 200
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} доступен '
            f'неавторизованным пользователям и возвращается '
            f'код {code_expected}'
        )

        response = user_client.get(url)
        assert response.status_code == code_expected, (
            f'Убедитесь, что при GET запросе {url} доступен '
            f'авторизованным пользователям и возвращается '
            f'код {code_expected}'
        )

        valid_data = {
            "name": "Самара"
        }
        response = self.client.post(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'неавторизованный пользователь не может создать новый объект, '
            f'и возвращается код {code_expected}'
        )
        response = self.client.post(url, valid_data)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'неавторизованный пользователь не может создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.post(url, data=valid_data)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'авторизованный пользователь не можеть создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.post(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при POST запросе {url} '
            f'авторизованный пользователь не можеть создать новый объект, '
            f'и возвращается код {code_expected}'
        )

        url = "/api/skills/1/"
        response = self.client.patch(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'неавторизованным пользователям запрещено изменять объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.patch(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при PATCH запросе {url} '
            f'авторизованным пользователям запрещено изменять объект, '
            f'и возвращается код {code_expected}'
        )

        response = self.client.delete(url)
        code_expected = 401
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} '
            f'неавторизованным пользователям запрещено удалять объект, '
            f'и возвращается код {code_expected}'
        )

        response = user_client.delete(url)
        code_expected = 403
        assert response.status_code == code_expected, (
            f'Убедитесь, что при DELETE запросе {url} '
            f'авторизованным пользователям запрещено удалять объект, '
            f'и возвращается код {code_expected}'
        )


# добавить админ (is_staff) может создавать новые объекты ?