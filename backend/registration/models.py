from django.db import models
import uuid
from django.utils.timezone import now
from .utils import user_directory_path
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_hotel = models.BooleanField(default=False)  # Flags if this user is a hotel
    phone_number = models.CharField(max_length=20, blank=True)
    
    # Remove username from AbstractUser and use email as identifier
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Hotel(models.Model):
    """
    Model representing a hotel (profile information)
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='hotel_profile'
    )
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)
    hotel_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)  # Hotel's public contact number
    address = models.TextField()
    country = models.CharField(max_length=100)
    state_region = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    registration_num = models.CharField(max_length=100)
    owner_name = models.CharField(max_length=255)
    manager_number = models.CharField(max_length=20)

    # Amenities
    rooms = models.BooleanField(default=True)
    bar = models.BooleanField(default=False)
    halls = models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    gym = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    others = models.CharField(max_length=255, blank=True, null=True)

    logo = models.ImageField(upload_to=user_directory_path, blank=True, null=True)

    def __str__(self):
        return self.hotel_name