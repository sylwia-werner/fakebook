from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime
from django.shortcuts import get_object_or_404
from ..models.chat import Chat, Message
from ..models.user_profile import UserProfile
from rest_framework.decorators import api_view
from rest_framework.response import Response

@csrf_exempt
@api_view(['POST'])
def create_chat(request):
    chat_name = request.data.get('chat_name', '')
    user_ids = request.data.get('user_ids', [])

    if not user_ids:
        return Response({'error': 'User IDs must be provided'}, status=400)

    chat = Chat.objects.create(chat_name=chat_name)
    for user_id in user_ids:
        user = get_object_or_404(UserProfile, id=user_id)
        chat.user_ids.add(user)

    return Response({'message': 'Chat created successfully', 'chat_id': chat.id}, status=201)

@csrf_exempt
@api_view(['DELETE'])
def delete_chat(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id)
    chat.delete()
    return Response({'message': 'Chat deleted successfully'}, status=200)

@csrf_exempt
@api_view(['PATCH'])
def update_chat_name(request, chat_id):
    new_name = request.data.get('chat_name', '')

    if not new_name:
        return Response({'error': 'New chat name must be provided'}, status=400)

    chat = get_object_or_404(Chat, id=chat_id)
    chat.chat_name = new_name
    chat.save()
    return Response({'message': 'Chat name updated successfully'}, status=200)

@csrf_exempt
@api_view(['POST'])
def add_users_to_chat(request, chat_id):
    user_ids = request.data.get('user_ids', [])

    if not user_ids:
        return Response({'error': 'User IDs must be provided'}, status=400)

    chat = get_object_or_404(Chat, id=chat_id)

    for user_id in user_ids:
        user = get_object_or_404(UserProfile, id=user_id)
        chat.user_ids.add(user)

    return Response({'message': 'Users added to chat successfully'}, status=200)

@csrf_exempt
@api_view(['POST'])
def remove_users_from_chat(request, chat_id):
    user_ids = request.data.get('user_ids', [])

    if not user_ids:
        return Response({'error': 'User IDs must be provided'}, status=400)

    chat = get_object_or_404(Chat, id=chat_id)

    for user_id in user_ids:
        user = get_object_or_404(UserProfile, id=user_id)
        chat.user_ids.remove(user)

    return JsonResponse({'message': 'Users removed from chat successfully'}, status=200)

@csrf_exempt
@api_view(['POST'])
def send_message(request, chat_id):
    content = request.data.get('content', '')
    sender_id = request.data.get('sender_id', '')
    timestamp = request.data.get('timestamp', '')

    if not (content and sender_id and timestamp):
        return Response({'error': 'Content, sender ID, and timestamp are required'}, status=400)

    chat = get_object_or_404(Chat, id=chat_id)
    sender = get_object_or_404(UserProfile, id=sender_id)
    parsed_timestamp = parse_datetime(timestamp)

    if parsed_timestamp is None:
        return Response({'error': 'Invalid timestamp format'}, status=400)

    message = Message.objects.create(
        chat=chat,
        sender=sender,
        content=content,
        timestamp=parsed_timestamp
    )

    return Response({'message': 'Message sent successfully'}, status=201)

@csrf_exempt
@api_view(['GET'])
def get_messages(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id)
    messages = chat.messages.order_by('timestamp').values(
        'sender__id', 'content', 'timestamp'
    )
    return Response({'messages': list(messages)}, status=200)
