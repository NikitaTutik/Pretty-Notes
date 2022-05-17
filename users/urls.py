from django.urls import path, include
from .views import LoginAPI, RegisterAPI, UserAPI
from knox import views as know_views

urlpatterns = [
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth/logout', know_views.LogoutView.as_view()),
    path('auth', include('knox.urls')),
]
 