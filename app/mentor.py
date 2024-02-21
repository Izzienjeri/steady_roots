from flask import Blueprint
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from app.models import db,Mentor

mentor_bp=Blueprint('mentor_blueprint',__name__)
api=Api(mentor_bp)


mentor_parser = reqparse.RequestParser()
mentor_parser.add_argument('description', type=str, required=True, help='Mentor description is required')
mentor_parser.add_argument('skill_id', type=str, required=True, help='Skill ID is required')
mentor_parser.add_argument('user_id', type=str, required=True, help='User ID is required')


class MentorListResource(Resource):
    def get(self):
        mentors = Mentor.query.all()
        return [{'id': mentor.mentor_id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id} for mentor in mentors]

    def post(self):
        data = mentor_parser.parse_args()
        new_mentor = Mentor(description=data['description'], skill_id=data['skill_id'], user_id=data['user_id'])
        db.session.add(new_mentor)
        db.session.commit()
        return {'message': 'Mentor created successfully'}, 201

class MentorResource(Resource):
    def get(self, mentor_id):
        mentor = Mentor.query.get(mentor_id)
        if mentor:
            return {'id': mentor.mentor_id, 'description': mentor.description, 'skill_id': mentor.skill_id, 'user_id': mentor.user_id}
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

  
api.add_resource(MentorListResource, '/mentors')
api.add_resource(MentorResource, '/mentors/<string:mentor_id>')
