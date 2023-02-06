from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from users.views import (CityViewSet, CustomUserViewSet, ProfessionViewSet,
                         SkillViewSet)
from posts.views import PostViewSet


router = routers.DefaultRouter()
router.register(r'city', CityViewSet)
router.register(r'profession', ProfessionViewSet)
router.register(r'skill', SkillViewSet)
router.register(r'users', CustomUserViewSet)
router.register(r'post', PostViewSet, basename='post')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )
