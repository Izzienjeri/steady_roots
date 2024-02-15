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
        

class MenteeList(Resource):
    def get(self):
        mentees = Mentee.query.all()
        return [{'id': mentee.id, 'start': mentee.start, 'end': mentee.end, 'user_id': mentee.user_id, 'mentor_id': mentee.mentor_id} for mentee in mentees]

    def post(self):
        data = mentee_parser.parse_args()
        new_mentee = Mentee(start=data['start'], end=data['end'], user_id=data['user_id'], mentor_id=data['mentor_id'])
        db.session.add(new_mentee)
        db.session.commit()
        return {'message': 'Mentee created successfully'}, 201

class Mentee(Resource):
    def get(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            return {'id': mentee.id, 'start': mentee.start, 'end': mentee.end, 'user_id': mentee.user_id, 'mentor_id': mentee.mentor_id}
        else:
            return {'message': 'Mentee not found'}, 404

    def patch(self, mentee_id):
        data = mentee_parser.parse_args()
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            mentee.start = data['start']
            mentee.end = data['end']
            mentee.user_id = data['user_id']
            mentee.mentor_id = data['mentor_id']
            db.session.commit()
            return {'message': 'Mentee updated successfully'}, 200
        else:
            return {'message': 'Mentee not found'}, 404

    def delete(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            db.session.delete(mentee)
            db.session.commit()
            return {'message': 'Mentee deleted successfully'}, 200
        else:
            return {'message': 'Mentee not found'}, 404
        




api.add_resource(MentorList, '/mentors')
api.add_resource(Mentor, '/mentors/<string:mentor_id>')
api.add_resource(MenteeList, '/mentees')
api.add_resource(Mentee, '/mentees/<string:mentee_id>')