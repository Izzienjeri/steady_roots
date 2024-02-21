

from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,Email
from app.auth import jwt_required, get_jwt_identity


email_bp=Blueprint('email_blueprint',__name__)
api=Api(email_bp)

email_parser = reqparse.RequestParser()
email_parser.add_argument('subject', type=str, required=True, help='Email subject is required')
email_parser.add_argument('body', type=str, required=True, help='Email body is required')
email_parser.add_argument('sender_email', type=str, required=True, help='Sender email is required')




class EmailListResource(Resource):
    @jwt_required()
    def get(self):
        emails = Email.query.filter_by(user_id=get_jwt_identity() )
        return [{'id': email.email_id, 'subject': email.subject, 'body': email.body, 'sender_email': email.sender_email} for email in emails]

    def post(self):
        data = email_parser.parse_args()
        new_email = Email(subject=data['subject'], body=data['body'], sender_email=data['sender_email'])
        db.session.add(new_email)
        db.session.commit()
        return {'message': 'Email created successfully'}, 201

class EmailResource(Resource):
    @jwt_required()
    def get(self, email_id):
        email = Email.query.get(email_id)
        if email:
            return {'id': email.email_id, 'subject': email.subject, 'body': email.body, 'sender_email': email.sender_email}
        else:
            return {'message': 'Email not found'}, 404
    @jwt_required()
    def patch(self, email_id):
        data = email_parser.parse_args()
        email = Email.query.get(email_id)
        if email:
            email.subject = data['subject']
            email.body = data['body']
            email.sender_email = data['sender_email']
            db.session.commit()
            return {'message': 'Email updated successfully'}, 200
        else:
            return {'message': 'Email not found'}, 404
    
    @jwt_required()
    def delete(self, email_id):
        email = Email.query.get(email_id)
        if email:
            db.session.delete(email)
            db.session.commit()
            return {'message': 'Email deleted successfully'}, 200
        else:
            return {'message': 'Email not found'}, 404


api.add_resource(EmailListResource, '/emails')
api.add_resource(EmailResource, '/emails/<string:email_id>')
