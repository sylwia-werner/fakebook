from django.db import models

class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    user_ids = models.JSONField()

    def __str__(self):
        return f"Chat {self.id} with users {self.user_ids}"
