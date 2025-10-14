from .views import (
    index, admin,
    RegisterAPIView, PasswordResetConfirmAPIView, SetNewPasswordAPIView,
    HotelUpdateAPIView, HotelDeleteAPIView,
    AuthenticatedUserRequestPasswordChange, RequestPasswordResetUnauthenticatedUser
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path



urlpatterns = [
    # Basic routes
    path('', index, name='index'),
    path('admin/', admin, name='admin'),

    # Authentication
    path('api/auth/register/', RegisterAPIView.as_view(), name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Password reset and change
    path('api/auth/request-password-reset-unauthenticated-user/', RequestPasswordResetUnauthenticatedUser.as_view(), name='unauthenticated_request_password_reset'),
    path('api/auth/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmAPIView.as_view(), name='password_reset_confirm'),
    path('api/auth/set-new-password/', SetNewPasswordAPIView.as_view(), name='set_new_password'),
    path('api/auth/request-password-change-authenticated-user/', AuthenticatedUserRequestPasswordChange.as_view(), name='authenticated_request_password_change'),

    # Hotel management
    path('api/auth/hotel/update/', HotelUpdateAPIView.as_view(), name='hotel_update'),
    path('api/auth/hotel/delete/', HotelDeleteAPIView.as_view(), name='hotel_delete'),
]


