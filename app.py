from models import db, Mentor, Mentee
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
migrate = Migrate(app,db)
db.init_app(app)
api = Api(app)

class MentorList(Resource):
    def get(self):
        mentors = Mentor.query.all()
        return [{'id': mentor.id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id} for mentor in mentors]

    def post(self):
        data = mentor_parser.parse_args()
        new_mentor = Mentor(description=data['description'], skill_id=data['skill_id'], user_id=data['user_id'])
        db.session.add(new_mentor)
        db.session.commit()
        return {'message': 'Mentor created successfully'}, 201


class Mentor(Resource):
    def get(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            return {'id': mentor.id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id}
        else:
            return {'message': 'Mentor not found'}, 404
        
    def patch(self, mentor_id):
        data = mentor_parser.parse_args()
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            mentor.description = data['description']
            mentor.skill_id = data['skill_id']
            mentor.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Mentor updated successfully'}, 200
        else:
            return {'message': 'Mentor not found'}, 404

    def delete(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            db.session.delete(mentor)
            db.session.commit()
            return {'message': 'Mentor deleted successfully'}, 200
        else:
            return {'message': 'Mentor not found'}, 404