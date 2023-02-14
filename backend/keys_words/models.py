from django.db import models


class KeysWord(models.Model):
    name = models.CharField(max_length=50, unique=True, db_index=True)

    class Meta:
        verbose_name = 'Ключевое слово'


