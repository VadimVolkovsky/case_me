import json

from django.db import migrations

file = open('./data/professions.json', encoding="utf-8")
INITIAL_PROFESSIONS = json.load(file)


def add_professions(apps, schema_editor):
    profession_obj = apps.get_model("users", "Profession")
    for profession in INITIAL_PROFESSIONS:
        new_profession = profession_obj(**profession)
        new_profession.save()


def remove_professions(apps, schema_editor):
    profession_obj = apps.get_model("users", "Profession")
    for profession in INITIAL_PROFESSIONS:
        profession_obj.objects.get(name=profession['name']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(
            add_professions,
            remove_professions
        )
    ]
