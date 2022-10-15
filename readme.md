# FauxSpot - TurfBooking - With eCommerce

Require Env File

```bash
Create .env 

CLOUDINARY_API_KEY = "Your Cloudinary Api Key" 
CLOUDINARY_API_SECRET = "Your Cloudinary Api Secret " 
CLOUD_NAME = "Your Cloudinary Cloud Name " 

Link Cloudinary : https://cloudinary.com/

PORT = 3000
MONGO_URI = "Your Database URL "
JWT_SECRET = "mushthak"
NODEMAILER_PASS = "Your Email id "
NODEMAILER_USER = "Your Email Password " 

TWILIO_ACCOUNT_SID = "Your Twilio Sid"
TWILIO_AUTH_TOKEN = "Your Twilio Token"
TWILIO_SERVIECE_ID = "Your Twilio Service ID"

Link Twilio : https://www.twilio.com
```

## Installation

Use the package 

```bash
npm install
```
Download MongoDB Community Edition version(5.0) OR Atlas

Server run

```bash
npm start
```

## Account (Login/SignUp) Response through Email
Email account Create 
```python
Link: http://localhost:3000/account/signup-email

Post Method

{
    "user_mail" : "fouvty@mail.com",
    "user_password" : "12345"
}

response

{
    "status": true,
    "id": "6326e7d3b100a562a578b33d"
}
```
Email account Verify 
```python
Link: http://localhost:3000/account/verify-email-otp

Post Method

{
    "user_otp" : "7843",
    "_id": "6326e7d3b100a562a578b33d"
}

Response

{
    "status": true,
    "message": "login success"
}
```
Email Account Login 
```python
Link: http://localhost:3000/account/login-email

Post Method

{
    "user_mail" : "mail.musthak@gmail.com",
    "user_password" : "12345"
}

Response

{
    "status": true,
    "message": "Loged in succsess",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjZlN"
}
```

## Account (Login/SignUp) Response through Phone Number

Phone number OTP sent 

support only India
```python
Link: http://localhost:3000/account/loginwith-number

Post Method

{
    "user_number" : 1234567890
}

Response

{
    "status": true,
    "_id": "6326eb838f2fb4913564bf75"
}
```
Verify OTP
```python
Link: http://localhost:3000/account/verify-number-otp

Post Method

{
    "user_otp" : "208623",
    "user_number" : 1234567890,
    "_id":"6326eb838f2fb4913564bf75"
}

Response

{
    "status": true,
    "jwt": "eyJhbGcfhjkh.kjhioudyhuy.dshuihddja6PCXcwdjh5A1Rc"
}
```

## Fetch Nearest Data

Required Header Authorization Bearer Token

```python
Link: http://localhost:3000/user/nearest-turf/"DistrictName"

Get Method

Response

{
  "data": [
    {
      "turf_catogery": {
        "turf_cricket": false,
        "turf_football": true,
        "turf_badminton": false,
        "turf_yoga": false
      },
      "turf_type": {
        "turf_sevens": true,
        "turf_sixes": true
      },
      "turf_info": {
        "turf_isAvailale": true,
        "turf_rating": 3.2,
        "turf_map": "https://goo.gl/maps/hNeKFEpkHocAJyzdA"
      },
      "turf_amenities": {
        "turf_washroom": false,
        "turf_water": true,
        "turf_dressing": true,
        "turf_parking": true,
        "turf_gallery": false,
        "turf_cafeteria": true
      },
      "turf_images": {
        "turf_images1": "https://res.cloudinary.com/fouvtycloud/image/upload/v1665287855/FauxSpotServer/1musthak8.jpg",
        "turf_images2": "https://res.cloudinary.com/fouvtycloud/image/upload/v1665287864/FauxSpotServer/7musthak2.jpg",
        "turf_images3": "https://res.cloudinary.com/fouvtycloud/image/upload/v1665287868/FauxSpotServer/6musthak5.jpg"
      },
      "turf_time": {
        "time_morning": "1000",
        "time_afternoon": "1200",
        "time_evening": "1600"
      },
      "_id": "6342471956b46c8435fc95fb",
      "turf_creator_id": "63355665136e1b3ecb0db5d6",
      "turf_name": "Crashing Amigos",
      "turf_place": "Kottapuram",
      "turf_muncipality": "Tirurangadi",
      "turf_district": "Malappuram"
    }
  ]
}

```

## Contributing
Pull requests are welcome. For significant changes, please open an issue to discuss what you would like to change.

Please make sure to update tests as appropriate.

<a href="https://www.buymeacoffee.com/mushthak" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
