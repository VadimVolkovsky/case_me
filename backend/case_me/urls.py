from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from users.views import (CityViewSet, ProfessionViewSet,
                         SkillViewSet)


router = routers.DefaultRouter()
router.register(r'city', CityViewSet)
router.register(r'profession', ProfessionViewSet)
router.register(r'skill', SkillViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
]
