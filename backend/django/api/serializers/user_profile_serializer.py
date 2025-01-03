from rest_framework import serializers
from api.models.user_profile import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField()
    first_name = serializers.CharField(required=False, allow_null=True)
    last_name = serializers.CharField(required=False, allow_null=True)
    email = serializers.EmailField(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = ['uuid', 'first_name', 'last_name', 'email', 'last_login', 'created_at', 'updated_at']
        read_only_fields = ['uuid', 'last_login', 'created_at', 'updated_at']
