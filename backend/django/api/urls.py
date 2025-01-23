from django.urls import path
from .views import notes_list, login, create_note, note_detail, register, users_list, user_profile_detail
from .views.chat_views import ChatView
from django.urls import path

urlpatterns = [
    path('userprofile/', user_profile_detail, name='user_profile_detail'),
    path('users/', users_list, name='users_list'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('notes/', notes_list, name='notes_list'),
    path('notes/create/', create_note, name='create_note'),
    path('notes/<int:pk>/', note_detail, name='note_detail'),
    path('chats/', ChatView.as_view(), name='chat_list_create'),
    path('chats/<int:chat_id>/', ChatView.as_view(), name='chat_detail'),
]

