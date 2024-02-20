from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from app.models import db
from app.auth import auth_bp, bcrypt
from app.mentor import mentor_bp
from app.user import user_bp
from app.profile import profile_bp
from app.post import post_bp
from app.mentee import mentee_bp
from app.membership import membership_bp
from app.mailinglist import MailingList_bp
from app.mail import email_bp
from app.experience import experience_bp
from app.event import event_bp
from app.course import course_bp
from app.skill import skill_bp
from datetime import timedelta
import secrets
import os


def create_app():
    app = Flask(__name__)
    jwt = JWTManager(app)
    CORS(app)

    flask_secret_key = secrets.token_urlsafe(16)
    jwt_secret_key = secrets.token_urlsafe(32)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = flask_secret_key
    app.config['JWT_SECRET_KEY'] = jwt_secret_key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)



 
    db.init_app(app)

    jwt.init_app(app)

    bcrypt.init_app(app)

    migrate = Migrate(app, db)

 
   

    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(mentor_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(post_bp)
    app.register_blueprint(mentee_bp)
    app.register_blueprint(membership_bp)
    app.register_blueprint(MailingList_bp)
    app.register_blueprint(email_bp)
    app.register_blueprint(experience_bp)
    app.register_blueprint(event_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(skill_bp)

    return app