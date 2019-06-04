from rest_framework import routers
from .views import PostList, CommentList

router = routers.SimpleRouter()
router.register('posts', PostList)
router.register('comments', CommentList)

urlpatterns = router.urls