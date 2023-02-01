import json

from django.db import migrations

file = open('./data/skills.json', encoding="utf-8")
INITIAL_SKILLS = json.load(file)


def add_skills(apps, schema_editor):
    skill_obj = apps.get_model("users", "Skill")
    for skill in INITIAL_SKILLS:
        new_skill = skill_obj(**skill)
        new_skill.save()


def remove_skills(apps, schema_editor):
    skill_obj = apps.get_model("users", "Skill")
    for skill in INITIAL_SKILLS:
        skill_obj.objects.get(name=skill['name']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_add_professions'),
    ]

    operations = [
        migrations.RunPython(
            add_skills,
            remove_skills
        )
    ]
