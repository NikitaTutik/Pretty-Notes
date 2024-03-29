from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path('(^(?!(api|admin)).*$)', TemplateView.as_view(template_name='index.html')),
    path('api/', include('users.urls'))
]
