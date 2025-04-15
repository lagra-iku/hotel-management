from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from .serializers import CustomUserRegistrationSerializer, SetNewPasswordSerializer
from .models import CustomUser, Hotel
from .serializers import HotelSerializer
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response


def index(request):
    return HttpResponse("Hello from the registration app!")


def admin(request):
    return redirect('admin/')

class RegisterAPIView(generics.GenericAPIView):
    """
    API view for user registration. Handles registration of both regular users and hotel users.
    """
    permission_classes = [AllowAny]
    serializer_class = CustomUserRegistrationSerializer

    def post(self, request):
        """
        Handles user registration. If the user is a hotel, it also creates a hotel profile."""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False  # User inactive until password set
            user.save()

            # Generate password reset token
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            #reset_url = f"{settings.FRONTEND_BASE_URL}/auth/set-new-password/{uid}/{token}/"
            reset_url = f"{settings.FRONTEND_BASE_URL}/api/auth/password-reset-confirm/{uid}/{token}/"
            

            print(f"Generated UID: {uid}, Token: {token}")  # In registration
            # Send email
            send_mail(
                'Set your password for your new account',
                f'Please use the following link to reset your password: {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )

            response_data = {
                'detail': 'Please check your email to set your password.',
                'user_id': user.id
            }

            # Include hotel data in response if user is hotel
            if user.is_hotel:
                hotel = Hotel.objects.get(user=user)
                response_data['hotel'] = HotelSerializer(hotel).data

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmAPIView(generics.GenericAPIView):
    """
    API view to validate password reset token
    """
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        """
        Validate the password reset token and uid. # Grace this is called when the user clicks the link in the email.
        """        
        print(f"Received UID: {uidb64}, Token: {token}")  # In password reset confirm
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            return Response(
                {'detail': 'Password reset link is valid. Proceed to set new password.'},
                status=status.HTTP_200_OK
            )
        return Response(
            {'detail': 'Password reset link is invalid.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    




class SetNewPasswordAPIView(generics.GenericAPIView):
    """
    API view to set a new password for the user after validating the token.
    """
    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def put(self, request):  # Changed from post() to put()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(serializer.validated_data['uid']))
                user = CustomUser.objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
                return Response(
                    {'detail': 'Invalid user.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if default_token_generator.check_token(user, serializer.validated_data['token']):
                user.set_password(serializer.validated_data['password'])
                user.is_active = True
                user.save()
                return Response(
                    {'detail': 'Password has been reset successfully.'},
                    status=status.HTTP_200_OK
                )
            return Response(
                {'detail': 'Invalid token.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
class SetNewPasswordAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = SetNewPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(serializer.validated_data['uid']))
                user = CustomUser.objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
                return Response(
                    {'detail': 'Invalid user.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if default_token_generator.check_token(user, serializer.validated_data['token']):
                user.set_password(serializer.validated_data['password'])
                user.is_active = True  # Activate the user
                user.save()
                return Response(
                    {'detail': 'Password has been reset successfully.'},
                    status=status.HTTP_200_OK
                )
            return Response(
                {'detail': 'Invalid token.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""

