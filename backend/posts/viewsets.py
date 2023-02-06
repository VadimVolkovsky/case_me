from rest_framework import mixins, viewsets

from .utils import MixinPermission, MixinSerializer


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


