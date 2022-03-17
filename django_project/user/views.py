from django.contrib.auth import login
from django.contrib.auth.models import User
from post.permissions import IsOwner
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from user import serializers


class MeAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, IsOwner)
    serializer_class = serializers.UserSerializer

    def get_object(self):
        self.check_object_permissions(self.request, self.request.user)
        return self.request.user


class LoginAPIView(GenericAPIView):
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        login(request, serializer.validated_data['user'])
        return Response()
