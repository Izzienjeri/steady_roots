from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from app.extensions import mail
from app.models import db, Membership
from app.auth import auth_bp, jwt_required
from app.mentor import mentor_bp
from app.user import user_bp
from app.profile import profile_bp
from app.post import post_bp
from app.mentee import mentee_bp
from app.mail import mail_bp
from app.experience import experience_bp
from app.event import event_bp
from app.course import course_bp
from app.skill import skill_bp
from app.membership import membership_bp
from datetime import timedelta
import os
import secrets

def create_app():
    app = Flask(__name__)
    jwt = JWTManager(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    
    flask_secret_key = secrets.token_urlsafe(16)
    jwt_secret_key = secrets.token_urlsafe(32)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = flask_secret_key
    app.config['JWT_SECRET_KEY'] = jwt_secret_key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)
<<<<<<< HEAD
=======
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)


>>>>>>> dcfdf4a35a5b2e69aa1c2aece313a37d6ba9da93
    
    # Mail Configuration
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'letsgetcrazy4life@gmail.com'
    app.config['MAIL_PASSWORD'] = 'izxl rxob zjww fljs'
    
    db.init_app(app)
    jwt.init_app(app)
    migrate = Migrate(app, db)
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(mentor_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(post_bp)
    app.register_blueprint(mentee_bp)
    app.register_blueprint(membership_bp)
    app.register_blueprint(mail_bp)
    app.register_blueprint(experience_bp)
    app.register_blueprint(event_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(skill_bp)

    return app
