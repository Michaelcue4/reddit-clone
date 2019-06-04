from rest_framework import viewsets
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment

class PostList(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentList(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer