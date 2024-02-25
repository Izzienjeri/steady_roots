from flask import Blueprint, request
from flask_restful import Api, Resource, reqparse
import base64
import requests
from datetime import datetime

payment_bp = Blueprint('payment_bp', __name__)
api = Api(payment_bp)

def authorization():
    key = '0UkaAoELGowGrSfGfxWt9kKyOwCoB38CM7uxzNjsN8SU1QUq'
    secret = 'gVzl1mPO9T6La04uCsfSlqsldpFfGkL8w4X2DaNUAMOdNMdNl9KPdtTIFVxm44mj'
    
    credentials = f'{key}:{secret}'
    encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')

    token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    headers = {'Authorization': f'Basic {encoded_credentials}'}
    response = requests.get(token_url, headers=headers)
    access_token = response.json().get('access_token')

    return access_token

def generate_timestamp():
    return datetime.now().strftime('%Y%m%d%H%M%S')

def create_password(shortcode, passkey, timestamp):
    data = f'{shortcode}{passkey}{timestamp}'
    encoded_data = base64.b64encode(data.encode()).decode('utf-8')
    return encoded_data

class Payment(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('customer_phone', type=str, required=True, help='Customer phone number is required')
        args = parser.parse_args()
        customer_phone = args['customer_phone']
        
        timestamp = generate_timestamp()
        password = create_password("174379", 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', timestamp)
        
        payload = {
            "BusinessShortCode": "174379",
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": "1", 
            "PartyA": customer_phone,  
            "PartyB": "174379", 
            "PhoneNumber": customer_phone,  
            "CallBackURL": "https://mydomain.com/path",  
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        }

        access_token = authorization()
        headers = {'Authorization': 'Bearer ' + access_token}

        stk_push_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        response = requests.post(stk_push_url, headers=headers, json=payload)
        
        return response.json()

api.add_resource(Payment, '/make_payment')
