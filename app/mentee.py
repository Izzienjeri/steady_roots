from flask import Blueprint, jsonify
from flask_restful import Api, Resource, reqparse
from app.models import db,Mentee,Mentor, User
from app.auth import jwt_required, get_jwt_identity
from datetime import datetime

mentee_bp=Blueprint('mentee_blueprint',__name__)
api=Api(mentee_bp)

mentee_parser = reqparse.RequestParser()
mentee_parser.add_argument('start', type=str, required=True, help='Start date is required')
mentee_parser.add_argument('end', type=str, required=True, help='End date is required')
mentee_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
mentee_parser.add_argument('mentor_id', type=str, required=True, help='Mentor ID is required')







import time

class MenteeListResource(Resource):
    # @jwt_required()
    def get(self):
        mentees = Mentee.query.all()
        mentee_data = []
        for mentee in mentees:
            mentor = Mentor.query.filter_by(mentor_id=mentee.mentor_id).first()
            if mentor:
                mentee_data.append({
                    'id': mentee.mentee_id,
                    'start': int(time.mktime(mentee.start.timetuple())),
                    'end': int(time.mktime(mentee.end.timetuple())),
                    'user_id': mentee.user_id,
                    'mentor_id': mentee.mentor_id,
                    'mentor_name': mentor.description
                })
        return mentee_data



    def post(self):
        data = mentee_parser.parse_args()
        new_mentee = Mentee(start=data['start'], end=data['end'], user_id=data['user_id'], mentor_id=data['mentor_id'])
        db.session.add(new_mentee)
        db.session.commit()
        return {'message': 'Mentee created successfully'}, 201

class MenteeResource(Resource):
    # @jwt_required()
    def get(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            # Convert datetime objects to ISO format strings
            start_iso = mentee.start.isoformat()
            end_iso = mentee.end.isoformat()

            return {
                'id': mentee.mentee_id,
                'start': start_iso,
                'end': end_iso,
                'user_id': mentee.user_id,
                'mentor_id': mentee.mentor_id
            }
        else:
            return {'message': 'Mentee not found'}, 404

    
    #@jwt_required()
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
    
    #@jwt_required()
    def delete(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            db.session.delete(mentee)
            db.session.commit()
            return {'message': 'Mentee deleted successfully'}, 200
        else:
            return {'message': 'Mentee not found'}, 404

api.add_resource(MenteeListResource, '/mentees')
api.add_resource(MenteeResource, '/mentees/<string:mentee_id>')