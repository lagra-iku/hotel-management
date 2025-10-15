## ADMIN INTERFACE
ADMIN ACCESS
email: adminsgraceandbright@gmail.com
password: adminsgraceandbright@@7

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

 Link in email message should look like this http://localhost:5173/reset-password/MTQ/cxq96e-c3a5724a72bbd4e4a491049fc60dd118

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



## DELETE HOTEL
API = http://localhost:8000/api/auth/hotel/delete/
# HEADER: 
Authorization: Bearer <your_access_token>
Content-Type: application/json


## JWT LOGIN
API = POST http://localhost:8000/api/auth/login/
Body (JSON):
{
    "email": "DoctorSTRange@gmail.com",
    "password": "userpassword123"
}

## EDIT HOTEL - USER
API = http://localhost:8000/api/auth/hotel/update/
body (JSON)
{
  any part of the hotel reg form or the user details you want to edit
}

HEADER: 
Content-type - application/json
Authorization - Bearer <session token>


## RESET PASSWORD FOR UNATHENTICATED USER
API = http://localhost:8000/api/auth/request-password-reset-unauthenticated-user/
body (JSON) 
{
  "email": "useremail@gmail.com"
}
HEADER:
ontent-type - application/json

Link in email message should look like this http://localhost:5173/reset-password/MTQ/cxq96e-c3a5724a72bbd4e4a491049fc60dd118/?type=reset

## RESET PASSWORD FOR AUTHENITICATED USER
API: http://localhost:8000/api/auth/request-password-change-authenticated-user/
body (JSON)
{
  "email": "USEREMAIL@gmail.com",
  "old_password":
    "USerOldPassword",
}
HEADER: 
Content-type - application/json
Authorization - Bearer <session token>


## Example to ENFORCE SUBSCRIPTION IN TEMPLATE
{% if request.user.hotel_profile.has_feature('allow_logo_upload') %}
    <button>Upload Logo</button>
{% else %}
    <p>Upgrade your plan to upload logo</p>
{% endif %}


## LOGO AUTHENTICATION FOR SUBSCRIPTION REACT

const uploadLogo = async (file) => {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await fetch("http://localhost:8000/api/upload-logo/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${yourTokenHere}`,
    },
    body: formData,
  });

  const data = await res.json();
  console.log(data);
};
### PLANS FOR SUBSEQUENT VERSIONS
Incoporate AI to help handle analytics
