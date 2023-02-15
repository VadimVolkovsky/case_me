from posts.models import Post
from rest_framework import serializers


class SerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
