from djoser.permissions import CurrentUserOrAdmin
from rest_framework import permissions

from posts.models import Post

from .serializers import SerializerPost, SerializerCreatePost, SerializerUpdatePost, SerializerDeletePost
from .viewsets import CustomPostViewSet


class PostViewSet(CustomPostViewSet):
    queryset = Post.objects.all()
    serializer_class = SerializerPost
    permission_classes = permissions.AllowAny,
    permission_classes_by_action = {
        # 'list': [permissions.AllowAny, ],
        'retrieve': [permissions.AllowAny, ],
        'create': [permissions.AllowAny, ],
        'update': [CurrentUserOrAdmin, ],
        'delete': [CurrentUserOrAdmin, ],
    }
    serializer_class_by_action = {
        # 'list': ...,
        'create': SerializerCreatePost,
        'update': SerializerUpdatePost,
        'partial_update': SerializerUpdatePost,
        'delete': SerializerDeletePost,
        'retrieve': SerializerPost,
    }

