
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,Profile
from app.auth import jwt_required, get_jwt_identity

mentorship_bp=Blueprint('mentorship_blueprint',__name__)
api=Api(mentorship_bp)

mentorship_requests = []

class MentorshipResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='Name is required')
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('areaOfInterest', type=str, required=True, help='Area of interest is required')
        parser.add_argument('type', type=str, required=True, help='Type is required')
        args = parser.parse_args()

        mentorship_requests.append(args)  
        return {'message': 'Mentorship request submitted successfully'}, 201

# Create API routes
api.add_resource(MentorshipResource, '/mentorship')
