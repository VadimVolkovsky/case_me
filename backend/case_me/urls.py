from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from posts.views import PostViewSet
from rest_framework import routers
from users.views import (CityViewSet, CustomUserViewSet, ProfessionViewSet,
                         SkillViewSet)

router = routers.DefaultRouter()
router.register(r'cities', CityViewSet)
router.register(r'professions', ProfessionViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'users', CustomUserViewSet)
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('redoc/', TemplateView.as_view(
        template_name='redoc/redoc.html'),
        name='redoc'
    )
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )
