import base64
import requests
from datetime import datetime, timedelta
from flask import Blueprint, request
from flask_restful import Resource, Api, reqparse
from app.models import db, Membership
from uuid import uuid4

membership_bp = Blueprint('membership', __name__)
api = Api(membership_bp)

def authorization(url):
    key = '0UkaAoELGowGrSfGfxWt9kKyOwCoB38CM7uxzNjsN8SU1QUq'
    secret = 'gVzl1mPO9T6La04uCsfSlqsldpFfGkL8w4X2DaNUAMOdNMdNl9KPdtTIFVxm44mj'
    plain_text = f'{key}:{secret}'
    bytes_obj = bytes(plain_text, 'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4str = bs4.decode()
    headers= {'Authorization':'Basic '+bs4str}

    res = requests.get(url, headers=headers)
    print("Response status code:", res.status_code)
    print("Response body:", res.text)

    if res.status_code == 200:
        try:
            return res.json()['access_token']
        except KeyError:
            print("Access token not found in the response.")
            return None
    else:
        print("Error occurred during authorization.")
        return None




def generate_unique_membership_id():
    return str(uuid4())

def calculate_expiration_date():
    return datetime.utcnow() + timedelta(days=365)

def generate_timestamp():
    time = datetime.now().strftime('%Y%m%d%H%M%S')
    return time

def create_password(shortcode,passkey,timestamp):
    plain_text = shortcode+passkey+timestamp
    bytes_obj = bytes(plain_text, 'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4 = bs4.decode()
    return bs4

def make_payment(mpesa_number, amount):
    time = generate_timestamp()
    password = create_password("174379",'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', time)

    payload = {
        "BusinessShortCode": "174379",
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwMjIzMDQzMjM3",
        "Timestamp": "20240223043237",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": mpesa_number,
        "PartyB": "174379",
        "PhoneNumber": mpesa_number,
        "CallBackURL": "https://mydomain.com/path",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X"
    }

    token = authorization('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
    headers = {'Authorization': 'Bearer '+token}

    res = requests.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', headers=headers, json=payload)
    print(res.json()) 

class MembershipResource(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('amount', type=float, required=True, help='Amount is required')
        self.parser.add_argument('mpesa_number', type=str, required=True, help='Mpesa number is required')
        self.parser.add_argument('user_id', type=str, required=True, help='User ID is required')

    def post(self):
        args = self.parser.parse_args()

        amount = args['amount']
        mpesa_number = args['mpesa_number']
        user_id = args['user_id']

        membership_id = generate_unique_membership_id()
        expiration_date = calculate_expiration_date()

        new_membership = Membership(
            membership_id=membership_id,
            amount=amount,
            date_paid=datetime.utcnow(),
            membership=True,
            expires=expiration_date,
            user_id=user_id,
            mpesa_number=mpesa_number
        )

        db.session.add(new_membership)
        db.session.commit()

        make_payment(mpesa_number, amount)

        return {'message': 'Membership applied and paid successfully'}, 201

api.add_resource(MembershipResource, '/apply_membership')
