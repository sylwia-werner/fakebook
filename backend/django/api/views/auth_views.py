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

        if user_uuid:
            
            user_profile = UserProfile.objects.get(uuid=user_uuid)

            serializer = UserProfileSerializer(user_profile)
            response = JsonResponse(serializer.data)

            response['Authorization'] = 'Bearer ' + str(token)

            user_profile.last_login = now()
            user_profile.save(update_fields=['last_login'])

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
            userprofile_data = {
                "first_name": request.data.get("first_name"),
                "last_name": request.data.get("last_name"),
                "email": request.data.get("email")
            }
            user_profile = UserProfile.objects.create(uuid=decode_token(response.text), first_name=userprofile_data["first_name"], last_name=userprofile_data["last_name"], email=userprofile_data["email"])
            return JsonResponse(UserProfileSerializer(user_profile).data, safe=False, status=201)
        else:
            return JsonResponse({"error": "Registration failed"}, status=response.status_code)