from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import (
    RegisterAPIView,
    PasswordResetConfirmAPIView,
    SetNewPasswordAPIView,
    admin,
    HotelUpdateAPIView, 
    HotelDeleteAPIView,
    
)

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', admin, name='admin'),
    # login endpoint handled by djoser
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Registration endpoint
    path('api/auth/register/', RegisterAPIView.as_view(), name='register'),
    
    # Password reset confirmation (for validating tokens)
    path('api/auth/password-reset-confirm/<uidb64>/<token>/', 
        PasswordResetConfirmAPIView.as_view(), 
        name='password_reset_confirm'),
    
    # Set new password endpoint
    path('api/auth/set-new-password/', 
        SetNewPasswordAPIView.as_view(), 
        name='set_new_password'),
    # Hotel update endpoint
    path('api/auth/hotel/update/', HotelUpdateAPIView.as_view(), name='hotel_update'),
    # Delete hotel
    path('api/auth/hotel/delete/', HotelDeleteAPIView.as_view(), name='hotel_delete'),

]


"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
"""
