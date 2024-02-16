from app.models import db
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
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



def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
   
    db.init_app(app) 
    
    migrate = Migrate(app,db)
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


    return app