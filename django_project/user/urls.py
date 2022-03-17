from django.urls import path

from user import views

app_name = 'user'

urlpatterns = [
    path('me/', views.MeAPIView.as_view(), name='me'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
]
