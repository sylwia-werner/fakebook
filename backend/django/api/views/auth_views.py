import json
import jwt
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
from django.conf import settings
from ..models import UserProfile
from ..serializers import UserProfileSerializer
from django.utils.timezone import now

def decode_token(token):
    decoded = jwt.decode(token, key=getattr(settings, "JWT_SECRET_KEY", None), algorithms=[getattr(settings, "JWT_ALGORITHM", "HS256")], verify=False, options={'verify_signature': False})
    if not decoded or str(decoded) == "" or decoded['sub'] == "":
        raise ValueError("Invalid user UUID")
    
    return decoded['sub']

@csrf_exempt
@api_view(['POST'])
def login(request):
    data = json.loads(request.body)
    response = requests.post(getattr(settings, 'SPRING_API_LOGIN_URL', None), headers=request.headers, json={
        'login': str(data.get('login')),
        'password': str(data.get('password'))
    })
    
    if response.status_code == 201:
        token = response.text
        user_uuid = decode_token(token)
        response = JsonResponse({"user_uuid": user_uuid})
        response['Authorization'] = 'Bearer ' + str(token)

        if user_uuid:
            
            user_profile, created = UserProfile.objects.get_or_create(uuid=user_uuid)

            user_profile.last_login = now()
            user_profile.save(update_fields=['last_login'])

            if created:
                print(f"nowy uzytkownik {user_uuid}", flush=True)
            else:
                print(f"uzytkownik istnieje {user_uuid}", flush=True)

        return response
    else:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
@csrf_exempt
@api_view(['POST'])
def register(request):

        user_data = {
            "login": request.data.get("login"),
            "password": request.data.get("password"),
            "password2": request.data.get("password2")
        }

        response = requests.post(
            getattr(settings, 'SPRING_API_REGISTER_URL', None),
            json=user_data
        )

        if response.status_code == 201:
            
            return JsonResponse({"message": "User registered successfully"}, status=201)
        else:
            return JsonResponse({"error": "Registration failed"}, status=response.status_code)