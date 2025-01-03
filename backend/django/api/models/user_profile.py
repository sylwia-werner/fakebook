from django.db import models
import uuid

class UserProfile(models.Model):
    uuid = models.UUIDField(primary_key=True)
    first_name = models.CharField(max_length=100, blank = True, null=True)
    last_name = models.CharField(max_length=100, blank = True, null=True)
    email = models.EmailField(unique=True, blank = True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"