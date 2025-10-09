
## API RESTPOINT FOR REGISTER
http://localhost:8000/api/auth/register/
Paste the restpoint on postman or other API testers or use it directly on the React App to create new users. 
## JSON FORMAT
{
    "email": "DoctorSTRange@gmail.com",
    "phone_number": "+6766787667890",
    "is_hotel": "True",
    "hotel_data": {
        "hotel_name": "Dark Dimension Hotel",
        "phone_number": "+678334552377",
        "address": "New York Sanctum",
        "country": "United States",
        "state_region": "New York",
        "city": "Manhattan",
        "registration_num": "REG7783345",
        "owner_name": "Doctor Stephen Strange",
        "manager_number": "+6778383637382u",
        "rooms": true,
        "bar": false,
        "halls": true,
        "wifi": true,
        "gym": false,
        "pool": true
    }
}

## API RESTPOINT FOR PASSWORD RESET
http://localhost:8000/api/auth/password-reset-confirm/MTQ/cs2824-ae93c8cc7ee1ca42e318badb56e097a0/
This is the link the user will get in their email in order to reset their password.  The user needs this to change their password after the email message.
 ==> REMEMBER THAT THE LOCALHOST IS LISTENING ON 3000- REACT FRONTEND SERVER.

## API RESTPOINT FOR PASSWORD CREATION
http://localhost:8000/api/auth/set-new-password/

## JSON FORMAT - BODY
{
  "uid": "MTU",
  "token": "cxfjfj-90cf4ead71d1d4401bc20855ccf11d72",
  "password": "BaronMordoArtifact",
  "password2": "BaronMordoArtifact"
}

## HEADER
KEY: Content-type
VALUE: application/json
DESCRIPTION: Header for hotel management App

