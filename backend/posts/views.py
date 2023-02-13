from djoser.permissions import CurrentUserOrAdmin
from rest_framework import permissions

from posts.models import Post

from .serializers import SerializerPost
from .viewsets import CustomPostViewSet


class PostViewSet(CustomPostViewSet):
    queryset = Post.objects.all()
    serializer_class = SerializerPost
    permission_classes = permissions.AllowAny,
    permission_classes_by_action = {
        'create': [CurrentUserOrAdmin],
        'update': [CurrentUserOrAdmin],
        ...: ...,  # other

    }
    serializer_class_by_action = {
        'create': ...,  # add
        'update': ...,  # add
        ...: ...,  # other

    }

    # # хочу поменять user на owner в модели
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
