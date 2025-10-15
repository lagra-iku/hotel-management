from django.db import models
import uuid
from django.utils.timezone import now
from .utils import user_directory_path
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    """
    Custom manager for CustomUser model."""
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and return a user with an email, password and other fields. """
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)



class CustomUser(AbstractUser):
    """
    Custom user model that uses email as the unique identifier.
    """
    email = models.EmailField(unique=True, verbose_name="Hotel Email")
    is_hotel = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, blank=True)

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager() 

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