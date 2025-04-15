from django.urls import path
from . import views
from .views import (
    RegisterAPIView,
    PasswordResetConfirmAPIView,
    SetNewPasswordAPIView,
    admin,
)

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', admin, name='admin'),
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
    
]



"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
"""
