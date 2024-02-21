
from flask import Blueprint
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from app.models import db,Profile

profile_bp=Blueprint('profile_blueprint',__name__)
api=Api(profile_bp)



profile_parser = reqparse.RequestParser()
profile_parser.add_argument('first_name', type=str, required=True, help='First name is required')
profile_parser.add_argument('last_name', type=str, required=True, help='Last name is required')
profile_parser.add_argument('photo_url', type=str, required=True, help='Photo URL is required')
profile_parser.add_argument('password', type=str, required=True, help='Password is required')
profile_parser.add_argument('user_id', type=str, required=True, help='User ID is required')


class ProfileListResource(Resource):
    def get(self):
        profiles = Profile.query.all()
        return [{'id': profile.profile_id, 'first_name': profile.first_name, 'last_name': profile.last_name, 'photo_url': profile.photo_url} for profile in profiles]

    def post(self):
        data = profile_parser.parse_args()
        new_profile = Profile(first_name=data['first_name'], last_name=data['last_name'], photo_url=data['photo_url'], password=data['password'], user_id=data['user_id'])
        db.session.add(new_profile)
        db.session.commit()
        return {'message': 'Profile created successfully'}, 201

class ProfileResource(Resource):
    def get(self, profile_id):
        profile = Profile.query.get(profile_id)
        if profile:
            return {'id': profile.profile_id, 'first_name': profile.first_name, 'last_name': profile.last_name, 'photo_url': profile.photo_url}
        else:
            return {'message': 'Profile not found'}, 404

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

    def delete(self, profile_id):
        profile = Profile.query.get(profile_id)
        if profile:
            db.session.delete(profile)
            db.session.commit()
            return {'message': 'Profile deleted successfully'}, 200
        else:
            return {'message': 'Profile not found'}, 404
        
    # Route to get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_data = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify({'users': users_data})

# Route to get profile information for a specific user
@app.route('/users/<int:user_id>/profile', methods=['GET'])
def get_profile_for_user(user_id):
    user = User.query.get_or_404(user_id)
    profile_data = {'id': user.profile.id, 'bio': user.profile.bio} if user.profile else None
    return jsonify({'profile': profile_data})




api.add_resource(ProfileListResource, '/profiles')
api.add_resource(ProfileResource, '/profiles/<string:profile_id>')