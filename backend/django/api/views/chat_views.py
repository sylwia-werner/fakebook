from django.http import JsonResponse
from django.views import View
from api.models.chat import Chat
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
import json

class ChatView(View):
    permission_classes = [IsAuthenticated]  # Sprawdzenie, czy użytkownik jest autentykowany

    def get(self, request, chat_id=None):
        if chat_id:
            try:
                chat = Chat.objects.get(id=chat_id)
                return JsonResponse({"id": chat.id, "user_ids": chat.user_ids}, status=200)
            except Chat.DoesNotExist:
                return JsonResponse({"error": "Chat not found"}, status=404)
        else:
            chats = Chat.objects.all().values("id", "user_ids")
            return JsonResponse(list(chats), safe=False, status=200)

    def post(self, request):
        try:
            # Sprawdź, czy użytkownik jest autentykowany
            if not request.user.is_authenticated:
                raise AuthenticationFailed('Unauthorized')
            
            data = json.loads(request.body)
            user_ids = data.get("user_ids", [])
            chat = Chat.objects.create(user_ids=user_ids)
            return JsonResponse({"id": chat.id, "user_ids": chat.user_ids}, status=201)
        except AuthenticationFailed:
            return JsonResponse({"error": "Unauthorized - Authentication failed"}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    def put(self, request, chat_id):
        try:
            data = json.loads(request.body)
            user_ids = data.get("user_ids", [])
            chat = Chat.objects.get(id=chat_id)
            chat.user_ids = user_ids
            chat.save()
            return JsonResponse({"id": chat.id, "user_ids": chat.user_ids}, status=200)
        except Chat.DoesNotExist:
            return JsonResponse({"error": "Chat not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    def delete(self, request, chat_id):
        try:
            chat = Chat.objects.get(id=chat_id)
            chat.delete()
            return JsonResponse({"message": "Chat deleted"}, status=200)
        except Chat.DoesNotExist:
            return JsonResponse({"error": "Chat not found"}, status=404)
