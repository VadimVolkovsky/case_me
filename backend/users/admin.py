from django.contrib import admin
from django.contrib.auth.models import User, Group

from .models import User, Profession, Skill, City

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('pk', 'username', 'email', 'name', 'birthdate', 'profession', 'city')
    list_display_links = ('username',)
    search_fields = ('username', 'name', 'city', 'birthdate', 'profession', 'skill')
    list_filter = ('city', 'profession', 'birthdate', 'gender')
    list_per_page = 50
    exclude = ('image',)

@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name')
    list_display_links = ('name',)
    search_fields = ('name',)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name')
    list_display_links = ('name',)
    search_fields = ('name',)


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name')
    list_display_links = ('name',)
    search_fields = ('name',)


admin.site.site_header = 'Админ-панель сайта CASE-ME'
admin.site.unregister(Group)