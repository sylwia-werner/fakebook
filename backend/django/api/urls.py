from django.urls import path
from .views import notes_list, login, create_note, note_detail
from django.urls import path

def trigger_error(request):
    division_by_zero = 1 / 0

#pamietac by dodac to do urls.py projektu
urlpatterns = [
    path('login/', login, name='login'),
    path('sentry-debug/', trigger_error),
    path('notes/', notes_list, name='notes_list'),
    path('notes/create/', create_note, name='create_note'),
    path('notes/<int:pk>/', note_detail, name='note_detail'),

]

