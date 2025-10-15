from django.utils.timezone import now, timedelta
from .models import SubscriptionPlan, HotelSubscription
from functools import wraps
from django.http import HttpResponseForbidden
from rest_framework.response import Response
from rest_framework import status

def subscription_required(minimum_plan=None, feature=None, api_view=False):
    """
    Decorator to restrict access based on subscription plan or feature.

    Parameters:
    - minimum_plan: string, e.g. 'BASIC'
    - feature: string, e.g. 'allow_logo_upload'
    - api_view: bool, if True returns DRF Response instead of HttpResponseForbidden
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            # Get hotel
            hotel = getattr(request.user, 'hotel_profile', None)
            if not hotel:
                if api_view:
                    return Response({"detail": "You must be a hotel to access this."}, status=status.HTTP_403_FORBIDDEN)
                return HttpResponseForbidden("You must be a hotel to access this page.")

            # Check minimum plan
            if minimum_plan:
                allowed_plans = ['FREE', 'BASIC', 'ENTERPRISE']
                min_index = allowed_plans.index(minimum_plan.upper())
                current_plan = hotel.current_plan()
                if not current_plan or allowed_plans.index(current_plan.name.upper()) < min_index:
                    msg = f"This feature requires at least the {minimum_plan} plan."
                    if api_view:
                        return Response({"detail": msg}, status=status.HTTP_403_FORBIDDEN)
                    return HttpResponseForbidden(msg)

            # Check feature
            if feature and not hotel.has_feature(feature):
                msg = f"This feature requires {feature} to be enabled on your plan."
                if api_view:
                    return Response({"detail": msg}, status=status.HTTP_403_FORBIDDEN)
                return HttpResponseForbidden(msg)

            return view_func(request, *args, **kwargs)

        return _wrapped_view
    return decorator


def upgrade_hotel_plan(hotel, new_plan_name, duration_days=None):
    """
    Upgrades a hotel's subscription plan to a new plan.
    If duration_days is provided, it overrides the default plan duration.
    """
    plan = SubscriptionPlan.objects.get(name=new_plan_name.upper())
    start = now()
    end = start + timedelta(days=duration_days or plan.duration_days)
    return HotelSubscription.objects.create(
        hotel=hotel,
        plan=plan,
        start_date=start,
        end_date=end,
        is_active=True
    )
