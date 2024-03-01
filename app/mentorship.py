from flask import Blueprint, g
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, MentorshipRequest, MentorshipOffer

mentorship_bp = Blueprint('mentorship_blueprint', __name__)
api = Api(mentorship_bp)

class MentorshipRequestResource(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('skills_required', type=str, required=True, help='Skills required is required')
        args = parser.parse_args()

        user_id = get_jwt_identity()

        new_request = MentorshipRequest(user_id=user_id, skills_required=args['skills_required'])
        db.session.add(new_request)
        db.session.commit()

        return {'message': 'Mentorship request created successfully'}, 201

class MentorshipOfferResource(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('bio', type=str, required=True, help='Bio is required')
        args = parser.parse_args()

        user_id = get_jwt_identity()

        new_offer = MentorshipOffer(user_id=user_id, bio=args['bio'])
        db.session.add(new_offer)
        db.session.commit()

        return {'message': 'Mentorship offer created successfully'}, 201

api.add_resource(MentorshipRequestResource, '/request')
api.add_resource(MentorshipOfferResource, '/offer')
