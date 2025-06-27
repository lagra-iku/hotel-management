# serializers.py
from rest_framework import serializers
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Hotel

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration, including hotel-specific fields."""
    hotel_data = serializers.JSONField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'is_hotel', 'phone_number', 'hotel_data')
        extra_kwargs = {
            'is_hotel': {'required': True},
            'phone_number': {'required': True}
        }

    def validate(self, attrs):
        if attrs['is_hotel'] and not attrs.get('hotel_data'):
            raise serializers.ValidationError({"hotel_data": "Hotel data is required for hotel registration."})
        return attrs

    def create(self, validated_data):
        hotel_data = validated_data.pop('hotel_data', None)

        user = CustomUser.objects.create(
            email=validated_data['email'],
            is_hotel=validated_data['is_hotel'],
            phone_number=validated_data['phone_number']
        )

        # Grace, we won't set password here — we will wait for user to use the reset link
        user.set_unusable_password()  # Grace this prevents login until password is set, it's not necessary but make i use am dey learn
        user.save()

        # Create hotel profile if user is a hotel
        if user.is_hotel and hotel_data:
            hotel_serializer = HotelSerializer(data=hotel_data)
            if hotel_serializer.is_valid():
                hotel_serializer.save(user=user)
            else:
                user.delete()
                raise serializers.ValidationError(hotel_serializer.errors)

        return user


# Your existing HotelSerializer (unchanged)
class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')




class SetNewPasswordSerializer(serializers.Serializer):
    """
    Serializer for setting new password
    """
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs