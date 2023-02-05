from rest_framework import mixins
from .utils import MixinPermission, MixinSerializer
from rest_framework import viewsets


class CustomPostViewSet(
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.CreateModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        MixinPermission,
                        MixinSerializer,
                        viewsets.GenericViewSet
                        ):
    ...


