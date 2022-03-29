from django.urls import include, path
from rest_framework.routers import DefaultRouter

from post import views

app_name = 'post'

router = DefaultRouter()
router.register('', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/has-delete-permission/', views.HasPermissionPostDelete.as_view(), name='has_delete_permission'),
]
