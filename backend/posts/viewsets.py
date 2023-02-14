from rest_framework import mixins, viewsets

from .utils import PermissionAndSerializerMixin


class CustomPostViewSet(
                        mixins.RetrieveModelMixin,
                        mixins.CreateModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        PermissionAndSerializerMixin,
                        viewsets.GenericViewSet
                        ):
    ...


