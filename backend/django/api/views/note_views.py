from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import NoteSerializer
from ..models import Note
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
def create_note(request):
    if not hasattr(request, 'user_uuid'):
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    data = request.data.copy()
    data['user_uuid'] = request.user_uuid

    serializer = NoteSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not hasattr(request, 'user_uuid'):
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    if int(note.user_uuid) != request.user_uuid:
        return Response({'error': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        data['user_uuid'] = note.user_uuid        

        serializer = NoteSerializer(note, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@csrf_exempt
def notes_list(request):
    if not hasattr(request, 'user_uuid'):
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    notes = Note.objects.all().values('title', 'content','user_uuid','id')
    return JsonResponse(list(notes), safe=False)