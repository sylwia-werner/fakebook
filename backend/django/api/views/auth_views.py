import json
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
from django.conf import settings

@csrf_exempt
@api_view(['POST'])
def login(request):
    data = json.loads(request.body)
    response = requests.post(getattr(settings, 'SPRING_API_LOGIN_URL', None), headers=request.headers, json={
        'login': str(data.get('login')),
        'password': str(data.get('password'))
    })
    
    if response.status_code == 201:
        return JsonResponse({"access_token": response.text})
    else:
        return JsonResponse({'error': 'Unauthorized'}, status=401)