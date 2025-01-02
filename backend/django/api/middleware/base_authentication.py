"""
Author: 14798
Desc: Klasa abstrakcyjna dla middleware pośredniczacego w komuniakcji miedzy frontem, a serwerem Spring
"""

from django.http import JsonResponse
from .middleware_interface import AuthenticationInterface

class BaseAuthenticationMiddleware(AuthenticationInterface):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if self.should_skip(request):
            return self.get_response(request)

        token = self.get_token_from_request(request)
        if not token:
            return JsonResponse({'error': 'Token not provided'}, status=401)
        
        response_from_api = self.forward_token_to_api(token)

        if response_from_api[1] == 201:
            return JsonResponse({'newToken': response_from_api[0]}, status=201)

        token_with_user_uuid = response_from_api[0]

        if not token_with_user_uuid:
            return JsonResponse({'error': 'Invalid response from Spring API'}, status=403)

        user_uuid = ""
        try:              
            user_uuid = self.decode_token(token_with_user_uuid)
            if user_uuid is None:
                return JsonResponse({'error':'Unauthorized'}, status=401)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
        
        request.user_uuid = user_uuid

        print(f"user_uuid: {user_uuid}")

        return self.get_response(request)


