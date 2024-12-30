from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # This allows access to the Django admin interface
    path('api/',include('api.urls'))  
]
