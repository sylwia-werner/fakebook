from django.urls import path
from .views import notes_list, login, create_note, note_detail
from django.urls import path

urlpatterns = [
    path('login/', login, name='login'),
    path('notes/', notes_list, name='notes_list'),
    path('notes/create/', create_note, name='create_note'),
    path('notes/<int:pk>/', note_detail, name='note_detail'),

]

