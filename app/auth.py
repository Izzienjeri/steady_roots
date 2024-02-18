from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource, Api, reqparse
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt,
    JWTManager
)
from app.models import User, db, TokenBlocklist



auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(auth_bp)


signup_parser = reqparse.RequestParser()
signup_parser.add_argument('email', type=str, required=True, help='Email is required')
signup_parser.add_argument('password', type=str, required=True, help='Password is required')
signup_parser.add_argument('role', type=str, required=True, help='Role is required')

login_parser = reqparse.RequestParser()
login_parser.add_argument('email', type=str, required=True, help='Email is required')
login_parser.add_argument('password', type=str, required=True, help='Password is required')


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist).filter_by(jti=jti).first()
    return token is not None


class SignupResource(Resource):

    def post(self):
        args = signup_parser.parse_args()
        email = args['email']
        password = args['password']
        role = args['role']

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return make_response(jsonify({'message': 'Email already exists'}), 409)

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.user_id)
        return make_response(jsonify({'access_token': access_token}), 201)

    
class LoginResource(Resource):
    def post(self):
        args = login_parser.parse_args()
        email = args['email']
        password = args['password']

        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            return make_response(jsonify({'message': 'Invalid email or password'}), 401)

        access_token = create_access_token(identity=user.user_id)
        return make_response(jsonify({'access_token': access_token}))

    

class LogoutResource(Resource):
    @jwt_required
    def post(self):
        jti = get_jwt()['jti']
        db.session.add(TokenBlocklist(jti=jti))
        db.session.commit()
        return {'message': 'Successfully logged out'}

api.add_resource(SignupResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')
