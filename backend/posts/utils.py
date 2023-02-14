from django.utils import timezone


class PermissionAndSerializerMixin:
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def get_serializer_class(self):
        try:
            return self.serializer_class_by_action[self.action]
        except (KeyError, AttributeError):
            return self.serializer_class


def user_directory_path(instance, filename):
    now = timezone.now()
    return f'media/{instance.user.username}/{instance.slug}/{filename}'


