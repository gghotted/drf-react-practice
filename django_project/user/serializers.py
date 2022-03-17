from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs['username']
        password = attrs['password']
        user = authenticate(
            self.context['request'],
            username=username,
            password=password
        )
        if not user:
            raise serializers.ValidationError('패스워드가 일치하지 않습니다.')
        attrs['user'] = user
        return attrs
