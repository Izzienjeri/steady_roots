from models import db
from flask import Flask
from flask_cors import CORS,cross_origin
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from auth import auth_bp,bcrypt,jwt
from mentor import mentor_bp
from user import user_bp
from profile import profile_bp
from post import post_bp
from mentee import mentee_bp
from membership import membership_bp
from mailinglist import MailingList_bp
from mail import email_bp
from experience import experience_bp
from event import event_bp
from course import course_bp
from skill import skill_bp
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