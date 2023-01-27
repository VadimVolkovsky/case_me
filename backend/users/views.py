from djoser.views import UserViewSet
from rest_framework import viewsets

from users.models import City, Profession, Skill, User
from users.serializers import (CitySerializer, CustomUserCreateSerializer,
                               CustomUserSerializer, ProfessionSerializer,
                               SkillSerializer)


class CustomUserViewSet(UserViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return User.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return CustomUserCreateSerializer
        return CustomUserSerializer


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class ProfessionViewSet(viewsets.ModelViewSet):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
