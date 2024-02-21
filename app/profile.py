
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,Profile
from app.auth import jwt_required, get_jwt_identity

profile_bp=Blueprint('profile_blueprint',__name__)
api=Api(profile_bp)



profile_parser = reqparse.RequestParser()
profile_parser.add_argument('first_name', type=str, required=True, help='First name is required')
profile_parser.add_argument('last_name', type=str, required=True, help='Last name is required')
profile_parser.add_argument('photo_url', type=str, required=True, help='Photo URL is required')
profile_parser.add_argument('password', type=str, required=True, help='Password is required')
profile_parser.add_argument('user_id', type=str, required=True, help='User ID is required')


class ProfileListResource(Resource):
    @jwt_required()
    def get(self):
        profiles = Profile.query.filter_by(user_id=get_jwt_identity() )
        return [{'id': profile.profile_id, 'first_name': profile.first_name, 'last_name': profile.last_name, 'photo_url': profile.photo_url} for profile in profiles]
    
    @jwt_required()
    def post(self):
        data = profile_parser.parse_args()
        new_profile = Profile(first_name=data['first_name'], last_name=data['last_name'], photo_url=data['photo_url'], password=data['password'], user_id=data['user_id'])
        db.session.add(new_profile)
        db.session.commit()
        return {'message': 'Profile created successfully'}, 201

class ProfileResource(Resource):
    @jwt_required()
    def get(self, profile_id):
        profile = Profile.query.get(profile_id)
        if profile:
            return {'id': profile.profile_id, 'first_name': profile.first_name, 'last_name': profile.last_name, 'photo_url': profile.photo_url}
        else:
            return {'message': 'Profile not found'}, 404
        
    @jwt_required()
    def patch(self, profile_id):
        data = profile_parser.parse_args()
        profile = Profile.query.get(profile_id)
        if profile:
            profile.first_name = data['first_name']
            profile.last_name = data['last_name']
            profile.photo_url = data['photo_url']
            profile.password = data['password']
            profile.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Profile updated successfully'}, 200
        else:
            return {'message': 'Profile not found'}, 404
        
    @jwt_required()
    def delete(self, profile_id):
        profile = Profile.query.get(profile_id)
        if profile:
            db.session.delete(profile)
            db.session.commit()
            return {'message': 'Profile deleted successfully'}, 200
        else:
            return {'message': 'Profile not found'}, 404



api.add_resource(ProfileListResource, '/profiles')
api.add_resource(ProfileResource, '/profiles/<string:profile_id>')