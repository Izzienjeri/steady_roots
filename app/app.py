from models import db
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from mentor import mentor_bp
from user import user_bp



def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
   
    db.init_app(app) 
    
    migrate = Migrate(app,db)
    app.register_blueprint(user_bp)
    app.register_blueprint(mentor_bp)

    return app