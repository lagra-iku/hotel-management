from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Default home page goes to the registration app
    path('', include('registration.urls')),

    # Other app routes without the "api/" prefix
    path('room_booking/', include('room_booking.urls')),
    path('registration/', include('registration.urls')),
    path('reports/', include('reports.urls')),
    path('bar_mgmt/', include('bar_mgmt.urls')),
    path('expense_mgmt/', include('expense_mgmt.urls')),
]
