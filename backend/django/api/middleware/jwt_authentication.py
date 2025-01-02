"""
Author: 14798
Desc: Middlweare odpowiedzialny za uwierzytelnianie requestów poprzez tokeny JWT, 
weryfikuje token z nagłówka->komunikuje się z API
Spring (waliduje token), dekoduje zwrócony token do id użytkownika
"""

import requests
from .base_authentication import BaseAuthenticationMiddleware
from django.conf import settings
import jwt

class JWTAuthenticationMiddleware(BaseAuthenticationMiddleware):
    def should_skip(self, request):
        #spr. czy sciezka jest na liscie ktore nie maja byc obslugiwane przez middleware
        return request.path in getattr(settings, 'SKIP_AUTHENTICATION_PATHS', [])

    def get_token_from_request(self, request):        
        token = request.headers.get('Authorization')
        if token and token.startswith("Bearer "): 
            return token.split(" ")[1]
        return None

    def forward_token_to_api(self, token):
        print(token)
        headers = {'Authorization': f'Bearer {token}'}
        try:
            response = requests.get(getattr(settings, 'SPRING_API_VERIFY_URL', None), headers=headers)

            if response.status_code == 200:     
                return [response.text, 200]
            elif response.status_code == 201:
                return [response.text, 201]
            
            return ["", response.status_code]

        except requests.RequestException as e:
            return None
    
    def decode_token(self, token):        
        try:
            decoded = jwt.decode(token, key=getattr(settings, "JWT_SECRET_KEY", None), algorithms=[getattr(settings, "JWT_ALGORITHM", "HS256")], verify=False)
            if not decoded or str(decoded) == "" or decoded['sub'] == "":
                raise ValueError("Invalid user UUID")
            
            return str(decoded['sub'])

        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    