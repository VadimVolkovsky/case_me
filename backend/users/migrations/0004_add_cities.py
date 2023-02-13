import json

from django.db import migrations

file = open('./data/cities.json', encoding="utf-8")
INITIAL_CITIES = json.load(file)


def add_cities(apps, schema_editor):
    city_obj = apps.get_model("users", "City")
    for city in INITIAL_CITIES:
        new_city = city_obj(**city)
        new_city.save()


def remove_cities(apps, schema_editor):
    city_obj = apps.get_model("users", "City")
    for city in INITIAL_CITIES:
        city_obj.objects.get(name=city['name']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_add_skills'),
    ]

    operations = [
        migrations.RunPython(
            add_cities,
            remove_cities
        )
    ]
