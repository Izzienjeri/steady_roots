from flask import Blueprint, current_app
from flask_restful import Api, Resource, reqparse
from flask_mail import Message
from app.models import db,Email
from app.auth import jwt_required
from app.extensions import mail

mail_bp=Blueprint('mail_blueprint',__name__)
api=Api(mail_bp)

mail_parser = reqparse.RequestParser()
mail_parser.add_argument('recipient_email', type=str, required=True, help='Recipient email is required')
mail_parser.add_argument('subject', type=str, required=True, help='Subject is required')
mail_parser.add_argument('body', type=str, required=True, help='Body is required')


class SendEmailResource(Resource):
    def post(self):
        data = mail_parser.parse_args()
        recipient_email = data['recipient_email']
        subject = data['subject']
        body = data['body']
        sender_email = current_app.config['MAIL_USERNAME']

        try:
            new_email = Email(subject=subject, body=body, sender_email=sender_email)
            
            db.session.add(new_email)
            db.session.commit()

            msg = Message(subject=subject, sender=sender_email, recipients=[recipient_email])
            msg.body = body
            mail.send(msg)

            return {'message': 'Email sent successfully'}, 200
        except Exception as e:
            return {'message': 'Failed to send email', 'error': str(e)}, 500

api.add_resource(SendEmailResource, '/send-email')

