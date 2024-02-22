
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db,User
from app.admin import admin_required

user_bp=Blueprint('user_blueprint',__name__)
api=Api(user_bp)


user_parser = reqparse.RequestParser()
user_parser.add_argument('email', type=str, required=True, help='Email is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')
user_parser.add_argument('role', type=str, required=True, help='Role is required')
user_parser.add_argument('email_subscription', type=bool, default=False)


class UserListResource(Resource):

    @admin_required()
    def get(self):
        users = User.query.all()
        return [{'id': user.user_id, 'email': user.email, 'role': user.role, 'email_subscription': user.email_subscription} for user in users]

    def post(self):
        data = user_parser.parse_args()
        new_user = User(email=data['email'], password=data['password'], role=data['role'], email_subscription=data['email_subscription'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return {'id': user.user_id, 'email': user.email, 'role': user.role, 'email_subscription': user.email_subscription}
        else:
            return {'message': 'User not found'}, 404

    def patch(self, user_id):
        data = user_parser.parse_args()
        user = User.query.get(user_id)
        if user:
            user.email = data['email']
            user.password = data['password']
            user.role = data['role']
            user.email_subscription = data['email_subscription']
            db.session.commit()
            return {'message': 'User updated successfully'}, 200
        else:
            return {'message': 'User not found'}, 404

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}, 200
        else:
            return {'message': 'User not found'}, 404
        
api.add_resource(UserListResource, '/users')
api.add_resource(UserResource, '/users/<string:user_id>')        