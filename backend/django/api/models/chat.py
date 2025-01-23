from django.db import models
from .user_profile import UserProfile

class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    chat_name = models.CharField(max_length=255, unique=False)
    user_ids = models.ManyToManyField('UserProfile', related_name='chats')

class Message(models.Model):
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey('UserProfile', on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    timestamp = models.DateTimeField()