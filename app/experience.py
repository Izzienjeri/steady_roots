from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db, Experience
from app.auth import jwt_required

experience_bp=Blueprint('experience_blueprint',__name__)
api=Api(experience_bp)

experience_parser = reqparse.RequestParser()
experience_parser.add_argument('organisation', type=str, required=True, help='Organisation is required')
experience_parser.add_argument('job_title', type=str, required=True, help='Job title is required')
experience_parser.add_argument('description', type=str, required=True, help='Description is required')
experience_parser.add_argument('start', type=str, required=True, help='Start date is required')
experience_parser.add_argument('end', type=str, required=True, help='End date is required')
experience_parser.add_argument('user_id', type=str, required=True, help='User ID is required')



import time

class ExperienceListResource(Resource):
    @jwt_required
    def get(self):
        experiences = Experience.query.all()
        return [{'id': experience.experience_id, 'organisation': experience.organisation, 'job_title': experience.job_title, 'description': experience.description, 'start': int(time.mktime(experience.start.timetuple())), 'end': int(time.mktime(experience.end.timetuple()))} for experience in experiences]
    
    @jwt_required
    def post(self):
        data = experience_parser.parse_args()
        new_experience = Experience(organisation=data['organisation'], job_title=data['job_title'], description=data['description'], start=data['start'], end=data['end'], user_id=data['user_id'])
        db.session.add(new_experience)
        db.session.commit()
        return {'message': 'Experience created successfully'}, 201

class ExperienceResource(Resource):
    @jwt_required
    def get(self, experience_id):
        experience = Experience.query.get(experience_id)
        if experience:
            return {'id': experience.experience_id, 'organisation': experience.organisation, 'job_title': experience.job_title, 'description': experience.description, 'start': experience.start, 'end': experience.end}
        else:
            return {'message': 'Experience not found'}, 404
    
    @jwt_required
    def patch(self, experience_id):
        data = experience_parser.parse_args()
        experience = Experience.query.get(experience_id)
        if experience:
            experience.organisation = data['organisation']
            experience.job_title = data['job_title']
            experience.description = data['description']
            experience.start = data['start']
            experience.end = data['end']
            experience.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Experience updated successfully'}, 200
        else:
            return {'message': 'Experience not found'}, 404
    @jwt_required
    def delete(self, experience_id):
        experience = Experience.query.get(experience_id)
        if experience:
            db.session.delete(experience)
            db.session.commit()
            return {'message': 'Experience deleted successfully'}, 200
        else:
            return {'message': 'Experience not found'}, 404


api.add_resource(ExperienceListResource, '/experiences')
api.add_resource(ExperienceResource, '/experiences/<string:experience_id>')