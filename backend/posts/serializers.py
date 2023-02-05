from rest_framework import serializers

from posts.models import Post


class SerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
