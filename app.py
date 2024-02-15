from models import db, Mentor, Mentee
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
migrate = Migrate(app,db)
db.init_app(app)
api = Api(app)

class Mentor(Resource):
    def get(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            return {'id': mentor.id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id}
        else:
            return {'message': 'Mentor not found'}, 404