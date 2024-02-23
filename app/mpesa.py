import base64
import datetime
import requests




def authorization():
    key = '0UkaAoELGowGrSfGfxWt9kKyOwCoB38CM7uxzNjsN8SU1QUq'
    secret = 'gVzl1mPO9T6La04uCsfSlqsldpFfGkL8w4X2DaNUAMOdNMdNl9KPdtTIFVxm44mj'
    plain_text = f'{key} : {secret}'
    bytes_obj = bytes(plain_text, 'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4str = bs4.decode().replace ('=', '')
    print ('MFVrYUFvRUxHb3dHclNmR2Z4V3Q5a0t5T3dDb0IzOENNN3V4ek5qc044U1UxUVVxOmdWemwxbVBPOVQ2TGEwNHVDc2ZTbHFzbGRwRmZHa0w4dzRYMkRhTlVBTU9kTk1kTmw5S1BkdFRJRlZ4bTQ0bWo')

    print (bs4str)

    headers = {'Authorization':f"Basic + bs4str" } 

    res = requests.get(url,headers = headers)
    return res.json()['access_token']


    print (plain_text)


authorization()    

def generate_timestamp():
    time = datetime.now().strftime('%Y%%m%d%H%M%S')
    print (time)
    return time

generate_timestamp()

def create_password(shortcode, passkey , timestamp):
    plain_text = shortcode + passkey + timestamp
    bytes_obj = bytes(plain_text,'utf-8')
    bs4 =  base64.b6f4encode(bytes_obj)
    bs4 =  bs4.decode()
    print('')



def make_payment(number):
    time = generate_timestamp
    password = create_password("174379")
    payload = {
 
   "BusinessShortCode": "174379",    
   "Password": "password",    
   "Timestamp":"time",    
   "TransactionType": "CustomerPayBillOnline",    
   "Amount": "1",    
   "PartyA":"number",    
   "PartyB":"174379",    
   "PhoneNumber":"number",    
   "CallBackURL": "https://mydomain.com/pat",    
   "AccountReference":"Test",    
   "TransactionDesc":"Test"


    }

    token = authorization('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
    headers = {'Authorization': 'Bearer' + token,
               "Content-Type": "application/json"}