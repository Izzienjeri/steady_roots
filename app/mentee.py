from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from models import db,Mentee

mentee_bp=Blueprint('mentee_blueprint',__name__)
api=Api(mentee_bp)

mentee_parser = reqparse.RequestParser()
mentee_parser.add_argument('start', type=str, required=True, help='Start date is required')
mentee_parser.add_argument('end', type=str, required=True, help='End date is required')
mentee_parser.add_argument('user_id', type=str, required=True, help='User ID is required')
mentee_parser.add_argument('mentor_id', type=str, required=True, help='Mentor ID is required')







class MenteeListResource(Resource):
    def get(self):
        mentees = Mentee.query.all()
        return [{'id': mentee.mentee_id, 'start': mentee.start, 'end': mentee.end, 'user_id': mentee.user_id, 'mentor_id': mentee.mentor_id} for mentee in mentees]

    def post(self):
        data = mentee_parser.parse_args()
        new_mentee = Mentee(start=data['start'], end=data['end'], user_id=data['user_id'], mentor_id=data['mentor_id'])
        db.session.add(new_mentee)
        db.session.commit()
        return {'message': 'Mentee created successfully'}, 201

class MenteeResource(Resource):
    def get(self, mentee_id):
        mentee = Mentee.query.get(mentee_id)
        if mentee:
            return {'id': mentee.mentee_id, 'start': mentee.start, 'end': mentee.end, 'user_id': mentee.user_id, 'mentor_id': mentee.mentor_id}
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

api.add_resource(MenteeListResource, '/mentees')
api.add_resource(MenteeResource, '/mentees/<string:mentee_id>')