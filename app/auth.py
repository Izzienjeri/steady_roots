from flask_restful import reqparse,Resource, Api
from flask import jsonify, request, Blueprint, make_response
from flask_jwt_extended import create_access_token, jwt_required, unset_jwt_cookies, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User, db




auth_bp = Blueprint('auth', __name__)
api = Api(auth_bp)
jwt = JWTManager()

signup_parser = reqparse.RequestParser()
signup_parser.add_argument('email', type=str, required=True, help='Email is required')
signup_parser.add_argument('password', type=str, required=True, help='Password is required')
signup_parser.add_argument('role', type=str, required=True, help='Role is required')

login_parser = reqparse.RequestParser()
login_parser.add_argument('email', type=str, required=True, help='Email is required')
login_parser.add_argument('password', type=str, required=True, help='Password is required')

class SignupResource(Resource):
    def post(self):
        data = signup_parser.parse_args()
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not email or not password or not role:
            return jsonify({"msg": "Email, password, and role are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"msg": "User already exists"}), 400

        hashed_password = generate_password_hash(password)

        new_user = User(email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({"msg": "User created successfully"}), 201)

class LoginResource(Resource):
    def post(self):
        data = login_parser.parse_args()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"msg": "Bad email or password"}), 401

        access_token = create_access_token(identity=user.user_id)
        return make_response(jsonify(access_token=access_token), 200)



class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        response = make_response(jsonify({"msg": "Logout successful"}))
        unset_jwt_cookies(response)
        return response, 200


api.add_resource(SignupResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')
