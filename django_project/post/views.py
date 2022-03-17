from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from post.models import Post
from post.permissions import IsOwner
from post.serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.action in ('destroy', 'update', 'partial_update'):
            return [IsAuthenticated(), IsOwner()]
        return []
