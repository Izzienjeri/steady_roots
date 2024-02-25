from flask import Blueprint, jsonify
from flask_restful import Api, Resource, reqparse
from app.models import db, Experience
from app.auth import jwt_required, get_jwt_identity
from datetime import datetime, time

experience_bp=Blueprint('experience_blueprint',__name__)
api=Api(experience_bp)

experience_parser = reqparse.RequestParser()
experience_parser.add_argument('organisation', type=str, required=True, help='Organisation is required')
experience_parser.add_argument('job_title', type=str, required=True, help='Job title is required')
experience_parser.add_argument('description', type=str, required=True, help='Description is required')
experience_parser.add_argument('start', type=str, required=True, help='Start date is required')
experience_parser.add_argument('end', type=str, required=True, help='End date is required')
experience_parser.add_argument('user_id', type=str, required=True, help='User ID is required')



class ExperienceListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        experiences = Experience.query.filter_by(user_id=user_id).all()
        formatted_experiences = []
        for experience in experiences:
            formatted_experience = {
                'id': experience.experience_id,
                'organisation': experience.organisation,
                'job_title': experience.job_title,
                'description': experience.description,
                'start': experience.start.strftime('%Y-%m-%d'),
                'end': experience.end.strftime('%Y-%m-%d')
            }
            formatted_experiences.append(formatted_experience)

        return formatted_experiences


    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = experience_parser.parse_args()
        start_date = datetime.strptime(data['start'], '%Y-%m-%d')
        end_date = datetime.strptime(data['end'], '%Y-%m-%d')

        new_experience = Experience(
            organisation=data['organisation'],
            job_title=data['job_title'],
            description=data['description'],
            start=start_date,
            end=end_date,
            user_id=user_id
        )
        db.session.add(new_experience)
        db.session.commit()
        return {'message': 'Experience created successfully'}, 201



class ExperienceResource(Resource):

    @jwt_required()
    def get(self, experience_id):
        experience = Experience.query.get(experience_id)
        if experience:
            return {'id': experience.experience_id, 'organisation': experience.organisation, 'job_title': experience.job_title, 'description': experience.description, 'start': int(time.mktime(experience.start.timetuple())), 'end': int(time.mktime(experience.end.timetuple()))}
        else:
            return {'message': 'Experience not found'}, 404
    
    @jwt_required()
    def patch(self, experience_id):
        data = experience_parser.parse_args()
        experience = Experience.query.get(experience_id)
        if experience:
            experience.organisation = data['organisation']
            experience.job_title = data['job_title']
            experience.description = data['description']
            experience.start = datetime.strptime(data['start'], '%Y-%m-%d')
            experience.end = datetime.strptime(data['end'], '%Y-%m-%d')
            experience.user_id = data['user_id']
            db.session.commit()
            return {'message': 'Experience updated successfully'}, 200
        else:
            return {'message': 'Experience not found'}, 404
        
    @jwt_required()
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