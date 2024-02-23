import base64
import requests
from datetime import datetime

def authorization(url):
    key ='0UkaAoELGowGrSfGfxWt9kKyOwCoB38CM7uxzNjsN8SU1QUq'
    secret ='gVzl1mPO9T6La04uCsfSlqsldpFfGkL8w4X2DaNUAMOdNMdNl9KPdtTIFVxm44mj'
    # combination of consumer secret and key
    plain_text = f'{key}:{secret}'
    # convert to bytes
    bytes_obj = bytes(plain_text,'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4str = bs4.decode()
    headers= {'Authorization':'Basic '+bs4str}

    res = requests.get(url,headers=headers)

    print(bs4str)
    print("MFVrYUFvRUxHb3dHclNmR2Z4V3Q5a0t5T3dDb0IzOENNN3V4ek5qc044U1UxUVVxOmdWemwxbVBPOVQ2TGEwNHVDc2ZTbHFzbGRwRmZHa0w4dzRYMkRhTlVBTU9kTk1kTmw5S1BkdFRJRlZ4bTQ0bWo")
    return res.json()['access_token'] 

def generate_timestamp():
    time = datetime.now().strftime('%Y%m%d%H%M%S')
    return time

def create_password(shortcode,passkey,timestamp):
    plain_text = shortcode+passkey+timestamp
    bytes_obj = bytes(plain_text, 'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4 = bs4.decode()
    return bs4

def make_payment(number):

    time = generate_timestamp()
    password = create_password("174379",'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', time)
    payload = {    
   "BusinessShortCode": 174379,
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjIzMDQzMjM3",
    "Timestamp": "20240223043237",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": 1,
    "PartyA": 254746724466,
    "PartyB": 174379,
    "PhoneNumber": 254746724466,
    "CallBackURL": "https://mydomain.com/path",
    "AccountReference": "CompanyXLTD",
    "TransactionDesc": "Payment of X" 
}
    token = authorization('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
    headers = {'Authorization': 'Bearer '+token}

    res = requests.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', headers=headers, json=payload)
    print(res.json())
    
make_payment('254746724466')