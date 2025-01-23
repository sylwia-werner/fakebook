from django.urls import path
from .views import notes_list, login, create_note, note_detail, register, users_list, user_profile_detail
from .views import create_chat, delete_chat, update_chat_name, add_users_to_chat, remove_users_from_chat, send_message, get_messages
from django.urls import path

urlpatterns = [
    path('userprofile/', user_profile_detail, name='user_profile_detail'),
    path('users/', users_list, name='users_list'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('notes/', notes_list, name='notes_list'),
    path('notes/create/', create_note, name='create_note'),
    path('notes/<int:pk>/', note_detail, name='note_detail'),
    path('chat/create/', create_chat, name='create_chat'),
    path('chat/<int:chat_id>/delete/', delete_chat, name='delete_chat'),
    path('chat/<int:chat_id>/update-name/', update_chat_name, name='update_chat_name'),
    path('chat/<int:chat_id>/add-users/', add_users_to_chat, name='add_users_to_chat'),
    path('chat/<int:chat_id>/remove-users/', remove_users_from_chat, name='remove_users_from_chat'),
    path('chat/<int:chat_id>/send-message/', send_message, name='send_message'),
    path('chat/<int:chat_id>/get-messages/', get_messages, name='get_messages'),
]

