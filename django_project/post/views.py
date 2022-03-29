from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from post.models import Post
from post.permissions import IsOwner
from post.serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated()]
        if self.action in ('destroy', 'update', 'partial_update'):
            return [IsAuthenticated(), IsOwner()]
        return []


class HasPermissionObjectView(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        obj = self.get_object()
        return Response(
            {'has_permission': obj.user == request.user},
            status.HTTP_200_OK
        )


class HasPermissionPostDelete(HasPermissionObjectView):
    queryset = Post.objects.all()


class HasPermissionPostUpdate(HasPermissionObjectView):
    queryset = Post.objects.all()
