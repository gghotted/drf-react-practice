from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('user',)

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = instance.user.username
        request = self.context['request']
        data['has_delete_permission'] = instance.user == request.user
        data['has_update_permission'] = instance.user == request.user
        return data
