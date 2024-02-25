from flask import Blueprint, request
from flask_restful import Api, Resource, reqparse
from app.models import db, Membership
from app.auth import jwt_required, get_jwt_identity
from datetime import datetime
import base64
import requests

membership_bp = Blueprint('membership_blueprint', __name__)
api = Api(membership_bp)


class MembershipResource(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('amount', type=float, required=True, help='Membership amount is required')
        parser.add_argument('membership', type=bool, required=True, help='Membership status is required')
        parser.add_argument('expires', type=str, required=True, help='Expiration date is required')
        parser.add_argument('phone_number', type=str, required=True, help='Phone number is required for M-Pesa')
        args = parser.parse_args()

        new_membership = Membership(
            amount=args['amount'],
            membership=args['membership'],
            expires=datetime.strptime(args['expires'], '%Y-%m-%d'),  # Assuming expires is in YYYY-MM-DD format
            user_id=get_jwt_identity(),  # Assuming user ID is retrieved from JWT token
        )
        db.session.add(new_membership)
        db.session.commit()

        payment_payload = {
            "customer_phone": args['phone_number']
        }

        response = Payment().post(payment_payload)

        return {'message': 'Membership application successful', 'payment_response': response}, 201


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
    @jwt_required()
    def post(self, payload):
        customer_phone = payload.get('customer_phone')
        
        timestamp = generate_timestamp()
        password = create_password("174379", 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', timestamp)
        
        payment_payload = {
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
        response = requests.post(stk_push_url, headers=headers, json=payment_payload)

        response_data = {
            'message': 'Payment request processed',
            'status_code': response.status_code,
            'content': response.content.decode()
        }

        return response_data

membership_parser = reqparse.RequestParser()
membership_parser.add_argument('amount', type=float, required=True, help='Membership amount is required')
membership_parser.add_argument('membership', type=bool, required=True, help='Membership status is required')
membership_parser.add_argument('expires', type=str, required=True, help='Expiration date is required')
membership_parser.add_argument('user_id', type=str, required=True, help='User ID is required')

api.add_resource(MembershipResource, '/membership')
api.add_resource(Payment, '/make_payment', endpoint='payment')

