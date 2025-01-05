from django.db import models
from django.utils.timezone import now
from .user_interface import IUserActions

class UserProfile(models.Model, IUserActions):
    uuid = models.UUIDField(primary_key=True, editable=False)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(blank=True, null=True)

    def get_full_name(self):
        return f"{self.first_name or ''} {self.last_name or ''}".strip()
    
    def update_last_login(self):
        self.last_login = now()
        self.save(update_fields=['last_login'])

    def __str__(self):
        return self.get_full_name()