from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now, timedelta
from .models import Hotel, SubscriptionPlan, HotelSubscription


@receiver(post_save, sender=Hotel)
def assign_free_plan_to_new_hotel(sender, instance, created, **kwargs):
    """
    Automatically assign the Free Plan to every newly created hotel.
    """
    if created:
        try:
            # Get the Free plan
            free_plan = SubscriptionPlan.objects.get(name='FREE')
        except SubscriptionPlan.DoesNotExist:
            # If it doesn’t exist, create one on the fly
            free_plan = SubscriptionPlan.objects.create(
                name='FREE',
                price=0.00,
                duration_days=30,
                description='Free starter plan with limited features',
                max_rooms=5,
                allow_logo_upload=False,
                access_to_analytics=False,
                priority_support=False,
                promotional_visibility=False,
            )

        # Calculate end date
        end_date = now() + timedelta(days=free_plan.duration_days)

        # Assign subscription
        HotelSubscription.objects.create(
            hotel=instance,
            plan=free_plan,
            start_date=now(),
            end_date=end_date,
            is_active=True,
        )
