from dj_rest_auth.views import LoginView
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from user import views

app_name = 'user'

urlpatterns = [
    path('me/', views.MeAPIView.as_view(), name='me'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
