from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..serializers import UserProfileSerializer
from ..models import UserProfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from uuid import UUID

@csrf_exempt
def users_list(request):
    if not hasattr(request, 'user_uuid'):
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    notes = UserProfile.objects.all().values('uuid','last_login','first_name', 'last_name')
    return JsonResponse(list(notes), safe=False)

@api_view(['GET', 'PUT', 'DELETE'])
def user_profile_detail(request):
    try:
        user_profile = UserProfile.objects.get(uuid=request.user_uuid)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not hasattr(request, 'user_uuid'):
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

    if str(user_profile.uuid) != str(request.user_uuid):
        return Response({'error': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        data['uuid'] = user_profile.uuid
        serializer = UserProfileSerializer(user_profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)