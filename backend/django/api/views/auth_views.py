import json
import jwt
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
from django.conf import settings

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
        decoded = decode_token(token)
        response = JsonResponse({"user_uuid": decoded})
        response['Authorization'] = 'Bearer ' + str(token)
        return response
    else:
        return JsonResponse({'error': 'Unauthorized'}, status=401)