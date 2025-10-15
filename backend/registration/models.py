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


    # SUBSCRIPTION HELPERS
    # =====================

    def get_active_subscription(self):
        """
        Returns the hotel's current active subscription, or None if none exists.
        """
        active_sub = self.subscriptions.filter(is_active=True, end_date__gte=now()).order_by('-start_date').first()
        return active_sub

    def current_plan(self):
        """
        Returns the SubscriptionPlan instance of the hotel's active plan.
        If no active subscription, returns None.
        """
        sub = self.get_active_subscription()
        return sub.plan if sub else None

    def has_feature(self, feature_name: str) -> bool:
        """
        Checks if the hotel's active plan has a given feature.
        Example: hotel.has_feature('access_to_analytics')
        """
        plan = self.current_plan()
        if not plan:
            return False

        return getattr(plan, feature_name, False)

    def is_plan(self, plan_name: str) -> bool:
        """
        Returns True if the hotel currently has the specified plan.
        Example: hotel.is_plan('BASIC')
        """
        plan = self.current_plan()
        return plan and plan.name.upper() == plan_name.upper()

    def __str__(self):
        return self.hotel_name




class SubscriptionPlan(models.Model):
    """
    Defines the different subscription plans available.
    """
    PLAN_CHOICES = [
        ('FREE', 'Free'),
        ('BASIC', 'Basic'),
        ('ENTERPRISE', 'Enterprise'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, choices=PLAN_CHOICES, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    duration_days = models.PositiveIntegerField(default=30)  # plan validity
    description = models.TextField(blank=True, null=True)

    # feature controls (you can add more later)
    max_rooms = models.PositiveIntegerField(default=5)
    allow_logo_upload = models.BooleanField(default=False)
    access_to_analytics = models.BooleanField(default=False)
    priority_support = models.BooleanField(default=False)
    promotional_visibility = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.get_name_display()} Plan"


class HotelSubscription(models.Model):
    """
    Links a Hotel to its active subscription plan.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    start_date = models.DateTimeField(default=now)
    end_date = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    auto_renew = models.BooleanField(default=False)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.hotel.hotel_name} - {self.plan.name} ({'Active' if self.is_active else 'Expired'})"

    def is_expired(self):
        """
        Checks if the subscription has expired.
        """
        return self.end_date and self.end_date < now()

    def remaining_days(self):
        """
        Returns number of days left before expiration.
        """
        if not self.end_date:
            return None
        delta = self.end_date - now()
        return max(delta.days, 0)
