from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Hotel
from django.utils.translation import gettext_lazy as _

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ("hotel_name", "hotel_email", "owner_name", "city", "country")
    
    readonly_fields = ("hotel_email", "user_phone_number")

    fieldsets = (
        (None, {
            "fields": (
                "hotel_name",
                "hotel_email",       # from related user
                "user_phone_number", # from related user
                "owner_name",
                "phone_number",
                "address",
                "city",
                "country",
                "state_region",
                "registration_num",
                "manager_number",
                "rooms", "bar", "halls", "wifi", "gym", "pool", "others",
                "logo",
            )
        }),
    )

    def hotel_email(self, obj):
        return obj.user.email
    hotel_email.short_description = "Hotel Email"

    def user_phone_number(self, obj):
        return obj.user.phone_number
    user_phone_number.short_description = "User Phone"
    
@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):    
    model = CustomUser
    list_display = ("email", "is_hotel", "is_staff", "is_superuser")
    list_filter = ("is_hotel", "is_staff", "is_superuser", "is_active")
    search_fields = ("email",)
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("phone_number",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_hotel",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {   
                "fields": ("email", "password", "is_hotel", "is_active", "is_staff", "is_superuser")
            },
        ),
    )

admin.site.site_header = "Hotel Management Software Admin"
admin.site.site_title = "Hotel Management Software Admin Portal"
admin.site.index_title = "Welcome to Hotel Management Software Administration Panel"

